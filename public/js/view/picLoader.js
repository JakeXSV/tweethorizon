define('picLoader', ['jquery', 'watch', 'modelStore'], function ($, Watch, modelStore) {
    'use strict';

    return (function () {
        var instance;
        function init() {
            function injectProfilePicture(imagePath){
                var pictureId = "#picture";
                var pictureHtml = '<img id="img" class="centerInParent circleImage spacer" rv-hide="data.isLoading" src="'+imagePath+'">';
                var pictureElement = $(pictureId)[0];
                pictureElement.innerHTML = pictureHtml;
                rivets.bind(pictureElement, {data: modelStore.getInstance().getUser()});
            }
            Watch.watch(modelStore.getInstance().getUser(), "imagePath", function(){
                injectProfilePicture(modelStore.getInstance().getUser().imagePath);
            });
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