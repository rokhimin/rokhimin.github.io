
$(document).ready(function() {
    // Directly embedding the JSON data in JavaScript instead of loading from a file
    const loremData = {
        "paragraphs": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ],
        "sentences": [
            "Lorem ipsum dolor sit amet.",
            "Consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam."
        ],
        "words": [
            "lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "consectetur",
            "adipiscing",
            "elit",
            "sed",
            "do"
        ]
    };
    
    $('#generate-btn').on('click', function(e) {
        e.preventDefault();
        
        // Show loading
        $('#loading').show();
        
        // Get form values
        const count = parseInt($('#number').val());
        const type = $('#type').val();
        
        setTimeout(function() {
            try {
                // Generate text based on type
                let result = '';
                
                if (type === 'paragraphs') {
                    result = generateContent(loremData.paragraphs, count);
                    // Format paragraphs with HTML
                    result = result.map(p => `<p>${p}</p>`).join('');
                } else if (type === 'sentences') {
                    result = generateContent(loremData.sentences, count);
                    result = `<p>${result.join(' ')}</p>`;
                } else if (type === 'words') {
                    result = generateContent(loremData.words, count);
                    result = `<p>${result.join(' ')}</p>`;
                }
                
                // Hide loading
                $('#loading').hide();
                
                // Add content class for styling
                $('#loripsum-result').addClass('has-content');
                
                // Update content
                $('#loripsum-result').html(result);
                
                // Enable copy button
                $('#copy-btn').prop('disabled', false);
            } catch (error) {
                // Hide loading
                $('#loading').hide();
                
                // Show error message
                $('#loripsum-result').html(`
                    <div class="notification is-danger">
                        <i class="fas fa-exclamation-triangle mr-2"></i> 
                        Error: ${error.message || 'Could not generate text. Please try again.'}
                    </div>
                `);
                
                console.log(`Error: ${error}`);
            }
        }, 300); // Small timeout to show loading animation
    });
    
    // Function to generate content from the data source
    function generateContent(sourceArray, count) {
        // If count is larger than the source array, we need to repeat items
        let result = [];
        
        // Generate the requested number of items
        for (let i = 0; i < count; i++) {
            // Use modulo to cycle through the array if count > array length
            const index = i % sourceArray.length;
            result.push(sourceArray[index]);
        }
        
        return result;
    }
    
    // Copy to clipboard functionality
    $('#copy-btn').on('click', function(e) {
        e.preventDefault();
        
        // Create a temporary textarea
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = $('#loripsum-result').text();
        document.body.appendChild(tempTextArea);
        
        // Select and copy
        tempTextArea.select();
        document.execCommand('copy');
        
        // Remove the textarea
        document.body.removeChild(tempTextArea);
        
        // Change button text temporarily
        const originalText = $(this).html();
        $(this).html('<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>');
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            $(this).html(originalText);
        }, 2000);
    });
});