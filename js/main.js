
const $enterButton = document.querySelector('.enter-btn');
// const $body = document.querySelector('body');
// const $firstLogo = document.querySelector('.first-logo'); // Assuming you have a .first-logo element
// const $header = document.querySelector('.header'); // Assuming you have a .header element
const $mainSearch = document.querySelector('.search-bar-full');

// Add a click event listener to the button
$enterButton.addEventListener('click', function () {
  // Hide the button, background image, and .first-logo
  $enterButton.classList.add = 'hidden';
  // $body.style.backgroundImage = 'none';
  // $firstLogo.style.display = 'none';
  // const clicked = $enterButton;
  // if (clicked === true);
  $mainSearch.classList.add = 'hidden';
  // // Show the header
  // $header.style.display = 'flex';
  // // show the new background image
  // // $body.style.backgroundImage = 'url(../images/mainbg.jpg)';
  // // show the ol of the weapon list
  // $displayIcon.style.display = 'flex';
  getSkinsData();
});

const $displayIcon = document.querySelector('.display-icon');
function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons/skins');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.data.length; i++) {
      const $imgWrapper = document.createElement('div');

      const $iconImage = document.createElement('img');
      const $div = document.createElement('div'); // outerdiv
      const $p = document.createElement('p');
      // const $video = document.createElement('video');

      $iconImage.src = xhr.response.data[i].displayIcon; // Set the image source

      $p.textContent = xhr.response.data[i].displayName;
      // $video.src = xhr.response.data[i].streamedVdieo;
      $div.classList.add('container');
      $imgWrapper.classList.add('img-wrapper');

      $displayIcon.appendChild($div);
      $div.appendChild($iconImage);
      $div.appendChild($p);
      $div.appendChild($imgWrapper);
      $imgWrapper.appendChild($iconImage);
      // $div.appendChild($video);

    }
  });
  xhr.send();
}
