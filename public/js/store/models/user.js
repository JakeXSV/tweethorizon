define('userModel', function () {
    'use strict';
    return function(){
        return {
            handle: undefined,
            imagePath: undefined,
            followers: undefined,
            retweets: undefined,
            favorites: undefined,
            score: undefined,
            isLoading: false,
            horizonObtained: false
        };
    };
});