// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'

var _CHANNEL_ACCESS_TOKEN = "qFhp3qy6SCgMqYqML3ilTlA0/g/W2r17Jur5t9YMHui4aQCAS9R5Z3CtqacoRMimNzvnD0kXUx68jkPJ5hKkOA14pf2uvoKbwOs951JeZtNY3zCmrjOXz96kXlhkkdFO96vndacIyFmF6fKit/tfHQdB04t89/1O/w1cDnyilFU="
var keyword_answer = {
  "db":[
    {
      "keywords":["水果","買東西"],
      "answer": "你要買哪種水果" 
    },
    {
      "keywords":["Hi","Hello","你好","Hey"],
      "answer": "歡迎光臨，你今天想要幹媽" 
    },
    {
      "keywords":["蘋果","橘子"],
      "answer": "很抱歉因為太好吃都賣光了，下次請早" 
    },
    {
      "keywords":["鳳梨","柿","釋迦"],
      "answer": "我才不賣這些東西呢！" 
    },
    {
      "keywords":["櫻桃","水蜜桃","西瓜"],
      "answer": "你買不起的辣，不如試試橘子呢？" 
    },
    {
      "keywords":["番茄"],
      "answer": "剛好剩下最後一盒，但是我不想賣你" 
    },
    {
      "keywords":["掰",'去死','打',"爛",'可惡'],
      "answer": "慢走不送" 
    }
    
  ]
}
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
    var events = req.body.events;
    for(var i=0; i< events.length; i++){
      var event = events[i],
          type =  event.message.type,
          messageId = event.message.id,
          userId = event.source,userId,
          replyToken = event.replyToken;
          console.log("messageId:" + messageId );
          console.log("replyToken:" + replyToken );
          
      switch(type){        
        case "text" :
          var mesg = event.message.text;
          console.log("mesg:" + mesg );
          var answer = answerKeyword(mesg);
          replyTex(answer,replyToken);
          break;
        default:
          consolg.log('not support type:' + type);
      }   

    }        
        
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function answerKeyword(mesg){
  var is_get_answer = false,
      answer = '';
  //create a promise for check mesg mathed db's keywords or not?
  var promise_ans = new Promise(function(resolve, reject){
      keyword_answer.db.forEach(function(element, index, array){
        for (var i =0 ; i< element.keywords.length; i++){
          if (mesg.indexOf(element.keywords[i]) >= 0 ){
            answer = element.answer;
            is_get_answer = true;
          }
        }   
      })    
      resolve(answer);
  });
 // if not mathed, return default answer
 promise_ans.then((answer)=>{
   if (!is_get_answer){
     return "今天天氣不錯吧";
   }else{
     return answer;
   }
 })
  

}

// function to reply customers 
// mesg: string => the message you want to reply
// replyToken: string => token you get when user give you message.
function replyTex(mesg,replyToken){
  const options = {  
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    headers: {
      'Content-Type' : "	application/json",
      'Authorization': 'Bearer ' + _CHANNEL_ACCESS_TOKEN
    },
    body: {
      replyToken: replyToken,
      messages: [{
                    "type": "text",
                    "text": mesg
                }]
    },
    json: true
  }
  request(options)
    .then(function(res){
      // console.log("reply status" + res.statusCode )
    })
    .catch(function (err) {

    })
}

function getMedia(messageId){
  const options = {  
    method: 'GET',
    uri: 'https://api.line.me/v2/bot/message/' + messageId + '/content',
    headers: {
      'Authorization': 'Bearer ' + _CHANNEL_ACCESS_TOKEN
    },
    json: true
  }
  request(options)
    .then(function (response) {
      // console.log("getText status" + res.statusCode )
      console.log(response);
      return response;
    })
    .catch(function (err) {

    })
}