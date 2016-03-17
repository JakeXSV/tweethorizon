"use strict";

var LeaderboardRepository = (function () {
    var instance;

    function init() {

        var Datastore = require('nedb');
        var db = new Datastore();

        return {

        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = LeaderboardRepository;
