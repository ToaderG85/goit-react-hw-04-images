import React, { useEffect} from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ largeImageURL, tags, modalClose }) {
    const handleBackdropClose = event => {
      if (event.target === event.currentTarget) {
        modalClose();
      }
    };
  
    useEffect(() => {
      const handleKeyDown = event => {
        if (event.code === 'Escape') {
          modalClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [modalClose]);
  
    return (
      <div className={style.overlay} onClick={handleBackdropClose}>
        <div className={style.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }

Modal.defaultProps = {
  largeImageURL: 'https://picsum.photos/100%/260',
  tags: 'This is a default image. I am sorry, the image you searched is not available.',
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  modalClose: PropTypes.func.isRequired,
};
