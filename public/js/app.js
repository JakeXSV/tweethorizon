require.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        watch: '../lib/watch/src/watch.min',
        userModel: '../js/store/models/user',
        modelStore: '../js/store/store',
        viewHelper: '../js/viewHelper'
    }
});

require(
    [
        'jquery',
        'modelStore',
        'viewHelper'
    ],
    function($, modelStore, viewHelper) {

        // Identifiers for model in modelStore's shelf. Could be made dynamic.
        var userAId = "UserA";
        var userBId = "UserB";

        // Initialize data binding
        viewHelper.getInstance();
        bindElementsToModel(['inputRowA','followersA','retweetsA', 'favoritesA', 'horizonA'], userAId);
        bindElementsToModel(['inputRowB','followersB','retweetsB', 'favoritesB', 'horizonB'], userBId);
        function bindElementsToModel(elementIds, modelId){
            elementIds.forEach(function(e){
                rivets.bind($('#' + e)[0], {data: modelStore.getInstance().getModel[modelId]});
            });
        }

        // On completion of input, get associated twitter+horizon data
        watcher('#handleInputA', userAId);
        watcher('#handleInputB', userBId);
        function watcher(selector, modelId){
            var typingTimer;
            var doneTypingInterval = 500;
            $(selector).keyup(function(){
                clearTimeout(typingTimer);
                if ($(selector).val) {
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                }
            });
            function doneTyping () {
                modelStore.getInstance().getHandleData(modelId);
            }
        }
    }
);
