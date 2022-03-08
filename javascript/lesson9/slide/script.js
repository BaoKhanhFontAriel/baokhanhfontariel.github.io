$(function () {
  showSlide(currIndex);

  $(".prev").on("click", function () {
    currIndex--;
    showSlide(currIndex);
    resetMyInterval();
  });

  $(".next").on("click", function () {
    currIndex++;
    showSlide(currIndex);
    resetMyInterval();
  });

  $(".small-image img").each(function (index) {
    $(this).on("click", function (e) {
      e.preventDefault();
      currIndex = index;
      showSlide(currIndex);
      resetMyInterval();
    });
  });
});

let myInterval = setInterval(function () {
  currIndex++;
  showSlide(currIndex);
}, 2000);

let currIndex = 0;

function showSlide(index) {
  let slides = $(".mySlides");
  let smallImages = $(".small-image img");
  let captionText = $("#caption");

  if (index == -1) {
    index = slides.length - 1;
  }
  if (index == slides.length) {
    index = 0;
  }

  console.log(index);

  for (let i = 0; i < slides.length; i++) {
    $(slides[i]).css("display", "none");
  }

  for (let i = 0; i < smallImages.length; i++) {
    $(smallImages[i]).removeClass("active");
  }

  $(slides[index]).css("display", "block");
  $(smallImages[index]).addClass("active");
  captionText.text($(smallImages[index]).attr("alt"));
  currIndex = index;
}

function resetMyInterval() {
  clearInterval(myInterval);
  myInterval = setInterval(function () {
    currIndex++;
    showSlide(currIndex);
  }, 2000);
}
