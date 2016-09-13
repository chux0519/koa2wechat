###A Simple Wechat Backend Written In Javascript Using Koa2 And Some ES6/ES7 Features
####usage
1. install:
	
	git clone this proejct
	npm install

2. config(suppose you have configured your serverip on wechat dev center)
  2.1. fill the app/config.example.js with your appid and appsecret
  2.2. rename it with "config.js"

3. custom your handlers in app/handler

4. npm run start

####sampleworkflow:

####event:
client `subscribe` ===> server ===> reply welcome msg and guide
####text:
client sends:"tq cityName" ===> server ===> fetch the weather of city from [link](http://openweathermap.org) ===> parseJSON ===> return to client
####multimedia(voice/image/video/shortvideo):
client sends a multimedia stuff ===> server ===> save the mediaId on server ===>return another multimedia from server whitch is sent by the other client in 3 days using a spacific algrothm
####link:
client sends a link ===> server ===> save the link ===> return another link whitch is sent by the other client in 3 days using a spacific algrothm