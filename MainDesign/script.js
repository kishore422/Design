// Fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Enable "Enter" activation when a card is focused
document.querySelectorAll('.card').forEach(card => {
  card.tabIndex = 0;
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const link = card.querySelector('a'); if (link) link.click();
    }
  });
});
