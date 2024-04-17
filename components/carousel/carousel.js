document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.splide').forEach((element) => {
    let options = {
      drag: 'free',
      rewind: true,
      padding: {right: 40},
      focus: 0,
      focusableNodes: '',
      mediaQuery: 'min',    };
    new Splide(element, options).mount();
  });
});