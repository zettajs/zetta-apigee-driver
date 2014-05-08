var ApigeeDriver = module.exports = function(pusher) {
  this.state = 'standby';
  this.pusher = pusher;
};

ApigeeDriver.prototype.init = function(config) {
  config
    .when('standby', { allow: ['push'] })
    .when('push', { allow: ['standby'] })
    .map('standby', this.standby)
    .map('push', this.push, [{ type:'text', name:'alert'}]);
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
    notifier: 'ZettaApp',
    alert: alert
  };

  this.pusher.sendPushNotification(options, function(err, data) {
    self.call('standby');
  });
};
