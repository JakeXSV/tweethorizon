"use strict";

var HandleResourceService = (function () {

    var TwitterRepository = require('../domain/twitterRepository');
    var twitterRepo = new TwitterRepository();

    function getProfilePictureUrl(handle, onSuccess) {
        if (handle === null || handle == undefined) {
            throw new Error('HandleResourceService.getProfilePictureUrl - Bad argument');
        }

        if (typeof handle !== 'string' || handle.length <= 3) {
            throw new Error('HandleResourceService.getProfilePictureUrl - Type argument');
        }

        twitterRepo.getProfilePictureUrl(handle, function (imageUrl) {
            onSuccess(imageUrl);
        });
    }

    return {
        getProfilePictureUrl: getProfilePictureUrl
    };
});

module.exports = HandleResourceService;
