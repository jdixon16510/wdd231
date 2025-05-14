document.addEventListener("DOMContentLoaded", () => {
   const menuToggle = document.getElementById("menu-toggle");
   const navLinks = document.querySelector(".nav-links");
 
   menuToggle.addEventListener("click", () => {
     navLinks.classList.toggle("show");
     menuToggle.classList.toggle("open"); // For animation
   });
 });
 