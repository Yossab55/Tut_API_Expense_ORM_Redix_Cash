function foo(x) {
  // start doing something that could take a while

  //make a 'listener' event notification

  return listener;
}

var evt = foo(42);

evt.on("completions", function keepGoing() {});

evt.on("failure", function stopAndHandelError() {});
