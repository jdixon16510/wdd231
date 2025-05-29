document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');

  // 1) Create a modal container and append to body
  const modal = document.createElement('div');
  modal.id = 'discover-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <h2 id="modal-title"></h2>
      <p id="modal-desc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // 2) Fetch JSON and build cards (without description <p>)
  fetch('data/discover.json')
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(items => {
      items.forEach(item => {
        const card = document.createElement('section');
        card.className = 'card';

        // Title
        const h2 = document.createElement('h2');
        h2.textContent = item.title;
        card.appendChild(h2);

        // Image
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.src = item.image;
        img.alt = item.title;
        fig.appendChild(img);
        card.appendChild(fig);

        // Address
        const addr = document.createElement('address');
        addr.textContent = item.address;
        card.appendChild(addr);

        // Learn More button
        const btn = document.createElement('button');
        btn.textContent = 'Learn More';
        btn.addEventListener('click', () => {
          document.getElementById('modal-title').textContent = item.title;
          document.getElementById('modal-desc').textContent  = item.description;
          modal.classList.add('active');
        });
        card.appendChild(btn);

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Could not load discover.json:', err);
      gallery.textContent = 'Sorry, we couldn’t load the discovery cards right now.';
    });

  // 3) Close modal when clicking the “×” or backdrop
  document.body.addEventListener('click', e => {
    if (e.target.matches('.modal-close') || e.target.matches('.modal-backdrop')) {
      modal.classList.remove('active');
    }
  });
});
