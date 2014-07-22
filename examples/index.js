var zetta = require('zetta');
var Apigee = require('../index');

var app = zetta()
app.id = 'F76457112-8056-4955-a860-4e62c81a6a8b';

app.name('local')
  .expose('*')
  .use(Apigee)
  .listen(3000, function(err) {
    console.log('Listening on http://localhost:3000/');
  });
