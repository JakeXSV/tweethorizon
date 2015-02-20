"use strict";
var leaderBoardIntTests = (function () {

    var LeaderBoardSync = require('../../persistence/leaderBoard');
    var lbSync = LeaderBoardSync.getInstance();
    var it = require('it');
    var assert = require('assert');
    var should = require('should');

    function runIntSuite(){
        it.describe("Integration Test Suite", function(it){
            it("Sync leader to empty leader board.", function(){
                var handle = "jakexsv";
                var score = 450;
                return lbSync.sync(handle, score).then(function(added){
                    assert.equal(added, true);
                    return lbSync.getLeaderBoard().then(function (results) {
                        var foundLeader = false;
                        results.forEach(function(e){
                            if(e.handle === handle){
                                foundLeader = true;
                            }
                        });
                        assert.equal(foundLeader, true);
                    });
                });

            });
        });

        it.run();
    }

    return {
        runIntSuite: runIntSuite
    };

})();

module.exports = leaderBoardIntTests;
