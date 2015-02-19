"use strict";
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function (require) {

    var path = require('path');
    var leaderBoardSync = require('leaderBoardPersist');
    var lbSync = leaderBoardSync.getInstance();

    var it = require('it');
    var assert = require('assert');
    var should = require('should');

    function runIntegrationSuite(){
        it.describe("Integration Test Suite", function(it){
            it("Sync leader to empty leader board.", function(){
                lbSync.sync("jakexsv", 450);
                console.log(lbSync.getLeaderBoard());
                //assert.deepEqual(result, properSortedData);
            });
        });
        it.run();
    }
    return {
        runIntegrationSuite: runIntegrationSuite
    }

});