require.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        userModel: '../js/store/models/user',
        modelStore: '../js/store/store'
    }
});

require(
    [
        'jquery',
        'modelStore'
    ],
    function($, ModelStore) {

        // Initialize store and bind models to view
        var modelStore = new ModelStore();
        bindElementsToModel(['inputRowA','followersA','retweetsA', 'favoritesA', 'horizonA'], "ProfileA");
        bindElementsToModel(['inputRowB','followersB','retweetsB', 'favoritesB', 'horizonB'], "ProfileB");
        function bindElementsToModel(elementIds, model){
            elementIds.forEach(function(e){
                rivets.bind($('#' + e)[0], {data: modelStore.shelf[model]});
            });
        }

        // Get horizon data when finishing input
        watcher('#handleInputA', "ProfileA");
        watcher('#handleInputB', "ProfileB");
        function watcher(selector, userId){
            var typingTimer;
            var doneTypingInterval = 500;
            $(selector).keyup(function(){
                clearTimeout(typingTimer);
                if ($(selector).val) {
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                }
            });
            function doneTyping () {
                modelStore.getHandleData(userId);
            }
        }
    }
);
