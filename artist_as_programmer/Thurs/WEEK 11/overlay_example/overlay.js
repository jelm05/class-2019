
$(document).ready(function(){

  var overlay = $(".overlay");
  var enlargedOverlay = $("#enlarged-overlay");

  overlay.click(function(){

    // // Option 1
    // var dataAttr = $(this).find('img').attr('data-image-num');
    // console.log("data attribute: ", dataAttr)
    //
    // var newImg = "images/" + dataAttr + "_overlay_large.jpg";
    // console.log("new img url", newImg);
    //
    // $("#overlay-image").attr('src', newImg);
    //
    // enlargedOverlay.show();

    // Option 2

    var img = $(this).find('img').attr('src');
    console.log(img)

    $("#overlay-image").attr('src', img);
    enlargedOverlay.show();

  });


  enlargedOverlay.click(function(){

    $(this).hide();

  });

});
