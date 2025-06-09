document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", (e) => {
    nav.classList.toggle("show");
    menuToggle.classList.toggle("open");
    // Accessibility toggle
    const expanded = menuToggle.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", expanded);
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    if (!isClickInsideNav && !isClickOnToggle) {
      nav.classList.remove("show");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", false);
    }
  });
});
