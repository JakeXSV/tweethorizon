define('leaderModel', function () {
    'use strict';
    return function(){
        return {
            type: "leaderModel",
            _id: undefined,
            handle: undefined,
            score: undefined,
            show: false
        };
    };
});