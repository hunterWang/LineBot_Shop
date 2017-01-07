// it's just for simple use.
// 1.respond the user with file in db
// 2.store item based on user's selection'

var _CHANNEL_ACCESS_TOKEN = "qFhp3qy6SCgMqYqML3ilTlA0/g/W2r17Jur5t9YMHui4aQCAS9R5Z3CtqacoRMimNzvnD0kXUx68jkPJ5hKkOA14pf2uvoKbwOs951JeZtNY3zCmrjOXz96kXlhkkdFO96vndacIyFmF6fKit/tfHQdB04t89/1O/w1cDnyilFU="
var keyword_answer = {  //later will have higher priority
  "db":[
    {
      "keywords":["水果","買東西"],
      "answer": "你要買哪種水果" 
    },
    {
      "keywords":["選擇","有","什麼","哪些"],
      "answer": "很多種耶，只要是水果都有可能會有喔" 
    },
    {
      "keywords":["Hi","Hello","你好","Hey","擬好"],
      "answer": "歡迎光臨，你今天想要幹媽" 
    },
    {
      "keywords":["拜託","求",'好想買'],
      "answer": "好吧，只好賣你了" 
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
      "keywords":["老闆","誰","店","商"],
      "answer": "這裡是Jason的水果店" 
    },
    {
      "keywords":["掰",'去死','打',"爛",'可惡','腦','怒'],
      "answer": "慢走不送" 
    },
     {
      "keywords":["?",'嗎','啥'],
      "answer": "這問題太難了，你這輩子都不會懂得" 
    }
    
  ]
}
var default_respond=["今天天氣不錯吧",'你到底想幹嗎',"這裡是水果店喔","從沒有人成功從我這賣到東西","你可以跟我聊些有意義的東西嗎？"]

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

//get picture
app.get('/assets/image/fruits.jpg', function(req, res) {
    res.sendFile(path.join(__dirname + '/assets/image/fruits.jpg'));
  
});
//to verify LINE bot 
app.post('/', function(req, res) {
    res.sendStatus(200);
    //console.log(req.params);  //no params
    //console.log(req.headers);
    var events = req.body.events;
    console.log(req.body);
    for(var i=0; i< events.length; i++){
      var event = events[i],
          event_type = event.type,
          userId = event.source,userId,
          replyToken = event.replyToken;
          console.log("userId:" + userId );
          console.log("replyToken:" + replyToken );  
      switch(event_type){
        case "postback":
              var postback_data = event.postback.data;
              console.log("postback data is " + postback_data);
        case "message":
              var message_type =  event.message.type,
                  messageId = event.message.id;              
              console.log("messageId:" + messageId );            
              switch(message_type){        
                case "text" :
                  var mesg = event.message.text;
                  console.log("mesg:" + mesg );
                  var answer = answerViaKeyword(mesg,replyToken);
                  break;
                default:
                  consolg.log('not support type:' + type);
              } 
        default:
          break;
      }    
        

    }        
        
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function answerViaKeyword(mesg,replyToken){
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
   answer = is_get_answer? answer: "今天天氣不錯吧";  
   if (answer == "好吧，只好賣你了"){ //can't reply twice' 
     console.log('start to send price table');
     replyShoper(answer,replyToken);
   } 
   replyTex(answer,replyToken);
   console.log("answer is :" +answer);
   
 })
  

}

function replyShoper(answer,replyToken){
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
                    "text": answer
                },
                {
                  "type": "template",
                  "altText": "If you can't use plz use mobile and upgrade to latest versino of LINE ",
                  "template": {
                      "type": "buttons",
                      "thumbnailImageUrl": "https://line-bot-shopping.herokuapp.com/assets/image/fruits.jpg",
                      "title": "價目表",
                      "text": "你想要買什麼？",
                      "actions": [
                          {
                            "type": "postback",
                            "label": "蘋果(NTD 40 / 一個)",
                            "data": "action=buy&item=apple"
                          },
                          {
                            "type": "postback",
                            "label": "橘子(NTD 100 / 一盤)",
                            "data": "action=buy&itemid=orange"
                          }
                          // {
                          //   "type": "uri",
                          //   "label": "View detail",
                          //   "uri": "http://example.com/page/123"
                          // }
                      ]
                  }
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