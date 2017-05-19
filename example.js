var C2P = require('./callback-2-promise');

async function demo() {
  var c = new C2P();
  console.log("Start");
  setTimeout(c.getFulfillCallback(), 5000);
  console.log("Setting done");
  await c.go().then(function (result) {
    console.log("After promise");
  });
  console.log("End code");
}

demo();