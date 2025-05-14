document.addEventListener("DOMContentLoaded", () => {
   const yearElement = document.getElementById("year");
   const modifiedElement = document.getElementById("lastModified");
 
   if (yearElement) {
     yearElement.textContent = new Date().getFullYear();
   }
 
   if (modifiedElement) {
     modifiedElement.textContent = "Last Updated: " + document.lastModified;
   }
 });
 