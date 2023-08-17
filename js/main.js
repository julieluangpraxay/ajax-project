const $enterButton = document.querySelector('.enter-button');
const $background = document.querySelector('#background');
const $loadingLogo = document.querySelector('.loading');
const $searchBar = document.querySelector('.main-search');
const $skinsContainer = document.querySelector('.skins-container');
const $header = document.querySelector('header');
const $smallLogo = document.querySelector('.logo');

$enterButton.addEventListener('click', function () {
  $enterButton.classList.add('hidden');
  $background.className = 'skin-background';
  $loadingLogo.classList.add('hidden');
  $searchBar.classList.remove('hidden');
  $header.classList.remove('hidden');
  $smallLogo.classList.remove('hidden');
  getSkinsData();
});

function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/sprays');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $skinsContainer.innerHTML = ''; // Clears previous content
    for (let i = 0; i < xhr.response.data.length; i++) {
      const skinName = xhr.response.data[i].displayName.toLowerCase();
      if (!name || skinName.includes(name.toLowerCase())) { // Check if search term is empty or matches skin name
        const $div = document.createElement('div'); // outerdiv
        const $imgWrapper = document.createElement('div');
        const $iconImage = document.createElement('img');
        const $p = document.createElement('p');
        const $heartIcon = document.createElement('i');
        $iconImage.src = xhr.response.data[i].fullTransparentIcon;
        $p.textContent = xhr.response.data[i].displayName;
        $div.classList.add('column-fourth');
        $imgWrapper.classList.add('img-wrapper');
        $heartIcon.className = 'fa-regular fa-heart fa-2xl image-heart';
        $div.appendChild($imgWrapper);
        $imgWrapper.appendChild($heartIcon);
        $imgWrapper.appendChild($iconImage);
        $div.appendChild($p);
        $skinsContainer.appendChild($div);
      }
    }
  });
  xhr.send();
}

// SEARCH BAR FUNCTION
$searchBar.addEventListener('input', searchClick);
function searchClick(event) {
  if (event) {
    event.preventDefault();
  }
  const searchSkin = $searchBar.value;
  getSkinsData(searchSkin);
}
