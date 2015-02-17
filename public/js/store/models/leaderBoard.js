"use strict";
define('leaderBoard', ['leaderModel'], function (getLeaderModel) {
    return function(){
        var leaderBoardSize = 5;
        var leaderBoard = [];
        for(var i=0; i<leaderBoardSize; i++){
            leaderBoard.push(getLeaderModel());
        }

        function setBoard(setOfLeaders){
            setOfLeaders = sort(setOfLeaders);
            if(setOfLeaders !== undefined && setOfLeaders.length > 0){
                for(var i=0; i<setOfLeaders.length; i++){
                    leaderBoard[i]._id = setOfLeaders[i]._id;
                    leaderBoard[i].handle = setOfLeaders[i].handle;
                    leaderBoard[i].score = setOfLeaders[i].score;
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
        function getBoard(){
            return leaderBoard;
        }
        return {
            getBoard: getBoard,
            setBoard: setBoard
        }
    };
});
