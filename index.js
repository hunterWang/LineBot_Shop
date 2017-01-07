// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'


var express = require('express');
var path = require('path');
const fs = require('fs');


var app = express();

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
    res.send('OKOK');
    fs.open('req.log',"a", (err, fd) => {     //get header
      fs.write(fd, req.header, 0, req.header.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;
          fs.close(fd, function() {
              console.log('file written');
          })
      });

    });
    fs.open('req.log',"a", (err, fd) => {     
      fs.write(fd, req.body, 0, req.body.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;
          fs.close(fd, function() {
              console.log('file written');
          })
      });

    });
    // var type = req.type,
    //     message = req.message ;
    // console.log(type);
    // console.log(message);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});