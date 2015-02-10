define('modelStore', ['jquery', 'userModel', 'leaderBoard'], function ($, getUserModel, getLeaderBoard) {

    return (function () {

        var instance;
        function init() {

            /*
             var socket = socketio.connect(document.URL);
             socket.on('leaderboard', function (data) {
             console.log(data);
             });
             */
            var shelf = {
                User: getUserModel(),
                leaderBoard: getLeaderBoard()
            };
            function getShelf(){
                return shelf;
            }
            function getModel(){
                if(shelf.User !== undefined){
                    return shelf.User;
                }
            }
            function getHandleData(){
                if(shelf.User.handle !== undefined && shelf.User.handle.length >= 1){
                    shelf.User.isLoading = true;
                    getProfilePictureUrl();
                }
            }

            function getProfilePictureUrl(){
                var request = $.ajax({
                    type: "GET",
                    url: '/api/' + shelf.User.handle + '/image'
                });
                request.done(function(e) {
                    shelf.User.imagePath = e;
                    getHorizonScore();
                });
                request.fail(function(error, status) {
                    noty({text: 'bad @handle', layout: 'center', type: 'error', theme: 'defaultTheme'});
                    shelf.User.isLoading = false;
                });
            }
            function getHorizonScore(){
                var request = $.ajax({
                    type: "GET",
                    url: '/api/' + shelf.User.handle + '/score'
                });
                request.done(function(e) {
                    shelf.User.followers = e.horizon.followers;
                    shelf.User.retweets = e.horizon.retweets;
                    shelf.User.favorites = e.horizon.favorites;
                    shelf.User.score = e.horizon.score;
                    shelf.User.rank = e.horizon.rank;
                    shelf.User.horizonObtained = true;
                    shelf.User.isLoading = false;
                });
                request.fail(function(error, status) {
                    console.log(error);
                    console.log(status);
                });
            }

            return {
                getHandleData: getHandleData,
                getModel: getModel,
                getShelf: getShelf
            };
        }

        return {
            getInstance: function () {
                if ( !instance ) {
                    instance = init();
                }
                return instance;
            }
        };
    })();

});