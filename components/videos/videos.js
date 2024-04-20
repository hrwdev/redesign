document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.videos').forEach((element) => {
    // Show the first video on load.
    element.querySelector('.video-horizontal').classList.add('is-active');

    // Playlist items are buttons that should activate their respective videos.
    const buttons = element.querySelectorAll('.videos__item');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetElementId = button.getAttribute('aria-controls');
        const targetVideo = document.getElementById(targetElementId);
        const targetVideoId = targetVideo.getAttribute('data-id');

        const activeVideo = element.querySelector('.video-horizontal.is-active');
        const activeVideoId = activeVideo.getAttribute('data-id');

        // A pause button will always target the active video.
        if (button.classList.contains('icon-pause')) {
          document.video_horizontal[targetVideoId].pause();
        }

        // Otherwise, it's a play button.
        if (button.classList.contains('icon-play')) {
          // We need to determine if we need to switch the active video.
          if (targetVideoId !== activeVideoId) {
            // Pause the active video and switch to the target video.
            document.video_horizontal[activeVideoId].pause();
            activeVideo.classList.remove('is-active');
            targetVideo.classList.add('is-active');
          }
          document.video_horizontal[targetVideoId].play();
        }
      });
    });
  });
});