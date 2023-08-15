
const $enterButton = document.querySelector('.enter-button');
const $body = document.body;
const $firstLogo = document.querySelector('.first-logo'); // Assuming you have a .first-logo element
const $header = document.querySelector('.header'); // Assuming you have a .header element
const $mainSearch = document.querySelector('.search-bar-full');

// Add a click event listener to the button
$enterButton.addEventListener('click', function () {
  // Hide the button, background image, and .first-logo
  $enterButton.style.display = 'none';
  $body.style.backgroundImage = 'none';
  $firstLogo.style.display = 'none';
  const clicked = $enterButton;
  if (clicked === true);
  $mainSearch.style.display = 'flex';
  // Show the header
  $header.style.display = 'flex';
  $body.style.backgroundImage = 'url(../images/mainbg.jpg)';
});
