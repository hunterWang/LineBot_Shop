# LineBot_Shop

## Synopsis

Use Messaging API to build a service can answer peoples's question and help then made a order.
Fllow the installation step can help you build a simple robot with Nodejs. 

## Motivation

As a software PM, i want to get familiar with what software service those technology giant provided and how they charge..

## Deploy the service

1. get a Line developer account
> Get the developer account at : https://business.line.me/zh-hant/services/bot <br />
> Here is the Chinese instruction wrote by 董大偉: <br /> 
> http://studyhost.blogspot.tw/2016/10/line-messaging-api-line-bot-v2.html<br /> 
> After this step you need to get the "Access Token"!!

2. deploy to Heroku and Fill in "webhook URL" at line developers setting page
> you can skip this step if you can deploy to other place, the point is you need to have a place receive LINE's message.<br /> 
> Follow : https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up <br />
> Please remember at step "Prepare the app", clone "https://github.com/hunterWang/LineBot_Shop.git" <br />
> You need to get a url like "https://*******.herokuapp.com/" at the end of the step <br />
> Open your line developers setting page, enter your URL press "Verify" button.
> Now you have to see "Success."

3. Basic setting
  * index.js
  
  > change the veriable "_CHANNEL_ACCESS_TOKEN" to your access token <br/>
  > change the keyword_answer to what your robot want to "answer" when that receive the "keyword".

4. Start to talk and Have fun

5. At v1.0.0, if you beg the robot, you can really buy something from him.


## Plan

##### Milstone1. the robot you can talk with
##### Milstone2. you can purchase item and store in the db.
##### Milsteon3. have a cms system for shop owner to manage it.

> In fact M2,M3 are beyond the purpose in the beginning, so maybe i won't finished it XDDD


## License

MIT
