$(function () {
  loadImages(getParam(search, page));

  $(window).scroll(function () {
    if (
      Math.round($(window).scrollTop()) + $(window).height() ==
      $(document).height()
    ) {
      page++;
      loadImages(getParam(search, page));
    }
  });

  $("form").on("submit", function (e) {
    e.preventDefault();
    $template = $("template").clone()
    $(".item-list .row").html("")
    $template.appendTo($(".item-list .row"));
    search = $("input").val();
    page = 1;
    let param = getParam(search, page);
    console.log(param);
    loadImages(param);
  });
});

let search = "cat";

function getParam(search, page) {
  let param = {
    q: search,
    page: 1,
  };

  return $.param(param);
}

const $item_list = $(".item-list .row");
let page = 1;

function loadImages(param) {
  console.log("load image page", page);
  fetch(
    "https://pixabay.com/api/?key=26037716-84d57e3909d65193e7cd3af9e&" + param
  )
    .then((res) => res.json())
    .then((json) => {
      $.each(json["hits"], function (index, item) {
        const $item = $($("template").html());
        $item.find("img").attr("src", item.webformatURL);
        $item.find(".sponsor").text(item.user);
        $item.find(".like").text(item.likes);

        $item.appendTo($item_list).hide().fadeIn('slow');
      });
    });
}
