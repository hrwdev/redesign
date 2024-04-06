document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.splide').forEach((element) => {
    new Splide(element, {
      drag: true,
      rewindByDrag: true,
      perPage: 2,
      focus: 0,
      focusableNodes: '',
      mediaQuery: 'min',
      breakpoints: {
        768: {
          destroy: true,
        },
      }
    }).mount();
  });
});