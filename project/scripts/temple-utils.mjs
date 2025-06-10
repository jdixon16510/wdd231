// temple-utils.mjs
let _templeData = [];

export function getTempleData() {
  return _templeData;
}

export async function fetchTempleData(url = 'data/temples-web.xlsx') {
  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    _templeData = XLSX.utils.sheet_to_json(sheet);
    return _templeData;
  } catch (err) {
    console.error("Error loading Excel file:", err);
    return [];
  }
}

export function formatDate(dateInput) {
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

export function getUnique(field, data, filters = {}) {
  return [...new Set(data
    .filter(t => Object.keys(filters).every(k => (t[k] || "") === filters[k]))
    .map(t => t[field])
    .filter(Boolean))].sort();
}

export function populateSelect(selectId, items, placeholderLabel = null) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.textContent = placeholderLabel || `Select ${selectId}`;
  placeholder.value = "";
  select.appendChild(placeholder);
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
}

export function clearSelect(selectId) {
  const select = document.getElementById(selectId);
  if (select) {
    select.innerHTML = "";
  }
}
