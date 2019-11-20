// Basic server start
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Our website is in the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Homepage returns our index.html
app.get('/', function(req, res){
  res.sendFile( path.join(__dirname + '/index.html'));
});

// Linking app.js file
app.get('/app.js', function(req, res){
  res.sendFile( path.join(__dirname + '/app.js'));
});

// Our server is running on port 3000 - localhost:3000
http.listen(port, () => console.log(`Listening on port ${port}`));

// Console.logging any time a user connects
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('a user disconnected')
  });

});

// Server, listen for an event called 'chat message'
io.on('connection', function(socket){

  socket.on('chat message', function(message){
    console.log("message: ", message);
    // emit the message to everyone who's connected 
    io.emit('chat message', message);
  });

});
