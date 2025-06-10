import {
  fetchTempleData,
  getTempleData,
  formatDate,
  getUnique,
  populateSelect,
  clearSelect
} from "./temple-utils.mjs";

async function showRandomTemple() {
  await fetchTempleData();
  const templeData = getTempleData();

  if (!templeData.length) {
    console.warn("No temple data loaded");
    return;
  }

  const randomIndex = Math.floor(Math.random() * templeData.length);
  const temple = templeData[randomIndex];

  let name = temple.Temple;
  if (name && !name.toLowerCase().includes("temple")) {
    name += " Temple";
  }
  document.getElementById("templeName").textContent = name || "Temple Name";

  const addressLines = [];
  if (temple.Address) addressLines.push(temple.Address);
  const cityState = [];
  if (temple.City) cityState.push(temple.City);
  if (temple.State) cityState.push(temple.State);
  if (cityState.length > 0) addressLines.push(cityState.join(", "));
  if (temple.Country) addressLines.push(temple.Country);
  document.getElementById("templeAddress").innerHTML = addressLines.join("<br>");

  const heroImg = document.getElementById("heroImg");
  if (heroImg) {
    heroImg.src = temple.ImageURL;
    heroImg.alt = name;
  }

  const historyHTML = `
    <h3>Temple Milestones</h3>
    <strong>Announced:</strong> ${formatDate(temple.Announced)}<br>
    <strong>Ground Breaking:</strong> ${formatDate(temple.GroundBreaking)}<br>
    <strong>Dedication:</strong> ${formatDate(temple.Dedication)}<br>
    <strong>Dedicated By:</strong> ${temple.BY || "N/A"}
  `;
  document.getElementById("templeHistory").innerHTML = historyHTML;
}

window.addEventListener("DOMContentLoaded", async () => {
  await showRandomTemple();

  const templeData = getTempleData();
  populateSelect("countrySelect", getUnique("Country", templeData));

  document.getElementById("countrySelect").addEventListener("change", (e) => {
    const country = e.target.value;
    const states = getUnique("State", templeData, { Country: country });
    const cities = getUnique("City", templeData, { Country: country });

    populateSelect("stateSelect", states);
    populateSelect("citySelect", cities);
    clearSelect("templeSelect");
  });

  document.getElementById("stateSelect").addEventListener("change", () => {
    const country = document.getElementById("countrySelect").value;
    const state = document.getElementById("stateSelect").value;
    const cities = getUnique("City", templeData, { Country: country, State: state });
    populateSelect("citySelect", cities);
    clearSelect("templeSelect");
  });

  document.getElementById("citySelect").addEventListener("change", () => {
    const country = document.getElementById("countrySelect").value;
    const state = document.getElementById("stateSelect").value;
    const city = document.getElementById("citySelect").value;

    const filters = { Country: country, City: city };
    if (state) filters.State = state;

    const temples = getUnique("Temple", templeData, filters);
    populateSelect("templeSelect", temples);
  });

  // Modal events
  const ctaBtn = document.getElementById("openVisitModal");
  const modal = document.getElementById("visitModal");
  const closeModal = document.getElementById("closeModal");
  const form = document.getElementById("visitForm");

   // ** ACK DIALOG ELEMENTS **
  const ackDialog  = document.getElementById('ackDialog');
  const ackContent = document.getElementById('ackContent');
  const ackOk      = document.getElementById('ackOk');

  ctaBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const temple = document.getElementById("templeSelect").value.trim();
    const type = document.getElementById("visitType").value;
    const date = document.getElementById("visitDate").value;

    const entry = { temple, type, date };
    const visitLog = JSON.parse(localStorage.getItem("templeVisits")) || {};

    if (!visitLog[name]) visitLog[name] = [];
    visitLog[name].push(entry);

    localStorage.setItem("templeVisits", JSON.stringify(visitLog));
    form.reset();
    modal.classList.add("hidden");
    
    // —— ACK DIALOG —— 
    ackContent.textContent =
      `Name: ${name}
Date: ${date}
Temple: ${temple}
Type: ${type}`;
    ackDialog.showModal();
    ackOk.onclick = () => ackDialog.close();
  });
});
