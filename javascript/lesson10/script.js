$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      loadImages();
    }
  });
});

const $item_list = $(".item-list .row");
const itemTemplateEl = document.querySelector("template");

function loadImages(success) {
  fetch(
    "https://api.unsplash.com/photos/?client_id=f7N-c7ynV9x6FAE3c1mP35-_1uRQeFNKMYlRro55XGA&page="
  )
    .then((res) => res.json())
    .then((json) => {
      $.each(json, function (index, item) {
        const $item = $(itemTemplateEl.content.cloneNode(true));
        $item.find("img").attr("src", item.urls.thumb);
        $item.find(".sponsor").text(item.user.name);
        $item.find(".like").text(item.likes);
        $item.appendTo($item_list);
      });
    });
}
