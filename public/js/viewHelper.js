define('viewHelper', ['jquery', 'watch', 'modelStore'], function ($, Watch, modelStore) {

    return (function () {

        var instance;
        function init() {

            var userModelAId = "UserA";
            var userModelBId = "UserB";

            function injectProfilePicture(elementId, imagePath){
                var profilePicId = "";
                var html = "";
                if(elementId === userModelAId){
                    profilePicId = "imgA";
                    html = '<img id="' + profilePicId + '" class="centerInParent" src="' + imagePath + '">';
                    $("#pictureA")[0].innerHTML = html;
                }else if(elementId === userModelBId){
                    profilePicId = "imgB";
                    html = '<img id="' + profilePicId + '" class="centerInParent" src="' + imagePath + '">';
                    $("#pictureB")[0].innerHTML = html;
                }
            }
            Watch.watch(modelStore.getInstance().getModel(userModelAId), "imagePath", function(){
                injectProfilePicture(userModelAId, modelStore.getInstance().getModel(userModelAId).imagePath);
                $("#handleInputB")[0].disabled = false; //enable second profile input since first was calc'd
            });
            Watch.watch(modelStore.getInstance().getModel(userModelBId), "imagePath", function(){
                injectProfilePicture(userModelBId, modelStore.getInstance().getModel(userModelBId).imagePath);
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