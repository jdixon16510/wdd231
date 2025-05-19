// scripts/utils.js

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
 