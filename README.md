# Callback-2-promise, Convert callback to Promise

## Requirement

You must use ES6 (which support `Promise`), that's almost supported.

We don't require more. (^_^)

## How to use

Install

`npm install --save callback-2-promise`

Code example:

```javascript
var C2P = require('callback-2-promise');

function veryLongRun(callback) {
  // Your stuffs...
  setTimeout(callback, 5000);
}

var c2p = new C2P();
veryLongRun(c2p.getFulfillCallback()); // Get success callback, and pass to your function
var promise = c2p.go(); // Get Promise, you can use `.then()` or `.catch()`
```

## Documentation

### getFulfilCallback()

Fulfill callback will call when the task success

* No params
* Return callback `function ([any object] result)`.

### getErrorCallback()

Error callback will call when the task failure with an error

* No params
* Return callback `function ([any object] error)`.

### getPairCallback()

Pair callback merge ErrorCallback and FulfilCallback.

* No params
* Return callback `function ([any object] error, [any object] result)`. If `error = null`, resolve, otherwise reject.

## Feel free to add an issue
