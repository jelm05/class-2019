$(document).ready(function(){
  let canvas = $("#canvas")[0];
  let ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, canvas.width, canvas.height);

  let posX = 30;
  let posY = 0;

  setInterval(function(){

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if( posY < 300 ) {
      posY += 5;
    }

    if( posY >= 300 ) {
      posX += 5;
    }

    ctx.fillStyle = "red";
    ctx.fillRect( posX, posY, 30, 30);
  }, 30);

});
