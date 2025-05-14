const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const directoryContainer = document.getElementById("directory");

// Mobile screen check
const isMobile = () => window.innerWidth < 768;

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Always start with grid view
    renderGridView(members);
    gridButton.classList.add("active");

    // Grid button always available
    gridButton.addEventListener("click", () => {
      renderGridView(members);
      gridButton.classList.add("active");
      listButton.classList.remove("active");
    });

    // List button only works if screen is NOT mobile
    listButton.addEventListener("click", () => {
      if (!isMobile()) {
        renderTableView(members);
        listButton.classList.add("active");
        gridButton.classList.remove("active");
      }
    });
  } catch (error) {
    console.error("Failed to fetch members.json", error);
  }
}

function renderGridView(members) {
  directoryContainer.innerHTML = "";
  directoryContainer.className = "cards grid";

  members.forEach((member) => {
    const section = document.createElement("section");
    section.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <div class="card-content">
        <h3>${member.name}</h3>
        <p><strong>Email:</strong> ${member.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
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
          <th>Logo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        ${members
          .map(
            (member) => `
          <tr>
            <td><img src="images/${member.image}" alt="${member.name} logo" /></td>
            <td><strong>${member.name}</strong></td>
            <td>${member.email || "N/A"}</td>
            <td>${member.phone}</td>
            <td><a href="${member.website}" target="_blank">${member.website}</a></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

fetchMembers();
