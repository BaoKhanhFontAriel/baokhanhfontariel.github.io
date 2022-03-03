$(function () {
  $("#myInput").keyup(function () {
    let input = $("input").val();
    $("#myUL li").each(function (index) {
      let text = $(this).children(":first").text();
      if (text.toUpperCase().includes(input.toUpperCase())) {
        $(this).css("display", "block");
      } else {
        $(this).css("display", "none");
      }
    });
  });
});
