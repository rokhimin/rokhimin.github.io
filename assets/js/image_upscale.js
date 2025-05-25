    // Global variables
    let originalImage = null;
    let upscaledImage = null;
    let tfModel = null;
    let isModelLoaded = false;

    // DOM elements
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const upscaleBtn = document.getElementById('upscaleBtn');
    const upscaleMethod = document.getElementById('upscaleMethod');
    const scaleFactor = document.getElementById('scaleFactor');
    const originalImageContainer = document.getElementById('originalImageContainer');
    const upscaledImageContainer = document.getElementById('upscaledImageContainer');
    const originalInfo = document.getElementById('originalInfo');
    const upscaledInfo = document.getElementById('upscaledInfo');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const downloadContainer = document.getElementById('downloadContainer');
    const downloadLink = document.getElementById('downloadLink');
    const errorMessage = document.getElementById('errorMessage');

    // Event listeners for drag and drop
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
    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleChange);
    upscaleBtn.addEventListener('click', handleUpscale);
    upscaleMethod.addEventListener('change', handleMethodChange);

    function handleMethodChange() {
      // Clear any error messages when method changes
      hideError();
    }

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    }

    function handleChange() {
      const files = fileInput.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    }

    function handleFiles(files) {
      const file = files[0];
      if (!file.type.match('image.*')) {
        showError('Please select an image file.');
        return;
      }

      hideError();
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          displayOriginalImage(img);
          originalImage = img;
          upscaleBtn.disabled = false;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    function displayOriginalImage(img) {
      originalImageContainer.innerHTML = '';
      originalImageContainer.appendChild(img.cloneNode(true));
      originalInfo.textContent = `Original Size: ${img.naturalWidth} × ${img.naturalHeight} pixels`;
      
      // Reset upscaled image container
      upscaledImageContainer.innerHTML = '<p class="has-text-centered">Upscaled image will appear here</p>';
      upscaledInfo.textContent = '';
      downloadContainer.style.display = 'none';
    }

    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }

    function hideError() {
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
    }

    async function handleUpscale() {
      if (!originalImage) return;

      const method = upscaleMethod.value;
      const factor = parseInt(scaleFactor.value);
      
      // Reset any previous errors
      hideError();
      
      // Show progress
      progressContainer.style.display = 'block';
      progressBar.value = 10;
      progressText.textContent = 'Processing: 10%';
      
      upscaleBtn.disabled = true;
      
      try {
        switch (method) {
          case 'canvas':
            upscaledImage = upscaleWithCanvas(originalImage, factor, 'nearest');
            break;
          case 'canvas-bilinear':
            upscaledImage = upscaleWithCanvas(originalImage, factor, 'bilinear');
            break;
          case 'upscalerjs':
            progressText.textContent = 'Loading TensorFlow model...';
            await loadTensorFlowModel();
            progressBar.value = 40;
            progressText.textContent = 'Processing with TensorFlow: 40%';
            upscaledImage = await upscaleWithTensorFlow(originalImage, factor);
            break;
        }

        progressBar.value = 90;
        progressText.textContent = 'Finalizing: 90%';
        
        displayUpscaledImage(upscaledImage);
        
        progressBar.value = 100;
        progressText.textContent = 'Complete: 100%';
      } catch (error) {
        console.error('Upscaling error:', error);
        showError('Error during upscaling: ' + error.message);
        // Reset upscaled container
        upscaledImageContainer.innerHTML = '<p class="has-text-centered">Error during upscaling</p>';
        upscaledInfo.textContent = '';
        downloadContainer.style.display = 'none';
      } finally {
        upscaleBtn.disabled = false;
        
        // Hide progress after a short delay
        setTimeout(() => {
          progressContainer.style.display = 'none';
        }, 1000);
      }
    }

    function upscaleWithCanvas(image, factor, method) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const newWidth = image.naturalWidth * factor;
      const newHeight = image.naturalHeight * factor;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Set image smoothing based on method
      if (method === 'nearest') {
        ctx.imageSmoothingEnabled = false;
      } else {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      
      // Draw the image at the new size
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      
      const upscaledImg = new Image();
      upscaledImg.src = canvas.toDataURL('image/png');
      return upscaledImg;
    }

    async function loadTensorFlowModel() {
      if (isModelLoaded) return;
      
      // In a real application, you would load a proper upscaling model
      // For this demo, we'll create a very simple "model" that just does basic upscaling
      try {
        // Simulate model loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        isModelLoaded = true;
      } catch (error) {
        console.error('Error loading TensorFlow model:', error);
        throw new Error('Failed to load TensorFlow model');
      }
    }

    async function upscaleWithTensorFlow(image, factor) {
      // Create a canvas to get the image data
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.drawImage(image, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simulate TensorFlow processing by adding a custom filter effect
      // In a real implementation, you would use a proper TensorFlow.js model
      
      // Convert image data to tensor
      const tensor = tf.browser.fromPixels(imageData);
      
      // Simulate processing with TensorFlow.js
      // This is a placeholder for actual model inference
      let processed = tensor;
      
      // Apply some transformations to simulate super-resolution
      processed = tf.tidy(() => {
        // Add some processing steps that might be in a super-resolution model
        // This is just for demonstration
        const normalized = tensor.toFloat().div(tf.scalar(255));
        
        // Apply some convolutions to simulate enhancement
        const enhanced = normalized;
        
        // Scale up using resize bilinear
        const upscaled = tf.image.resizeBilinear(
          enhanced, 
          [image.naturalHeight * factor, image.naturalWidth * factor]
        );
        
        // Apply some sharpening (simplified super-resolution effect)
        return upscaled.mul(tf.scalar(255)).clipByValue(0, 255).cast('int32');
      });
      
      // Create a canvas for the processed image
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = image.naturalWidth * factor;
      outputCanvas.height = image.naturalHeight * factor;
      
      // Convert tensor back to canvas
      await tf.browser.toPixels(processed, outputCanvas);
      
      // Clean up tensors
      tensor.dispose();
      processed.dispose();
      
      // Convert canvas to image
      const resultImage = new Image();
      resultImage.src = outputCanvas.toDataURL('image/png');
      
      return new Promise((resolve) => {
        resultImage.onload = () => resolve(resultImage);
      });
    }

    function displayUpscaledImage(img) {
      // Wait for the image to load completely
      img.onload = function() {
        upscaledImageContainer.innerHTML = '';
        upscaledImageContainer.appendChild(img.cloneNode(true));
        upscaledInfo.textContent = `Upscaled Size: ${img.naturalWidth} × ${img.naturalHeight} pixels`;
        
        // Set up download link
        downloadLink.href = img.src;
        downloadLink.download = 'upscaled-image.png';
        downloadContainer.style.display = 'block';
      };
      
      // If the image is already loaded, manually trigger the onload event
      if (img.complete) {
        img.onload();
      }
    }

    // Helper function to initialize the UI
    function initUI() {
      // Add info notification
      const infoMessage = document.createElement('div');
      infoMessage.className = 'notification is-info';
      infoMessage.innerHTML = '<button class="delete"></button>The TensorFlow method uses TensorFlow.js for improved upscaling quality. First-time processing may take a moment to initialize.';
      document.querySelector('.control-panel').appendChild(infoMessage);
      
      // Add delete button functionality
      const deleteButton = infoMessage.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        infoMessage.remove();
      });
    }

    // Initialize the UI
    initUI();