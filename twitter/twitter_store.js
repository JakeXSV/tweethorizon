function TwitterStore(){
     this.config = {
         "consumerKey": process.env.consumerKey,
         "consumerSecret": process.env.consumerSecret,
         "accessToken": process.env.accessToken,
         "accessTokenSecret": process.env.accessTokenSecret,
         "callBackUrl": process.env.callBackUrl
     };
    this.api = new (require('twitter-js-client')).Twitter(this.config);
}

TwitterStore.prototype.getProfilePictureUrl = function(handle, callback){
    var error = function (err, response, body) {
        console.log(err);
        callback(undefined);
    };
    var success = function (data) {
        try {
            var dataObj = JSON.parse(data);
            var user = dataObj[0].user;
            if (user !== null && user !== undefined) {
                callback(user['profile_image_url']);
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
    var error = function (err, response, body) {
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