// scripts/temple-cards.mjs
import { fetchTempleData, getTempleData, formatDate } from "./temple-utils.mjs";
import "./temples.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchTempleData();
  const allTemples = getTempleData().sort((a, b) =>
    a.Temple.localeCompare(b.Temple)
  );

  const searchInput      = document.getElementById("searchInput");
  const alphabetFilter   = document.getElementById("alphabetFilter");
  const cardsContainer   = document.getElementById("cardsContainer");

  
      // Build “All” + A–Z filter
   // — “All” button resets both search and letter filters
   const allBtn = document.createElement("button");
   allBtn.type = "button";
   allBtn.textContent = "All";
   allBtn.dataset.letter = "";
   allBtn.addEventListener("click", () => {
      // clear any active
      alphabetFilter.querySelectorAll("button.active").forEach(b => b.classList.remove("active"));
      allBtn.classList.add("active");
      searchInput.value = "";
      render();
   });
   alphabetFilter.appendChild(allBtn);
   // make “All” active by default
   allBtn.classList.add("active");
   // now add A–Z buttons
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.addEventListener("click", () => {
      alphabetFilter.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
    alphabetFilter.appendChild(btn);
  });

  // Search box
  searchInput.addEventListener("input", () => {
    // clear A–Z selection on manual search, re-activate “All”
    alphabetFilter.querySelectorAll("button.active").forEach(b => b.classList.remove("active"));
    alphabetFilter.querySelector("button[data-letter='']")?.classList.add("active");
    render();
  });

  function render() {
    const term = searchInput.value.trim().toLowerCase();
    const activeLetter = alphabetFilter.querySelector("button.active")?.dataset.letter;
    let filtered = allTemples;

    if (term) {
      filtered = filtered.filter(t => t.Temple.toLowerCase().includes(term));
    }
    if (activeLetter) {
      filtered = filtered.filter(t => t.Temple.charAt(0).toUpperCase() === activeLetter);
    }
    renderCards(filtered);
  }

  function renderCards(list) {
    cardsContainer.innerHTML = "";
    list.forEach(t => {
      const card = document.createElement("article");
      card.className = "temple-card";
      card.innerHTML = `
        <img src="${t.ImageURL}" alt="${t.Temple}" loading="lazy" />
        <div class="card-content">
          <h3>${t.Temple}</h3>
          <p>${[t.City, t.State, t.Country].filter(Boolean).join(", ")}</p>
          <p><strong>Number:</strong> ${t.Number}</p>
          <p><strong>Announced:</strong> ${formatDate(t.Announced)}</p>
          <p><strong>Dedication:</strong> ${formatDate(t.Dedication)} by ${t.BY}</p>
          <p><strong>Square Footage:</strong> ${Number(t.Size).toLocaleString()}</p>
          <p><strong>O:</strong> ${t.Ordinance} <strong>S:</strong> ${t.Sealing} <strong>B:</strong> ${t.Baptistry}</p>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  }    
  // initial render
  render();
});
