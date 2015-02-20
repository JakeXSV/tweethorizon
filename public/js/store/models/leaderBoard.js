"use strict";
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function (require) {
    return function(testing){

        var prettifier = require('prettifier');
        var getLeaderModel = require('leaderModel');
        var leaderBoardSize = 5;
        var leaderBoard = [];
        for(var i=0; i<leaderBoardSize; i++){
            leaderBoard.push(getLeaderModel());
        }

        function getBoard(){
            return leaderBoard;
        }
        function setBoard(setOfLeaders){
            setOfLeaders = sort(setOfLeaders);
            if(setOfLeaders !== undefined && setOfLeaders.length > 0){
                for(var i=0; i<setOfLeaders.length; i++){
                    leaderBoard[i]._id = setOfLeaders[i]._id;
                    leaderBoard[i].handle = setOfLeaders[i].handle;
                    leaderBoard[i].score = prettifier.getInstance().numberWithCommas(setOfLeaders[i].score);
                    leaderBoard[i].show = true;
                }
            }
        }

        //Sort an array of leader objects by score from largest, to smallest.
        function sort(unsortedData){
            var sortedData = [];
            unsortedData.forEach(function(unsortedElement){
                if(sortedData.length > 0){
                    var added = false;
                    for(var i=0; i<sortedData.length; i++){
                        if(unsortedElement.score < sortedData[i]['score']){
                            if(!added){
                                sortedData.splice(i, 0, unsortedElement);
                                i++;
                                added = true;
                            }
                        }
                    }
                    if(!added){
                        sortedData.push(unsortedElement);
                    }
                }else{
                    sortedData.push(unsortedElement);
                }
            });
            return sortedData.reverse();
        }

        var that = {
            getBoard: getBoard,
            setBoard: setBoard
        };
        if(testing !== undefined && testing){
            that.sort = sort;
        }
        return that;

    };
});
