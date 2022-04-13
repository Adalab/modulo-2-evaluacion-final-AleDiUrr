'use strict';

const buttonSearch = document.querySelector('.js-search-btn');
const cocktailInput = document.querySelector('.js-cocktail-input');
const list = document.querySelector('.js-result-list');
const listFavs = document.querySelector('.js-favs-list');
const deleteBtn = document.querySelector('.js-reset-btn');
const longDrinks = document.querySelector('.js-long');
const logBtn = document.querySelector('.js-log');

let drinks = [];
let favorites = [];

function handleLogBtn(event) {
  for (const log of favorites) {
    log.name;
    console.log(log.name);
  }
}

logBtn.addEventListener('click', handleLogBtn);

function renderP() {
  const favs = favorites.length;
  longDrinks.innerHTML = favs;
}

renderP();

function deleteFavs() {
  localStorage.removeItem('favorites');
}

function handleListenReset(event) {
  event.preventDefault();
  deleteFavs();
}

function listenClickReset(event) {
  event.preventDefault;
  deleteBtn.addEventListener('click', handleListenReset);
}

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
      if (favorite.img === null) {
        html += `<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo">`;
      } else {
        html += `<img class="drink_img" src="${favorite.img}" alt="cocktail-photo">`;
      }
      html += `</li>`;
    }
  }
  listFavs.innerHTML = html;
  deleteFavs();
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
  renderP();
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
    if (drink.day === null) {
      html += `<p>No modified</p>`;
    } else {
      html += `<h2>${drink.day}</h2>`;
    }

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
          day: coctel.dateModified,
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
