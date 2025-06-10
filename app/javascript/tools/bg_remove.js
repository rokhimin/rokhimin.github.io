document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const imageUpload = document.getElementById('imageUpload');
    const fileName = document.getElementById('fileName');
    const editContainer = document.getElementById('editContainer');
    const placeholderText = document.getElementById('placeholderText');
    const toolsContainer = document.getElementById('toolsContainer');
    const imageCanvas = document.getElementById('imageCanvas');
    const maskCanvas = document.getElementById('maskCanvas');
    const resultCanvas = document.getElementById('resultCanvas');
    const resultContainer = document.getElementById('resultContainer');
    const colorPicker = document.getElementById('colorPicker');
    const toleranceSlider = document.getElementById('toleranceSlider');
    const toleranceValue = document.getElementById('toleranceValue');
    const removeBackgroundBtn = document.getElementById('removeBackground');
    const resetImageBtn = document.getElementById('resetImage');
    const downloadImageBtn = document.getElementById('downloadImage');
    const enableDrawBtn = document.getElementById('enableDraw');
    const disableDrawBtn = document.getElementById('disableDraw');
    const clearMaskBtn = document.getElementById('clearMask');
    const brushSizeSlider = document.getElementById('brushSizeSlider');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const brushPreview = document.getElementById('brushPreview');
    const debugInfo = document.getElementById('debugInfo');
    
    // Variables
    let originalImage = null;
    let imageCtx = null;
    let maskCtx = null;
    let resultCtx = null;
    
    // Initialize contexts
    try {
      imageCtx = imageCanvas.getContext('2d');
      maskCtx = maskCanvas.getContext('2d');
      resultCtx = resultCanvas.getContext('2d');
    } catch (err) {
      console.error("Error initializing canvas contexts:", err);
      logDebug("Error initializing canvas contexts: " + err.message);
    }
    
    let isDrawing = false;
    let isDrawEnabled = false;
    let brushSize = 10;
    let lastX = 0;
    let lastY = 0;
    
    // Debug logging function
    function logDebug(message) {
      if (debugInfo) {
        const timestamp = new Date().toLocaleTimeString();
        debugInfo.innerHTML += `<div>[${timestamp}] ${message}</div>`;
        debugInfo.scrollTop = debugInfo.scrollHeight;
      }
      console.log(message);
    }
    
    // Update brush preview
    function updateBrushPreview() {
      const size = brushSizeSlider.value;
      brushSizeValue.textContent = size;
      brushPreview.style.width = size + 'px';
      brushPreview.style.height = size + 'px';
      brushSize = parseInt(size);
    }
    
    // Initialize brush preview
    updateBrushPreview();
    
    // Setup drag and drop functionality
    editContainer.addEventListener('dragover', function(e) {
      e.preventDefault();
      editContainer.classList.add('dragover');
    });
    
    editContainer.addEventListener('dragleave', function(e) {
      e.preventDefault();
      editContainer.classList.remove('dragover');
    });
    
    editContainer.addEventListener('drop', function(e) {
      e.preventDefault();
      editContainer.classList.remove('dragover');
      
      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        if (file.type.match('image.*')) {
          imageUpload.files = e.dataTransfer.files;
          handleImageFile(file);
        } else {
          logDebug("ERROR: Dropped file is not an image");
          alert("Please drop an image file.");
        }
      }
    });
    
    // Event listeners
    imageUpload.addEventListener('change', function(e) {
      if (e.target.files.length) {
        handleImageFile(e.target.files[0]);
      }
    });
    
    toleranceSlider.addEventListener('input', updateToleranceValue);
    removeBackgroundBtn.addEventListener('click', processImage);
    resetImageBtn.addEventListener('click', resetImage);
    downloadImageBtn.addEventListener('click', downloadImage);
    brushSizeSlider.addEventListener('input', updateBrushPreview);
    
    // Enable drawing
    enableDrawBtn.addEventListener('click', function() {
      isDrawEnabled = true;
      enableDrawBtn.classList.add('is-hidden');
      disableDrawBtn.classList.remove('is-hidden');
      imageCanvas.style.cursor = 'crosshair';
    });
    
    // Disable drawing
    disableDrawBtn.addEventListener('click', function() {
      isDrawEnabled = false;
      disableDrawBtn.classList.add('is-hidden');
      enableDrawBtn.classList.remove('is-hidden');
      imageCanvas.style.cursor = 'default';
    });
    
    // Clear mask
    clearMaskBtn.addEventListener('click', function() {
      if (maskCtx) {
        maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      }
    });
    
    // Drawing functionality
    imageCanvas.addEventListener('mousedown', startDrawing);
    imageCanvas.addEventListener('mousemove', draw);
    imageCanvas.addEventListener('mouseup', stopDrawing);
    imageCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support for mobile
    imageCanvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      imageCanvas.dispatchEvent(mouseEvent);
    });
    
    imageCanvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      imageCanvas.dispatchEvent(mouseEvent);
    });
    
    imageCanvas.addEventListener('touchend', function(e) {
      e.preventDefault();
      const mouseEvent = new MouseEvent('mouseup');
      imageCanvas.dispatchEvent(mouseEvent);
    });
    
    // Functions
    function handleImageFile(file) {
      if (!file) return;
      
      logDebug("File selected: " + file.name + " (" + file.type + ")");
      fileName.textContent = file.name;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        logDebug("File loaded successfully. Size: " + event.target.result.length + " bytes");
        
        // Create new image object
        originalImage = new Image();
        
        // Set up image load error handling
        originalImage.onerror = function() {
          logDebug("ERROR: Failed to load image");
          alert("Failed to load image. Please try a different file.");
        };
        
        originalImage.onload = function() {
          logDebug("Image loaded successfully. Dimensions: " + originalImage.width + "x" + originalImage.height);
          
          try {
            // Set canvas dimensions
            imageCanvas.width = originalImage.width;
            imageCanvas.height = originalImage.height;
            maskCanvas.width = originalImage.width;
            maskCanvas.height = originalImage.height;
            resultCanvas.width = originalImage.width;
            resultCanvas.height = originalImage.height;
            
            // Hide placeholder, show canvases
            placeholderText.classList.add('is-hidden');
            imageCanvas.classList.remove('is-hidden');
            maskCanvas.classList.remove('is-hidden');
            editContainer.classList.add('canvas-loaded');
            
            // Draw original image
            imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            imageCtx.drawImage(originalImage, 0, 0);
            logDebug("Image drawn to canvas successfully");
            
            // Clear mask
            maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
            
            // Show tools
            toolsContainer.classList.remove('is-hidden');
            resultContainer.classList.add('is-hidden');
            downloadImageBtn.classList.add('is-hidden');
            
          } catch (err) {
            logDebug("ERROR during canvas setup: " + err.message);
            console.error("Error setting up canvas:", err);
            alert("An error occurred while preparing the image. Please try again.");
          }
        };
        
        // Set image source
        originalImage.src = event.target.result;
      };
      
      reader.onerror = function() {
        logDebug("ERROR: Failed to read file");
        alert("Failed to read the file. Please try again.");
      };
      
      reader.readAsDataURL(file);
    }
    
    function updateToleranceValue() {
      toleranceValue.textContent = toleranceSlider.value;
    }
    
    function startDrawing(e) {
      if (!isDrawEnabled || !maskCtx) return;
      
      isDrawing = true;
      
      // Get canvas position
      const rect = imageCanvas.getBoundingClientRect();
      const scaleX = imageCanvas.width / rect.width;
      const scaleY = imageCanvas.height / rect.height;
      
      // Calculate position with scaling
      lastX = (e.clientX - rect.left) * scaleX;
      lastY = (e.clientY - rect.top) * scaleY;
      
      // Draw a dot
      maskCtx.beginPath();
      maskCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      maskCtx.arc(lastX, lastY, brushSize / 2, 0, Math.PI * 2);
      maskCtx.fill();
    }
    
    function draw(e) {
      if (!isDrawing || !isDrawEnabled || !maskCtx) return;
      
      // Get canvas position
      const rect = imageCanvas.getBoundingClientRect();
      const scaleX = imageCanvas.width / rect.width;
      const scaleY = imageCanvas.height / rect.height;
      
      // Calculate position with scaling
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      // Draw line
      maskCtx.beginPath();
      maskCtx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      maskCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      maskCtx.lineWidth = brushSize;
      maskCtx.lineCap = 'round';
      
      // Draw circle at current position
      maskCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      maskCtx.fill();
      
      // Draw line from previous position
      maskCtx.beginPath();
      maskCtx.moveTo(lastX, lastY);
      maskCtx.lineTo(x, y);
      maskCtx.stroke();
      
      lastX = x;
      lastY = y;
    }
    
    function stopDrawing() {
      isDrawing = false;
    }
    
    function colorDistance(color1, color2, tolerance) {
      // Calculate Euclidean distance between colors in RGB space
      const rDiff = color1.r - color2.r;
      const gDiff = color1.g - color2.g;
      const bDiff = color1.b - color2.b;
      
      return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }
    
    function hexToRgb(hex) {
      // Convert hex color to RGB
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      return { r, g, b };
    }
    
    function processImage() {
      if (!originalImage || !imageCtx || !maskCtx || !resultCtx) {
        logDebug("ERROR: Cannot process image - missing resources");
        return;
      }
      
      try {
        // Get background color to remove
        const bgColor = hexToRgb(colorPicker.value);
        const tolerance = parseInt(toleranceSlider.value);
        
        logDebug("Processing image with background color: " + colorPicker.value + ", tolerance: " + tolerance);
        
        // Get image data
        const imageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        const resultData = resultCtx.createImageData(imageCanvas.width, imageCanvas.height);
        
        // Process each pixel
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const a = imageData.data[i + 3];
          
          const pixelColor = { r, g, b };
          const distance = colorDistance(pixelColor, bgColor, tolerance);
          
          // Check if pixel is masked (protected)
          const maskAlpha = maskData.data[i + 3];
          const isProtected = maskAlpha > 0;
          
          // Copy color values
          resultData.data[i] = r;
          resultData.data[i + 1] = g;
          resultData.data[i + 2] = b;
          
          // Set alpha based on color distance and mask
          if (distance < tolerance * 2.55 && !isProtected) { // Scale tolerance to 0-255 range
            resultData.data[i + 3] = 0; // Transparent
          } else {
            resultData.data[i + 3] = a; // Keep original alpha
          }
        }
        
        // Draw result
        resultCtx.putImageData(resultData, 0, 0);
        
        // Show result
        resultContainer.classList.remove('is-hidden');
        downloadImageBtn.classList.remove('is-hidden');
        
        logDebug("Image processed successfully");
      } catch (err) {
        logDebug("ERROR during image processing: " + err.message);
        console.error("Error processing image:", err);
        alert("An error occurred while processing the image. Please try again.");
      }
    }
    
    function resetImage() {
      if (!originalImage || !imageCtx) {
        logDebug("ERROR: Cannot reset image - missing resources");
        return;
      }
      
      try {
        // Redraw original image
        imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        imageCtx.drawImage(originalImage, 0, 0);
        
        // Hide result
        resultContainer.classList.add('is-hidden');
        downloadImageBtn.classList.add('is-hidden');
        
        logDebug("Image reset successfully");
      } catch (err) {
        logDebug("ERROR during image reset: " + err.message);
        console.error("Error resetting image:", err);
      }
    }
    
    function downloadImage() {
      if (!resultCanvas) {
        logDebug("ERROR: Cannot download image - missing canvas");
        return;
      }
      
      try {
        // Create temporary link for download
        const link = document.createElement('a');
        link.download = 'no-background-' + fileName.textContent;
        link.href = resultCanvas.toDataURL('image/png');
        link.click();
        
        logDebug("Image download initiated");
      } catch (err) {
        logDebug("ERROR during image download: " + err.message);
        console.error("Error downloading image:", err);
        alert("An error occurred while downloading the image. Please try again.");
      }
    }
    
    // Show/hide debug panel on Ctrl+D
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
      }
    });
    
    // Initial log
    logDebug("App initialized successfully");
  });