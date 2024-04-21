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
    this.poster.addEventListener('mouseover', (ev) => this.play());
    this.poster.addEventListener('focus', (ev) => this.play());
    this.poster.addEventListener('mouseout', (ev) => this.pause());
    this.poster.addEventListener('blur', (ev) => this.pause());
  }

  playerOptions() {
    return {
      videoId: this.videoId,
      width: 360,
      height: 640,
      playerVars: {
        playsinline: 1,
        rel: 0,
        controls: 0,
        mute: 1,
      },
    }
  }
}