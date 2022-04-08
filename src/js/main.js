'use strict';
const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');

let drinks = [];
function handleClicKSearch() {
  const cocktail = cocktailInput.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      drinks = data.drinks.map((coctel) => {
        const newCoctel = {
          strDrink: coctel.strDrink,
          strDrinkThumb: coctel.strDrinkThumb,
        };
        return newCoctel;
      });
      console.log(drinks);
    });
}
buttonSearch.addEventListener('click', handleClicKSearch);
