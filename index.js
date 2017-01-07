// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


// set fot heroku
app.set('port', (process.env.PORT || 5000));

// respond to anything 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('somebody here');
});

app.get('/logs', function(req, res) {
    res.sendFile(path.join(__dirname + '/req.log'));
  
});

//to verify LINE bot 
app.post('/', function(req, res) {
    res.sendStatus(200);
    //console.log(req.params);  //no params
    //console.log(req.headers);
    var body = req.body;
    console.log(req.body);
   
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



