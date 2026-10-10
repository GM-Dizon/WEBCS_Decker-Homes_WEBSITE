const viewport = document.querySelector('.slider-viewport');
const track = document.querySelector('.testimonials');
const slides = document.querySelectorAll('.testimonial');

const DELAY = 3000;

function cloneSet() {
    slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
}

const step = () => slides[1].offsetLeft - slides[0].offsetLeft;
const setWidth = () => slides.length * step();
const currentSlide = () => Math.round(viewport.scrollLeft / step());

const extraSets = Math.ceil((viewport.clientWidth + setWidth()) / setWidth()) - 1;

cloneSet();

for (let i = 0; i < extraSets; i++)
    cloneSet();

function nextSlide() {
    viewport.scrollTo({ left: (currentSlide() + 1) * step() });
}

let timer = null;

function startAutoplay() {
    if (timer)
        return;
    timer = setInterval(nextSlide, DELAY);
}

function stopAutoplay() {
    clearInterval(timer);
    timer = null;
}

viewport.addEventListener('scroll', () => {
    if (viewport.scrollLeft >= setWidth())
        viewport.scrollTo({ left: viewport.scrollLeft - setWidth(), behavior: 'instant' });
});

viewport.addEventListener('pointerenter', stopAutoplay);
viewport.addEventListener('pointerleave', startAutoplay);

startAutoplay();
