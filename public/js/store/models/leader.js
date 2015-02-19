"use strict";
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function () {
    return function(){
        return {
            type: "leaderModel",
            _id: undefined,
            handle: undefined,
            score: undefined,
            show: false
        }
    };
});