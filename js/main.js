// Initialize a global for Twig template variables.
vars = {};

// Determine if the root directory is a subdirectory.
const subdir = (window.location.pathname.startsWith('/redesign'))
  ? '/redesign'
  : '';

// Load all twig components and their assets, then fire the
// custom "componentsLoaded" event.
Promise.all([
  /* @create_component.sh insertion point */
  loadComponent('video_horizontal'),
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
