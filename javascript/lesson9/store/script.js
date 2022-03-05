$(function () {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      $.each(json, function (index, item) {
        addItem(item);
      });
    });

  $("form").on("submit", function (e) {
    e.preventDefault();
    const itemName = $("form").find("#item-name").val();
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: itemName,
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    }).then((res) => {
      addItemAtHead(res);
    });
  });
});

const $item_list = $(".items-list .row");
const itemTemplateEl = document.querySelector("template");

function addItem(item) {
  const $item = $(itemTemplateEl.content.cloneNode(true));
  $item.find(".title").text(item.title);
  $item.find(".price").text(item.price);
  $item.find(".image").attr("src", item.image);
  $item.appendTo($item_list);
}

function addItemAtHead(item) {
  const $item = $(itemTemplateEl.content.cloneNode(true));
  $item.find(".title").text(item.title);
  $item.find(".price").text(item.price);
  $item.find(".image").attr("src", item.image);
  $item.prependTo($item_list);
}
