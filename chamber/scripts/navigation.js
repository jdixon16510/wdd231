document.addEventListener("DOMContentLoaded", () => {
   const menuToggle = document.getElementById("menu-toggle");
   const navLinks = document.querySelector("nav");
 
   // Toggle the menu on button click
   menuToggle.addEventListener("click", (e) => {
     navLinks.classList.toggle("show");
     menuToggle.classList.toggle("open");
     e.stopPropagation(); // Prevent document click from closing it immediately
   });
 
   // Close the menu when clicking outside of nav and toggle button
   document.addEventListener("click", (e) => {
     const isClickInsideNav = navLinks.contains(e.target);
     const isClickOnToggle = menuToggle.contains(e.target);
 
     if (!isClickInsideNav && !isClickOnToggle) {
       navLinks.classList.remove("show");
       menuToggle.classList.remove("open");
     }
   });
 });
 