document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.splide').forEach((element) => {
    let options = {
      drag: 'free',
      rewind: true,
      padding: {right: 40}, // Allows peek into next slide
      focus: 0,
      mediaQuery: 'min',
    };
    // Override settings for RTL pages.
    const dir = document.querySelector('html').getAttribute('dir');
    if (dir === 'rtl') {
      options.direction = dir;
      options.padding = {left: 40};
    }
    // Initialize the carousel.
    new Splide(element, options).mount();
  });
});