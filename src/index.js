import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import renderCountriesMarkup from './js/renderCountriesMarkup.js';
import { refs } from './js/refs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 500));



function searchInputHandler(event) {
    let inputValue = event.target.value;

    refs.countriesContainer.innerHTML = '';
    refs.countriesList.innerHTML = '';

    if (inputValue.length > 1) {
        fetchCountries(inputValue)
            .then(data => {
                if (data.length > 0 && data.length <= 10) {
                    renderCountriesMarkup(data);
                } else if (data.length > 10) {
                    error('Too many matches found. Please enter a more specific query!');
                } else {
                    error('Sorry. No found country!');
                }
            })
            .catch(error => (console.log(error)));
    }
}