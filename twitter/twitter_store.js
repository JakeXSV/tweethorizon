"use strict";
function TwitterStore(){
    this.config = {
        "consumerKey": '3VCwS7UyzbtjfkYOAmOrBurRk',
        "consumerSecret": 'yMZmBc6cXAOtSh4WXiFm0dfyk8wbj2kw7P6h3Tm4XNXEALeA0b',
        "accessToken": '250194095-wZCCcvrVuFCcj3UYNe91gLUm5FXR5YKTuomRnylm',
        "accessTokenSecret": 'e6KAUNrWL0TbYZWTFyJrjYlysRPFFSmneAQWVain4L4bE',
        "callBackUrl": 'http://tweethorizon.io'
    };
    this.api = new (require('twitter-node-client')).Twitter(this.config);
}

TwitterStore.prototype.getProfilePictureUrl = function(handle, callback){
    var error = function (err) {
        console.log(err);
        callback(undefined);
    };

    var success = function (data) {
        try {
            var dataObj = JSON.parse(data);
            var user = dataObj[0].user;
            if (user !== null && user !== undefined) {
                callback(user.profile_image_url);
            } else {
                callback(undefined);
            }
        }catch(e){
            callback(undefined);
        }
    };

    this.api.getUserTimeline({ screen_name: handle, count: '1'}, error, success);
};

TwitterStore.prototype.getTimeline = function(handle, callback){
    var error = function (err) {
        console.log(err);
        callback(undefined);
    };

    var success = function (data) {
        try {
            var dataObj = JSON.parse(data);
            if (dataObj !== null && dataObj !== undefined) {
                callback(dataObj);
            } else {
                callback(undefined);
            }
        }catch(e){
            callback(undefined);
        }
    };
    
    this.api.getUserTimeline({ screen_name: handle, count: '1000'}, error, success);
};

module.exports = TwitterStore;
