document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');

  fetch('data/discover.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(items => {
      items.forEach(item => {
        // <section class="card">
        const card = document.createElement('section');
        card.classList.add('card');

        //   <h2>…</h2>
        const h2 = document.createElement('h2');
        h2.textContent = item.title;
        card.appendChild(h2);

        //   <figure><img …></figure>
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        fig.appendChild(img);
        card.appendChild(fig);

        //   <address>…</address>
        const addr = document.createElement('address');
        addr.textContent = item.address;
        card.appendChild(addr);

        //   <p>…</p>
        const desc = document.createElement('p');
        desc.textContent = item.description;
        card.appendChild(desc);

        //   <button>Learn More</button>
        const btn = document.createElement('button');
        btn.textContent = 'Learn More';
        card.appendChild(btn);

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Could not load discover.json:', err);
      gallery.textContent = 'Sorry, we\'re unable to load the discovery cards right now.';
    });
});
// Add a click event listener to the gallery
  gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const card = e.target.closest('.card');
      const title = card.querySelector('h2').textContent;
      alert(`You clicked on: ${title}`);
    }
  });