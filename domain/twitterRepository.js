"use strict";

var TwitterRepository = (function () {

    // Move to global app configuration file?
    var config = {
        "consumerKey": "abc",
        "consumerSecret": "abc",
        "accessToken": "abc",
        "accessTokenSecret": "abc",
        "callBackUrl": "abc"
    };
    var twitterClient = new (require('twitter-node-client')).Twitter(config);

    function getTimeline(handle, onSuccess) {
        var error = function (err) {
            throw new Error(JSON.stringify(err));
        };

        var success = function (data) {
            var dataObj = JSON.parse(data);
            if (dataObj !== null && dataObj !== undefined) {
                onSuccess(dataObj);
            } else {
                throw new Error('TwitterRepository.getTimeline - Invalid timeline response data.');
            }
        };

        twitterClient.getUserTimeline({ screen_name: handle, count: '1000'}, error, success);
    };

    function getProfilePictureUrl(handle, onSuccess) {
        var error = function (err) {
            throw new Error(JSON.stringify(err));
        };

        var success = function (data) {
            var dataObj = JSON.parse(data);
            var user = dataObj[0].user;
            if (user !== null && user !== undefined) {
                onSuccess(user.profile_image_url_https);
            } else {
                throw new Error('TwitterRepository.getProfilePictureUrl - Invalid user response data.');
            }
        };

        twitterClient.getUserTimeline({ screen_name: handle, count: '1'}, error, success);
    };

    return {
        getTimeline: getTimeline,
        getProfilePictureUrl: getProfilePictureUrl
    }
});

module.exports = TwitterRepository;
