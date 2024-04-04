document.addEventListener('twigRendered', (ev) => {

  document.querySelectorAll('.modal-disclosure summary').forEach((element) => {
    const details = element.closest('details');
    const id = details.getAttribute('id');
    const modal = document.getElementById(`modal-${id}`);
    modal.addEventListener('close', (ev) => {
      details.removeAttribute('open');
    });
    element.addEventListener('click', (ev) => {
      if (window.matchMedia('(min-width: 768.01px)').matches) {
        modal.showModal();
      }
    });

  });

});
