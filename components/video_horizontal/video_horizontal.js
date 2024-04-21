Drupal.hrwVideo = Drupal.hrwVideo || {};

document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.video-horizontal').forEach((element) => {
    const type = element.getAttribute('data-type');
    const videoId = element.getAttribute('data-id');
    let video;
    switch (type) {
      case 'html5':
        video = new HrwHtml5Video(element);
        video.init();
        break;
      case 'youtube':
        // loadYoutubeIframePlayerAPI();
        video = new HrwYoutubeVideoHorizontal(element);
        video.init();
        break;
      default:
        return;
    }
    Drupal.hrwVideo[videoId] = video;
  });
});

class HrwVideo {
  element;
  orientation;
  videoId;
  videoElement;
  poster;
  externalButton;

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Invalid argument: "element" must be an instance of HTMLElement.');
    }
    this.element = element;
    this.orientation = element.getAttribute('data-orientation');
    this.videoId = element.getAttribute('data-id');
    this.poster = this.element.querySelector('.video__poster');
    this.externalButton = document.querySelector(`[aria-controls="video-${this.videoId}"]`);
  }

  init() {}

  play() {}

  pause() {}

  toggleToPauseButton(button) {
    button.classList.add('icon-pause');
    button.classList.remove('icon-play');
    button.querySelector('.icon-label').innerText = 'Pause video';
  }

  toggleToPlayButton(button) {
    button.classList.add('icon-play');
    button.classList.remove('icon-pause');
    button.querySelector('.icon-label').innerText = 'Play video';
  }
}

class HrwHtml5Video extends HrwVideo {
  constructor(element) {
    super(element);
    this.videoElement = this.element.querySelector('video');
    this.poster.addEventListener('click', (ev) => this.play());
  }

  init() {
    super.init();
    if (this.externalButton) {
      this.videoElement.addEventListener('play', () => {
        this.toggleToPauseButton(this.externalButton);
      });
      this.videoElement.addEventListener('pause', () => {
        this.toggleToPlayButton(this.externalButton);
      });
      this.videoElement.addEventListener('ended', () => {
        this.toggleToPlayButton(this.externalButton);
        this.poster.style.display = 'block';
      });
    }
  }

  play() {
    super.play();
    this.videoElement.play();
    if (this.poster) {
      this.poster.style.display = 'none';
    }
  }

  pause() {
    this.videoElement.pause();
  }
}

class HrwYoutubeVideo extends HrwVideo {

  defaultOptions = {};

  constructor(element) {
      super(element);
      this.videoElement = this.element.querySelector('.video__player');
  }

  init() {
    super.init();
    if (!this.player) {
      this.player = new YT.Player(this.videoElement, this.playerOptions());
    }
  }

  play() {
    super.play();
    if (this.player && this.player.playVideo) {
      this.player.playVideo();
    }
  }

  pause() {
    if (this.player && this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }

  playerOptions() {}
}

class HrwYoutubeVideoHorizontal extends HrwYoutubeVideo {

  constructor(element) {
    super(element);
    this.poster.addEventListener('click', (ev) => this.play());
  }

  playerOptions() {
    return {
      videoId: this.videoId,
      width: 640,
      height: 360,
      playerVars: {
        playsinline: 1,
        rel: 0,
      },
      events: {
        onStateChange: (event) => {
          // Toggle play/pause buttons that may be associated with the video.
          const externalButton = document.querySelector(`[aria-controls="video-${this.videoId}"]`);
          switch (event.data) {
            case 1: // playing
              if (externalButton) {
                this.toggleToPauseButton(externalButton);
              }
              break;
            case 2: // paused
              if (externalButton) {
                this.toggleToPlayButton(externalButton);
              }
              break;
            case 0: // ended
              if (externalButton) {
                this.toggleToPlayButton(externalButton);
              }
              this.poster.style.display = 'block';
              break;
          }
        }
      }
    }
  }

  play() {
    super.play();
    if (this.poster) {
      this.poster.style.display = 'none';
    }
  }
}