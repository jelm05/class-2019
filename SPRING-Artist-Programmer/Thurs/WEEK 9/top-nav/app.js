$(document).ready(function(){

  var content = $("#content");
  var win = $(window);

  win.resize(function(){
    content.css({
      left : win.width() / 2 - content.outerWidth() / 2,
      top : win.height() / 2 - content.outerHeight() / 2
    });
  }).trigger("resize");

  $("#nav").hover(function(){
    // mouse in
    $(this).stop().animate({
      top : 0
    }, 200);
  }, function(){
    // mouse out
    $(this).stop().animate({
      top : -30
    }, 200);
  });

  $(".link").click(function(){
    content.fadeOut(0)
           .fadeIn()
           .html( $(this).next().html() );
  });


});
