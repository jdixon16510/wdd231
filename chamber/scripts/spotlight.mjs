// scripts/spotlight.js
import { getMembershipLevel, getRandomItems, fetchMembers } from './utils.mjs';

const spotlightContainer = document.querySelector(".spotlight-grid");

async function loadSpotlights() {
  const members = await fetchMembers();
  const spotlightMembers = members.filter(m => m.membership === 2 || m.membership === 3);
  const displayCount = window.innerWidth < 768 ? 2 : 3;
  const selected = getRandomItems(spotlightMembers, displayCount);

  selected.forEach(member => {
    const card = document.createElement("article");
    card.innerHTML = `
      <div class="card-header">
        <h3>${member.name}</h3>
        <p class="tagline">${member.industry || ''}</p>
        <hr>
      </div>
      <div class="card-body">
        <img src="images/logos/${member.image}" alt="${member.name} logo" loading="lazy" />
        <div class="card-details">
          ${member.email ? `<p><strong>Email:</strong> ${member.email}</p>` : ""}
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
        </div>
      </div>`;
    spotlightContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadSpotlights);
