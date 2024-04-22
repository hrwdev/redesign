Drupal.hrwVideo = Drupal.hrwVideo || {};

document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.video-vertical').forEach((element) => {
    const type = element.getAttribute('data-type');
    const videoId = element.getAttribute('data-id');
    let video;
    switch (type) {
      case 'html5':
        video = new HrwHtml5VideoElement(element);
        video.init();
        break;
      case 'youtube':
        // loadYoutubeIframePlayerAPI();
        video = new HrwYoutubeVideoVertical(element);
        video.init();
        break;
      default:
        return;
    }
    Drupal.hrwVideo[videoId] = video;
  });
});

class HrwYoutubeVideoVertical extends HrwYoutubeVideo {

  constructor(element) {
    super(element);
    this.element.addEventListener('mouseover', (ev) => this.play());
    this.element.addEventListener('mouseout', (ev) => this.pause());
    this.poster.addEventListener('click', (ev) => {
      this.play();
      this.player.unMute();
    });
  }

  playerOptions() {
    return {
      videoId: this.videoId,
      width: 270,
      height: 480,
      playerVars: {
        playsinline: 1,
        rel: 0,
        disablePictureInPicture: 1,
        controls: 1,
        mute: 1,
      },
      events: {
        onStateChange: (event) => {
          console.log(event);
        }
      }
    }
  }
}