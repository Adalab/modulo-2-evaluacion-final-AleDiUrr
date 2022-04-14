'use strict';

const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
const list = document.querySelector('.js-result-list');
const listFavs = document.querySelector('.js-favs-list');
const resetBtn = document.querySelector('.js-reset-btn');

let drinks = [];
let favorites = [];

function handleDeleteBtns(event) {
  const drinkIdClickled = event.currentTarget.id;
  const foundFavoriteDrinkIndex = favorites.findIndex((fav) => {
    return fav.id === drinkIdClickled;
  });
  favorites.splice(foundFavoriteDrinkIndex, 1);
  renderFavsDrinks();
}

function listenDeleteBtns() {
  const deleteBtns = document.querySelectorAll('.js-delete-btn');
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', handleDeleteBtns);
  }
}

function resetFav() {
  localStorage.removeItem('favorites');
  cocktailInput.value = '';
  listFavs.innerHTML = '';
  list.innerHTML = '';
  favorites = [];
}

function handleClickReset(event) {
  event.preventDefault();
  resetFav();
}

function getFavoritesfromLocalStorage() {
  const favsListStored = JSON.parse(localStorage.getItem('favorites'));

  if (favsListStored) {
    favorites = favsListStored;
    renderFavsDrinks();
  }
}

function setFavoritestoLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavsDrinks() {
  let html = '';
  if (favorites.length === 0 || favorites === null) {
    html += `Any fav?'`;
  } else {
    for (const favorite of favorites) {
      html += `<li class="fav_item_list js_fav_item" id="${favorite.id}">`;
      html += `<h2">${favorite.name}</h2>`;
      if (favorite.img === null) {
        html += `<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo">`;
      } else {
        html += `<img class="drink_img" src="${favorite.img}" alt="cocktail-photo">`;
      }
      html += `<button class="js-delete-btn" id=${favorite.id}>x</button>`;
      html += `</li>`;
    }
  }
  listFavs.innerHTML = html;
  listenDeleteBtns();
}

function handleClickResults(event) {
  const drinkIdClickled = event.currentTarget.id;
  const favDrink = drinks.find((fav) => {
    return fav.id === drinkIdClickled;
  });
  const foundFavoriteDrinkIndex = favorites.findIndex((fav) => {
    return fav.id === drinkIdClickled;
  });
  if (foundFavoriteDrinkIndex === -1) {
    favorites.push(favDrink);
  } else {
    favorites.splice(foundFavoriteDrinkIndex, 1);
  }
  renderFavsDrinks();
  setFavoritestoLocalStorage();
}

function listenerliResults() {
  const liResults = document.querySelectorAll('.js-result');
  for (const itemResult of liResults) {
    itemResult.addEventListener('click', handleClickResults);
  }
}

function renderDrinkList(drinks) {
  let html = '';
  for (const drink of drinks) {
    html += `<li class="result_item_list js-result" id="${drink.id}">`;

    if (drink.img === null || drink.img === undefined) {
      html += `<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo"/>`;
    } else {
      html += `<img class="drink_img" src="${drink.img}" alt= cocktail-photo/>`;
    }
    html += `<h2>${drink.name}</h2>`;
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
      renderDrinkList(drinks);
      setFavoritestoLocalStorage();
    });
}

function handleClicKSearchDrink(event) {
  event.preventDefault();
  dataFromApi();
}

resetBtn.addEventListener('click', handleClickReset);
buttonSearch.addEventListener('click', handleClicKSearchDrink);

getFavoritesfromLocalStorage();

//# sourceMappingURL=main.js.map
