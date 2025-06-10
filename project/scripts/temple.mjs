import {
  fetchTempleData,
  getTempleData,
  getUnique,
  populateSelect,
  clearSelect,
  formatDate
} from './temple-utils.mjs';

let templeData = [];

document.addEventListener("DOMContentLoaded", async () => {
  templeData = await loadTempleData();

  const countrySelect = document.getElementById("countrySelect");
  const stateSelect = document.getElementById("stateSelect");
  const citySelect = document.getElementById("citySelect");
  const templeSelect = document.getElementById("templeSelect");
  const stateGroup = document.getElementById("stateGroup");

  // Load countries into select
  populateSelect("countrySelect", getUnique("Country", templeData), "Select Country");

  // COUNTRY change
  countrySelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const stateList = getUnique("State", templeData, { Country: country });

    clearSelect("stateSelect");
    clearSelect("citySelect");
    clearSelect("templeSelect");

    if (stateList.length > 0 && stateList.some(s => s.trim() !== "")) {
      populateSelect("stateSelect", stateList, "Select State");
      stateGroup.style.display = "block";
      citySelect.style.display = "inline-block";
    } else {
      stateGroup.style.display = "none";
      clearSelect("stateSelect");
      showCities(country); // ✅ use helper to show cities without state
    }
  });

  // STATE change
  stateSelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const state = stateSelect.value;

    clearSelect("citySelect");
    clearSelect("templeSelect");

    showCities(country, state); // ✅ use helper to show cities with state
  });

  // CITY change
  citySelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const city = citySelect.value;
    const state = (stateGroup.style.display === "none") ? "" : stateSelect.value;

    clearSelect("templeSelect");

    const temples = getUnique("Temple", templeData, { Country: country, State: state, City: city });
    populateSelect("templeSelect", temples, "Select Temple");
  });

  // TEMPLE change
  templeSelect.addEventListener("change", () => {
    const selectedTemple = templeSelect.value;
    const temple = templeData.find(t => t.Temple === selectedTemple);
    if (temple) {
      displayTempleDetails(temple);
    }
  });
});

// ✅ Utility to populate city list with or without state
function showCities(country, state = "") {
  const filters = { Country: country };
  if (state) filters.State = state;

  const cityList = getUnique("City", templeData, filters);
  clearSelect("citySelect");
  populateSelect("citySelect", cityList, "Select City");
  citySelect.style.display = "inline-block";
}

// ✅ Display selected temple details
function displayTempleDetails(temple) {
  const name = temple.Temple || "Temple Name";
  const addressLines = [];

  if (temple.Address) addressLines.push(temple.Address);
  const cityState = [];
  if (temple.City) cityState.push(temple.City);
  if (temple.State) cityState.push(temple.State);
  if (cityState.length > 0) addressLines.push(cityState.join(", "));
  if (temple.Country) addressLines.push(temple.Country);

  document.getElementById("templeName").textContent = name;
  document.getElementById("templeImg").src = temple.ImageURL || "images/temples/christus.webp";
  document.getElementById("templeAddress").innerHTML = addressLines.join("<br>");

  const historyHTML = `
    <h3>Temple Milestones</h3>
    <strong>Announced:</strong> ${formatDate(temple.Announced)}<br>
    <strong>Ground Breaking:</strong> ${formatDate(temple.GroundBreaking)}<br>
    <strong>Dedication:</strong> ${formatDate(temple.Dedication)}<br>
    <strong>Dedicated By:</strong> ${temple.BY || "N/A"}
  `;
  document.getElementById("templeHistory").innerHTML = historyHTML;

  document.getElementById("templeAdditional").textContent = temple.Notes || "";
}