import React from 'react';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
    webformatURL,
    tags,
    openModal,
    largeImageURL,
  }) {
    return (
      <div>
        <li className={style.gallery_item}>
          <img
            className={style.image}
            src={webformatURL}
            alt={tags}
            onClick={() => openModal(largeImageURL)}
            data-largeimage={largeImageURL}
          />
        </li>
      </div>
    );
  }

ImageGalleryItem.propTypes = {
webformatURL: PropTypes.string.isRequired,
largeImageURL: PropTypes.string.isRequired,
openModal: PropTypes.func.isRequired,
tags: PropTypes.string.isRequired,
};