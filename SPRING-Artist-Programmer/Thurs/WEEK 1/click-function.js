
// Wait until the document is loaded and ready before running the nested JavaScript
$(document).ready(function(){

  // Listen for a user to click on a div with a class of red, then do something
  $("div.red").click(function(){

    // Here we put in a check to make sure the click event is firing
    // You can see this in the console
    console.log(" You Just clicked the red div.");

    // If we click on a div with a class red,
    // change the background of all divs with a class of red to #333
    $("div.red").css({
      backgroundColor : "#333"
    });

  });

  // Same thing here, but with .blue
  $("div.blue").click(function(){

    // The 'this' keyword means that we're only applying the background color change
    // to the div we actually clicked on
    // note the difference because the above code and this code
    $(this).css({
      backgroundColor : "green"
    });

  });

// This is the closing brackets for the opening
// document.ready method
});
