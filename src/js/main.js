'use strict';
const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
let drinks = [];

function dataFromApi() {
  const cocktail = cocktailInput.value;
  const url_server = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

  fetch(url_server)
    .then((resp) => resp.json())
    .then((data) => {
      drinks = data.drinks.map((coctel) => {
        const newCoctel = {
          id: coctel.idDrink,
          name: coctel.strDrink,
          img: coctel.strDrinkThumb,
        };
        return newCoctel;
      });
      console.log(drinks);
    });
}

function handleClicKSearchDrink(event) {
  event.preventDefault();
  dataFromApi();
}

buttonSearch.addEventListener('click', handleClicKSearchDrink);
