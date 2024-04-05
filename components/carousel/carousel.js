document.addEventListener('twigRendered', (ev) => {
  new Splide('.splide', {
    perPage: 2,
    perMove: 1,
    type: 'loop',
    drag: 'free',
    mediaQuery: 'min',
    breakpoints: {
      768: {
        destroy: true,
      },
    }

  }).mount();
});