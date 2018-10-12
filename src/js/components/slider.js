import { h, render, Component } from 'preact';
import onresize from 'onresize';

const RIGHT_ARROW_KEY = 39;
const LEFT_ARROW_KEY = 37;

class Slider extends Component {
  state = {
    trackWidth: 0
  };

  componentDidMount() {
    console.log('mounted');
    const trackWidth = this.track.offsetWidth;
    console.log(this.track.offsetWidth);

    this.setState({
      trackWidth
    });
  }

  handleKeyDown = event => {
    if (event.keyCode === RIGHT_ARROW_KEY) {
      this.handleRightArrowPress();
    } else if (event.keyCode === LEFT_ARROW_KEY) {
      this.handleLeftArrowPress();
    }
  };

  handleRightArrowPress = () => {
    console.log('right');
  };

  handleLeftArrowPress = () => {
    console.log('left');
  };

  handleTrackClick = event => {
    const { onTrackClick } = this.props;
    const sliderWidth = this.track.offsetWidth;
    const clickLocation = event.layerX;

    console.log(sliderWidth);

    const percentage = clickLocation / sliderWidth;

    if (onTrackClick) {
      onTrackClick(percentage);
    }
  };

  render({ min, max, value }, { trackWidth, label }) {
    const percentageOfSlider = max / value;

    const sliderLeft = Math.round(percentageOfSlider);
    console.log({ sliderLeft, max, value, percentageOfSlider });

    return (
      <div
        class="slider__track"
        ref={c => (this.track = c)}
        onClick={this.handleTrackClick}
      >
        <div
          class="slider__tab"
          role="slider"
          style={{
            position: 'relative',
            left: sliderLeft + '%'
          }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          tabindex="0"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default Slider;
