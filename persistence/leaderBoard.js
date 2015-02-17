"use strict";
var leaderBoard = (function () {
    var instance;
    function init() {

        var dataStore = require('nedb');
        var Promise = require('promise');
        var db = new dataStore();
        var leaderBoardSize = 5;
        var socketio = undefined;

        function boardChangedHandler(){
            if(socketio !== undefined){
                db.find({}, function (err, docs) {
                    socketio.emit('leaderBoard', { leaderBoard: docs });
                });
            }
        }

        function sync(handle, score){

            var user = { handle: handle, score: score};

            Promise.all([isExistingLeader(user), isOpenSlot(), isTopScore(user.score)]).then(function(results){
                var isAlreadyLeader = results[0];
                var openSlot = results[1];
                var isTopScore = results[2];
                if(isAlreadyLeader){
                    updateExistingLeader(user).then(function(){
                        boardChangedHandler();
                    });
                }else if(openSlot){
                    insertLeader(user).then(function(){
                       boardChangedHandler();
                    });
                }else if(isTopScore){
                    dropLowest().then(function(dropped){
                        if(dropped){
                            insertLeader(user).then(function(){
                                boardChangedHandler();
                            })
                        }
                    });
                }
            });

        }

        function getLeaderBoard(callback){
            db.find({}, function (err, docs) {
                callback(docs);
            });
        }

        function setSocketIo(e){
            socketio = e;
        }

        // Database Mutators
        function updateExistingLeader(user){
            return new Promise(function (fulfill, reject) {
                db.update({handle: user.handle}, {$set: {score: user.score}}, {multi: false}, function (err, numUpdated) {
                    if (err !== undefined && err !== null && numUpdated !== undefined && numUpdated !== null) {
                        console.log("ERROR - updateExistingLeader - " + user);
                        reject();
                    } else {
                        fulfill(numUpdated === 1);
                    }
                });
            });
        }
        function insertLeader(user){
            return new Promise(function (fulfill, reject) {
                db.insert(user, function (err, result) {
                    if (err !== undefined && err !== null && result !== undefined && result !== null) {
                        console.log("ERROR - insertLeader - " + user);
                        reject();
                    } else {
                        fulfill(result);
                    }
                })
            });
        }
        function dropLowest(){
            return new Promise(function (fulfill, reject) {
                db.find({}, function (err, docs) {
                    var lowest = getLowestFromDocs(docs);
                    db.remove(lowest, {}, function (err, numRemoved) {
                        if (err !== undefined && err !== null && numRemoved !== undefined && numRemoved !== null) {
                            console.log("ERROR - dropLowest");
                            reject();
                        } else {
                            fulfill(numRemoved === 1);
                        }
                    });
                });
            });
        }

        // Database Accessors
        function isTopScore(score){
            return new Promise(function (fulfill, reject) {
                db.find({"score": {$lt: score}}, function (err, results) {
                    if(err !== undefined && err !== null && results !== null && results !== undefined){
                        reject();
                    }else{
                        fulfill(results.length > 0);
                    }
                });
            });
        }
        function isExistingLeader(user){
            return new Promise(function (fulfill, reject) {
                db.find({ handle: user.handle }, function (err, results) {
                    if (err !== undefined && err !== null && results !== undefined && results !== null) {
                        reject();
                    } else {
                        fulfill(results.length !== 0);
                    }
                });
            });
        }
        function isOpenSlot(){
            return new Promise(function (fulfill, reject) {
                db.count({}, function (err, count) {
                    if(err !== undefined && err !== null){
                        reject();
                    }else{
                        fulfill (count < leaderBoardSize);
                    }
                });
            });
        }

        // Util Funcs
        function getLowestFromDocs(docs){
            if(docs !== undefined && docs !== null){
                var lowestHandle = '';
                var lowestScore = -1;
                docs.forEach(function(e){
                    if(lowestScore === -1){
                        lowestScore = e.score;
                        lowestHandle = e.handle;
                    }
                    if(e.score < lowestScore){
                        lowestScore = e.score;
                        lowestHandle = e.handle;
                    }
                });
                return { handle: lowestHandle, score: lowestScore};
            }
        }

        return {
            sync: sync,
            setSocketIo: setSocketIo,
            getLeaderBoard: getLeaderBoard
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = leaderBoard;
