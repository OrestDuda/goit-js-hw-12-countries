var debounce = require('lodash');
import './styles.css';
import './js/fetchCountries';
const { error } = require('@pnotify/core');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import listTemplate from './templates/list.hbs';
import infoTemplate from './templates/info.hbs';
import fetchCountries from './js/fetchCountries';

const inputRef = document.querySelector('.form-control');
const listRef = document.querySelector('.list-group');
const infoRef = document.querySelector('.country_info');

function clearHTML() {
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
}

function checkResponse(data) {
  clearHTML();
  if (data.length > 9) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  } else if (data.length >= 2 && data.length <= 9) {
    listRef.insertAdjacentHTML('beforeend', listTemplate(data));
  } else if (data.length === 1) {
    infoRef.insertAdjacentHTML('beforeend', infoTemplate(data));
  } else {
    error({
      text: 'Something wrong!',
    });
  }
}

const debouncedOnInput = _.debounce(event => {
  let countryNameInput = event.target.value;
  if (!countryNameInput) {
    clearHTML();
  }
  fetchCountries(countryNameInput).then(data => checkResponse(data));
}, 500);

inputRef.addEventListener('input', debouncedOnInput);
