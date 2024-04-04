// Initialize a global for Twig template variables.
vars = {};

// Load all twig components and their assets, then fire the
// custom "componentsLoaded" event.
Promise.all([
  /* @create_component.sh insertion point */
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
