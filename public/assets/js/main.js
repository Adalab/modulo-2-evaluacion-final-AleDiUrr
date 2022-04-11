'use strict';

const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
const list = document.querySelector('.js-result-list');
const listFavs = document.querySelector('.js-favs-list');
const noFavButton = document.querySelectorAll('.js-no-fav-button');
let drinks = [];
let favorites = [];

function getFavoritesfromLocalStorage() {
  const favsListStored = JSON.parse(localStorage.getItem('favorites'));

  if (favsListStored) {
    favorites = favsListStored;
    renderFavsDrinks();
  } else {
    dataFromApi();
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
      html += `<button class= "no_fav_button js-no-fav-button" id = "${favorite.id}">x</button>`;
      if (favorite.img === null) {
        html += `<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo">`;
      } else {
        html += `<img class="drink_img" src="${favorite.img}" alt="cocktail-photo">`;
      }
      html += `</li>`;
    }
  }
  listFavs.innerHTML = html;
}

function handleClickResults(event) {
  const drinkIdClickled = event.currentTarget.id;
  const foundDrink = drinks.find((fav) => fav.id === drinkIdClickled);

  const foundFavoriteDrinkIndex = favorites.findIndex((fav) => {
    return fav.id === drinkIdClickled;
  });
  if (foundFavoriteDrinkIndex === -1) {
    favorites.push(foundDrink);
  } else {
    favorites.splice(foundFavoriteDrinkIndex, 1);
  }
  renderDrinkList(drinks);
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
  let favStyle = '';

  for (const drink of drinks) {
    const foundFavoriteDrinkIndex = favorites.findIndex((fav) => {
      return fav.id === drink.id;
    });

    console.log(foundFavoriteDrinkIndex);
    if (foundFavoriteDrinkIndex !== -1) {
      favStyle = 'is_fav';
    } else {
      favStyle = '';
    }
    html += `<li class="result_item_list js-result ${favStyle}" id="${drink.id}">`;

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

getFavoritesfromLocalStorage();

buttonSearch.addEventListener('click', handleClicKSearchDrink);

//# sourceMappingURL=main.js.map
