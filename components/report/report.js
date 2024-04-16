document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.report').forEach((element) => {
    // Prevent touch devices from simulating a mouseover event on touch.
    const button = element.querySelector('.report__button');
    button.addEventListener('click', (event) => {
      (button.getAttribute('aria-expanded') === 'false')
        ? button.setAttribute('aria-expanded', 'true')
        : button.setAttribute('aria-expanded', 'false')
      ;
    });
  });
});