// scripts/directory.js
import { getMembershipLevel, isMobile, fetchMembers } from './utils.mjs';

const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const directoryContainer = document.getElementById("directory");

async function initDirectory() {
  const members = await fetchMembers();

  renderGridView(members);
  gridButton.classList.add("active");

  gridButton.addEventListener("click", () => {
    renderGridView(members);
    gridButton.classList.add("active");
    listButton.classList.remove("active");
  });

  listButton.addEventListener("click", () => {
    if (!isMobile()) {
      renderTableView(members);
      listButton.classList.add("active");
      gridButton.classList.remove("active");
    }
  });
}

function renderGridView(members) {
  directoryContainer.innerHTML = "";
  directoryContainer.className = "cards grid";

  members.forEach((member) => {
    const section = document.createElement("section");
    section.innerHTML = `
      <img src="images/logos/${member.image}" alt="${member.name} logo" loading="lazy" width="80" height="auto" />
      <div class="card-content">
        <h3>${member.name}</h3>
        <p><strong>Email:</strong> ✉️ <a href="mailto:${member.email}">${member.email || "N/A"}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
      </div>
    `;
    directoryContainer.appendChild(section);
  });
}

function renderTableView(members) {
  directoryContainer.className = "";
  directoryContainer.innerHTML = `
    <table class="directory-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Web Site</th>
          <th>Membership</th>
        </tr>
      </thead>
      <tbody>
        ${members
          .map(member => `
            <tr>
              <td><strong>${member.name}</strong></td>
              <td>✉️ <a href="mailto:${member.email}">${member.email || "N/A"}</a></td>
              <td>${member.phone ? `<a href="tel:${member.phone}">${member.phone}</a>` : "N/A"}</td>
              <td><a href="${member.website}" target="_blank">${member.website}</a></td>
              <td>${getMembershipLevel(member.membership)}</td>
            </tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

initDirectory();
