// Footer year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

let templeData = [];

window.addEventListener("load", () => {
  fetchTempleData();
});

// Fetch Excel data
function fetchTempleData() {
  fetch('data/temples-web.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      templeData = XLSX.utils.sheet_to_json(sheet);
      showRandomTemple();
    })
    .catch(err => console.error("Error loading Excel file:", err));
}

// Hamburger toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
});

// Auto-close menu when clicking a link
document.addEventListener("click", (e) => {
  if (e.target.closest("#nav-menu a")) {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  }
});

// Format date
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

// Show random temple data
function showRandomTemple() {
  const randomIndex = Math.floor(Math.random() * templeData.length);
  const temple = templeData[randomIndex];

  // Temple name
  let name = temple.Temple;
  if (name && !name.toLowerCase().includes("temple")) {
    name += " Temple";
  }
  document.getElementById("templeName").textContent = name || "Temple Name";

  // Address formatted in 3 lines
  const addressLines = [];
  if (temple.Address) addressLines.push(temple.Address);

  let cityState = [];
  if (temple.City) cityState.push(temple.City);
  if (temple.State) cityState.push(temple.State);
  if (cityState.length > 0) addressLines.push(cityState.join(", "));

  if (temple.Country) addressLines.push(temple.Country);

  document.getElementById("templeAddress").innerHTML = addressLines.join("<br>");

  // Image
  document.getElementById("heroImg").src = temple.ImageURL;

  // History section
  const historyHTML = `
  <h3>Temple Milestones</h3>
  <strong>Announced:</strong> ${formatDate(temple.Announced)}<br>
  <strong>Ground Breaking:</strong> ${formatDate(temple.GroundBreaking)}<br>
  <strong>Dedication:</strong> ${formatDate(temple.Dedication)}<br>
  <strong>Dedicated By:</strong> ${temple.BY || "N/A"}
  `;
  document.getElementById("templeHistory").innerHTML = historyHTML;
}
