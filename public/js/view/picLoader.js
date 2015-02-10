define('picLoader', ['jquery', 'watch', 'modelStore'], function ($, Watch, modelStore) {

    return (function () {
        var instance;
        function init() {
            function injectProfilePicture(imagePath){
                var pictureId = "#picture";
                var pictureHtml = '<img id="img" class="centerInParent circleImage spacer" rv-hide="data.isLoading" src="'+imagePath+'">';
                var pictureElement = $(pictureId)[0];
                pictureElement.innerHTML = pictureHtml;
                rivets.bind(pictureElement, {data: modelStore.getInstance().getModel()});
            }
            Watch.watch(modelStore.getInstance().getModel(), "imagePath", function(){
                injectProfilePicture(modelStore.getInstance().getModel().imagePath);
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