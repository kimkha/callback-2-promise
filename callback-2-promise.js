
module.exports = function Callback2Promise() {
  this.defer = null;
  this.promise = null;
  this.isFulfiled = false;
  this.isRejected = false;
  this.fulfillData = null;
  this.errorData = null;

  var _resolve = function (self, result) {
    if (self.defer && self.defer.resolve) {
      self.defer.resolve(result);
    }
    self.fulfillData = result;
  }

  var _reject = function (self, result) {
    if (self.defer && self.defer.reject) {
      self.defer.reject(result);
    }
    self.errorData = result;
  }

  this.getFulfillCallback = function () {
    var self = this;
    return function (result) {
      self.isFulfilled = true;
      _resolve(self, result);
    }
  }

  this.getErrorCallback = function () {
    var self = this;
    return function (result) {
      self.isRejected = true;
      _reject(self, result);
    }
  }

  this.getPairCallback = function () {
    var self = this;
    return function (error, data) {
      if (error) {
        self.isRejected = true;
        _reject(self, error);
      } else {
        self.isFulfilled = true;
        _resolve(self, data);
      }
    }
  }

  this.go = function go() {
    var self = this;
    if (!this.promise) {
      this.promise = new Promise(function(resolve, reject) {
        self.defer = {
          resolve: resolve,
          reject: reject
        };
      });

      // If callback was called before creating Promise
      if (this.isFulfilled) {
        this.defer.resolve(this.fulfillData);
      } else if (this.isRejected) {
        this.defer.reject(this.errorData);
      }
    }
    return this.promise;
  }

  return this;
}