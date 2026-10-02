const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => item.setAttribute('aria-selected', 'false'));
  panels.forEach((panel) => {
    panel.hidden = true;
    panel.classList.remove('active');
  });
  tab.setAttribute('aria-selected', 'true');
  const panel = document.getElementById(tab.getAttribute('aria-controls'));
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('active'));
}));

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
}

document.querySelectorAll('form[data-success]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  showToast(form.dataset.success);
  form.reset();
}));

document.getElementById('year').textContent = new Date().getFullYear();
