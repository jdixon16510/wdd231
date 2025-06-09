// Combined Temple Script (temples + temple)

// Fetch and display temple data from temples.json
async function fetchTempleData() {
  try {
    const response = await fetch("data/temples.json");
    if (!response.ok) throw new Error("Temple data not found");

    const data = await response.json();
    showRandomTemple(data.temples);
  } catch (error) {
    console.error("Failed to fetch temple data:", error);
  }
}

// Display a random temple on the homepage
function showRandomTemple(temples) {
  const randomIndex = Math.floor(Math.random() * temples.length);
  const temple = temples[randomIndex];
  const container = document.querySelector(".temple-info");
  const history = document.querySelector(".temple-history");
  const hero = document.querySelector(".hero");

  if (container && history && hero) {
    container.innerHTML = `
      <h2>${temple.name}</h2>
      <p>${temple.address}</p>
    `;

    history.innerHTML = `<p>${temple.history}</p>`;

    hero.style.backgroundImage = `url(${temple.image})`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  }
}

// Temple page dropdown selection logic
document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("countrySelect");
  const stateSelect = document.getElementById("stateSelect");
  const citySelect = document.getElementById("citySelect");
  const templeSelect = document.getElementById("templeSelect");

  const details = document.querySelector(".temple-details");
  let templesData = [];

  fetch("data/temples.json")
    .then((response) => response.json())
    .then((data) => {
      templesData = data.temples;
      const countries = [...new Set(templesData.map((t) => t.country))];
      countrySelect.innerHTML = `<option value="">Select Country</option>` + countries.map((c) => `<option value="${c}">${c}</option>`).join("");
    });

  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    const states = [...new Set(templesData.filter((t) => t.country === selectedCountry).map((t) => t.state))];
    stateSelect.innerHTML = `<option value="">Select State</option>` + states.map((s) => `<option value="${s}">${s}</option>`).join("");
    citySelect.innerHTML = `<option value="">Select City</option>`;
    templeSelect.innerHTML = `<option value="">Select Temple</option>`;
    details.innerHTML = "";
  });

  stateSelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    const selectedState = stateSelect.value;
    const cities = [...new Set(templesData.filter((t) => t.country === selectedCountry && t.state === selectedState).map((t) => t.city))];
    citySelect.innerHTML = `<option value="">Select City</option>` + cities.map((c) => `<option value="${c}">${c}</option>`).join("");
    templeSelect.innerHTML = `<option value="">Select Temple</option>`;
    details.innerHTML = "";
  });

  citySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    const selectedState = stateSelect.value;
    const selectedCity = citySelect.value;
    const temples = templesData.filter((t) => t.country === selectedCountry && t.state === selectedState && t.city === selectedCity);
    templeSelect.innerHTML = `<option value="">Select Temple</option>` + temples.map((t) => `<option value="${t.name}">${t.name}</option>`).join("");
    details.innerHTML = "";
  });

  templeSelect.addEventListener("change", () => {
    const templeName = templeSelect.value;
    const temple = templesData.find((t) => t.name === templeName);

    if (temple) {
      details.innerHTML = `
        <h2>${temple.name}</h2>
        <p>${temple.address}</p>
        <p>${temple.history}</p>
        <img src="${temple.image}" alt="${temple.name} image" />
        <div class="quotes">
          <h3>Quotes</h3>
          <p>${temple.quote}</p>
        </div>
        <div class="links">
          <a href="${temple.website}" target="_blank">Official Website</a><br/>
          <a href="${temple.schedule}" target="_blank">Schedule</a>
        </div>
      `;
    } else {
      details.innerHTML = "";
    }
  });
});
