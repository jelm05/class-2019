// Here we declare all of our variables at once, to be used later
// They're in the global scope
var canvas,
    ctx,
    x = 150,
    y = 150,
    vx = 5,
    vy = 5,
    screenWidth = window.innerWidth,
    screenHeight = window.innerHeight;

// Here we render our circle using .beginPath(), .arc(), and .fill()
// x and y correspond to the starting position of the circle, and r is the radius
// we have to pass those values when we invoke circle within our draw function below
function circle( x, y, r ) {
  ctx.beginPath();
  ctx.arc( x, y, r, 0, Math.PI*2, true );
  ctx.fillStyle = "blue";
  ctx.fill();
};

// The draw function will be invoked within our start function, and set it to interval, so we can re-draw
// every time we push an arrow button, noted in the grabKeys function
function draw() {
  // The clear function redraws the background and covers over whatever previous circle we drew
  // if we don't do this, we'll get a snake-like line of blue circles instead of one circle appearing
  // to move across the page -- we're faking an animation
  // feel free to delete the clear() function and see how it works
  clear();
  // ctx.fillStyle = "blue";
  // here we draw the circle
  circle( x, y, 10 );
}

function clear() {
  // this will make the background white if we don't update the fillStyle()
  // ctx.clearRect(0, 0, screenWidth, screenHeight);
  ctx.fillStyle = "grey";
  // redraw the canvas every time we invoke clear()
  ctx.fillRect( 0, 0, canvas.width, canvas.height);
};

// Our start function is what actually draws the canvas
function start() {
  // get the canvas in our HTML file
  canvas = document.getElementById('canvas');
  // set the context to 2d
  ctx = canvas.getContext('2d');
  // set the width and height according to the width and height of the window
  // If we adjust the size of the browser, and refresh, the canvas size will be different
  canvas.width = screenWidth;
  canvas.height = screenHeight;
  // set the background color of the canvas
  ctx.fillStyle = "grey";
  // here we render the canvas
  ctx.fillRect( 0, 0, canvas.width, canvas.height);
  // run the draw() function every 10 milliseconds
  // 1000 milliseconds = 1 second
  return setInterval( draw, 10 );
}

// this function grabs the keycode of the key we press
function grabKeys( event ) {

  // pass the keycode to the switch statement, and if it's 37, 38, 39, or 40
  // if it's one of those, do something
  // technically we're grabbing all key codes, but we're only doign something if we press an arrow key
  switch ( event.keyCode ) {

    // left
    case 37:
    // update the X position so long as X is greater than zero
    // this makes the ball stop drawing if we hit an edge
      if (x - vx > 0){
        x -= vx;
      }
    break;

    // up
    case 38:
    // update the Y position so long as Y is greater than zero
    // this makes the ball stop drawing if we hit an edge
      if (y - vy > 0){
        y -= vy;
      }
    break;

    // right
    case 39:
    // Same thing, but this time if X is less than the far right edge of the window
      if (x + vx < screenWidth){
        x += vx;
      }
    break;

    // down
    case 40:
    // Same thing, but this time if Y is less than the bottom edge of the window
      if (y + vy < screenHeight){
        y += vy;
      }
    break;

  }

}
// Invoke our start function to draw the canvas and continually draw the circle
start();
// Listen for click events on the window
window.addEventListener( 'keydown', grabKeys, true);
