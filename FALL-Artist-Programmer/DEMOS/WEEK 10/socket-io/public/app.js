$(document).ready(function(){

  console.log("document ready");

  // Required to emit messages to the server
  const socket = io();

  // Sending info to the server
  $('form').submit(function(event){
    event.preventDefault(); // prevents page reloading
    let message = $('#m').val();
    // We're telling the server that someone sent a message
    // And we're passing that message to the server
    socket.emit('chat message', message);
    $('#m').val('');
    return false;
  });

  // Listening for the server to send osmething back to us
  socket.on('chat message', function(message){
    let newMessage = $('<li>').text(message)
    $('#messages').append( newMessage );
  });

});
