import { h, Component } from 'preact';
import anime from 'animejs';

import Icon from './icon';
import LazyImg from './lazy-img';

const ESC_KEY = 27;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const LightboxButton = ({ label, className, onClick, iconRight, iconLeft }) => (
  <button
    className={`lightbox__button button button--link ` + className}
    onClick={onClick}
  >
    {iconLeft && <Icon className="mr-1" icon={iconLeft} aria-hidden />}
    {label}
    {iconRight && <Icon className="ml-1" icon={iconRight} aria-hidden />}
  </button>
);

class Lightbox extends Component {
  state = {
    index: 0
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);

    this.lightbox.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  close() {
    this.props.onClose();
  }

  next() {
    this.scrollToImage(this.state.index + 1);
  }

  prev() {
    this.scrollToImage(this.state.index - 1);
  }

  scrollToImage(index) {
    if (index === -1 || index === this.props.items.length) {
      return;
    }

    const target = this.lightbox.querySelectorAll('.lightbox__figure')[index];

    // offset more so it shows up below fixed pager buttons
    const scrollTop = target.offsetTop - 100;

    this.setState({
      index
    });

    anime({
      targets: this.lightbox,
      scrollTop,
      easing: 'easeInCubic',
      duration: 300,
      elasticity: 500
    });
  }

  handleKeyUp = event => {
    if (event.keyCode === ESC_KEY) {
      this.close();
    } else if (event.keyCode === RIGHT_ARROW_KEY) {
      this.next();
    } else if (event.keyCode === LEFT_ARROW_KEY) {
      this.prev();
    }
  };

  handleCloseClick = () => {
    this.close();
  };

  handleNextClick = () => {
    this.next();
  };

  handlePrevClick = () => {
    this.prev();
  };

  handleThumbClick = index => {
    this.scrollToImage(index);
  };

  render({ items }, { index }) {
    return (
      <div
        className="lightbox"
        ref={c => (this.lightbox = c)}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="midd-gallery-label-1"
      >
        <div className="lightbox__controls">
          <LightboxButton
            label="Prev"
            iconLeft="chevron-left"
            onClick={this.handlePrevClick}
          />
          <div className="lightbox__count">
            {index + 1} / {items.length}
          </div>
          <LightboxButton
            label="Next"
            iconRight="chevron-right"
            onClick={this.handleNextClick}
          />
          <LightboxButton
            label="Close"
            iconRight="times"
            onClick={this.handleCloseClick}
            className="lightbox__button--close"
            aria-label="Close (press escape to close)"
          />
        </div>
        <div className="lightbox__content">
          <ol className="lightbox__thumbs-list">
            {items.map((img, i) => (
              <li
                key={i}
                className={`lightbox__thumbs-item ${
                  index === i ? 'active' : ''
                }`}
              >
                <button
                  className="lightbox__thumbs-button"
                  onClick={event => this.handleThumbClick(i)}
                >
                  <img src={img.thumb} alt="" />
                </button>
              </li>
            ))}
          </ol>
          <div className="lightbox__images">
            {items.map((img, i) => (
              <figure
                key={i}
                className="lightbox__figure media media--contain-caption mb-9"
              >
                <img src={img.src} alt={img.alt} />
                <figcaption className="media__caption text-white">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Lightbox;
