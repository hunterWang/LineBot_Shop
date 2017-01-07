// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'

var _CHANNEL_ACCESS_TOKEN = "qFhp3qy6SCgMqYqML3ilTlA0/g/W2r17Jur5t9YMHui4aQCAS9R5Z3CtqacoRMimNzvnD0kXUx68jkPJ5hKkOA14pf2uvoKbwOs951JeZtNY3zCmrjOXz96kXlhkkdFO96vndacIyFmF6fKit/tfHQdB04t89/1O/w1cDnyilFU="

var express = require('express');
var path = require('path');
var request = require('request-promise')  
var bodyParser = require('body-parser'); //must have, otherwise the body will be empty
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
    var data = req.body, 
        type = data.message.type;
        messageId = data.message.id;
        console.log("messageId:" + messageId );
        switch(type){
          case "text" :
            var mesg = getText(messageId);
            console.log(mesg);
            break;
          default:
            consolg.log('not support type:' + type);
        }   
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



function getText(messageId){
  const options = {  
    method: 'GET',
    uri: 'https://api.line.me/v2/bot/message/' + messageId + '/content',
    headers: {
      'Authorization': 'Bearer ' + _CHANNEL_ACCESS_TOKEN
    }
  }
  requst(options)
    .then(function (response) {
      return res;
    })
    .catch(function (err) {
      // Deal with the error
    })
}