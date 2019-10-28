$(document).ready(function(){

  let win = $(window);
  let winWidth = win.width();
  let left = $("#left");
  let right = $("#right");
  let slider = $("#slider");
  let slide = $(".slide");
  let slideCount = slide.length;
  let sliderWidth = slider.width();
  let currentSlide = 0;

  console.log("window width: ", winWidth);
  console.log("slider width: ", sliderWidth);
  console.log("num of slides: ", slideCount);

  slider.css({
    "width" : slide.length * winWidth
  });
  console.log("New slider width: ", $("#slider").width());

  left.click(function(){
    if ( currentSlide <= 0 ) {
      // Do nothing
      console.log("You're at the beginning")
    } else {
      console.log(currentSlide);
      currentSlide--
      slider.animate({
          marginLeft : "+="+winWidth
      });
    }
  });

  right.click(function(){
    if ( currentSlide >= slideCount-1 ) {
      // Do nothing
      console.log("You're at the end")
    } else {
      console.log(currentSlide);
      currentSlide++
      slider.animate({
          marginLeft : "-="+winWidth
      });
    }
  });

});
