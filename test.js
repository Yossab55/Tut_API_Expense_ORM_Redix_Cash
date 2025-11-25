function foo(x) {
  // do something

  return new Promise(function (resolve, reject) {
    //do something
  });
}

function bar() {
  // hey promise is fluffed
}

function obsBar() {
  //something went wrong :(
}

var p = foo(42);

p.then(bar, obsBar);

// p.then(baz, obsBaz) will take the state from p not from p.then(bar)
