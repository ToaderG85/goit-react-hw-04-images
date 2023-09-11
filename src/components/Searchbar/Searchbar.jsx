import React, { useState } from 'react';
import style from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {

    const [querry, setQuerry] = useState('');

    const handleChange =((event) => {
        const userInput = event.currentTarget.value;
        setQuerry(userInput);
    });

    const handleSubmit =((event) => {
        event.preventDefault();
        if (querry === '') {
            Notiflix.Notify.info('Enter a search querry');
            return;
        }
        onSubmit(querry);
        setQuerry('');
    });

  return (
    <header className={style.searchbar}>
        <form className={style.searchform} onSubmit={handleSubmit}>
            <button type="submit" className={style.searchform_button}>
            <span className={style.searchform_button_label}>Search</span>
            </button>

            <input
            className={style.searchform_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            />
        </form>
    </header>
  )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
