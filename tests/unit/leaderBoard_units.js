"use strict";
define(function (require) {

    var getLeaderBoard = require('leaderBoardModel');
    var leaderBoard = getLeaderBoard(true);

    var it = require('it');
    var assert = require('assert');

    function runSortSuite(){
        it.describe("Sort Test Suite", function(it){
            it("Test 1.", function(){
                var unsortedData = [{
                    _id: 1,
                    handle: "a",
                    score: 100
                },{
                    _id: 2,
                    handle: "b",
                    score: 200
                },{
                    _id: 3,
                    handle: "c",
                    score: 300
                },{
                    _id: 4,
                    handle: "d",
                    score: 400
                },{
                    _id: 5,
                    handle: "e",
                    score: 500
                }];
                var properSortedData = [{
                    _id: 5,
                    handle: "e",
                    score: 500
                },{
                    _id: 4,
                    handle: "d",
                    score: 400
                },{
                    _id: 3,
                    handle: "c",
                    score: 300
                },{
                    _id: 2,
                    handle: "b",
                    score: 200
                },{
                    _id: 1,
                    handle: "a",
                    score: 100
                }];
                var result = leaderBoard.sort(unsortedData);
                assert.deepEqual(result, properSortedData);
            });
            it("Test 2.", function(){
                var unsortedData = [{
                    _id: 1,
                    handle: "a",
                    score: 500
                },{
                    _id: 2,
                    handle: "b",
                    score: 200
                },{
                    _id: 3,
                    handle: "c",
                    score: 300
                },{
                    _id: 4,
                    handle: "d",
                    score: 400
                },{
                    _id: 5,
                    handle: "e",
                    score: 450
                }];
                var properSortedData = [{
                    _id: 1,
                    handle: "a",
                    score: 500
                },{
                    _id: 5,
                    handle: "e",
                    score: 450
                },{
                    _id: 4,
                    handle: "d",
                    score: 400
                },{
                    _id: 3,
                    handle: "c",
                    score: 300
                },{
                    _id: 2,
                    handle: "b",
                    score: 200
                }];
                var result = leaderBoard.sort(unsortedData);
                assert.deepEqual(result, properSortedData);
            });
            it("Test 3.", function(){
                var unsortedData = [{
                    _id: 1,
                    handle: "a",
                    score: 3
                },{
                    _id: 2,
                    handle: "b",
                    score: 2
                },{
                    _id: 3,
                    handle: "c",
                    score: 1
                },{
                    _id: 4,
                    handle: "d",
                    score: 4
                },{
                    _id: 5,
                    handle: "e",
                    score: 5
                }];
                var properSortedData = [{
                    _id: 5,
                    handle: "e",
                    score: 5
                },{
                    _id: 4,
                    handle: "d",
                    score: 4
                },{
                    _id: 1,
                    handle: "a",
                    score: 3
                },{
                    _id: 2,
                    handle: "b",
                    score: 2
                },{
                    _id: 3,
                    handle: "c",
                    score: 1
                }];
                var result = leaderBoard.sort(unsortedData);
                assert.deepEqual(result, properSortedData);
            });
        });
        it.run();
    }
    return {
        runSortSuite: runSortSuite
    }

});