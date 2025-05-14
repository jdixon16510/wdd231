async function fetchMembers() {
   const response = await fetch("data/members.json");
   const data = await response.json();
   displayMembers(data);
 }
 
 function displayMembers(members) {
   const container = document.getElementById("directory");
   container.innerHTML = "";
 
   members.forEach((member) => {
     const card = document.createElement("section");
     card.innerHTML = `
         <img src="images/${member.image}" alt="${member.name} logo">
         <div class="card-content">
            <h3>${member.name}</h3>
            <p><strong>Email:</strong> ${member.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
         </div>
      `;
     container.appendChild(card);
   });
 }
 
 document.getElementById("grid").addEventListener("click", () => {
   document.getElementById("directory").classList.add("grid");
   document.getElementById("directory").classList.remove("list");
 });
 
 document.getElementById("list").addEventListener("click", () => {
   document.getElementById("directory").classList.add("list");
   document.getElementById("directory").classList.remove("grid");
 });
 
 fetchMembers();
 