import './css/styles.css';
import { fetchCountries } from './js/fetchCountries'
import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector(`#search-box`)
const listOfCountryRef = document.querySelector(`.country-list`)
const infoOfCountryRef = document.querySelector(`.country-info`)

addEventListener('input', debounce(inputInfo, DEBOUNCE_DELAY))

function inputInfo() {
    const name = inputRef.value.trim()
    if (name === '') {
        return (listOfCountryRef.innerHTML = ''), (infoOfCountryRef.innerHTML = '')
    }

    fetchCountries(name)
        .then(country => {
            listOfCountryRef.innerHTML = ''
            infoOfCountryRef.innerHTML = ''

            if (country.length === 1) {
                infoOfCountryRef.insertAdjacentHTML('beforeend', markupInfo(country))
            }
        })
}

function markupInfo(country) {
    const markupCountry = country.map(({ name, flags, capital, population, languages }) => {
        const markup = `<ul class="country-info__list">
            <li class="country-info__item">
              <img class="country-info__item--flag" src="${flags.svg}" alt="Flag of ${
        name.official
      }">
              <h2 class="country-info__item--name">${name.official}</h2>
            </li>
            <li class="country-info__item"><span class="country-info__item--categories">Capital: </span>${capital}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Population: </span>${population}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Languages: </span>${Object.values(
              languages,
            ).join(', ')}</li>
        </ul>`

        return markup
    }).join('')

    return markupCountry
}