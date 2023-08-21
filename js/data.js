/* exported data */
const data = {
  sprays: [],
  favorites: []
};

window.addEventListener('load', function () {
  const favoritedSprays = localStorage.getItem('favorites');
  if (favoritedSprays) {
    data.favorites = JSON.parse(favoritedSprays);
  }
});
