// scripts/attendance.mjs
import {
  fetchTempleData,
  getTempleData,
  formatDate
} from "./temple-utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Load temple master list
  await fetchTempleData();
  const allTemples = getTempleData();

  // 2) Grab UI elements
  const form           = document.getElementById("filterForm");
  const select         = document.getElementById("filterName");
  const container      = document.getElementById("recordsContainer");
  const detailsDiv     = document.getElementById("templeDetails");
  const imgEl          = document.getElementById("detailImage");
  const detailsContent = detailsDiv.querySelector(".details-content");
  
  // 3) Populate the name dropdown from localStorage
  const visitLog = JSON.parse(localStorage.getItem("templeVisits")) || {};
  Object.keys(visitLog).forEach(name => {
    const opt = document.createElement("option");
    opt.value       = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  
  //On form submit, render the visit table
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name    = select.value;
    const entries = (visitLog[name] || []).slice();

    // clear previous results
    container.innerHTML      = "";
    detailsContent.innerHTML = "";
    detailsDiv.classList.add("hidden");

    if (!name || entries.length === 0) {
      container.innerHTML = `<p>No records found for “${name || ""}”.</p>`;
      return;
    }

    // sort entries by date ascending
    entries.sort((a, b) => new Date(a.date) - new Date(b.date));

    // build and inject the table
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Date</th>
          <th>Temple</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        ${entries.map(rec => `
          <tr>
            <td>${rec.date}</td>
            <td>
              <button
                class="temple-link"
                type="button"
                data-temple-name="${rec.temple}"
              >${rec.temple}</button>
            </td>
            <td>${rec.type}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
    container.appendChild(table);
  });

  // 6) Delegate clicks on temple names to show details
  container.addEventListener("click", e => {
    const btn = e.target.closest(".temple-link");
    if (!btn) return;

    const name   = btn.dataset.templeName;
    const temple = allTemples.find(t => t.Temple === name);
    if (!temple) {
      console.error(`No temple record matched "${name}"`);
      return;
    }

      imgEl.src = `${temple.ImageURL}`;
      imgEl.alt = temple.Temple;

    // populate details panel
    detailsContent.innerHTML = `
      <h3>${temple.Temple}</h3>      
      <div>
        <p><strong>Location:</strong>
          ${temple.City}, ${temple.State || temple.Country}
        </p>
        <p><strong>Dedicated:</strong>
          ${formatDate(temple.Dedication)}
        </p>
        <p><strong>Dedicated By:</strong>
         ${temple.BY}
         </p>
      </div>
    `;
    detailsDiv.classList.remove("hidden");
  });
});