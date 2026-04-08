document.addEventListener('DOMContentLoaded', () => {
    fetch('gallery.json')
        .then(response => response.json())
        .then(data => renderGallery(data.images))
        .catch(error => console.error('Error loading gallery:', error));
});

function renderGallery(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const imageUrl = `https://raw.githubusercontent.com/cnie-int/gallery/main/images/${image.filename}`;
        item.innerHTML = `
            <img src="${imageUrl}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${image.title}</div>
                <div class="gallery-item-description">${image.description}</div>
                <a href="${imageUrl}" target="_blank" class="gallery-item-link">View Full Size</a>
                <div class="gallery-item-date">📅 ${image.uploadDate}</div>
            </div>
        `;
        gallery.appendChild(item);
    });
}
