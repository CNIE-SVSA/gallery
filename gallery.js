// gallery.js

// Function to load gallery.json and render images dynamically
async function loadGallery() {
    try {
        const response = await fetch('gallery.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const galleryData = await response.json();

        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = '';

        // Render images with lazy loading support
        galleryData.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt || '';
            img.loading = 'lazy'; // Enable lazy loading
            galleryContainer.appendChild(img);
        });

    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Load the gallery once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadGallery);