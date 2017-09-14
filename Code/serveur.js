var five = require("johnny-five"),
  board, button;

var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8080);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

console.log('Server started');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

board = new five.Board();

board.on("ready", function() {
  console.log('Board connected');
  button = new five.Button(2);

  var led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    },
    isAnode: true
  });
  
  board.repl.inject({
    button: button,
    led: led
  });

  led.on();
  
  button.on("down", function() {
    console.log("down");
  });

  io.on('connection', function(socket){
    socket.on('click', function(msg){
      console.log('message: ' + msg);
      led.color("#00FF00");
    });
  });

});