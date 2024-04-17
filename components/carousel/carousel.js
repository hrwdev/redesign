document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.splide').forEach((element) => {
    let options = {
      drag: 'free',
      rewind: true,
      focus: 0,
      focusableNodes: '',
      mediaQuery: 'min',    };
    new Splide(element, options).mount();
  });
});