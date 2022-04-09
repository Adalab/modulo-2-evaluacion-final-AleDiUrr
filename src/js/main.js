'use strict';
const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
const list = document.querySelector('.js-favs-list');
const itemResults = document.querySelectorAll('.js-result-item');
let drinks = [];

function renderDrinkList(dataFromApi) {
  let html = '';
  for (let i = 0; i < drinks.length; i++) {
    const drink = drinks[i];
    html += `<li class="result_list js-result-item" id=${drink.id}>`;
    html += `<img src=${drink.img} alt="" width= "100px">`;
    html += `<h2>${drink.name} </h2>`;
    html += `</li>`;
    list.innerHTML = html;
  }
}

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
      renderDrinkList();
    });
}

function handleClicKSearchDrink(event) {
  event.preventDefault();
  dataFromApi();
}

buttonSearch.addEventListener('click', handleClicKSearchDrink);
