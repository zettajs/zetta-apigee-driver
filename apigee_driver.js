var util = require('util');
var Device = require('zetta').Device;

var ApigeeDriver = module.exports = function(pusher) {
  this._pusher = pusher;
  Device.call(this);
};
util.inherits(ApigeeDriver, Device);

ApigeeDriver.prototype.init = function(config) {
  config
    .type('apigee')
    .name('apigee-pusher')
    .state('standby')
    .when('standby', { allow: ['push'] })
    .when('push', { allow: ['standby'] })
    .map('standby', this.standby)
    .map('push', this.push, [{ type:'text', name:'alert' }]);
};

ApigeeDriver.prototype.standby = function(cb) {
  this.state = 'standby';
  if(cb) {
    cb();
  };
};

ApigeeDriver.prototype.push = function(alert, cb) {
  this.state = 'push';
  var self = this;
  var options = {
    path: 'devices;ql=/notifications',
    notifier: 'ZettaProd',
    alert: alert
  };

  this._pusher.sendNotification(options, function(err, data) {
    self.call('standby');
  });
};
