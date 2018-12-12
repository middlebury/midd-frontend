import { h, Component } from 'preact';
import Portal from 'preact-portal';

import Icon from './icon';
import Lightbox from './lightbox';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleButtonClick = event => {
    event.preventDefault();
    this.open();
  };

  open = () => {
    document.body.classList.add('has-lightbox');
    this.setState({ open: true });
  };

  close = () => {
    document.body.classList.remove('has-lightbox');
    this.setState({ open: false });

    // refocus buton when modal is closed else focus could be at top of page again
    this.button.focus();
  };

  render({ images = [] }, { open }) {
    const img = images[0] || {};

    return (
      <div>
        <h2 className="sr-only" id="midd-gallery-label-1">
          Some gallery label
        </h2>
        <figure className="media">
          <div className="gallery__image">
            <a
              href="#"
              onClick={this.handleButtonClick}
              role="button"
              ref={c => (this.button = c)}
            >
              <img src={img.src} alt={img.alt} />
              <span className="button button--primary video__button">
                Open Gallery
                <span className="ml-3">
                  <Icon icon="images" />
                </span>
                <span className="mx-3">|</span>
                <span className="f2">{images.length} images</span>
              </span>
            </a>
          </div>
          <figcaption className="media__caption">{img.caption}</figcaption>
        </figure>

        {open ? (
          <Portal into="body">
            <Lightbox items={images} onClose={this.close} />
          </Portal>
        ) : null}
      </div>
    );
  }
}

export default Gallery;
