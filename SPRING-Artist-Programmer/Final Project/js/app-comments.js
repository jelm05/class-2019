$(document).ready( () => {

  // Width and height of screen, and keys to watch for the game
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const ONE_LEFT=37, ONE_UP=38, ONE_RIGHT=39, ONE_DOWN=40;
  const TWO_LEFT=65, TWO_UP=87, TWO_RIGHT=68, TWO_DOWN=83;

  // Store keys boolean values to use in animation function
  let keys = {};
  // We create animation intervals, will need to clear these later
  let intervalArray = [];
  // All other assorted variables
  let canvas, c, backgroundColor, playerOne, playerTwo, mainLoop, animationFrame;

  // Starting player colors
  let red = "#ff0000";
  let blue = "#0000ff";

  // Player constructor function
  function Player( id, x, y, width, height, color ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    // Use this to keep re-drawing
    this.update = function() {
      this.draw();
    };

    // We'll continually re-draw our rectangle and update the x and y values
    this.draw = function() {
      c.beginPath();
      c.rect( this.x, this.y, this.width, this.height );
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };

  }

  // Set up our canvas according to the width and height of the screen
  function setup() {
    backgroundColor = "#1f2021";
    canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    c.fillStyle = backgroundColor;
    c.fillRect( 0, 0, canvas.width, canvas.height);
  }

  // Countdown to the start of the game
  function countdown() {
    let counter = 5;
    let interval = setInterval( () => {
      $("#rules h1").html( counter );
      counter--;
      if( counter == -1 ) {
        intervalArray = [];
        startGame();
      }
    }, 10);
  }

  // Randomize our starting function
  function startingPos( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor(Math.random() * ( max - min + 1 )) + min;
  }

  // https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
  // We're detecting the color of the canvas to simulate collision detection
  function colorDetection( player, xPos, yPos, width, height ) {
    // Grab the color image data, it returns an array
    let color = c.getImageData( xPos, yPos, width, height ).data;
    // We pass our array to our rgbToHex() function to get the hexadecimal value, so it's easier
    // to check to see
    let hexadecimal = "#" + ("000000" + rgbToHex(color[0], color[1], color[2])).slice(-6);

    // This version of the if statement will end the game if we hit the wall
    // If the color we've detected is not the same as the background color,
    // that means we've touched something and need to end the game
    // if ( hexadecimal != backgroundColor ) {
    //   mainLoop = undefined;
    //   gameOver( player, hexadecimal );
    // }

    // This if statement we check to see if we've encountered red or blue color
    if ( hexadecimal === red || hexadecimal === blue ) {
      mainLoop = undefined;
      gameOver( player, hexadecimal );
    }

  }

  // Convert that color array above to hexademical value for easier comparison
  function rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
      } else {
        return ((r << 16) | (g << 8) | b).toString(16);
      }
  }

  function gameOver( player, touchedColor ) {
    // If we've invoked gameOver, cancel the animation frame
    window.cancelAnimationFrame( animationFrame );
    // Show the game over screen
    $("#game-over").removeClass("hidden");

    // if blue touches blue, red wins
    if ( player == "one" && touchedColor == blue ) {
      $("#game-over p").html(
        `
        <span class="red">Player Two</span> wins!<br/>
        <span class="blue">Player One</span> collided with their own light trail!
        `
      );
    }

    // if blue touches red, red wins
    if ( player == "one" && touchedColor == red ) {
      $("#game-over p").html(
        `
        <span class="red">Player Two</span> wins!<br/>
        <span class="blue">Player One</span> collided with <span class="red">Player Two's</span> light trail!
        `
      );
    }

    // if red touches red, blue wins
    if ( player == "two" && touchedColor == red ) {
      $("#game-over p").html(
        `
        <span class="blue">Player One</span> wins!<br/>
        <span class="red">Player Two</span> collided with their own light trail!
        `
      );
    }

    // if red touches blue, blue wins
    if ( player == "two" && touchedColor == blue ) {
      $("#game-over p").html(
        `
        <span class="blue">Player One</span> wins!<br/>
        <span class="red">Player Two</span> collided with <span class="blue">Player One's</span> light trail!
        `
      );
    }

  }

  function startGame() {
    // Randomize our starting positions for the players
    let pOneX, pOneY, pTwoX, pTwoY;
    pOneX = startingPos( 50, (SCREEN_WIDTH - 50) );
    pOneY = startingPos( 50, (SCREEN_HEIGHT - 50) );
    pTwoX = startingPos( 50, (SCREEN_WIDTH - 50) );
    pTwoY = startingPos( 50, (SCREEN_HEIGHT - 50) );

    // Hide the overlay
    $(".overlay").addClass("hidden");

    // Player One is Blue
    playerOne = new Player( "one", pOneX, pOneY, 10, 10, "#0000ff" );
    // Player Two is red
    playerTwo = new Player( "two", pTwoX, pTwoY, 10, 10, "#ff0000" );

    // Setup our canvas
    setup();

    // Update our players position according to wherever they were generated
    playerOne.update();
    playerTwo.update();

    // This invokes our animation function and sets it to an interval so
    // we're contasntly updating the position of the player
    mainLoop = setInterval( animate, 100 );

    // Add our loop to our intervalArray so we can clear it later
    intervalArray.push( mainLoop );
  }

  function animate() {

    // Start our animation frame, which we'll cancel later
    animationFrame = window.requestAnimationFrame( animate );

    // If the key we're pressing returns true, then do the following code
    // ONE_LEFT and TWO_LEFT correspond to player one and two respectively

    if ( keys[ONE_LEFT] ){

      // Only invoke colorDection when we're pressing a button
      // Otherwise it would just be too much if we put it in our animation interval
      colorDetection( playerOne.id, playerOne.x - 1, playerOne.y, playerOne.width, playerOne.height );

      // If player.x is at 0 then we've hit the left wall
      if ( playerOne.x <= 0 ) {
        playerOne.x = 0;
      } else {
        playerOne.update();
        playerOne.x -= 0.1;
      }

    }

    if ( keys[ONE_RIGHT] ){

      colorDetection( playerOne.id, playerOne.x + 11, playerOne.y, playerOne.width, playerOne.height );

      // Canvas calculating position at top left of player so need to put that -10,
      // because the player is 10 pixels wide
      if ( playerOne.x >= (SCREEN_WIDTH - 10) ) {
        playerOne.x = SCREEN_WIDTH - 10;
      } else {
        playerOne.update();
        playerOne.x += 0.1;
      }

    }

    if ( keys[ONE_UP] ){

      colorDetection( playerOne.id, playerOne.x, playerOne.y - 1, playerOne.width, playerOne.height );

      // If zero, we're at the top
      if ( playerOne.y <= 0 ) {
        playerOne.y = 0;
      } else {
        playerOne.update();
        playerOne.y -= 0.1;
      }

    }

    if ( keys[ONE_DOWN] ){

      colorDetection( playerOne.id, playerOne.x, playerOne.y  + 11, playerOne.width, playerOne.height );

      // Same thing as above with -10, just on the bottom instead of right
      if ( playerOne.y >= (SCREEN_HEIGHT - 10) ) {
        playerOne.y = SCREEN_HEIGHT - 10;
      } else {
        playerOne.update();
        playerOne.y += 0.1;
      }

    }

    ///////////////////////////////////
    ////////   PLAYER TWO   ///////////
    ///////////////////////////////////

    if ( keys[TWO_LEFT] ){

      colorDetection( playerTwo.id, playerTwo.x - 1, playerTwo.y, playerTwo.width, playerTwo.height );

      if ( playerTwo.x <= 0 ) {
        playerTwo.x = 0;
      } else {
        playerTwo.update();
        playerTwo.x -= 0.1;
      }

    }

    if ( keys[TWO_RIGHT] ){

      colorDetection( playerTwo.id, playerTwo.x + 11, playerTwo.y, playerTwo.width, playerTwo.height );

      if ( playerTwo.x >= (SCREEN_WIDTH - 10) ) {
        playerTwo.x = SCREEN_WIDTH - 10;
      } else {
        playerTwo.update();
        playerTwo.x += 0.1;
      }

    }

    if ( keys[TWO_UP] ){

      colorDetection( playerTwo.id, playerTwo.x, playerTwo.y - 1, playerTwo.width, playerTwo.height );

      if ( playerTwo.y <= 0 ) {
        playerTwo.y = 0;
      } else {
        playerTwo.update();
        playerTwo.y -= 0.1;
      }

    }

    if ( keys[TWO_DOWN] ){

      colorDetection( playerTwo.id, playerTwo.x, playerTwo.y + 11, playerTwo.width, playerTwo.height );

      if ( playerTwo.y >= (SCREEN_HEIGHT - 10) ) {
        playerTwo.y = SCREEN_HEIGHT - 10;
      } else {
        playerTwo.update();
        playerTwo.y += 0.1;
      }

    }

  }

  // Hide and remove overlays according to what we click
  $("#start, #restart").on('click', () => {
    $("#start").addClass("hidden");
    $("#restart").removeClass("hidden");
    countdown();
  });

  // This is where we listen for key press
  // If we press a key, set that key value to true
  // So for our if statements in animate() it will return true
  $(document).keydown(function(e){
    keys[e.which] = true;
  }).keyup(function(e){
    keys[e.which] = false;
  });

});
