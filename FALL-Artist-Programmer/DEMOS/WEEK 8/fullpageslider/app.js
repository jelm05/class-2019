$(document).ready(function(){

  // Things to keep track of:
  // slides, number of slides, fade time, gallery
  let currentSlide = 0,
      pauseTime = 2000,
      fadeTime = 500,
      $gallery = $("#gallery"),
      $slide = $("div", $gallery),
      total = $slide.length,
      clear;

  // Find all the slides, and hide them all
  // After that, find the one slide at index of currentSlide
  // When you found that slide, only show that slide
  $slide.hide().eq(currentSlide).show();

  function stop() {
    clearInterval(clear)
  }

  function fade() {
    $slide.fadeOut(fadeTime)
          .eq( ++currentSlide % total )
          .stop()
          .fadeIn(fadeTime)
  }

  function loop() {
    clear = setInterval(fade, pauseTime)
  }

  // mouse in, mouse out
  $gallery.hover( stop, loop );

  loop();

});
