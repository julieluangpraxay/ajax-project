
// new code that searches and works but is slow
const $enterButton = document.querySelector('.enter-button');
const $background = document.querySelector('#background');
const $loadingLogo = document.querySelector('.loading');
const $searchBar = document.querySelector('.main-search');
const $searchButton = document.querySelector('.search-button');
const $skinsContainer = document.querySelector('.skins-container');

$enterButton.addEventListener('click', function () {
  $enterButton.classList.add('hidden');
  $background.className = 'skin-background';
  $loadingLogo.classList.add('hidden');
  $searchBar.classList.remove('hidden');
  $searchButton.classList.remove('hidden');
  getSkinsData();
});

function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/playercards');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $skinsContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < xhr.response.data.length; i++) {
      const skinName = xhr.response.data[i].displayName.toLowerCase(); // Convert to lowercase for case-insensitive search

      if (!name || skinName.includes(name.toLowerCase())) { // Check if search term is empty or matches skin name
        const $div = document.createElement('div'); // outerdiv
        const $imgWrapper = document.createElement('div');
        const $iconImage = document.createElement('img');
        const $p = document.createElement('p');

        $iconImage.src = xhr.response.data[i].largeArt;
        $p.textContent = xhr.response.data[i].displayName;

        $div.classList.add('column-third');
        $imgWrapper.classList.add('img-wrapper');

        $div.appendChild($imgWrapper);
        $imgWrapper.appendChild($iconImage);
        $div.appendChild($p);
        $skinsContainer.appendChild($div);
      }
    }
  });
  xhr.send();
}

function searchClick(event) {
  if (event) {
    event.preventDefault();
  }

  const searchSkin = $searchBar.value;
  getSkinsData(searchSkin);
}

$searchButton.addEventListener('click', searchClick);
$searchBar.addEventListener('input', searchClick);
