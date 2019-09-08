$(document).ready( () => {

  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const ONE_LEFT=37, ONE_UP=38, ONE_RIGHT=39, ONE_DOWN=40;
  const TWO_LEFT=65, TWO_UP=87, TWO_RIGHT=68, TWO_DOWN=83;

  let keys = {};
  let intervalArray = [];
  let canvas, c, backgroundColor, playerOne, playerTwo, mainLoop, animationFrame;
  let red = "#ff0000";
  let blue = "#0000ff";

  function Player( id, x, y, width, height, color ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.update = function() {
      this.draw();
    };
    this.draw = function() {
      c.beginPath();
      c.rect( this.x, this.y, this.width, this.height );
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };
  }

  function setup() {
    backgroundColor = "#1f2021";
    canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');
    canvas.width = SCREEN_WIDTH - 20;
    canvas.height = SCREEN_HEIGHT - 20;
    c.fillStyle = backgroundColor;
    c.fillRect( 0, 0, canvas.width, canvas.height);
  }

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

  function startingPos( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor(Math.random() * ( max - min + 1 )) + min;
  }

  function colorDetection( player, xPos, yPos, width, height ) {
    let color = c.getImageData( xPos, yPos, width, height ).data;
    let hexadecimal = "#" + ("000000" + rgbToHex(color[0], color[1], color[2])).slice(-6);

    // If we want to include walls
    // if ( hexadecimal != backgroundColor ) {
    //   mainLoop = undefined;
    //   gameOver( player, hexadecimal );
    // }

    if ( hexadecimal === red || hexadecimal === blue ) {
      console.log( hexadecimal )
      mainLoop = undefined;
      gameOver( player, hexadecimal );
    }
  }

  function rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
      } else {
        return ((r << 16) | (g << 8) | b).toString(16);
      }
  }

  function gameOver( player, touchedColor ) {
    window.cancelAnimationFrame( animationFrame );
    $("#game-over").removeClass("hidden");

    if ( player == "one" && touchedColor == blue ) {
      $("#game-over p").html(
        `
        <span class="red">Player Two</span> wins!<br/>
        <span class="blue">Player One</span> collided with their own light trail!
        `
      );
    }

    if ( player == "one" && touchedColor == red ) {
      $("#game-over p").html(
        `
        <span class="red">Player Two</span> wins!<br/>
        <span class="blue">Player One</span> collided with <span class="red">Player Two's</span> light trail!
        `
      );
    }

    if ( player == "two" && touchedColor == red ) {
      $("#game-over p").html(
        `
        <span class="blue">Player One</span> wins!<br/>
        <span class="red">Player Two</span> collided with their own light trail!
        `
      );
    }

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
    let pOneX, pOneY, pTwoX, pTwoY;
    pOneX = startingPos( 50, (SCREEN_WIDTH - 50) );
    pOneY = startingPos( 50, (SCREEN_HEIGHT - 50) );
    pTwoX = startingPos( 50, (SCREEN_WIDTH - 50) );
    pTwoY = startingPos( 50, (SCREEN_HEIGHT - 50) );

    $(".overlay").addClass("hidden");
    playerOne = new Player( "one", pOneX, pOneY, 10, 10, "#0000ff" );
    playerTwo = new Player( "two", pTwoX, pTwoY, 10, 10, "#ff0000" );

    setup();
    playerOne.update();
    playerTwo.update();

    mainLoop = setInterval( animate, 100 );
    intervalArray.push( mainLoop );
  }

  function animate() {
    animationFrame = window.requestAnimationFrame( animate );

    if ( keys[ONE_LEFT] ){
      colorDetection( playerOne.id, playerOne.x - 1, playerOne.y, playerOne.width, playerOne.height );
      if ( playerOne.x <= 0 ) {
        playerOne.x = 0;
      } else {
        playerOne.update();
        playerOne.x -= 0.1;
      }
    }

    if ( keys[ONE_RIGHT] ){
      colorDetection( playerOne.id, playerOne.x + 11, playerOne.y, playerOne.width, playerOne.height );
      if ( playerOne.x >= (SCREEN_WIDTH - 10) ) {
        playerOne.x = SCREEN_WIDTH - 10;
      } else {
        playerOne.update();
        playerOne.x += 0.1;
      }
    }

    if ( keys[ONE_UP] ){
      colorDetection( playerOne.id, playerOne.x, playerOne.y - 1, playerOne.width, playerOne.height );
      if ( playerOne.y <= 0 ) {
        playerOne.y = 0;
      } else {
        playerOne.update();
        playerOne.y -= 0.1;
      }
    }

    if ( keys[ONE_DOWN] ){
      colorDetection( playerOne.id, playerOne.x, playerOne.y  + 11, playerOne.width, playerOne.height );
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

  $("#start, #restart").on('click', () => {
    $("#start").addClass("hidden");
    $("#restart").removeClass("hidden");
    mainLoop = undefined;
    countdown();
  });

  $(document).keydown(function(e){
    keys[e.which] = true;
  }).keyup(function(e){
    keys[e.which] = false;
  });

});
