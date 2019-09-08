// Don't execute any JS until everything is fully loaded
// Everything between this function
$(document).ready(function(){

  // Grab the canvas HTML tag via its ID
  var canvas = document.getElementById('canvas'),
      // Give the canvas object a context, 2d
      ctx = canvas.getContext('2d'),
      // Particles object we'll use to store all of our particles
      particles = {},
      // starting index for our particles, we'll increment this by 1
      particleIndex = 0,
      // How many particles do we want?
      particleNum = 10;

      // how big will our canvas be
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // background color of our canvas
      ctx.fillStyle = "black";
      // args are x, y, width, height
      ctx.fillRect( 0, 0, canvas.width, canvas.height);

  // Our constructor function to create particles, but we won't draw them yet
  function Particle() {
    // Starting point - we'll start in the center
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    // Speed and direction of our moving particles
    // 10 essentially equates to the distance, in pixels, we continually draw Particles
    // we subtract by 5 to ensure we get negative numbers
    // if we don't have the 5 subtraction, the particles will only draw right and down
    this.xVelocity = Math.random() * 10 - 5;
    this.yVelocity = Math.random() * 10 - 5;

    // increment the particle index
    particleIndex++;
    // target the specific particle we generated via the id
    // and add them to our particles object
    particles[ particleIndex ] = this;

    // set the id according to our individual particle index
    this.id = particleIndex;
    // we'll use these values to control the number of particles we draw before deleting them
    this.life = 0;
    this.death = 200;

    // create a random number that we can pass to our color property to get random color on each particle
    var degrees = parseInt( Math.random() * 360 );
    // hue saturation lightness
    this.color = "hsl(" + degrees + ", 80%, 50%)";

  }

  // Here we'll actually create our method to draw the particles
  Particle.prototype.draw = function(){
    // Increment the x and y values according to the velocity we set before
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Increment the life property so that when we get past this.death, we start delete the particles
    this.life++;
    // if too many particles, starting deleting
    if( this.life > this.death ) {
      delete particles[ this.id ];
    }
    // Set our randomized color
    ctx.fillStyle = this.color;
    //begin drawing the circle
    ctx.beginPath();
    // x, y, radius, starting point, ending point, direction to draw
    ctx.arc( this.x, this.y, 9, 0, Math.PI * 2, false );
    // we want to fill the circle, not ctx.stroke()
    ctx.fill();

    // boundaries of the screen and speed at which it bounces
    // bottom of screen
    if( this.y > canvas.height ) {
      this.yVelocity *= -1;
      this.xVelocity *= 0.2;
    }
    // right side of screen
    if( this.x > canvas.width ) {
      this.xVelocity *= -1;
      this.yVelocity *= 0.2;
    }
    // left side of screen, we chose 10 rather than 0 because we're drawing the particles
    // at a radius of 9
    if( this.y < 10 ) {
      this.yVelocity *= -1;
      this.xVelocity *= 0.2;
    }
    // top of screen
    if( this.x < 10 ) {
      this.xVelocity *= -1;
      this.yVelocity *= 0.2;
    }

  }
  
  function drawTheParticles() {
    // Creat a new particle according to particleNum defined above
    for( var i = 0; i < particleNum; i++ ) {
      // generate particles
      new Particle();
    }

    // We're drawing over the background so the particles appear to have a tail
    // Note the alpha channel
    // If we use ctx.fillStyle = "black" we could make the particles look individualized
    ctx.fillStyle = "rgba( 0, 0, 0, 0.1 )";
    // actually fill the background
    ctx.fillRect( 0, 0, canvas.width, canvas.height );
    // Now we draw the individual particles according to what's stored in our particles object
    for( var i in particles ) {
      // draw the particles
      particles[i].draw();
    }

  }

  // execute our drawTheParticles() function every 30 milliseconds
  setInterval( function(){
    drawTheParticles()
  }, 30);

});
