// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'


var express = require('express');
var path = require('path');
var app = express();

// respond to anything and 


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('somebody here');
});

app.listen(3000);