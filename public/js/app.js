"use strict";
require.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        watch: '../lib/watch/src/watch.min',
        socketio: '../lib/socket.io-client/socket.io',
        userModel: '../js/store/models/user',
        leaderModel: '../js/store/models/leader',
        leaderBoardModel: '../js/store/models/leaderBoard',
        modelStore: '../js/store/store',
        picLoader: '../js/view/picLoader',
        toastr: '../lib/toastr/toastr.min',
        prettifier: '../js/util/prettifier'
    }
});
require(
    [
        'jquery',
        'modelStore',
        'picLoader'
    ],
    function($, modelStore, picLoader) {

        // Bind view components to models in store
        bindElementsToUserModel(['inputRow','followers','retweets', 'favorites', 'horizon']);
        function bindElementsToUserModel(elementIds){
            elementIds.forEach(function(e){
                rivets.bind($('#' + e)[0], {data: modelStore.getInstance().getUser()});
            });
        }
        bindElementsToLeaderBoard(["first", "second", "third", "fourth", "fifth"]);
        function bindElementsToLeaderBoard(elementIds){
            var i=0;
            elementIds.forEach(function(e){
                rivets.bind($('#' + e)[0], modelStore.getInstance().getLeaderBoard()[i++]);
            });
        }

        //watches user model and renders profile pic in dom
        picLoader.getInstance();

        // On completion of input, get associated twitter+horizon data
        watcher('#handleInput');
        function watcher(selector){
            var typingTimer;
            var doneTypingInterval = 1000;
            $(selector).keyup(function(){
                clearTimeout(typingTimer);
                if ($(selector).val) {
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                }
            });
            function doneTyping () {
                modelStore.getInstance().getHandleData();
            }
        }

        // Show all initially hidden elements. Start hidden due to rivets loading.
        // TODO - remove, show/hide poor performance
        $(document).ready(function() {
            $(".hide").show();
        });
    }
);
