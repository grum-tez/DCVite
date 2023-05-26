// Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});

// Hamburger menu
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

menuToggle.addEventListener('change', () => {
  sidebar.classList.toggle('active');
  container.classList.toggle('menu-active');
});