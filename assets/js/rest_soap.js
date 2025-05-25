$(document).ready(function() {
    // Tab functionality
    $('.tabs li').on('click', function() {
        const tabId = $(this).data('tab');
        
        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        
        $('.tab-content').removeClass('is-active').hide();
        $('#' + tabId).addClass('is-active').show();
    });
    
    // Method button functionality
    $('.method-btn').on('click', function() {
        $('.method-btn').removeClass('is-active');
        $(this).addClass('is-active');
        
        const method = $(this).data('method');
        $('#rest-method').val(method);
        
        // Show/hide body based on method
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            $('#rest-body-container').slideDown();
        } else {
            $('#rest-body-container').slideUp();
        }
    });
    
    // Add header row
    $('#add-header').on('click', function() {
        const headerRow = `
            <div class="columns mb-2">
                <div class="column is-5">
                    <input class="input header-key" type="text" placeholder="Header Name">
                </div>
                <div class="column is-6">
                    <input class="input header-value" type="text" placeholder="Header Value">
                </div>
                <div class="column is-1">
                    <button class="button is-ghost remove-header">
                        <span class="icon">
                            <i class="fas fa-times"></i>
                        </span>
                    </button>
                </div>
            </div>
        `;
        
        $('#headers-container').append(headerRow);
    });
    
    // Remove header row
    $(document).on('click', '.remove-header', function() {
        $(this).closest('.columns').remove();
    });
    
    // Copy response
    $('#copy-rest-response').on('click', function() {
        const textToCopy = $('#rest-response').text();
        navigator.clipboard.writeText(textToCopy);
        
        $(this).html('<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>');
        setTimeout(() => {
            $(this).html('<span class="icon"><i class="fas fa-copy"></i></span><span>Copy</span>');
        }, 2000);
    });
    
    $('#copy-soap-response').on('click', function() {
        const textToCopy = $('#soap-response').text();
        navigator.clipboard.writeText(textToCopy);
        
        $(this).html('<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>');
        setTimeout(() => {
            $(this).html('<span class="icon"><i class="fas fa-copy"></i></span><span>Copy</span>');
        }, 2000);
    });
    
    // REST API Test
    $("#test-rest").click(function() {
        const url = $("#rest-url").val();
        if (!url) {
            alert("Please enter a URL endpoint");
            return;
        }
        
        const method = $("#rest-method").val();
        const body = $("#rest-body").val();
        const proxy = $('input[name="proxy"]:checked').val();
        
        // Collect headers
        let headers = {};
        $('#headers-container .columns').each(function() {
            const key = $(this).find('.header-key').val();
            const value = $(this).find('.header-value').val();
            if (key && value) {
                headers[key] = value;
            }
        });
        
        $("#rest-loading").show();
        $("#rest-result").hide();
        
        const startTime = performance.now();
        
        let proxyUrl = '';
        if (proxy === 'yes') {
            proxyUrl = 'https://api.allorigins.win/raw?url=';
        }
        
        $.ajax({
            url: proxyUrl + url,
            type: method,
            data: (method === "POST" || method === "PUT" || method === "PATCH") ? body : undefined,
            contentType: "application/json",
            headers: headers,
            success: function(data, textStatus, xhr) {
                const endTime = performance.now();
                $("#rest-status").text(xhr.status + " " + xhr.statusText);
                $("#rest-time").text((endTime - startTime).toFixed(2));
                $("#rest-response").text(typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
                
                // Set status pill
                const statusCode = xhr.status;
                $("#rest-status-pill")
                    .removeClass("status-success status-error")
                    .addClass(statusCode >= 200 && statusCode < 400 ? "status-success" : "status-error")
                    .text(statusCode);
                
                $("#rest-loading").hide();
                $("#rest-result").fadeIn();
            },
            error: function(xhr, textStatus, errorThrown) {
                const endTime = performance.now();
                $("#rest-status").text(xhr.status + " " + xhr.statusText);
                $("#rest-time").text((endTime - startTime).toFixed(2));
                $("#rest-response").text("Error: " + errorThrown + "\n\nResponse: " + xhr.responseText);
                
                // Set status pill
                $("#rest-status-pill")
                    .removeClass("status-success")
                    .addClass("status-error")
                    .text(xhr.status);
                
                $("#rest-loading").hide();
                $("#rest-result").fadeIn();
            }
        });
    });
    
    // SOAP API Test
    $("#test-soap").click(function() {
        const url = $("#soap-url").val();
        if (!url) {
            alert("Please enter a SOAP endpoint");
            return;
        }
        
        const xmlBody = $("#soap-body").val();
        const soapAction = $("#soap-action").val();
        
        $("#soap-loading").show();
        $("#soap-result").hide();
        
        const startTime = performance.now();
        
        $.ajax({
            url: url,
            type: "POST",
            data: xmlBody,
            contentType: "text/xml;charset=UTF-8",
            headers: {
                "SOAPAction": soapAction || ""
            },
            success: function(data, textStatus, xhr) {
                const endTime = performance.now();
                
                $("#soap-status").text(xhr.status + " " + xhr.statusText);
                $("#soap-time").text((endTime - startTime).toFixed(2));
                
                // Convert XML to string for display
                const serializer = new XMLSerializer();
                let xmlString;
                
                if (data instanceof Document) {
                    xmlString = serializer.serializeToString(data);
                } else {
                    xmlString = data;
                }
                
                const formattedXml = formatXml(xmlString);
                
                $("#soap-response").text(formattedXml);
                
                // Set status pill
                const statusCode = xhr.status;
                $("#soap-status-pill")
                    .removeClass("status-success status-error")
                    .addClass(statusCode >= 200 && statusCode < 400 ? "status-success" : "status-error")
                    .text(statusCode);
                
                $("#soap-loading").hide();
                $("#soap-result").fadeIn();
            },
            error: function(xhr, textStatus, errorThrown) {
                const endTime = performance.now();
                
                $("#soap-status").text(xhr.status + " " + xhr.statusText);
                $("#soap-time").text((endTime - startTime).toFixed(2));
                $("#soap-response").text("Error: " + errorThrown + "\n\nResponse: " + xhr.responseText);
                
                // Set status pill
                $("#soap-status-pill")
                    .removeClass("status-success")
                    .addClass("status-error")
                    .text(xhr.status);
                
                $("#soap-loading").hide();
                $("#soap-result").fadeIn();
            }
        });
    });
    
    // Help button event
    $("#help-btn").click(function() {
        alert("API Test Tool Help:\n\n" + 
              "REST API Tab:\n" +
              "- URL: Enter the full endpoint URL\n" +
              "- CORS Proxy: Use if you're getting CORS errors\n" +
              "- Method: Select HTTP method (GET, POST, etc.)\n" +
              "- Body: JSON data for POST/PUT requests\n" +
              "- Headers: Add custom HTTP headers\n\n" +
              "SOAP API Tab:\n" +
              "- Endpoint: Enter the SOAP service URL\n" +
              "- SOAP Action: Optional SOAP action header\n" +
              "- XML: Enter your full SOAP envelope");
    });
    
    // Helper function to format XML
    function formatXml(xml) {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        xml.split(/>\s*</).forEach(function(node) {
            if (node.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + node + '>\r\n';
            if (node.match(/^<?\w[^>]*[^\/]$/)) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    }
});