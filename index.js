// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'


var express = require('express');
var path = require('path');
var app = express();

// set fot heroku
app.set('port', (process.env.PORT || 5000));

// respond to anything 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('somebody here');
});

app.post('/', function(req, res) {
    console.log(req.events);
    console.log(req);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});