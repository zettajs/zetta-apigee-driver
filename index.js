var util = require('util');
var Scout = require('zetta').Scout;
var ApigeeDriver = require('./apigee_driver');
var ApigeePusher = require('apigee-push');

var ApigeeScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(ApigeeScout, Scout);

ApigeeScout.prototype.init = function(done) {
  var pusher = new ApigeePusher({
    orgName: 'mdobson',
    appName: 'sandbox'
  });

  var self = this;
  var query = this.server.where({ type: 'apigee' });
  this.server.find(query, function(err, results) {
    if (results.length > 0) {
      self.provision(results[0], ApigeeDriver, pusher);
    } else {
      self.discover(ApigeeDriver, pusher);
    }
  });
  
  done();
};

