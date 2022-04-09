'use strict';
const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
const list = document.querySelector('.js-favs-list');
let html = '';
let drinks = [];
let favs = [];
let favStyle = '';

function itIsFavorite(drink) {
  const favoriteDrink = favs.find((fav) => {
    return favs.id === drink.id;
  });
  if (favoriteDrink === undefined) {
    return false;
  } else {
    return true;
  }
}

function handleClickResults(event) {
  const clickedFavid = event.currentTarget.id;

  const clickResult = drinks.find((itemClickedDrink) => {
    return itemClickedDrink.id === clickedFavid;
  });
  const favDrinkFound = favs.findIndex((fav) => {
    return fav.id === clickedFavid;
  });
  if (favDrinkFound === -1) {
    favs.push(clickResult);
  } else {
    favs.splice(favDrinkFound, 1);
  }
}

function listenerliResults() {
  const liResults = document.querySelectorAll('.js-result');
  for (const itemResult of liResults) {
    itemResult.addEventListener('click', handleClickResults);
  }
}

function renderDrinkList(dataFromApi) {
  for (const drink of drinks) {
    const isFave = itIsFavorite(drink);
    if (isFave) {
      favStyle = 'fav_item_list';
    } else {
      favStyle = '';
    }
    html += `<li class="result_item_list js-result ${isFave}" id=${drink.id}>`;
    if (drink.img === null) {
      html += `<img
          class="fav_img"
          src="./assets/images/strawberry-cocktail-m.jpg"
          width="100px"
        />`;
    } else {
      html += `<img src=${drink.img} width=200px >`;
    }
    html += `<h2>${drink.name} </h2>`;
    html += `</li>`;
  }
  list.innerHTML = html;
  listenerliResults();
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
