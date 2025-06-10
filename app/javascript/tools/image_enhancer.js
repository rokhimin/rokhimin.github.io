document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const dropArea = document.getElementById('drop-area');
    const imageUpload = document.getElementById('image-upload');
    const enhancementControls = document.getElementById('enhancement-controls');
    const enhanceButton = document.getElementById('enhance-button');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    const previewContainer = document.getElementById('preview-container');
    const originalImage = document.getElementById('original-image');
    const enhancedImage = document.getElementById('enhanced-image');
    const downloadButton = document.getElementById('download-button');
    
    // Variables
    let originalImageData = null;
    let enhancedImageData = null;
    let fileName = "enhanced-image.jpg";
    
    // Drag and drop functionality
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
      dropArea.classList.add('is-active');
    }
    
    function unhighlight() {
      dropArea.classList.remove('is-active');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files.length) {
        handleFiles(files);
      }
    }
    
    function handleFiles(files) {
      const file = files[0];
      if (file && file.type.match('image.*')) {
        fileName = file.name;
        const reader = new FileReader();
        
        reader.onload = function(e) {
          originalImageData = e.target.result;
          originalImage.src = originalImageData;
          enhancementControls.classList.remove('hidden');
          previewContainer.classList.remove('hidden');
          enhancedImage.src = '';
        };
        
        reader.readAsDataURL(file);
      }
    }
    
    // Handle file upload via input
    imageUpload.addEventListener('change', function(event) {
      if (event.target.files.length) {
        handleFiles(event.target.files);
      }
    });
    
    // Handle enhance button click
    enhanceButton.addEventListener('click', async function() {
      if (!originalImageData) {
        alert('Please upload an image first.');
        return;
      }
      
      enhanceButton.classList.add('is-loading');
      progressContainer.classList.remove('hidden');
      progressBar.value = 10;
      
      try {
        // Create an image element from the original data
        const img = new Image();
        img.src = originalImageData;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        progressBar.value = 20;
        
        // Create a canvas to work with the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        progressBar.value = 30;
        loadingText.textContent = 'Reducing noise...';
        
        // Apply combined enhancements:
        
        // 1. Noise reduction
        applyNoiseReduction(imageData);
        
        progressBar.value = 50;
        loadingText.textContent = 'Enhancing details...';
        
        // 2. Sharpening
        applySharpening(imageData);
        
        progressBar.value = 70;
        loadingText.textContent = 'Optimizing colors...';
        
        // 3. Contrast and brightness enhancement
        applyContrastAndBrightness(imageData);
        
        // 4. Vibrance enhancement
        applyVibrance(imageData);
        
        progressBar.value = 90;
        loadingText.textContent = 'Finalizing enhancements...';
        
        // Put the modified image data back on the canvas
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to image data URL
        enhancedImageData = canvas.toDataURL('image/jpeg', 0.92);
        enhancedImage.src = enhancedImageData;
        
        // Enable download
        downloadButton.onclick = () => {
          const link = document.createElement('a');
          link.download = 'enhanced-' + fileName;
          link.href = enhancedImageData;
          link.click();
        };
        
        progressBar.value = 100;
        
      } catch (error) {
        console.error('Error enhancing image:', error);
        alert('Failed to enhance the image: ' + error.message);
      } finally {
        enhanceButton.classList.remove('is-loading');
        setTimeout(() => {
          progressContainer.classList.add('hidden');
        }, 500);
      }
    });
    
    // Noise reduction function
    function applyNoiseReduction(imageData) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const tempData = new Uint8ClampedArray(data);
      
      // Apply a selective Gaussian-like blur that preserves edges
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          // Center pixel values
          const centerR = data[idx];
          const centerG = data[idx + 1];
          const centerB = data[idx + 2];
          
          let sumR = 0, sumG = 0, sumB = 0;
          let count = 0;
          
          // Sample neighboring pixels
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const nidx = ((y + ky) * width + (x + kx)) * 4;
              
              // Get neighboring pixel values
              const nR = data[nidx];
              const nG = data[nidx + 1];
              const nB = data[nidx + 2];
              
              // Calculate color difference
              const diff = Math.abs(centerR - nR) + Math.abs(centerG - nG) + Math.abs(centerB - nB);
              
              // Only include pixels that are similar (not across edges)
              if (diff < 100) {  // Threshold for edge detection
                sumR += nR;
                sumG += nG;
                sumB += nB;
                count++;
              }
            }
          }
          
          if (count > 0) {
            tempData[idx] = sumR / count;
            tempData[idx + 1] = sumG / count;
            tempData[idx + 2] = sumB / count;
          }
        }
      }
      
      // Copy back to original data
      for (let i = 0; i < data.length; i++) {
        data[i] = tempData[i];
      }
    }
    
    // Sharpening function using unsharp mask
    function applySharpening(imageData) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      
      // Create a blurred version for unsharp mask
      const blurredData = new Uint8ClampedArray(data);
      const tempImageData = new ImageData(blurredData, width, height);
      
      // Apply a simple box blur
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          
          let rSum = 0, gSum = 0, bSum = 0;
          
          // 3x3 kernel
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const nidx = ((y + ky) * width + (x + kx)) * 4;
              rSum += data[nidx];
              gSum += data[nidx + 1];
              bSum += data[nidx + 2];
            }
          }
          
          blurredData[idx] = rSum / 9;
          blurredData[idx + 1] = gSum / 9;
          blurredData[idx + 2] = bSum / 9;
        }
      }
      
      // Apply unsharp mask: original + amount * (original - blurred)
      const amount = 0.8; // Sharpening amount
      
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + amount * (data[i] - blurredData[i])));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + amount * (data[i+1] - blurredData[i+1])));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + amount * (data[i+2] - blurredData[i+2])));
      }
    }
    
    // Contrast and brightness enhancement
    function applyContrastAndBrightness(imageData) {
      const data = imageData.data;
      
      // Find average luminance
      let minLum = 255, maxLum = 0;
      let totalLuminance = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        // Calculate luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        
        minLum = Math.min(minLum, luminance);
        maxLum = Math.max(maxLum, luminance);
        totalLuminance += luminance;
      }
      
      const avgLuminance = totalLuminance / (data.length / 4);
      
      // Auto contrast adjustment
      const contrastFactor = 1.2;
      const brightnessFactor = 10; // Slight brightness boost
      
      // Adaptive contrast
      const range = maxLum - minLum;
      
      for (let i = 0; i < data.length; i += 4) {
        // Apply contrast
        data[i] = Math.min(255, Math.max(0, avgLuminance + contrastFactor * (data[i] - avgLuminance) + brightnessFactor));
        data[i+1] = Math.min(255, Math.max(0, avgLuminance + contrastFactor * (data[i+1] - avgLuminance) + brightnessFactor));
        data[i+2] = Math.min(255, Math.max(0, avgLuminance + contrastFactor * (data[i+2] - avgLuminance) + brightnessFactor));
      }
    }
    
    // Vibrance enhancement (increases saturation of less-saturated colors)
    function applyVibrance(imageData) {
      const data = imageData.data;
      const vibranceValue = 0.3; // Vibrance adjustment
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Calculate max and min RGB values
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        
        // Calculate current saturation level
        const saturation = (max === 0) ? 0 : (max - min) / max;
        
        // Calculate adjustment amount based on current saturation
        const adjustmentAmount = (1 - saturation) * vibranceValue;
        
        // Apply vibrance
        if (r !== max) {
          data[i] = r + (max - r) * adjustmentAmount;
        }
        if (g !== max) {
          data[i+1] = g + (max - g) * adjustmentAmount;
        }
        if (b !== max) {
          data[i+2] = b + (max - b) * adjustmentAmount;
        }
      }
    }
  });