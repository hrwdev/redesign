document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.report').forEach((element) => {
    // Prevent touch devices from simulating a mouseover event on touch.
    element.addEventListener('touchend', (event) => {
      event.stopPropagation();
    })
  });
});