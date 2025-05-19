// scripts/utils.mjs

export function getMembershipLevel(level) {
   switch (level) {
     case 1: return "Member";
     case 2: return "Silver";
     case 3: return "Gold";
     default: return "Unknown";
   }
 }
 
 export function getRandomItems(array, count) {
   const shuffled = [...array].sort(() => 0.5 - Math.random());
   return shuffled.slice(0, Math.min(count, array.length));
 }
 
 export function isMobile() {
   return window.innerWidth < 768;
 }
 
 export async function fetchMembers(path = "data/members.json") {
   try {
     const response = await fetch(path);
     if (!response.ok) throw new Error("Failed to load members.json");
     return await response.json();
   } catch (error) {
     console.error("Error fetching members:", error);
     return [];
   }
 }
 
 export function createMemberCard(member) {
   const badge = getMembershipLevel(member.membership);
   const badgeColor =
      badge === "Gold" ? "gold" :
      badge === "Silver" ? "silver" :
      badge === "Member" ? "gray" :
      "";

 
   const section = document.createElement("section");
   section.classList.add("card-wrapper");
   section.innerHTML = `
     ${badgeColor ? `<span class="badge ${badgeColor.toLowerCase()}">${badge}</span>` : ""}
     <img src="images/logos/${member.image}" alt="${member.name} logo" loading="lazy" width="80" height="auto" />
     <div class="card-content">
       <h3>${member.name}</h3>
       <p><strong>Email:</strong> ✉️ <a href="mailto:${member.email}">${member.email || "N/A"}</a></p>
       <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
       <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
     </div>
   `;
   return section;
 }
 
 