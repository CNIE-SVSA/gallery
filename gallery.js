/* =========================================================
   Gallery · CNIE — gallery.js
   ========================================================= */

const BASE_URL = 'https://raw.githubusercontent.com/cnie-int/gallery/main/images/';

let allImages = [];
let activeTag = null;

/* ── Bootstrap ── */
document.addEventListener('DOMContentLoaded', () => {
  fetch('gallery.json')
    .then(r => r.json())
    .then(data => {
      allImages = data.images;
      buildTagCloud(allImages);
      renderGallery(allImages);
    })
    .catch(err => {
      document.getElementById('gallery').innerHTML =
        '<p class="error">Erro ao carregar galeria. Verifique o arquivo gallery.json.</p>';
      console.error(err);
    });

  buildLightbox();
});

/* ── Tag cloud ── */
function buildTagCloud(images) {
  const tagSet = new Set();
  images.forEach(img => (img.tags || []).forEach(t => tagSet.add(t)));
  if (!tagSet.size) return;

  const container = document.getElementById('tag-cloud');
  container.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = 'tag-btn active';
  allBtn.textContent = 'Todas';
  allBtn.addEventListener('click', () => {
    activeTag = null;
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    renderGallery(allImages);
  });
  container.appendChild(allBtn);

  tagSet.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      activeTag = tag;
      document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(allImages.filter(img => (img.tags || []).includes(tag)));
    });
    container.appendChild(btn);
  });
}

/* ── Gallery render ── */
function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (!images.length) {
    gallery.innerHTML = '<p class="empty">Nenhuma imagem encontrada.</p>';
    return;
  }

  images.forEach((image, i) => {
    const url = image.url || (BASE_URL + image.filename);
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = `${i * 60}ms`;

    const tags = (image.tags || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    item.innerHTML = `
      <div class="img-wrap" data-url="${url}" data-title="${image.title}">
        <img src="${url}" alt="${image.title}" loading="lazy">
        <div class="img-overlay">
          <span class="zoom-icon">&#x2B2C;</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${image.title}</div>
        ${image.description ? `<div class="card-desc">${image.description}</div>` : ''}
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
        <div class="card-actions">
          <a href="${url}" target="_blank" rel="noopener" class="btn btn-view">↗ Abrir</a>
          <button class="btn btn-copy" data-copy="${url}">⎘ Copiar link</button>
        </div>
        <div class="card-date">${formatDate(image.uploadDate)}</div>
      </div>
    `;

    /* Lightbox trigger */
    item.querySelector('.img-wrap').addEventListener('click', () => openLightbox(url, image.title));

    /* Copy link */
    item.querySelector('.btn-copy').addEventListener('click', e => {
      const btn = e.currentTarget;
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.textContent = '✓ Copiado!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = '⎘ Copiar link'; btn.classList.remove('copied'); }, 2000);
      });
    });

    gallery.appendChild(item);
  });
}

/* ── Lightbox ── */
function buildLightbox() {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <button class="lb-close" aria-label="Fechar">&times;</button>
      <img class="lb-img" src="" alt="">
      <div class="lb-caption"></div>
    </div>
  `;
  document.body.appendChild(lb);

  lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(url, title) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('.lb-img').src = url;
  lb.querySelector('.lb-caption').textContent = title;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lb.querySelector('.lb-img').src = ''; }, 300);
}

/* ── Helpers ── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}
