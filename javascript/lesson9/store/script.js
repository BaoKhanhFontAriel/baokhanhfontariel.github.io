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
        clearForm();
      });
  });
});

function makeNewPage(item) {
  const url = new URL('../store/itempage.html', 'http://baokhanhfontariel.github.io');
  $(item).parent().attr("href", url);
}

const $item_list = $(".items-list .row");
const itemTemplateEl = $("template");

function addItem(item) {
  const $item = $(itemTemplateEl.html());
  console.log($item)
  $item.attr("id", item.id);
  $item.find(".title").text(item.title);
  $item.find(".price").text(item.price);
  $item.find(".image").attr("src", item.image);
  $item.find(".remove-button").on("click", function (e) {
    e.preventDefault();
    removeItem(item);
  });
  $item.find(".edit-button").on("click", function (e) {
    e.preventDefault();
    editItem(item);
  });
  $item.find("a").on("click", function (e) {
    e.preventDefault()
    console.log("open link");
    makeNewPage(this);
    const href = $(this).parent().attr('href')
    console.log(href)
    window.open(href, "_blank");
  });
  $item.appendTo($item_list);
  clearForm();
}

function removeItem(item) {
  fetch("https://fakestoreapi.com/products/" + item.id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => {
      const id = "#" + item.id;
      $item_list.find(id).remove();
      clearForm();
    });
}
function editItem(item) {
  $(".update-button").remove();
  $(".add-button").css("display", "none");
  let update = document.createElement("button");
  $(update).attr({
    type: "button",
    class: "update-button btn btn-primary",
  });
  $(update).text("Update");
  $(update).appendTo($("form"));
  $(".update-button").css("display", "block");
  console.log($("form").find("#item-name"));
  $("form").find("#item-name").val(item.title);
  $("form").find("#item-price").val(item.price);
  $("form").find("#description").val(item.description);
  $("form").find("#item-image").val(item.image);

  $("form")
    .find(".update-button")
    .on("click", function (e) {
      const itemName = $("form").find("#item-name").val();
      const itemPrice = $("form").find("#item-price").val();
      const itemDes = $("form").find("#description").val();
      const imageLink = $("form").find("#item-image").val();
      const itemImage = imageLink === "" ? "https://i.pravatar.cc" : imageLink;

      fetch("https://fakestoreapi.com/products/" + item.id, {
        method: "PUT",
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
          const id = "#" + item.id;
          $item = $item_list.find(id);
          $item.find(".title").text(itemName);
          $item.find(".price").text(itemPrice);
          $item.find(".image").attr("src", itemImage);
          clearForm();
          $(".add-button").css("display", "block");
          $(".update-button").remove();
        });
    });
}

function clearForm() {
  $("form").trigger("reset");
}

function addItemAtHead(item) {
  const $item = $(itemTemplateEl.html());
  $item.attr("id", item.id);
  $item.find(".title").text(item.title);
  $item.find(".price").text(item.price);
  $item.find(".image").attr("src", item.image);

  $item.prependTo($item_list);
  $(".remove-button").on("click", function (e) {
    e.preventDefault();
    removeItem(item);
  });
  $item.find(".edit-button").on("click", function (e) {
    e.preventDefault();
    editItem(item);
  });
  $item.find("a").on("click", function (e) {
    e.preventDefault()
    console.log("open link");
    makeNewPage(this);
    const href = $(this).parent().attr('href')
    console.log(href)
    window.open(href, "_blank");
  });
}


