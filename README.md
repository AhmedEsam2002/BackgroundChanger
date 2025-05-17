# Background and Cursor Changer

A simple, interactive web application that allows users to change the webpage's background color and cursor style.

![Background and Cursor Changer](https://i.imgur.com/placeholder.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Code Explanation](#code-explanation)
  - [HTML](#html)
  - [CSS](#css)
  - [JavaScript](#javascript)
- [How to Use](#how-to-use)
- [Browser Compatibility](#browser-compatibility)

## Overview

The Background and Cursor Changer is a simple web application that demonstrates DOM manipulation with JavaScript. It allows users to change the webpage's background color using a predefined color palette or a random color generator. Additionally, users can change the cursor style to different options.

## Features

- **Background Color Options:**
  - Choose from 5 predefined colors
  - Generate random RGB colors
- **Cursor Style Options:**
  - Default cursor
  - Pointer cursor
  - Hand cursor
  - Crosshair cursor
- **Responsive Design:**
  - Works on both desktop and mobile devices

## Project Structure

```
BackgroundChanger/
├── index.html          # Main HTML file
├── Scripts/
│   └── script.js       # JavaScript functionality
├── Style/
│   └── styles.css      # CSS styling
└── README.md           # Project documentation
```

## Code Explanation

### HTML

The HTML structure consists of:

- Header with the title
- A card container with:
  - Cursor style selection buttons
  - Color palette with predefined colors
  - Random color generator button
- Footer

Each cursor button contains an icon and text, while the color palette consists of div elements with specific background colors.

### CSS

The CSS provides:

- Modern UI with glassmorphic design (blur effects and transparency)
- Smooth animations and transitions
- Responsive layout for different screen sizes
- Interactive elements (hover and active states)
- Flexbox layout for organizing UI components

### JavaScript

The JavaScript code is organized into three main sections:

#### 1. Variable Declarations

```javascript
var cursorContainer = document.querySelector(".cursor-btns");
var allSwitch = document.querySelectorAll(".color-swatch");
var randomColorBtn = document.querySelector("#change-bg");
```

These variables store references to important DOM elements:

- `cursorContainer`: The container for all cursor style buttons
- `allSwitch`: All color swatches in the color palette
- `randomColorBtn`: The random color generator button

#### 2. Event Listeners

**Cursor Change:**

```javascript
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
```

This code:

- Uses event delegation to handle clicks on any button within the cursor container
- Finds the closest button element to the click target
- Extracts the image source from the button
- Resizes the image using the `resizeImg` function
- Sets the document's cursor style to the resized image

**Background Color Change:**

```javascript
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
```

This code:

- Adds a click event listener to each color swatch
- Gets the color value from the `data-color` attribute
- Changes the background color of the document body

**Random Color Generator:**

```javascript
randomColorBtn.addEventListener("click", function () {
  var randomColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  document.body.style.background = randomColor;
});
```

This code:

- Generates a random RGB color using the `randomNumber` function
- Sets the document body's background to the random color

#### 3. Utility Functions

**Image Resize Function:**

```javascript
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
```

This function:

- Takes an image source URL and desired dimensions
- Creates a new Image object and loads the source image
- Uses a canvas element to resize the image to the specified dimensions
- Returns a Promise that resolves with the resized image as a data URL
- Handles loading errors appropriately

**Random Number Generator:**

```javascript
function randomNumber() {
  return Math.ceil(Math.random() * 255);
}
```

This simple function:

- Generates a random integer between 1 and 255
- Used for creating random RGB color values

## How to Use

1. Open `index.html` in a web browser
2. To change the cursor style:
   - Click on any of the cursor style buttons
3. To change the background color:
   - Click on any color swatch in the palette to apply that color
   - Click the "Random Color" button to generate a random background color

## Browser Compatibility

This application works best in modern browsers that support:

- ES6+ JavaScript
- CSS3 features including flexbox and animations
- HTML5 canvas for image manipulation

Tested and working in:

- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 13+
