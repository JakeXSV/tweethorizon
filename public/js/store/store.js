define('modelStore', ['jquery', 'userModel', 'noty'], function ($, getUserModel) {

    return (function () {

        var instance;
        function init() {

            var getProfilePictureEndpoint = '/horizon/profile/image/';
            var getHorizonScoreEndpoint = '/horizon/score/';
            var shelf = {
                UserA: getUserModel(),
                UserB: getUserModel()
            };
            function getModel(modelId){
                if(shelf[modelId] !== undefined){
                    return shelf[modelId];
                }
            }

            function getShelf(){
                return shelf;
            }

            function getHandleData(modelId){
                if(modelId !== undefined && shelf[modelId] !== undefined){
                    if(shelf[modelId].handle !== undefined && shelf[modelId].handle.length >= 1){
                        shelf[modelId].isLoading = true;
                        getProfilePictureUrl(modelId);
                    }
                }
            }

            function getProfilePictureUrl(modelId){
                var request = $.ajax({
                    type: "GET",
                    url: getProfilePictureEndpoint + shelf[modelId].handle
                });

                request.done(function(e) {
                    shelf[modelId].imagePath = e;
                    getHorizonScore(modelId);
                });

                request.fail(function(error, status) {
                    noty({text: 'bad @handle', layout: 'center', type: 'error', theme: 'defaultTheme'});
                    shelf[modelId].isLoading = false;
                });
            }

            function getHorizonScore(modelId){
                var request = $.ajax({
                    type: "GET",
                    url: getHorizonScoreEndpoint + shelf[modelId].handle
                });

                request.done(function(e) {
                    shelf[modelId].followers = e.horizon.followers;
                    shelf[modelId].retweets = e.horizon.retweets;
                    shelf[modelId].favorites = e.horizon.favorites;
                    shelf[modelId].score = e.horizon.score;
                    shelf[modelId].rank = e.horizon.rank;
                    shelf[modelId].horizonObtained = true;
                    shelf[modelId].isLoading = false;
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