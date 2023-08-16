
const $enterButton = document.querySelector('.enter-button');
const $background = document.querySelector('#background');
const $loading = document.querySelector('.loading');

$enterButton.addEventListener('click', function () {
  $enterButton.classList.add('hidden');
  $background.className = 'skin-background';
  $loading.classList.add('hidden');
  getSkinsData();
});

const $skinsContainer = document.querySelector('.skins-container');
function getSkinsData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons/skins');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < 25; i++) {
      const $imgWrapper = document.createElement('div');
      const $iconImage = document.createElement('img');
      const $div = document.createElement('div'); // outerdiv
      const $p = document.createElement('p');
      // const $video = document.createElement('video');

      $iconImage.src = xhr.response.data[i].displayIcon; // Set the image source

      $p.textContent = xhr.response.data[i].displayName;
      // $video.src = xhr.response.data[i].streamedVdieo;
      $div.classList.add('column-third');
      $imgWrapper.classList.add('img-wrapper');

      $div.appendChild($iconImage);
      $div.appendChild($p);
      $div.appendChild($imgWrapper);
      $imgWrapper.appendChild($iconImage);
      $skinsContainer.appendChild($div);
      // $div.appendChild($video);

    }
  });
  xhr.send();
}
