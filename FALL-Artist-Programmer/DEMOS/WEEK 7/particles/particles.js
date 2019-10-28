$(document).ready(function(){

  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      particles = {},
      particleIndex = 0,
      particleNum = 10;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, canvas.width, canvas.height);

  // Constructor function
  function Particle() {
    // Draw them in the center
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    particleIndex++
    particles[ particleIndex ] = this;

    this.id = particleIndex;
    this.life = 0;
    this.death = 100;

    var degrees = parseInt( Math.random() * 360 );
    this.color = "hsl(" + degrees + ", 80%, 50%";
  }

  // Prototype for a draw method
  Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if( this.life > this.death ) {
      delete particles[ this.id ];
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    // x, y, radius, start point, endpoint, direction in degrees
    // degrees... Math.PI*2 = 360
    ctx.arc( this.x, this.y, 9, 0, Math.PI * 2, false );
    ctx.fill();

  }

  function drawTheParticles() {
    for (var i = 0; i < particleNum; i++) {
      new Particle();
    }

    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i in particles) {
      particles[i].draw();
    }

  }

  setInterval(function(){
    drawTheParticles();
  }, 30);

  console.log(particles);

});
