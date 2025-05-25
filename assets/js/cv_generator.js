
$(document).ready(function() {

    function adjustPreviewForMobile() {
    if (window.innerWidth <= 768) {
        const previewContainer = $('#previewContainer');
        const containerWidth = previewContainer.width();
        
        // Sesuaikan ukuran font pada tampilan mobile
        if (containerWidth < 400) {
            $('#portfolioPreview').css('font-size', '0.85rem');
            $('#previewName').css('font-size', '1.5rem');
        } else {
            $('#portfolioPreview').css('font-size', '');
            $('#previewName').css('font-size', '');
        }
    } else {
        // Reset styling untuk layar besar
        $('#portfolioPreview').css('font-size', '');
        $('#previewName').css('font-size', '');
    }
}

// Jalankan fungsi saat halaman dimuat dan saat ukuran window berubah
$(window).on('resize', adjustPreviewForMobile);
adjustPreviewForMobile();

    // Tab switching
    $('.tabs li').on('click', function() {
        const tabId = $(this).attr('id');
        const contentId = tabId.replace('tab-', 'content-');
        
        // Update active tab
        $('.tabs li').removeClass('is-active');
        $(this).addClass('is-active');
        
        // Show the corresponding content
        $('.tab-content').removeClass('is-active');
        $('#' + contentId).addClass('is-active');
    });
    
    // File upload handling
    $('.file-input').on('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            $('#fileName').text(file.name);
            
            reader.onload = function(e) {
                $('#profilePreview').attr('src', e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Real-time updating
    $('#fullName').on('input', function() {
        $('#previewName').text($(this).val() || 'Your Name');
    });
    
    
    $('#email').on('input', function() {
        $('#previewEmail').html(`<i class="fas fa-envelope"></i> ${$(this).val() || 'email@example.com'}`);
    });
    
    $('#phone').on('input', function() {
        $('#previewPhone').html(`<i class="fas fa-phone"></i> ${$(this).val() || '+123 456 7890'}`);
    });
    
    $('#address').on('input', function() {
        $('#previewAddress').html(`<i class="fas fa-map-marker-alt"></i> ${$(this).val() || 'City, Country'}`);
    });
    
    $('#aboutMe').on('input', function() {
        $('#previewAbout').text($(this).val() || 'Write something about yourself here...');
    });
    
    // Adding education
    let educationId = 0;
    $('#addEducation').on('click', function() {
        const school = $('#schoolName').val();
        const degree = $('#degree').val();
        const years = $('#eduYears').val();
        const description = $('#eduDescription').val();
        
        if (school && degree) {
            educationId++;
            
            // Add to editor list
            const eduItem = `
                <div class="box" data-edu-id="${educationId}">
                    <h4 class="is-size-5">${school}</h4>
                    <p>${degree}, ${years}</p>
                    <button class="button is-small is-danger delete-edu" data-id="${educationId}">
                        <span class="icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </div>
            `;
            $('#educationList').append(eduItem);
            
            // Add to preview
            const eduPreview = `
                <div class="edu-item" data-edu-id="${educationId}">
                    <h4 class="is-size-5"><strong><font color="black">${school}</font></strong></h4>
                    <p><em>${degree}</em>, ${years}</p>
                    <p>${description}</p>
                </div>
            `;
            
            if ($('#previewEducation').find('.has-text-grey').length > 0) {
                $('#previewEducation').empty();
            }
            
            $('#previewEducation').append(eduPreview);
            
            // Clear form fields
            $('#schoolName, #degree, #eduYears, #eduDescription').val('');
        }
    });
    
    // Deleting education
    $(document).on('click', '.delete-edu', function() {
        const id = $(this).data('id');
        $(`.box[data-edu-id="${id}"]`).remove();
        $(`.edu-item[data-edu-id="${id}"]`).remove();
        
        // Show placeholder if no items left
        if ($('#previewEducation').children().length === 0) {
            $('#previewEducation').html('<p class="has-text-grey">No education added yet.</p>');
        }
    });
    
    // Adding experience
    let experienceId = 0;
    $('#addExperience').on('click', function() {
        const company = $('#companyName').val();
        const position = $('#position').val();
        const years = $('#expYears').val();
        const description = $('#expDescription').val();
        
        if (company && position) {
            experienceId++;
            
            // Add to editor list
            const expItem = `
                <div class="box" data-exp-id="${experienceId}">
                    <h4 class="is-size-5">${company}</h4>
                    <p>${position}, ${years}</p>
                    <button class="button is-small is-danger delete-exp" data-id="${experienceId}">
                        <span class="icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </div>
            `;
            $('#experienceList').append(expItem);
            
            // Add to preview
            const expPreview = `
                <div class="exp-item" data-exp-id="${experienceId}">
                    <h4 class="is-size-5"><strong><font color="black">${company}</font></strong></h4>
                    <p><em>${position}</em>, ${years}</p>
                    <p>${description}</p>
                </div>
            `;
            
            if ($('#previewExperience').find('.has-text-grey').length > 0) {
                $('#previewExperience').empty();
            }
            
            $('#previewExperience').append(expPreview);
            
            // Clear form fields
            $('#companyName, #position, #expYears, #expDescription').val('');
        }
    });
    
    // Deleting experience
    $(document).on('click', '.delete-exp', function() {
        const id = $(this).data('id');
        $(`.box[data-exp-id="${id}"]`).remove();
        $(`.exp-item[data-exp-id="${id}"]`).remove();
        
        // Show placeholder if no items left
        if ($('#previewExperience').children().length === 0) {
            $('#previewExperience').html('<p class="has-text-grey">No experience added yet.</p>');
        }
    });
    
    // Adding skills
    $('#skillInput').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            addSkill();
        }
    });
    
    $('#addSkill').on('click', function() {
        addSkill();
    });
    
    function addSkill() {
        const skill = $('#skillInput').val().trim();
        
        if (skill) {
            // Add to skills list
            const skillItem = `
                <span class="tag is-medium is-info">
                    ${skill}
                    <button class="delete is-small delete-skill"></button>
                </span>
            `;
            $('#skillsList').append(skillItem);
            
            // Add to preview
            const skillPreview = `
                <span class="skill-tag" style="background-color: #3273dc; color: white;">
                    ${skill}
                </span>
            `;
            
            if ($('#previewSkills').find('.has-text-grey').length > 0) {
                $('#previewSkills').empty();
            }
            
            $('#previewSkills').append(skillPreview);
            
            // Clear input
            $('#skillInput').val('');
        }
    }
    
    // Deleting skills
    $(document).on('click', '.delete-skill', function() {
        const skillText = $(this).parent().text().trim();
        $(this).parent().remove();
        
        // Remove from preview
        $('#previewSkills .skill-tag').each(function() {
            if ($(this).text().trim() === skillText) {
                $(this).remove();
            }
        });
        
        // Show placeholder if no skills left
        if ($('#previewSkills').children().length === 0) {
            $('#previewSkills').html('<p class="has-text-grey">No skills added yet.</p>');
        }
    });
    
    // Template selection
    $('.template-option').on('click', function() {
        $('.template-option').removeClass('selected');
        $(this).addClass('selected');
        
        const template = $(this).data('template');
        $('#portfolioPreview').attr('class', '').addClass(template + '-template');
        
        // Apply template-specific styling
        applyTemplateStyles(template);
    });

    
// Color customization real-time updates
$('#primaryColor, #backgroundColor, #textColor').on('input', function() {
    // Get current template
    const currentTemplate = $('#portfolioPreview').attr('class').replace('-template', '');
    
    // Apply template styles with updated colors
    applyTemplateStyles(currentTemplate);
});
    
    function applyTemplateStyles(template) {
        const primaryColor = $('#primaryColor').val();
        const backgroundColor = $('#backgroundColor').val();
        const textColor = $('#textColor').val();
        
        $('#portfolioPreview').css('background-color', backgroundColor);
        $('#portfolioPreview').css('color', textColor);
        
        if (template === 'modern') {
            $('.profile-section').css('background-color', primaryColor);
            $('.profile-section').css('color', 'white');
            $('.section-title').css('border-bottom-color', primaryColor);
            $('.skill-tag').css('background-color', primaryColor);
            $('.skill-tag').css('color', 'white');
            $('#profilePreview').css('border-color', 'white');
        } else if (template === 'classic') {
            $('.profile-section').css('background-color', 'transparent');
            $('.profile-section').css('color', textColor);
            $('.section-title').css('border-bottom-color', primaryColor);
            $('.skill-tag').css('background-color', 'transparent');
            $('.skill-tag').css('color', textColor);
            $('#profilePreview').css('border-color', primaryColor);
        } else if (template === 'minimalist') {
            $('.profile-section').css('background-color', 'transparent');
            $('.profile-section').css('color', textColor);
            $('.section-title').css('color', primaryColor);
            $('.skill-tag').css('color', primaryColor);
            $('.skill-tag').css('background-color', 'transparent');
            $('#profilePreview').css('border-color', primaryColor);
        }
    }
    $('#downloadPDF').on('click', function() {
    // Show loading indicator
    const loadingMessage = $('<div class="notification is-info is-light">Generating PDF...</div>');
    $(this).after(loadingMessage);
    
    // Detect device type
    const isMobile = window.innerWidth <= 768;
    
    // Create a clone of the preview to modify for PDF generation
    const element = document.getElementById('portfolioPreview').cloneNode(true);
    
    // Create a temporary container with proper dimensions
    const pdfContainer = document.createElement('div');
    pdfContainer.appendChild(element);
    document.body.appendChild(pdfContainer);
    
    // Set the container to match A4 paper size regardless of device
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.width = '210mm'; // A4 width
    pdfContainer.style.backgroundColor = $('#backgroundColor').val();
    
    // Apply appropriate styles based on device
    const style = document.createElement('style');
    style.textContent = `
        /* Force consistent styling for PDF */
        .profile-section, .content-section {
            padding: 20px !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 210mm !important;
        }
        .profile-pic-container img {
            width: ${isMobile ? '130px' : '130px'} !important;
            height: ${isMobile ? '130px' : '130px'} !important;
            display: block !important;
            margin: 0 auto 15px auto !important;
        }
        h1, h2, h3, h4 {
            margin-bottom: 10px !important;
            overflow: visible !important;
        }
        p {
            margin-bottom: 8px !important;
            overflow: visible !important;
        }
        .section-title {
            padding-bottom: 5px !important;
            margin-top: 15px !important;
            margin-bottom: 10px !important;
        }
        .skill-tag {
            margin: 3px !important;
            display: inline-block !important;
            padding: 3px 8px !important;
        }
        * {
            transform: none !important;
            -webkit-transform: none !important;
            box-sizing: border-box !important;
            max-width: 210mm !important;
        }
    `;
    pdfContainer.appendChild(style);
    
    // Give browser time to apply styles
    setTimeout(() => {
        // Use different windowWidth value based on device
        const windowWidth = isMobile ? 694 : 1408;
        
        // Configure html2pdf options for better rendering
        const opt = {
            margin: [2, 2, 2, 2],
            filename: 'portfolio-cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                scrollY: 0,
                letterRendering: true,
                windowWidth: windowWidth,
                foreignObjectRendering: false
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        // Generate and save the PDF
        html2pdf()
            .from(element)
            .set(opt)
            .save()
            .then(() => {
                // Clean up
                document.body.removeChild(pdfContainer);
                loadingMessage.remove();
            })
            .catch(error => {
                console.error('PDF generation error:', error);
                alert('There was an error generating your PDF. Please try again.');
                document.body.removeChild(pdfContainer);
                loadingMessage.remove();
            });
    }, 500); // Short delay to ensure rendering
});
    
    // Initialize with default styles
    applyTemplateStyles('modern');
});