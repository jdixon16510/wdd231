// Footer year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
});

const templeSelect = document.getElementById("templeSelect");

let templeData = [];
let selectionStage = "country";
let currentCountry = "";
let currentState = "";
let currentCity = "";

// Load Temple Data
fetch('data/temples-web.xlsx')
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    templeData = XLSX.utils.sheet_to_json(sheet);
    loadOptions();
  })
  .catch(err => console.error("Error loading temple data:", err));

// Load options based on selection stage
function loadOptions() {
  templeSelect.innerHTML = '';

  let options = [];

  if (selectionStage === "country") {
    const countries = [...new Set(templeData.map(t => t.Country).filter(Boolean))].sort();
    options = countries;
    addOptions("Select Country", options);
  } else if (selectionStage === "state") {
    const states = [...new Set(templeData
      .filter(t => t.Country === currentCountry)
      .map(t => t.State || "")
      .filter(Boolean))].sort();

    if (states.length === 0) {
      selectionStage = "city";
      loadOptions();
      return;
    }

    options = states;
    addOptions("Select State", options);
  } else if (selectionStage === "city") {
    const cities = [...new Set(templeData
      .filter(t => t.Country === currentCountry && (t.State || "") === currentState)
      .map(t => t.City)
      .filter(Boolean))].sort();

    options = cities;
    addOptions("Select City", options);
  } else if (selectionStage === "temple") {
    const temples = templeData
      .filter(t => t.Country === currentCountry &&
        (t.State || "") === currentState &&
        t.City === currentCity)
      .map(t => t.Temple)
      .sort();

    options = temples;
    addOptions("Select Temple", options);
  }
}

// Add options to dropdown
function addOptions(label, items) {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = label;
  templeSelect.appendChild(placeholder);

  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    templeSelect.appendChild(option);
  });
}

// Handle selection change
templeSelect.addEventListener("change", () => {
  const value = templeSelect.value;

  if (!value) return;

  if (selectionStage === "country") {
    currentCountry = value;
    selectionStage = "state";
    loadOptions();
  } else if (selectionStage === "state") {
    currentState = value;
    selectionStage = "city";
    loadOptions();
  } else if (selectionStage === "city") {
    currentCity = value;
    selectionStage = "temple";
    loadOptions();
  } else if (selectionStage === "temple") {
    displayTemple(value);
  }
});

// Display Temple Info
function displayTemple(name) {
  const temple = templeData.find(t =>
    t.Country === currentCountry &&
    (t.State || "") === currentState &&
    t.City === currentCity &&
    t.Temple === name
  );

  if (!temple) return;

  document.getElementById("templeName").textContent = temple.Temple + " Temple";
  document.getElementById("templeImg").src = temple.ImageURL;
  document.getElementById("templeImg").alt = temple.Temple + " Temple";

  const addressLines = [];
  if (temple.Address) addressLines.push(temple.Address);
  let cityState = [];
  if (temple.City) cityState.push(temple.City);
  if (temple.State) cityState.push(temple.State);
  if (cityState.length > 0) addressLines.push(cityState.join(", "));
  if (temple.Country) addressLines.push(temple.Country);
  document.getElementById("templeAddress").innerHTML = addressLines.join("<br>");

  const historyHTML = `
    <h3>Temple Milestones</h3>
    <strong>Announced:</strong> ${formatDate(temple.Announced)}<br>
    <strong>Ground Breaking:</strong> ${formatDate(temple.GroundBreaking)}<br>
    <strong>Dedication:</strong> ${formatDate(temple.Dedication)}<br>
    <strong>Dedicated By:</strong> ${temple.BY || "N/A"}
  `;
  document.getElementById("templeHistory").innerHTML = historyHTML;

  // Extra data example
  const formattedSize = temple.Size
  ? `${Number(temple.Size).toLocaleString()} SqFt`
  : "N/A";

document.getElementById("templeAdditional").innerHTML = `
  <br>
  <strong>Size:</strong> ${formattedSize}<br>
  <strong>Ordinance Rooms:</strong> ${temple.Ordinance || "N/A"}
  <strong>Sealing Rooms:</strong> ${temple.Sealing || "N/A"}
  <strong>Baptistry Rooms:</strong> ${temple.Baptistry || "N/A"}
`;
}

// Date formatter
function formatDate(dateInput) {
  if (!dateInput) return "N/A";

  let date;
  if (typeof dateInput === "number") {
    const parsed = XLSX.SSF.parse_date_code(dateInput);
    date = new Date(parsed.y, parsed.m - 1, parsed.d);
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date)) return dateInput;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


document.querySelectorAll("#nav-menu a").forEach(link => {
   link.addEventListener("click", () => {
     navMenu.classList.remove("active");
     menuToggle.textContent = "☰";
   });
 });
 