//jshint esversion:6

//code For Scroll Button

const scrollButton = document.querySelectorAll(".scroll-top")[0];

scrollButton.addEventListener("click", function() {
  $("html, body").animate({scrollTop: 0}, 800);
});
