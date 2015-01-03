require(
    [
        '../lib/jquery/dist/jquery.min'
    ], function(jquery)
    {
        require([
            '../js/store/store'
        ], function(ModelStore) {

            // Initialize store and bind models to view
            var modelStore = new ModelStore();
            bindModelXToElement(['inputRowA','followersA','retweetsA', 'favoritesA', 'horizonA'], "A");
            bindModelXToElement(['inputRowB','followersB','retweetsB', 'favoritesB', 'horizonB'], "B");
            function bindModelXToElement(elementIds, X){
                elementIds.forEach(function(e){
                    rivets.bind($('#' + e)[0], {data: modelStore.shelf[X]});
                });
            }

            // Get horizon data when finishing input
            watcher('#handleInputA', "A");
            watcher('#handleInputB', "B");
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
        });
    }
);