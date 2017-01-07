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

//to verify LINE bot 
app.post('/', function(req, res) {
    res.send('OKOK');
    var type = req.type,
        message = req.message ;
    console.log(type);
    console.log(message);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});