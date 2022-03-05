$(function () {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  fetch("https://fakestoreapi.com/products/" + id)
    .then((res) => res.json())
    .then((json) => {
        const $item = $(".item");
        console.log($item.find("img"));
        $item.find("img").attr("src", json.image);
        $item.find(".title").text(json.title);
        $item.find(".price").text(json.price);
        $item.find(".category span").text(json.category);
        $item.find(".description .content").text(json.description);

    });
});
