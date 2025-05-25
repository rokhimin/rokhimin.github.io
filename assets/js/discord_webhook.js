
$(document).ready(function() {
  // Tab switching
  $('.tabs li').click(function() {
    const tab = $(this).data('tab');
    
    $('.tabs li').removeClass('is-active');
    $(this).addClass('is-active');
    
    $('.tab-content').hide();
    $(`#${tab}-tab`).show();
  });
  
  // Function to update preview
  function updatePreview() {
    // Basic info
    const username = $('#username').val() || 'Webhook Bot';
    const content = $('#content').val();
    
    $('#preview-username').text(username);
    $('#preview-content').text(content);
    
    // Embed color
    const hexColor = $('#color').val();
    $('#preview-embed').css('border-left-color', hexColor);
    
    // Show/hide embed
    const hasEmbedContent = $('#title').val() || $('#description').val() || 
                            $('#author_name').val() || $('#image').val() || 
                            $('#thumbnail').val() || $('#field_name').val() || 
                            $('#field_name2').val() || $('#footer').val();
    
    $('#preview-embed').toggle(hasEmbedContent ? true : false);
    
    // Author
    const authorName = $('#author_name').val();
    const authorUrl = $('#author_url').val();
    const authorIcon = $('#author_icon').val();
    
    $('#preview-author').toggle(authorName ? true : false);
    if (authorName) {
      $('#preview-author-link').text(authorName);
      $('#preview-author-link').attr('href', authorUrl || '#');
      
      if (authorIcon) {
        $('#preview-author-icon').attr('src', authorIcon);
        $('#preview-author-icon').show();
      } else {
        $('#preview-author-icon').hide();
      }
    }
    
    // Title
    const title = $('#title').val();
    const titleUrl = $('#url_title').val();
    
    $('#preview-title').toggle(title ? true : false);
    if (title) {
      $('#preview-title a').text(title);
      $('#preview-title a').attr('href', titleUrl || '#');
    }
    
    // Description
    const description = $('#description').val();
    $('#preview-description').toggle(description ? true : false);
    $('#preview-description').text(description);
    
    // Fields
    const fieldName1 = $('#field_name').val();
    const fieldValue1 = $('#field_value').val();
    const fieldName2 = $('#field_name2').val();
    const fieldValue2 = $('#field_value2').val();
    
    const hasFields = fieldName1 || fieldName2;
    $('#preview-fields').toggle(hasFields ? true : false);
    
    $('#preview-field1').toggle(fieldName1 ? true : false);
    if (fieldName1) {
      $('#preview-field1 .embed-field-name').text(fieldName1);
      $('#preview-field1 .embed-field-value').text(fieldValue1);
    }
    
    $('#preview-field2').toggle(fieldName2 ? true : false);
    if (fieldName2) {
      $('#preview-field2 .embed-field-name').text(fieldName2);
      $('#preview-field2 .embed-field-value').text(fieldValue2);
    }
    
    // Image
    const image = $('#image').val();
    $('#preview-image').toggle(image ? true : false);
    if (image) {
      $('#preview-image img').attr('src', image);
    }
    
    // Thumbnail
    const thumbnail = $('#thumbnail').val();
    $('#preview-thumbnail').toggle(thumbnail ? true : false);
    if (thumbnail) {
      $('#preview-thumbnail img').attr('src', thumbnail);
    }
    
    // Footer
    const footer = $('#footer').val();
    const footerIcon = $('#icon_footer').val();
    
    $('#preview-footer').toggle(footer ? true : false);
    if (footer) {
      $('#preview-footer span').text(footer);
      
      if (footerIcon) {
        $('#preview-footer-icon').attr('src', footerIcon);
        $('#preview-footer-icon').show();
      } else {
        $('#preview-footer-icon').hide();
      }
    }
  }
  
  // Initial preview update
  updatePreview();
  
  // Update preview on input change
  $('input, textarea, select').on('input change', function() {
    updatePreview();
  });
  
  // Send webhook
  $('#send').click(function() {
    const webhookUrl = $('#webhook-url').val();
    
    if (!webhookUrl) {
      $('#result').html('<div class="notification is-danger is-light">Please enter a webhook URL</div>');
      return;
    }
    
    // Show loading state
    $('#send').addClass('is-loading');
    $('#result').html('<div class="notification is-info is-light">Sending webhook...</div>');
    
    // Prepare webhook data
    const username = $('#username').val();
    const avatar_url = $('#avatar_url').val();
    const content = $('#content').val();
    
    // Convert color from hex to decimal
    function hexToDecimal(hex) {
      hex = hex.replace("#", "");
      return parseInt(hex, 16);
    }
    
    const hexColor = $('#color').val();
    const decimalColor = hexToDecimal(hexColor);
    
    const author_name = $('#author_name').val();
    const author_url = $('#author_url').val();
    const author_icon = $('#author_icon').val();
    const title = $('#title').val();
    const url_title = $('#url_title').val();
    const description = $('#description').val();
    const dataImage = $('#image').val();
    const dataThumbnail = $('#thumbnail').val();
    const field_name = $('#field_name').val();
    const field_value = $('#field_value').val();
    const field_name2 = $('#field_name2').val();
    const field_value2 = $('#field_value2').val();
    const footer = $('#footer').val();
    const icon_footer = $('#icon_footer').val();
    
    // Prepare embed data (only include if we have at least one embed property)
    let embedData = {};
    const hasEmbed = author_name || title || description || field_name || 
                     field_name2 || dataImage || dataThumbnail || footer;
    
    if (hasEmbed) {
      embedData = {
        color: decimalColor
      };
      
      // Only add properties that have values
      if (author_name) {
        embedData.author = {
          name: author_name
        };
        
        if (author_url) embedData.author.url = author_url;
        if (author_icon) embedData.author.icon_url = author_icon;
      }
      
      if (title) embedData.title = title;
      if (url_title) embedData.url = url_title;
      if (description) embedData.description = description;
      
      // Only add fields that have names
      if (field_name || field_name2) {
        embedData.fields = [];
        
        if (field_name) {
          embedData.fields.push({
            name: field_name,
            value: field_value || '\u200b', // Zero-width space if no value
            inline: true
          });
        }
        
        if (field_name2) {
          embedData.fields.push({
            name: field_name2,
            value: field_value2 || '\u200b',
            inline: true
          });
        }
      }
      
      if (dataThumbnail) embedData.thumbnail = { url: dataThumbnail };
      if (dataImage) embedData.image = { url: dataImage };
      
      if (footer) {
        embedData.footer = { text: footer };
        if (icon_footer) embedData.footer.icon_url = icon_footer;
      }
    }
    
    // Prepare webhook payload
    const payload = {};
    if (username) payload.username = username;
    if (avatar_url) payload.avatar_url = avatar_url;
    if (content) payload.content = content;
    if (hasEmbed) payload.embeds = [embedData];
    
    // Send webhook
    $.ajax({
      type: "POST",
      url: webhookUrl,
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function() {
        $('#result').html('<div class="notification is-success is-light">' +
                         '<span class="icon"><i class="fas fa-check-circle"></i></span> ' +
                         'Webhook sent successfully!</div>');
        $('#send').removeClass('is-loading');
      },
      error: function(xhr, status, error) {
        $('#result').html('<div class="notification is-danger is-light">' +
                         '<span class="icon"><i class="fas fa-exclamation-triangle"></i></span> ' +
                         'Error: ' + (xhr.status + ' ' + error) + '</div>');
        $('#send').removeClass('is-loading');
      }
    });
  });
});