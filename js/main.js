const dateSelectElement = document.getElementById('date__select');
const zoomImages = document.querySelectorAll('.zoom__img');
let magnifiedImage = document.querySelector(".large__img");
let originalImage;
let originalImageWidth;
let originalImageHeight;
const zoomContainer = document.getElementById("zoom");
const body = document.body;

let scrollEnabled = true;

function initializeImageDimensions() {
  originalImage = document.querySelector(".zoom__img");
  originalImageWidth = originalImage.width;
  originalImageHeight = originalImage.height;
}

window.addEventListener('load', function() {
  initializeImageDimensions();
});

function updateMagnifiedImage(mouseX, mouseY) {
  const magnifiedImageStyle = magnifiedImage.style;
  let xPercent = (mouseX / originalImageWidth) * 100;
  let yPercent = (mouseY / originalImageHeight) * 100;

  if (mouseX > 0.01 * originalImageWidth) {
    xPercent += 0.15 * xPercent;
  }

  if (mouseY >= 0.01 * originalImageHeight) {
    yPercent += 0.15 * yPercent;
  }

  magnifiedImageStyle.backgroundPositionX = xPercent - 9 + "%";
  magnifiedImageStyle.backgroundPositionY = yPercent - 9 + "%";
  magnifiedImageStyle.left = mouseX - 69 + "px";
  magnifiedImageStyle.top = mouseY - 69 + "px";
  magnifiedImageStyle.opacity = 1;
}

function hideMagnifiedImage() {
  const magnifiedImageStyle = magnifiedImage.style;
  magnifiedImageStyle.opacity = 0;
}

dateSelectElement.addEventListener('change', function() {
  const selectedDate = dateSelectElement.value;

  zoomImages.forEach((image) => {
    if (image.getAttribute('data-id') === selectedDate) {
      const zoomUrl = image.getAttribute('src').split("\\")
      image.style.display = 'block';
      magnifiedImage.style.background = `url(images/${zoomUrl[zoomUrl.length-1]}) no-repeat #ffffff`
    } else {
      image.style.display = 'none';
    }
  });
});

zoomContainer.addEventListener("mousemove", function (e) {
  if (!scrollEnabled) {
    e.preventDefault();
  }

  const mouseX = e.pageX - this.offsetLeft;
  const mouseY = e.pageY - this.offsetTop;
  updateMagnifiedImage(mouseX, mouseY);
}, false);

zoomContainer.addEventListener("touchmove", function (e) {
  if (!scrollEnabled) {
    e.preventDefault();
  }

  const touch = e.touches[0];
  const mouseX = touch.clientX - this.offsetLeft;
  const mouseY = touch.clientY - this.offsetTop;
  updateMagnifiedImage(mouseX, mouseY);
}, false);

zoomContainer.addEventListener("mouseout", function () {
  hideMagnifiedImage();
}, false);

zoomContainer.addEventListener("touchend", function () {
  hideMagnifiedImage();
}, false);

function disableScroll() {
  scrollEnabled = false;
  body.style.overflow = "hidden";
}

function enableScroll() {
  scrollEnabled = true;
  body.style.overflow = "auto";
}
zoomContainer.addEventListener("touchstart", disableScroll, false);

zoomContainer.addEventListener("touchend", enableScroll, false);
