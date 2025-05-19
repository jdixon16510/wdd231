// scripts/spotlight.mjs
import { getMembershipLevel, getRandomItems, fetchMembers, createMemberCard } from './utils.mjs';

const spotlightContainer = document.querySelector(".spotlight-grid");

async function loadSpotlights() {
  const members = await fetchMembers();
  const spotlightMembers = members.filter(m => m.membership === 2 || m.membership === 3);
  const displayCount = window.innerWidth < 768 ? 2 : 3;
  const selected = getRandomItems(spotlightMembers, displayCount);

  selected.forEach(member => {
    const card = createMemberCard(member);
    spotlightContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadSpotlights);
