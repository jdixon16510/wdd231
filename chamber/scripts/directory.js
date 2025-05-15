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

function getMembershipLevel(level) {
   switch (level) {
     case 1:
       return "Member";
     case 2:
       return "Silver";
     case 3:
       return "Gold";
     default:
       return "Unknown";
   }
 }
 

function renderGridView(members) {
  directoryContainer.innerHTML = "";
  directoryContainer.className = "cards grid";

  members.forEach((member) => {
    const section = document.createElement("section");
    section.innerHTML = `
      <img src="images/logos/${member.image}" alt="${member.name} logo" width="100" height="auto" />
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
          <th></th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Web Site</th>
          <th>Membership</th>
        </tr>
      </thead>
      <tbody>
        ${members
          .map(
            (member) => `
          <tr>
            <td><img src="images//logos/${member.image}" alt="${member.name} logo" width="100" height="auto" /></td>
            <td><strong>${member.name}</strong></td>
            <td>✉️ <a href="mailto:${member.email}">${member.email || "N/A"}</a></td>                        
            <td>${member.phone ? `<a href="tel:${member.phone}">${member.phone}</a>` : "N/A"}</td>
            <td><a href="${member.website}" target="_blank">${member.website}</a></td>
            <td>${getMembershipLevel(member.membership)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

fetchMembers();
