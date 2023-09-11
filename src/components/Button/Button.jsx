import React from 'react';
import style from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({text, type, handleClick}) {
  return (
    <div className={style.button_container}>
      <button
        className={style.Button}
        type={type}
        onClick={handleClick}
        aria-label={text}
      >
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
