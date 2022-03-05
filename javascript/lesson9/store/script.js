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
    const itemPrice = $("form").find("#item-price").val();
    const itemDes = $("form").find("#description").val();
    const imageLink = $("form").find("#item-image").val();
    const itemImage = imageLink === "" ? "https://i.pravatar.cc" : imageLink;

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: itemName,
        price: itemPrice,
        description: itemDes,
        image: itemImage,
        category: "electronic",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        addItemAtHead(json);
      });
  });

  $(".remove-button").on("click", function (e) {
    e.preventDefault();
    
  });
});

const $item_list = $(".items-list .row");
const itemTemplateEl = document.querySelector("template");

function addItem(item) {
  const $item = $(itemTemplateEl.content.cloneNode(true));
  $item.find(".title").text(item.title);
  $item.find(".like").text(item.likes);
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
