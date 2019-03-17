$(document).ready(function(){

  // Declare all of our variables
  var ul = $(".slider ul");
  // Calculate the number of slides we have
  var slideCount = ul.children().length;
  // Make each slide equal widths according to the slideCount
  var slideWidth = 100.0 / slideCount;
  // We'll use this later to keep track of which slide we're on
  var slideIndex = 0;

  // console.log( "slideCount: ", slideCount );
  // console.log( "slideWidth: ", slideWidth );

  // grab the first slide and put it in a variable
  var firstSlide = ul.find("li:first-child");
  // grab the last slide and put it in a variable
  var lastSlide = ul.find("li:last-child");

  // Clone the first slide and tack it to the end so we can simulate the loop
  firstSlide.clone().appendTo(ul);
  // Close the last slide and tack it to the front, same impulse
  lastSlide.clone().prependTo(ul);

  // This will ensure all of our slides are horizontally aligned
  ul.find("li").each(function(indx){
    var leftPercent = ( slideWidth * indx ) + "%";
    // console.log( leftPercent );
    $(this).css({ "left" : leftPercent });
    $(this).css({ width : (100 / slideCount) + "%" });
  });

  // Since we cloned the last slide and put at the front,
  // we have to start our slideshow at -100%, so the first slide actually shows up first
  // Remember, there's a secret hidden slide off the screen to the left when the page loads
  ul.css("margin-left", "-100%");

  // Invoke our slide() every time we click next, and pass our slideIndex as an argument
  $(".slider .next").click(function(){
    slide( slideIndex + 1 );
  });

  // Same thing, but negative 1 so we go back
  $(".slider .prev").click(function(){
    slide( slideIndex - 1 );
  });

  function slide( newSlideIndex ) {
    // We're animating via margins, so we need to calculate how much in conjunction with our slides
    // Look at the console when clicking to see this in action
    // First slide: -100%
    // Second slide: -200%
    // Third slide: -300%
    // Cloned first slide : -400%, if you keep going, back to -200% to show second slide
    // If you click previous first, 0% to show cloned last slide and again we go back to -200%
    // dictated by conditional logic in animate()

    var marginLeft = ( newSlideIndex * (-100) - 100 ) + "%";
    console.log("marginLeft: ", marginLeft);
    console.log("index: ", newSlideIndex);

    // Actually animate the entire unordered list, keeping the contents with according to left margin
    ul.animate({ "margin-left" : marginLeft }, 400, function(){

      // Keep track if we're going backwards
      if( newSlideIndex < 0 ) {
        // slide index goes below zero, we have to jump back to -200% left margin to show the second slide
        ul.css( "margin-left", ( (slideCount) * (-100) ) + "%" );
        newSlideIndex = slideCount - 1;
      } else if ( newSlideIndex >= slideCount ) {
        // this gets us back to the beginning
        ul.css("margin-left", "-100%");
        newSlideIndex = 0;
      }
      slideIndex = newSlideIndex;
    });
  }

});
