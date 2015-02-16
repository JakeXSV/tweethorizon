"use strict";
define('modelStore', ['jquery', 'userModel', 'leaderBoard'], function ($, getUserModel, getLeaderBoardModel) {

    return (function () {

        var instance;
        function init() {

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
                request.done(function(e) {
                    shelf.user.imagePath = e;
                    getHorizonScore();
                });
                request.fail(function(error, status) {
                    noty({text: 'bad @handle', layout: 'center', type: 'error', theme: 'defaultTheme'});
                    shelf.user.isLoading = false;
                });
            }
            function getHorizonScore(){
                var request = $.ajax({
                    type: "GET",
                    url: '/api/' + shelf.user.handle + '/score'
                });
                request.done(function(e) {
                    shelf.user.followers = e.horizon.followers;
                    shelf.user.retweets = e.horizon.retweets;
                    shelf.user.favorites = e.horizon.favorites;
                    shelf.user.score = e.horizon.score;
                    shelf.user.rank = e.horizon.rank;
                    shelf.user.horizonObtained = true;
                    shelf.user.isLoading = false;
                });
                request.fail(function(error, status) {
                    console.log(error);
                    console.log(status);
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