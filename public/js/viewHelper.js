define('viewHelper', ['jquery', 'watch', 'modelStore'], function ($, Watch, modelStore) {

    return (function () {

        var instance;
        function init() {

            var userModelAId = "UserA";
            var userModelBId = "UserB";

            function injectProfilePicture(modelId, imagePath){
                var profilePicId = "";
                var pictureId = "#";
                var html = '<img id="REPLACE_ID" class="centerInParent circleImage spacer" rv-hide="data.isLoading" src="REPLACE_IMG_PATH">';
                if(modelId === userModelAId){
                    profilePicId = "imgA";
                    pictureId += "pictureA";
                }else if(modelId === userModelBId){
                    profilePicId = "imgB";
                    pictureId += "pictureB";
                }
                html = html.replace("REPLACE_ID", profilePicId);
                html = html.replace("REPLACE_IMG_PATH", imagePath);
                var pictureElement = $(pictureId)[0];
                pictureElement.innerHTML = html;
                rivets.bind(pictureElement, {data: modelStore.getInstance().getModel(modelId)});
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