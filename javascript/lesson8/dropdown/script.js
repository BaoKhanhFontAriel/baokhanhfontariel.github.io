$(function () {
  $(".dropdown").hover(showMenu, hideMenu);
});

function showMenu() {
  $(".dropdown-content").slideDown("medium");
}

function hideMenu() {
  $(".dropdown-content").slideUp("medium");
}
