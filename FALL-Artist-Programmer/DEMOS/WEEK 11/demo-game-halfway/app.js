$(document).ready(function(){
  console.log("ready");

  const world = $("#world");
  const startGame = $("#startGame");
  const endGame = $("#gameOver");
  const pickupsUI = $("#pickups");

  const floor = 380;
  let firstPlay = true;
  let gravity = 1;
  let mainLoop;
  let pickups = 0;

  let keys = {};
  let LEFT = 37;
  let UP = 38;
  let RIGHT = 39;
  let DOWN = 40;

  // Update our key object
  // Any time a user pressses up, down, left, or right, it will set that value to true
  // With this boolean logic, we can invoke functions according to keypress event
  // You can see this if you uncomment the console.log
  $(document).keydown(function(event){
    keys[event.which] = true;
    // console.log(keys);
  }).keyup(function(event){
    keys[event.which] = false;
  });

  // Begin the game!
  beginGame();

  // Our characater object, we store all things associated with the character
  // The character's position, initializing function, etc.
  // You can see there are many more to fill out
  let character = {
    x: 30,
    y: 200,
    vx: 0,
    vy: 0,
    hits: 0,
    reset: function() {

    },
    init: function() {
      this.div = $("<div>", {
        "id" : "char",
        css: {
          left: this.x,
          top: this.y
        }
      }).appendTo(world);
      this.ground = floor - this.div.height();
      this.right = world.width() - this.div.width();
    },
    hit: function() {

    },
    blink: function() {

    },
    update: function() {
      let char = this;
      char.x += char.vx;
      char.y += char.vy;

      // Make sure character doesn't go through ground
      char.isOnGround = false;
      if( char.y > char.ground) {
        char.y = char.ground;
        char.isOnGround = true;
      }

      // Left wall
      if( char.x < 0) {
        char.x = 0;
        char.vx = 0;
      }

      // Right wall
      if( char.x > char.right) {
        char.x = char.right;
        char.vx = 0;
      }

      // Jumping velocity and gravity pull
      char.vx *= 0.9;
      char.vy += gravity;

      char.div.css({
        top: char.y,
        left: char.x
      });

      char.keyInterval();

    },
    // keyInterval controls our character's movement
    keyInterval: function() {

      if (keys[LEFT]) {
        character.vx -= 2;
      }

      if (keys[RIGHT]) {
        character.vx += 2;
      }

      if (keys[UP] && character.isOnGround) {
        character.vy -= 20;
      }

      if (keys[DOWN]) {
        character.vy += 2;
      }

    }
  };

  // We're going to use this many times to make many different particles
  // We'll then apply CSS classes to alter their appearance
  // It functions very similarly to the character object
  function makeProjectile() {
    let p = {
      x: world.width() + 50,
      y: Math.random() * (world.height() - 40),
      vx: Math.random() * -10 - 5,
    };

    p.div = $("<div>", {
      css: {
        left: p.x,
        top: p.y
      }
    }).appendTo(world);

    // console.log("p: ", p)
    // console.log("pdiv:", p.div);

    p.width = p.div.width();

    p.update = function() {
      p.x += p.vx;

      if( p.x < -p.width ) {
        p.remove();
      }

      if( collisionTest( p.div, character.div )) {
        console.log("collision")
        p.hit();
      }

      p.div.css({
        top: p.y,
        left: p.x
      });

    };

    let loop = setInterval(p.update, 30);

    p.remove = function() {
      clearInterval(loop);
      p.div.remove();
    }

    p.hit = function() {
      p.remove()
    };

    return p;
  }


  // Making an enemy based on that makeProjectile function
  // Just adding some extras to differentiate
  function makeEnemy() {
    let enemy = makeProjectile();
    enemy.div.attr("class", "enemy");

    enemy.hit = function() {
      enemy.remove();
      // character.hit();
    }

    enemy.die = function() {
      enemy.remove();
    }

    enemy.div.data("die", enemy.die);

    return enemy;
  }

  // Another enemy, just with a different background color
  function makeGreenEnemy() {
    let enemy = makeEnemy();

    enemy.div.css({
      backgroundColor: "green"
    });
    return enemy;
  }

  // Again utilizing the makeProjectile function, pickups will be used as something to seek out for the character
  // We'll have to add/remove them if the characters get them, and count them as a score
  function makePickup() {
    let pickup = makeProjectile();
    pickup.hit = function() {
      pickup.remove();
      pickups++;
      updatePickups();
    }

    pickup.die = function() {
      pickup.remove();
    }

    pickup.div.attr("class", "pickup");
    pickup.div.data("die", pickup.die);

    return pickup;

  }

  // Here we begin the game if the user clicks on the screen
  // We also start the main loop here
  function beginGame() {
    $(document).one("click", function(){

      if(firstPlay) {
        character.init();
        firstPlay = false;
      } else {
        // character.reset();
      }

      startGame.hide();
      clearInterval(mainLoop);
      mainLoop = setInterval(runGame, 30);

    });
  }


  // Here we constantly update the character's position
  // We also generate all of the enemy's here
  // You can see we're creating enemies everytime Math.random generates a num under .0025
  // It's a way to limit the number of enemies -- increase those numbers for more enemies
  function runGame() {
    character.update();

    if(Math.random() < 0.025) {
      makeGreenEnemy();
    }

    if(Math.random() < 0.025) {
      makeEnemy();
    }

    if(Math.random() < 0.025) {
      makePickup();
    }

  }

  // Update the UI if the character gets one of the nice yellow blobs
  function updatePickups() {
    pickupsUI.text("Pickups: " + pickups);
  }

  // Collision detection to know if the player hit an enemy or a pickup 
  function collisionTest(a, b) {
    // Exit if a is invisible
    if (a.css("display") == "none") return;

    let aPos = a.position();
    let bPos = b.position();

    let aLeft = aPos.left;
    let aRight = aPos.left + a.width();
    let aTop = aPos.top;
    let aBottom = aPos.top + a.height();

    let bLeft = bPos.left;
    let bRight = bPos.left + b.width();
    let bTop = bPos.top;
    let bBottom = bPos.top + b.height();

    return !(
      bLeft > aRight ||
      bRight < aLeft ||
      bTop > aBottom ||
      bBottom < aTop
    );

  }


});
