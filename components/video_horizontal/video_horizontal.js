document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.video-horizontal').forEach((element) => {
    const video = element.querySelector('video');
    const overlay = element.querySelector('.video__poster');
    const button = element.querySelector('button');
    button.addEventListener('click', (ev) => {
      overlay.remove();
      video.play();
    });
  });
});