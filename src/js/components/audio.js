import { h, Component } from 'preact';

import { on } from '../utils/dom';
import Slider from './slider';

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : '' + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  return minutes + ':' + seconds;
}

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      duration: props.audio.duration,
      currentTime: 0,
      muted: false
    };

    this.audio = props.audio;

    on(this.audio, 'loadedmetadata', this.handleMetaDataLoad);
    on(this.audio, 'timeupdate', this.handleUpdateTime);
    on(this.audio, 'ended', this.pause);
  }

  handleMetaDataLoad = event => {
    this.setState({
      duration: event.target.duration
    });
  };

  handleUpdateTime = event => {
    this.setState({
      currentTime: event.target.currentTime
    });
  };

  handleBtnClick = () => {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  };

  play = () => {
    this.audio.play();
    this.setState({
      playing: true
    });
  };

  pause = () => {
    this.audio.pause();

    this.setState({
      playing: false
    });
  };

  mute = () => {
    if (this.audio.muted) {
      this.audio.muted = false;
      this.setState({
        muted: false
      });
    } else {
      this.audio.muted = true;
      this.setState({
        muted: true
      });
    }
  };

  handleTrackClick = percent => {
    const targetTime = this.audio.duration * percent;
    this.audio.currentTime = targetTime;
  };

  handleSliderLeft = () => {
    this.audio.currentTime = this.audio.currentTime - 3;
  };

  handleSliderRight = () => {
    this.audio.currentTime = this.audio.currentTime + 3;
  };

  render(props, { duration, currentTime, muted, playing }) {
    return (
      <div class="audio__player">
        <div class="audio__buttons">
          <button
            class="button button--primary"
            aria-label={playing ? 'Pause' : 'Play'}
            aria-describedby="midd-audio-title-1"
            onClick={this.handleBtnClick}
          >
            <span class="audio__button-text mr-3">
              {playing ? 'Pause' : 'Listen'}
            </span>
            <svg class="icon icon--sm">
              <use xlinkHref={`#icon-${playing ? 'pause' : 'play'}`} />
            </svg>
          </button>
        </div>
        <div class="audio__times">
          <span>{formatTime(currentTime)}</span> /{' '}
          <span>{formatTime(duration)}</span>
        </div>
        <Slider
          label="Current time"
          min={0}
          max={duration}
          value={currentTime}
          onLeftKeyDown={this.handleSliderLeft}
          onRightKeyDown={this.handleSliderRight}
          onTrackClick={this.handleTrackClick}
        />
        <div class="audio__mute">
          <button class="button button--sm" onClick={this.mute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
