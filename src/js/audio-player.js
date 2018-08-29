import onresize from 'onresize';

import forEach from './utils/forEach';
import { $, $$, on, off, hide, show } from './utils/dom';

const PLAYING_ATTR = 'data-playing';
const PAUSED_ATTR = 'data-paused';
const MUTED_ATTR = 'data-muted';

const RIGHT_ARROW_KEY = 39;
const LEFT_ARROW_KEY = 37;

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : '' + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  return minutes + ':' + seconds;
}

class AudioPlayer {
  constructor(elem) {
    this.elem = elem;
    this.audio = $('[data-audio]', elem);

    this.playBtn = $('[data-play]', elem);
    this.pauseBtn = $('[data-pause]', elem);
    this.muteBtn = $('[data-mute]', elem);
    this.track = $('[data-track]', elem);
    this.slider = $('[data-slider]', elem);

    this.currentTimeElem = $('[data-current-time]', elem);
    this.durationElem = $('[data-duration]', elem);

    this.init();
  }

  init() {
    this.addListeners();

    hide(this.audio);
    hide(this.pauseBtn);

    onresize.on(() => {
      this.updateSliderPosition();
    });
  }

  addListeners() {
    on(this.playBtn, 'click', this.play);
    on(this.pauseBtn, 'click', this.pause);
    on(this.muteBtn, 'click', this.mute);

    on(this.audio, 'loadedmetadata', this.handleMetaDataLoad);
    on(this.audio, 'timeupdate', this.handleUpdateTime);

    on(this.track, 'click', this.handleTrackClick);
    on(this.slider, 'keydown', this.handleSliderKeyDown);
  }

  handleSliderKeyDown = event => {
    if (event.keyCode === RIGHT_ARROW_KEY) {
      this.handleRightArrowPress();
    } else if (event.keyCode === LEFT_ARROW_KEY) {
      this.handleLeftArrowPress();
    }
  };

  handleRightArrowPress = () => {
    this.audio.currentTime = this.audio.currentTime + 10;
  };

  handleLeftArrowPress = () => {
    this.audio.currentTime = this.audio.currentTime - 10;
  };

  handleMetaDataLoad = () => {
    this.slider.setAttribute('aria-valuemin', this.audio.currentTime);
    this.slider.setAttribute('aria-valuemax', this.audio.duration);
    this.slider.setAttribute('aria-valuenow', this.audio.currentTime);

    this.durationElem.innerHTML = formatTime(this.audio.duration);
    this.setCurrentTime(this.audio.currentTime);
  };

  handleUpdateTime = () => {
    this.setCurrentTime(this.audio.currentTime);
    this.updateSliderPosition();
  };

  handleTrackClick = event => {
    const songSliderWidth = this.track.offsetWidth;
    const clickLocation = event.layerX;

    const percentage = clickLocation / songSliderWidth;

    const targetTime = this.audio.duration * percentage;

    this.audio.currentTime = targetTime;
  };

  setCurrentTime(time) {
    this.currentTimeElem.innerHTML = formatTime(time);
  }

  updateSliderPosition() {
    const percentageOfSong = this.audio.currentTime / this.audio.duration;
    const percentageOfSlider = this.track.offsetWidth * percentageOfSong;

    this.slider.style.left = Math.round(percentageOfSlider) + 'px';
  }

  play = () => {
    this.audio.play();

    hide(this.playBtn);
    show(this.pauseBtn);

    this.pauseBtn.focus();

    this.elem.setAttribute(PAUSED_ATTR, false);
    this.elem.setAttribute(PLAYING_ATTR, true);
  };

  pause = () => {
    this.audio.pause();

    hide(this.pauseBtn);
    show(this.playBtn);
    this.playBtn.focus();

    this.elem.setAttribute(PLAYING_ATTR, false);
    this.elem.setAttribute(PAUSED_ATTR, true);
  };

  mute = () => {
    if (this.audio.muted) {
      this.audio.muted = false;
      this.elem.setAttribute(MUTED_ATTR, false);
    } else {
      this.audio.muted = true;
      this.elem.setAttribute(MUTED_ATTR, true);
    }
  };
}

const togglers = $$('[data-audio-player]');

forEach(togglers, elem => new AudioPlayer(elem));

export default AudioPlayer;
