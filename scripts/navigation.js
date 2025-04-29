const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.add('open');
  menuButton.hidden = true;
  closeButton.hidden = false;
});

closeButton.addEventListener('click', () => {
  navLinks.classList.remove('open');
  closeButton.hidden = true;
  menuButton.hidden = false;
});

// Bonus: If screen resizes bigger, auto reset
window.addEventListener('resize', () => {
   if (window.innerWidth >= 768) {
     navLinks.classList.remove('open');
     menuButton.hidden = true;
     closeButton.hidden = true;
   } else {
     // Below 768px — check if nav is open
     if (navLinks.classList.contains('open')) {
       menuButton.hidden = true;
       closeButton.hidden = false;
     } else {
       menuButton.hidden = false;
       closeButton.hidden = true;
     }
   }
 });
 
