
const attendanceForm = document.getElementById("attendanceForm");
const attendanceList = document.getElementById("attendanceList");
const searchForm = document.getElementById("searchForm");
const searchNameSelect = document.getElementById("searchName");

let templeData = [];
let statesMap = {};
let citiesMap = {};

// Load Temple Data
fetch('data/temples-web.xlsx')
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    templeData = XLSX.utils.sheet_to_json(sheet);
    buildDropdowns();
  })
  .catch(err => console.error("Error loading temple data:", err));

// Populate Country dropdown
function buildDropdowns() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");
  const templeSelect = document.getElementById("temple");

  const countries = new Set();
  statesMap = {};
  citiesMap = {};

  templeData.forEach(row => {
    const country = row.Country?.trim();
    const state = (row.State || "").trim();
    const city = row.City?.trim();
    const temple = row.Temple?.trim();

    if (country) countries.add(country);

    if (!statesMap[country]) statesMap[country] = new Set();
    if (state) statesMap[country].add(state);

    const key = `${country}|${state}`;
    if (!citiesMap[key]) citiesMap[key] = new Set();
    if (city) citiesMap[key].add(city);
  });

  Array.from(countries).sort().forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  countrySelect.addEventListener("change", () => {
    const country = countrySelect.value;
    stateSelect.innerHTML = `<option value="">Select State</option>`;
    citySelect.innerHTML = `<option value="">Select City</option>`;
    templeSelect.innerHTML = `<option value="">Select Temple</option>`;

    if (statesMap[country] && statesMap[country].size > 0) {
      stateSelect.disabled = false;
      Array.from(statesMap[country]).sort().forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
      });
    } else {
      stateSelect.disabled = true;
      loadCities(country, "");
    }
  });

  stateSelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const state = stateSelect.value;
    citySelect.innerHTML = `<option value="">Select City</option>`;
    templeSelect.innerHTML = `<option value="">Select Temple</option>`;
    loadCities(country, state);
  });

  citySelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const state = stateSelect.value;
    const city = citySelect.value;
    templeSelect.innerHTML = `<option value="">Select Temple</option>`;

    const filtered = templeData.filter(t =>
      t.Country === country &&
      (t.State || "") === state &&
      t.City === city
    );

    filtered
      .sort((a, b) => a.Temple.localeCompare(b.Temple))
      .forEach(t => {
        const option = document.createElement("option");
        option.value = t.Temple;
        option.textContent = t.Temple;
        templeSelect.appendChild(option);
      });
  });
}

function loadCities(country, state) {
  const citySelect = document.getElementById("city");
  const templeSelect = document.getElementById("temple");
  citySelect.innerHTML = `<option value="">Select City</option>`;
  templeSelect.innerHTML = `<option value="">Select Temple</option>`;

  const key = `${country}|${state}`;
  if (citiesMap[key]) {
    citySelect.disabled = false;
    Array.from(citiesMap[key]).sort().forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } else {
    citySelect.disabled = true;
  }
}

// Attendance Form Submit
attendanceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("personName").value.trim();
  const temple = document.getElementById("temple").value;
  const date = document.getElementById("date").value;

  if (!name || !temple || !date) return;

  const records = JSON.parse(localStorage.getItem(name)) || [];
  records.push({ temple, date });
  localStorage.setItem(name, JSON.stringify(records));

  attendanceForm.reset();
  loadAttendance(name);
  loadNameOptions(); // Update name dropdown
});

// Load attendance history
function loadAttendance(name) {
  attendanceList.innerHTML = '';

  const records = JSON.parse(localStorage.getItem(name));
  if (!records || records.length === 0) {
    const li = document.createElement("li");
    li.textContent = `No attendance records found for ${name}.`;
    attendanceList.appendChild(li);
    return;
  }

  const header = document.createElement("li");
  header.innerHTML = `<strong>${name}'s Attendance:</strong>`;
  attendanceList.appendChild(header);

  records
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort latest first
  .forEach(record => {
    const li = document.createElement("li");
    const formattedDate = new Date(record.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    li.textContent = `${formattedDate}, ${record.temple} Temple`;
    attendanceList.appendChild(li);
  });

}

// Load name options for search dropdown
function loadNameOptions() {
   searchNameSelect.innerHTML = `<option value="">Select a person</option>`;
 
   for (let i = 0; i < localStorage.length; i++) {
     const key = localStorage.key(i);
     try {
       const records = JSON.parse(localStorage.getItem(key));
       if (Array.isArray(records)) { // Only attendance records
         const option = document.createElement("option");
         option.value = key;
         option.textContent = key;
         searchNameSelect.appendChild(option);
       }
     } catch (e) {
       // Skip non-attendance keys
     }
   }
 }
 

// Search form handling
searchNameSelect.addEventListener("change", () => {
   const name = searchNameSelect.value.trim();
   attendanceList.innerHTML = '';
 
   if (name) {
     loadAttendance(name);
   }
 });
 

// Load name options on page load
window.addEventListener("load", () => {
  loadNameOptions();
});

document.querySelectorAll("#nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

