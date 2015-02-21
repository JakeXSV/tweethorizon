"use strict";
define('modelStore', ['jquery', 'socketio', 'userModel', 'leaderBoardModel', 'toastr', 'prettifier'], function ($, socketio, getUserModel, getLeaderBoardModel, toastr, prettifier) {

    return (function () {

        var instance;
        function init() {

            // Listen for leaderboard updates from server
            var socket = socketio.connect(document.URL);
            socket.on('leaderBoard', function (data) {
                setLeaderBoard(data.leaderBoard);
            });

            var shelf = {
                user: getUserModel(),
                leaderBoard: getLeaderBoardModel()
            };
            function getUser(){
                if(shelf.user !== undefined){
                    return shelf.user;
                }
            }
            function getLeaderBoard(){
                if(shelf.leaderBoard !== undefined){
                    return shelf.leaderBoard.getBoard();
                }
            }
            function setLeaderBoard(e){
                if(shelf.leaderBoard !== undefined){
                    return shelf.leaderBoard.setBoard(e);
                }
            }

            function getHandleData(){
                if(shelf.user.handle !== undefined && shelf.user.handle.length >= 1){
                    shelf.user.isLoading = true;
                    getProfilePictureUrl();
                }
            }
            function getProfilePictureUrl(){
                var request = $.ajax({
                    type: "GET",
                    url: '/api/' + shelf.user.handle + '/image'
                });
                request.done(function (e) {
                    shelf.user.imagePath = e;
                    getHorizonScore();
                });
                request.fail(function (error, status) {
                    toastr.options.positionClass = 'toast-bottom-center';
                    toastr.error('bad @handle', 'uh oh');
                    shelf.user.isLoading = false;
                });
            }
            function getHorizonScore(){
                var request = $.ajax({
                    type: "GET",
                    url: '/api/' + shelf.user.handle + '/score'
                });
                request.done(function(e) {
                    shelf.user.followers = prettifier.getInstance().numberWithCommas(e.horizon.followers);
                    shelf.user.retweets = prettifier.getInstance().numberWithCommas(e.horizon.retweets);
                    shelf.user.favorites = prettifier.getInstance().numberWithCommas(e.horizon.favorites);
                    shelf.user.score = prettifier.getInstance().numberWithCommas(e.horizon.score);
                    shelf.user.horizonObtained = true;
                    shelf.user.isLoading = false;
                });
                request.fail(function(error, status) {
                    toastr.options.positionClass = 'toast-bottom-center';
                    toastr.error('bad @handle', 'uh oh');
                    shelf.user.isLoading = false;
                });
            }

            return {
                getHandleData: getHandleData,
                getUser: getUser,
                getLeaderBoard: getLeaderBoard,
                setLeaderBoard: setLeaderBoard
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