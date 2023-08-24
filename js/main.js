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
      if (xhr.response.data[i].fullTransparentIcon !== null) {
        data.sprays.push(xhr.response.data[i]);
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

        // Create the heart button element
        const $heartButton = document.createElement('i');
        $heartButton.classList.add('fa-regular', 'fa-heart', 'fa-2xl', 'image-heart');
        $heartButton.addEventListener('click', favoriteClicked);

        $div.appendChild($imgWrapper);
        $imgWrapper.appendChild($heartIcon);
        $imgWrapper.appendChild($heartButton);
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
  event.preventDefault();
  const searchSkin = $searchBar.value;
  $skinsContainer.innerHTML = ''; // Clears previous content
  for (let i = 0; i < data.sprays.length; i++) {
    const sprayName = data.sprays[i].displayName.toLowerCase();
    if ((!searchSkin || sprayName.includes(searchSkin.toLowerCase())) && (data.sprays[i].fullTransparentIcon !== null)) {
      const $div = document.createElement('div'); // outerdiv
      const $imgWrapper = document.createElement('div');
      const $iconImage = document.createElement('img');
      const $p = document.createElement('p');
      const $heartIcon = document.createElement('i');

      $iconImage.src = data.sprays[i].fullTransparentIcon;
      $p.textContent = data.sprays[i].displayName;

      $div.classList.add('column-fourth');
      $imgWrapper.classList.add('img-wrapper');
      $heartIcon.className = 'fa-regular fa-heart fa-2xl image-heart';

      const $heartButton = document.createElement('i');
      $heartButton.classList.add('fa-regular', 'fa-heart', 'fa-2xl', 'image-heart');
      $heartButton.addEventListener('click', favoriteClicked);

      $div.appendChild($imgWrapper);
      $imgWrapper.appendChild($heartIcon);
      $imgWrapper.appendChild($heartButton);
      $imgWrapper.appendChild($iconImage);
      $div.appendChild($p);
      $skinsContainer.appendChild($div);
    }
  }
}

function favoriteClicked(event) {
  const clickedHeart = event.target;
  const clickedSprayDiv = clickedHeart.closest('.column-fourth'); // Add the dot before 'column-fourth'

  const sprayIndex = data.sprays.findIndex(function (spray) {
    return spray.fullTransparentIcon === clickedSprayDiv.querySelector('img').src;
  });

  if (sprayIndex !== -1) {
    // Check if the spray is not already in favorites
    if (!data.favorites.includes(data.sprays[sprayIndex])) {
      data.favorites.push(data.sprays[sprayIndex]);
      // Save updated favorites array to local storage
      localStorage.setItem('favorites', JSON.stringify(data.favorites));
      clickedHeart.classList.add('fa-solid');
      clickedHeart.classList.remove('fa-regular');
    } else {
      // If the spray is already in favorites, remove it and update the heart icon
      data.favorites = data.favorites.filter(function (favSpray) {
        return favSpray.fullTransparentIcon !== data.sprays[sprayIndex].fullTransparentIcon;
      });
      localStorage.setItem('favorites', JSON.stringify(data.favorites));
      clickedHeart.classList.remove('fa-solid');
      clickedHeart.classList.add('fa-regular');
    }
  }
}
