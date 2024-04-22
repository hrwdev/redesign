// Initialize globals for Twig template variables and Drupal.
vars = {};
Drupal = {};

// Determine if the root directory is a subdirectory.
const subdir = (window.location.pathname.startsWith('/redesign'))
  ? '/redesign'
  : '';

// Load all twig components and their assets, then fire the
// custom "componentsLoaded" event.
Promise.all([
  /* @create_component.sh insertion point */
  loadComponent('shorts'),
  loadComponent('site_header'),
  loadComponent('video_horizontal'),
  loadComponent('video_vertical'),
  loadComponent('videos'),
  loadComponent('stats'),
  loadComponent('strip'),
  loadComponent('section_header'),
  loadComponent('hero_brand'),
  loadComponent('reports'),
  loadComponent('report'),
  loadComponent('card'),
  loadComponent('spotlight'),
  loadComponent('about'),
  loadComponent('trending'),
  loadComponent('card_minimal'),
  loadComponent('carousel'),
  loadComponent('link_button'),
  loadComponent('link_emphasis'),
  loadComponent('button'),
  loadComponent('hero'),
  loadComponent('modal'),
  loadComponent('modal_disclosure'),
]).then(() => {
  const event = new Event('componentsLoaded');
  document.dispatchEvent(event);
});

// Detect whether the keyboard or mouse is currently being used.
document.addEventListener('keyup', function (event) {
  if (event.code === 'Tab') {
    document.querySelector('body').classList.add('is-keyboard-user');
    // Ensure spacing between the activated element and the bottom of the viewport.
    if (window.innerHeight - document.activeElement.getBoundingClientRect().bottom < 100) {
      window.scroll(0, window.scrollY + 150);
    }
  }
});
document.addEventListener('mousedown', function (event) {
  document.querySelector('body').classList.remove('is-keyboard-user');
  document.querySelector('body').classList.add('is-mouse-user');
});
