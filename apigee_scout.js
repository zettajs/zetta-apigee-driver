var ApigeeDriver = require('./apigee_driver');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var ApigeePush = require('apigee-push');


var ApigeeScout = module.exports = function() {
  EventEmitter.call(this);
  this.drivers = [];
};
util.inherits(ApigeeScout, EventEmitter);

ApigeeScout.prototype.init = function() {
  var pusher = new ApigeePusher({
    orgName:'internetofthings',
    appName:'sandbox'
  });

  self.emit('discover', ApigeeDriver, pusher);
};
