require.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        watch: '../lib/watch/src/watch.min',
        userModel: '../js/store/models/user',
        leaderModel: '../js/store/models/leader',
        modelStore: '../js/store/store',
        picLoader: '../js/view/picLoader',
        leaderBoard: '../js/store/models/leaderBoard',
        noty: '../lib/noty/js/noty/packaged/jquery.noty.packaged.min',
        socketio: '../lib/socket.io-client/socket.io'
    }
});

require(
    [
        'jquery',
        'modelStore',
        'picLoader'
    ],
    function($, modelStore, picLoader) {

        // Initialize data binding
        bindElementsToUserModel(['inputRow','followers','retweets', 'favorites', 'horizon']);
        function bindElementsToUserModel(elementIds){
            elementIds.forEach(function(e){
                rivets.bind($('#' + e)[0], {data: modelStore.getInstance().getModel()});
            });
        }
        picLoader.getInstance(); //watches user model and renders profile pic in dom

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
