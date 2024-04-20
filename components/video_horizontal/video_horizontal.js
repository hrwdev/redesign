document.video_horizontal = document.video_horizontal || {};

document.addEventListener('twigRendered', (ev) => {
  document.querySelectorAll('.video-horizontal').forEach((element) => {
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
        video = new HrwYoutubeVideoElement(element);
        video.init();
        break;
      default:
        return;
    }
    document.video_horizontal[videoId] = video;
    const posterButton = element.querySelector('button');
    posterButton.addEventListener('click', (ev) => {
      video.play();
    });
  });
});

/**
 * Loads the YouTube IFrame Player API asynchronously if it is not already loaded.
 *
 * @return {void}
 */
function loadYoutubeIframePlayerAPI() {
  // if (!document.isYoutubeIframePlayerAPILoaded) {
  //   const tag = document.createElement('script');
  //   tag.src = "https://www.youtube.com/iframe_api";
  //   const firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //   document.isYoutubeIframePlayerAPILoaded = true;
  // }
}


class HrwVideoElement {

  isInitialized = false;

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Invalid argument: "element" must be an instance of HTMLElement.');
    }
    this.element = element;
    this.videoId = element.getAttribute('data-id');
    this.poster = this.element.querySelector('.video__poster');
    this.externalButton = document.querySelector(`[aria-controls="video-${this.videoId}"]`);
  }

  init() {
    this.isInitialized = true;
  }

  play() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.poster) {
      this.poster.style.display = 'none';
    }
  }

  pause() {}

  toggleToPauseButton(button) {
    button.classList.add('icon-pause');
    button.classList.remove('icon-play');
    button.querySelector('.videos__item-icon-label').innerText = 'Pause video';
  }

  toggleToPlayButton(button) {
    button.classList.add('icon-play');
    button.classList.remove('icon-pause');
    button.querySelector('.videos__item-icon-label').innerText = 'Play video';
  }
}

class HrwHtml5VideoElement extends HrwVideoElement {
  constructor(element) {
    super(element);
    this.video = this.element.querySelector('video');
  }

  init() {
    super.init();
    if (this.externalButton) {
      this.video.addEventListener('play', () => {
        this.toggleToPauseButton(this.externalButton);
      });
      this.video.addEventListener('pause', () => {
        this.toggleToPlayButton(this.externalButton);
      });
      this.video.addEventListener('ended', () => {
        this.toggleToPlayButton(this.externalButton);
        this.poster.style.display = 'block';
      });
    }
  }

  play() {
    super.play();
    this.video.play();
  }

  pause() {
    this.video.pause();
  }
}

class HrwYoutubeVideoElement extends HrwVideoElement {
  player;
  iframe;
  constructor(element) {
      super(element);
      this.iframe = this.element.querySelector('.video__player');
  }

  init() {
    super.init();
    if (!this.player) {
      this.player = new YT.Player(this.iframe, {
        videoId: this.videoId,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
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
      });
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
}

