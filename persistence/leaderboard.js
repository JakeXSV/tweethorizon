var Leaderboard = (function () {
    var instance;
    function init() {

        var Datastore = require('nedb');
        var db = new Datastore();
        var leaderboardSize = 5;

        function sync(handle, score){

            var user = { handle: handle, score: score};

            addIfOpenSlot(user, addedIfOpenHandler);

            function addedIfOpenHandler(wasAdded){
                if(wasAdded){
                    boardChangedHandler(true);
                }else{
                    updateIfExistingTopScorer(user, updateHandler);
                }
            }

            function updateHandler(wasAlreadyTopScorer){
                if(wasAlreadyTopScorer){
                    boardChangedHandler(true);
                }else{
                    isTopScore(user, checkTopScoreHandler)
                }
            }

            function checkTopScoreHandler(hadTopScore){
                if(hadTopScore){
                    dropLowest(dropLowestHandler)
                }else{
                    boardChangedHandler(false);
                }
            }

            function dropLowestHandler(droppedLowest){
                if(droppedLowest){
                    addIfOpenSlot(user, boardChangedHandler);
                }else{
                    boardChangedHandler(false);
                }
            }

            function boardChangedHandler(bool){
                if(bool){
                    console.log("updated!");
                }else{
                    console.log("not updated");
                }
            }
        }

        /*
        Functions utilized by sync
         */
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

        function isTopScore(user, next){
            db.find({ "score": { $lt: user.score } }, function (err, docs) {
                console.log(docs);
                if(docs !== null && docs !== undefined && docs.length > 0){
                    next(true);
                }else{
                    next(false);
                }
            });
        }

        function dropLowest(next){
            db.find({}, function (err, docs) {
                var lowest = getLowestFromDocs(docs);
                db.remove(lowest, {}, function(err, numRemoved){
                    if(numRemoved === 1){
                        next(true);
                    }else{
                        next(false);
                    }
                });
            });
        }

        function updateIfExistingTopScorer(user, next){
            db.update({ handle: user.handle }, { $set: { score: user.score } }, function (err, docs) {
                if(docs !== null && docs !== undefined && docs !== 0){
                    next(true);
                }else{
                    next(false);
                }
            });
        }

        function addIfOpenSlot(user, next){
            db.count({}, function (err, count) {
                if(count < leaderboardSize){
                    db.insert(user, function(){
                        next(true);
                    });
                }else{
                    next(false);
                }
            });
        }

        return {
            sync: sync
        };
    }

    return {
        getInstance: function (datastore) {
            if (!instance) {
                instance = init(datastore);
            }
            return instance;
        }
    };
})();

module.exports = Leaderboard;