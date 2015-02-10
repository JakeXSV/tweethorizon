define('leaderBoard', ['leaderModel'], function (getLeaderModel) {
    return function(){
        var leaderBoard = [];
        /*
        Instead of just adding whatever is passed from socket, let's enforce the model
        defined in the client.
         */
        function setBoard(data){
            if(data !== undefined){
                data.forEach(function(e){
                    try{
                        var leader = getLeaderModel();
                        leader.set(e);
                        leaderBoard.push(leader);
                    }catch(exception){
                        console.log("Invalid model - not adding to leader board.");
                    }
                })
            }
        }
        function getBoard(){
            return leaderBoard;
        }
        return {
            leaderBoard: leaderBoard,
            getBoard: getBoard,
            setBoard: setBoard
        }
    };
});