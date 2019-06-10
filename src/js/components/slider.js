import { h, Component } from 'preact';

import { LEFT_ARROW_KEY, RIGHT_ARROW_KEY } from '../constants';

class Slider extends Component {
  handleKeyDown = event => {
    if (event.keyCode === RIGHT_ARROW_KEY) {
      this.handleRightArrowDown();
    } else if (event.keyCode === LEFT_ARROW_KEY) {
      this.handleLeftArrowDown();
    }
  };

  handleRightArrowDown = () => {
    const { onRightKeyDown } = this.props;
    if (onRightKeyDown) {
      onRightKeyDown();
    }
  };

  handleLeftArrowDown = () => {
    const { onLeftKeyDown } = this.props;
    if (onLeftKeyDown) {
      onLeftKeyDown();
    }
  };

  handleTrackClick = event => {
    const { onTrackClick } = this.props;
    const sliderWidth = this.track.offsetWidth;
    const clickLocation = event.pageX - this.track.getBoundingClientRect().left;

    const percentage = clickLocation / sliderWidth;

    if (onTrackClick) {
      onTrackClick(percentage);
    }
  };

  render({ min, max, value, id, label }) {
    const sliderLeft = (value / max) * 100;

    return (
      <div class="slider">
        <label htmlFor={id} class="slider__label">
          {label}
        </label>
        <div
          class="slider__track"
          ref={c => (this.track = c)}
          onClick={this.handleTrackClick}
        >
          <div
            id={id}
            class="slider__handle"
            role="slider"
            style={{
              width: sliderLeft + '%'
            }}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            tabindex="0"
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default Slider;
