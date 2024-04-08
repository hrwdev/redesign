document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.splide').forEach((element) => {
    new Splide(element, {
      drag: 'free',
      rewind: true,
      perPage: 2,
      fixedWidth: 'calc(45%)',
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