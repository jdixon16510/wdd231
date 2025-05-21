document.addEventListener("DOMContentLoaded", () => {
  const modalLinks = document.querySelectorAll('a[href^="#"][href*="-modal"]');
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  function openModal(modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeModal(modal) {
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll
  }

  modalLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modal = document.querySelector(link.getAttribute("href"));
      if (modal) {
        openModal(modal);
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modals.forEach(modal => {
        if (modal.classList.contains("show")) {
          closeModal(modal);
        }
      });
    }
  });
});
