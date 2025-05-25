
$(document).ready(function() {
  let currentImageFile = null;
  
  // Tab switching
  $("#tab-file a").click(function() {
    $("#tab-file").addClass("is-active");
    $("#tab-url").removeClass("is-active");
    $("#content-file").removeClass("is-hidden");
    $("#content-url").addClass("is-hidden");
  });
  
  $("#tab-url a").click(function() {
    $("#tab-url").addClass("is-active");
    $("#tab-file").removeClass("is-active");
    $("#content-url").removeClass("is-hidden");
    $("#content-file").addClass("is-hidden");
  });
  
  // Browse button click handler
  $("#browse-btn").click(function() {
    $("#img").click();
  });
  
  // File input change handler
  $("#img").change(function() {
    handleFileSelect(this.files[0]);
  });
  
  // Remove file button
  $("#remove-file").click(function() {
    resetFileUpload();
  });
  
  // URL fetch button
  $("#fetch-url").click(function() {
    const imageUrl = $("#image-url").val().trim();
    if (!imageUrl) {
      alert("Please enter a valid image URL");
      return;
    }
    
    // Show loading for image fetch
    $("#preview").html("<p class='has-text-centered'><i class='fas fa-spinner fa-spin'></i> Loading image...</p>");
    $("#preview-container").removeClass("is-hidden");
    
    // Fetch the image and convert to blob
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const file = new File([blob], "image-from-url.jpg", { type: blob.type });
        handleFileSelect(file);
      })
      .catch(error => {
        $("#preview").html("<p class='has-text-danger'><i class='fas fa-exclamation-triangle'></i> Failed to load image. Please check the URL.</p>");
      });
  });
  
  // Drag and drop functionality
  const dropArea = document.getElementById('drop-area');
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });
  
  function highlight() {
    dropArea.classList.add('highlight');
  }
  
  function unhighlight() {
    dropArea.classList.remove('highlight');
  }
  
  dropArea.addEventListener('drop', handleDrop, false);
  
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }
  
  function handleFileSelect(file) {
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      alert("Please select an image file!");
      return;
    }
    
    currentImageFile = file;
    $("#filename").text(file.name);
    $("#file-details").removeClass("is-hidden");
    $("#drop-area").addClass("is-hidden");
    $("#preview-container").removeClass("is-hidden");
    
    const reader = new FileReader();
    reader.onload = function(e) {
      $("#preview").html("<img src='" + e.target.result + "' class='preview-image'>");
    };
    reader.readAsDataURL(file);
  }
  
  function resetFileUpload() {
    currentImageFile = null;
    $("#img").val("");
    $("#filename").text("No file selected");
    $("#file-details").addClass("is-hidden");
    $("#drop-area").removeClass("is-hidden");
    $("#preview-container").addClass("is-hidden");
  }

  // Search for anime
  $("#search-btn").click(function() {
    let imageToSearch = currentImageFile;
    const imageUrl = $("#image-url").val().trim();
    
    // Determine which method is active and if we have data
    const isFileTab = !$("#content-file").hasClass("is-hidden");
    
    if (isFileTab && !imageToSearch) {
      alert("Please select an image first!");
      return;
    }
    
    if (!isFileTab && !imageUrl) {
      alert("Please enter an image URL!");
      return;
    }
    
    // Show loading and hide previous results
    $("#loading").removeClass("is-hidden");
    $("#results-section").addClass("is-hidden");
    
    const formData = new FormData();
    
    if (isFileTab) {
      formData.append("image", imageToSearch);
    } else {
      formData.append("url", imageUrl);
    }
    
    $.ajax({
      type: "POST",
      url: "https://api.trace.moe/search",
      data: formData,
      contentType: false,
      processData: false,
      cache: false,
      dataType: "json",
      success: function(data) {
        // Hide loading indicator
        $("#loading").addClass("is-hidden");
        
        // Show results section
        $("#results-section").removeClass("is-hidden");
        
        let hasil = "";
        
        if (data.result && data.result.length > 0) {
          $.each(data.result, function(index, value) {
            // Determine similarity class
            let similarityClass = "";
            let similarityPercent = (value.similarity * 100).toFixed(1) + "%";
            
            if (value.similarity > 0.9) {
              similarityClass = "high-similarity";
            } else if (value.similarity > 0.7) {
              similarityClass = "medium-similarity";
            } else {
              similarityClass = "low-similarity";
            }
            
            hasil += `
              <div class="anime-result">
                <div class="anime-details">
                  <h4 class="title is-4 has-text-light mb-2">
                    ${value.filename}
                    <span class="tag ${similarityClass} similarity-tag">Match: ${similarityPercent}</span>
                  </h4>
                  <p class="subtitle is-6 has-text-grey-light">Episode: ${value.episode || 'Unknown'}</p>
                  
                  <div class="tags">
                    <span class="tag is-info">Anilist ID: ${value.anilist}</span>
                  </div>
                </div>
                
                <div class="video-container has-background-black-ter p-2 has-text-centered">
                  <video width="100%" height="auto" controls>
                    <source src="${value.video}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            `;
          });
        } else {
          hasil = `
            <div class="notification is-warning">
              <p>No matching anime found. Try another screenshot!</p>
            </div>
          `;
        }
        
        $("#result").html(hasil);
      },
      error: function() {
        $("#loading").addClass("is-hidden");
        $("#results-section").removeClass("is-hidden");
        $("#result").html(`
          <div class="notification is-danger">
            <p>Error occurred while searching. Please try again later.</p>
          </div>
        `);
      }
    });
  });
});