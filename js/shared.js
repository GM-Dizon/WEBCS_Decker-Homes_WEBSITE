const burger = document.querySelector('#hamburger-nav');
const nav = document.querySelector('#nav');
const navLinks = document.querySelectorAll('#nav a');

const currentPage = window.location.pathname.split('/').pop() || 'homepage.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('current-page');
    }
});

const isActive = () => nav.classList.contains('active');

function setMenu(active) {
    nav.classList.toggle('active', active);
    burger.classList.toggle('active', active);
    burger.setAttribute('aria-expanded', String(active));
}

burger.addEventListener('click', () => setMenu(!isActive()));

/*Only necessary on div, a, and span*/
burger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMenu(!isActive());
    }
});

nav.addEventListener('click', (event) => {
    if (event.target.closest('.hamburger-link')) 
        setMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isActive()) 
        setMenu(false);
});

window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
});
