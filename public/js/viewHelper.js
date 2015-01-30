define('viewHelper', ['jquery', 'watch', 'modelStore'], function ($, Watch, modelStore) {

    return (function () {

        var instance;
        function init() {

            function injectProfilePicture(elementId, imagePath){
                var profilePicId = "";
                var html = "";
                if(elementId === "UserA"){
                    profilePicId = "imgA";
                    html = '<img id="' + profilePicId + '" class="centerInParent" src="' + imagePath + '">';
                    $("#pictureA")[0].innerHTML = html;
                }else if(elementId === "UserB"){
                    profilePicId = "imgB";
                    html = '<img id="' + profilePicId + '" class="centerInParent" src="' + imagePath + '">';
                    $("#pictureB")[0].innerHTML = html;
                }
            }

            Watch.watch(modelStore.getInstance().getModel("UserA"), ["imagePath"], function(){
                injectProfilePicture("UserA", modelStore.getInstance().getModel("UserA").imagePath);
            });

            Watch.watch(modelStore.getInstance().getModel("UserB"), ["imagePath"], function(){
                injectProfilePicture("UserA", modelStore.getInstance().getModel("UserB").imagePath);
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