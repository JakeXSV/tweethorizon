tweethorizon [![Dependency Status](https://david-dm.org/Jakehp/tweethorizon.svg)](https://david-dm.org/Jakehp/tweethorizon)
============

find out your social reach on twitter, compare your score to your friends

## Build steps
* Install [nodejs](http://nodejs.org/), [bower](http://bower.io/), and [gulp](http://gulpjs.com/).
* Open terminal and navigate to source code directory
* Command ```npm install```
* Open the file ```twitter/twitter_store.js```
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
* Open web browser to ```http://localhost:3000``` and wala

## Frameworks Used
