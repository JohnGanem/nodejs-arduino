var five = require("johnny-five"),
  board, button;

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(2);
  var led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    },
    isAnode: true
  });

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button,
    led: led
  });
  led.on();
  led.color("#00FF00");
  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    led.on();
    console.log("down");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    led.color("#00FF00");
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    led.color("#FF0000");
    led.off();
    console.log("up");
  });
});