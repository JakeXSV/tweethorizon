define(function () {
    function ModelStore(){
        this.getProfilePictureEndpoint = '/horizon/profile/image/';
        this.getHorizonScoreEndpoint = '/horizon/score/';
        this.widgetModelStore = {};
    }

    ModelStore.prototype.getProfilePictureUrl = function(handle, callback, context){
        var self = this;
        var request = $.ajax({
            type: "GET",
            url: self.getProfilePictureEndpoint+handle
        });

        request.done(function(e) {
            callback(e, context);
        });

        request.fail(function(error, status) {
            callback(undefined, context);
        });
    };

    ModelStore.prototype.getHorizonScore = function(handle, callback, context, widgetId){
        var self = this;
        var request = $.ajax({
            type: "GET",
            url: self.getHorizonScoreEndpoint+handle
        });

        request.done(function(e) {
            //save
            self.widgetModelStore[widgetId] = e;
            callback(e, context);
        });

        request.fail(function(error, status) {
            callback(undefined, context);
        });
    };

    return ModelStore;
});