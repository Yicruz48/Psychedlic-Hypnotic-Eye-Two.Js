/*
Library:
https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.7/two.min.js

Utilities: 
https://codepen.io/manikoth/pen/gOvXvGZ.js
*/

// Demonstrates:
// -------------
// Setting up a frame count system so we can control where we are in the loop
// Using modulo to separate out odd and even items (for fill colours)
// Bringing in easing and using our frame count system to apply graceful movement
// Bringing in a sequencing system so we can control the order in which things start and end animating
// Storing each shape's beginning and end frame value as properties in its array

// Make an instance of two and place it on the page.
const container = document.querySelector("div");

let params = { width: 1000, height: 600 };
const two = new Two(params);
two.appendTo(container);

let shapes = [];

// config for our animation
const loopDuration = 800;
const numberOfShapes = 140;
const shapeIncr = 20;
const timeIncr = 1 / 120;

for (i = 0; i < numberOfShapes; i++) {
  // biggest shape first!
  let size = (numberOfShapes - i) * shapeIncr;

  let shape = two.makeRectangle(500, 300, 600, 20);

  // give it a nice fill colour for even
  if (i % 2 === 0) {
    shape.fill = "#00FF38";
  } else {
    shape.fill = "#FD00FF";
  }

  shape.noStroke();
  shapes.push(shape);
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {
    let aStart = (numberOfShapes - i) * timeIncr;
    let aEnd = i * timeIncr;

    let u = map(t, aStart, 1 - aEnd, 0, 1);
    u = clamp(u, 0, 1);

    //     if (i % 2 === 0) {
    shape.rotation = halfRotation * easeInOutCubic(u);
    //     } else {
    //       shape.rotation = -1 * halfRotation * easeInOutCubic(u)
    //     }
  });
});

two.play();