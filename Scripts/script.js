// -----------------------------Variables---------------
var cursorContainer = document.querySelector(".cursor-btns");
var allSwitch = document.querySelectorAll(".color-swatch");
var randomColorBtn = document.querySelector("#change-bg");
// ------------------------------Cursor change---------------------
cursorContainer.addEventListener("click", async function (e) {
  var target = e.target.closest("button");
  if (!target) return;

  var cursorImg = target.querySelector("img");
  if (!cursorImg) return;

  var cursorImgSrc = cursorImg.getAttribute("src");

  try {
    const resizedDataUrl = await resizeImg(cursorImgSrc, 32, 32);
    document.body.style.cursor = `url(${resizedDataUrl}) 0 0, auto`;
  } catch (err) {
    console.error("Failed to load or resize cursor image.", err);
  }
});

//------------------------------ Background color change-----------------

allSwitch.forEach(function (swatch) {
  swatch.addEventListener("click", function () {
    var color = this.getAttribute("data-color");
    if (color) {
      document.body.style.background = color;
    } else {
      console.warn("No data-color attribute found on swatch.");
    }
  });
});

// ----------------------------  Random color change----------------------

randomColorBtn.addEventListener("click", function () {
  var randomColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;

  document.body.style.background = randomColor;
});
// ------------------------------Functions---------------------
// Resize image function
function resizeImg(originalImgSrc, newWidth = 32, newHeight = 32) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalImgSrc;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = function (e) {
      reject(e);
    };
  });
}
// Random number generator
function randomNumber() {
  return Math.ceil(Math.random() * 255);
}
