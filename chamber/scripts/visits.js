document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'lastVisit';
  const msgEl = document.getElementById('visit-message');
  if (!msgEl) return;  // nothing to do if placeholder missing

  const now     = Date.now();
  const stored = localStorage.getItem(KEY);
  let message;

  if (!stored) {
    // First ever visit
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const prev     = parseInt(stored, 10);
    const deltaMs  = now - prev;
    const deltaDay = Math.floor(deltaMs / (1000 * 60 * 60 * 24));

    if (deltaMs < 1000 * 60 * 60 * 24) {
      // less than one day
      message = 'Back so soon! Awesome!';
    } else {
      // one day or more
      const dayWord = deltaDay === 1 ? 'day' : 'days';
      message = `You last visited ${deltaDay} ${dayWord} ago.`;
    }
  }

  // Insert the message
  msgEl.textContent = message;

  // Store today for next time
  localStorage.setItem(KEY, now.toString());
});
