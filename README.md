tweethorizon
============

find out your social reach on twitter, compare your score to your friends

## Build steps
* Install [nodejs](http://nodejs.org/), and [bower](http://bower.io/)
* Open terminal and navigate to source code directory
* Command 'bower install'
* Command 'npm install'
* Open the file 'twitter/twitter_store.js'
* Fill in config object
```js
     this.config = {
         "consumerKey": "abc",
         "consumerSecret": "abc",
         "accessToken": "abc",
         "accessTokenSecret": "abc",
         "callBackUrl": "http://yourtwitterregisteredappcallbackurl.com"
     };
```
* Command 'node tweethorizon.js'

## Run tests
* Open terminal and navigate to source code directory
* Command 'node tests/clientTests.js'
* Command 'node tests/serverTests.js'

## Frameworks Used
**Frontend**  
[RequireJS](http://requirejs.org/) - AMD loader  
[Rivets](http://rivetsjs.com/) - Data binding & templating  
[WatchJS](https://github.com/melanke/Watch.JS/) - Observers  
**Backend**  
[NodeJS](http://nodejs.org/) - App platform  
[Express](http://expressjs.com/) - Web app framework  
[TwitterJSClient](https://github.com/BoyCook/TwitterJSClient) - Twitter API  
[nedb](https://github.com/louischatriot/nedb) - in memory database  
**Shared**  
[socket.io](http://socket.io/) - real time sync of leaderboards between all users
