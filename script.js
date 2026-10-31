// Smoky Stack – minimal vanilla JS
const $ = (s, all) => all ? [...document.querySelectorAll(s)] : document.querySelector(s);

// 1. Sticky navbar: add a solid background after scrolling
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 50);
addEventListener('scroll', onScroll); onScroll();

// 2. Mobile menu toggle (closes when a link is tapped)
const links = $('#links');
$('#toggle').addEventListener('click', () => links.classList.toggle('open'));
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });

// 3. Scroll-reveal using IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } });
}, { threshold: .15 });
$('.reveal', true).forEach(el => io.observe(el));

// 4. Cart counter
let items = 0;
const badge = $('#count');
$('.add', true).forEach(btn => btn.addEventListener('click', () => {
  badge.textContent = ++items;
  badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop'); // restart animation
  btn.textContent = 'Added ✓';
  setTimeout(() => (btn.textContent = 'Add to Cart'), 1200);
}));

// 5. Hero parallax: floating items move with the mouse and scroll at different depths
const hero = $('#home');
const layers = $('[data-depth]', true);
let mx = 0, my = 0;
const move = () => {
  layers.forEach(el => {
    const d = +el.dataset.depth;
    el.style.translate = `${mx * d}px ${my * d + scrollY * d * 0.004}px`;
  });
};
// Mouse effects only on devices with a real pointer and when motion is allowed
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mouseOK = matchMedia('(hover: hover)').matches && !calm;
const stage = $('.stage');
if (mouseOK) hero.addEventListener('mousemove', e => {
  mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; move();
  stage.style.setProperty('--tx', mx * 2);  // -1 to 1, used by CSS for the burger tilt
  stage.style.setProperty('--ty', my * 2);
});
hero.addEventListener('mouseleave', () => { stage.style.setProperty('--tx', 0); stage.style.setProperty('--ty', 0); });
if (!calm) addEventListener('scroll', move, { passive: true });

// Parallax for decorative blobs: each moves at its own data-speed while scrolling
const decos = $('.deco', true);
let ticking = false;
if (!calm) addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {  // one update per frame keeps scrolling smooth
    decos.forEach(d => { const r = d.parentElement.getBoundingClientRect(); d.style.translate = `0 ${(r.top - innerHeight / 2) * d.dataset.speed}px`; });
    ticking = false;
  });
}, { passive: true });

// 6. Contact form: demo only (connect to your backend or form service)
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  $('#ok').textContent = 'Thanks! We got your message and will reply soon.';
  e.target.reset();
});
