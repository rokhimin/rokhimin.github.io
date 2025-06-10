
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const resultText = document.getElementById('resultText');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Style conversion functions
    const styleConverters = {
        // Line-through using Unicode
        'coret': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0336'; // Add strikethrough character
                }
            }
            return result;
        },

        // Using slash symbol
        'symbol-slash': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0338'; // Combining long solidus overlay
                }
            }
            return result;
        },

        // Underline using Unicode
        'garis-bawah': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0332'; // Combining low line
                }
            }
            return result;
        },

        // Dashed underline using Unicode
        'garis-putus': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0333'; // Combining double low line (closest to dashed)
                }
            }
            return result;
        },

        // Double underline using Unicode
        'garis-ganda': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0347'; // Combining double low line below
                }
            }
            return result;
        },

        // Wavy underline using Unicode
        'garis-gelombang': function(text) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ' || char === '\n') {
                    result += char;
                } else {
                    result += char + '\u0330'; // Combining tilde below
                }
            }
            return result;
        }
    };

    // Event listener for convert button
    convertBtn.addEventListener('click', function() {
        const original = inputText.value;
        if (original.trim() === '') {
            resultText.textContent = 'Please enter some text first.';
            return;
        }

        // Get selected style
        const selectedStyle = document.querySelector('input[name="textStyle"]:checked').value;
        
        // Convert text using the selected style
        const convertedText = styleConverters[selectedStyle](original);
        resultText.textContent = convertedText;
        
        // Add animation effect
        resultText.classList.add('has-text-success');
        setTimeout(() => {
            resultText.classList.remove('has-text-success');
        }, 500);
    });

    // Event listener for copy button
    copyBtn.addEventListener('click', function() {
        const textToCopy = resultText.textContent;
        if (textToCopy.trim() === '' || textToCopy === 'Please enter some text first.') {
            alert('Nothing to copy!');
            return;
        }

        // Use the clipboard API to copy text
        navigator.clipboard.writeText(textToCopy).then(function() {
            // Temporary feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('is-success');
            copyBtn.classList.remove('is-info');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('is-success');
                copyBtn.classList.add('is-info');
            }, 2000);
        }).catch(function() {
            alert('Failed to copy text. Please try again.');
        });
    });

    // Removed the example text initialization
});