define(function () {
    function ModelStore(){
        var self = this;
        this.getProfilePictureEndpoint = '/horizon/profile/image/';
        this.getHorizonScoreEndpoint = '/horizon/score/';
        this.getEmptyModel = function(){
            return {
                handle: undefined,
                imagePath: undefined,
                followers: undefined,
                retweets: undefined,
                favorites: undefined,
                score: undefined,
                rank: undefined,
                isLoading: false,
                imageHtml: undefined,
                horizonObtained: false
            };
        };
        this.shelf = {
            A: self.getEmptyModel(),
            B: self.getEmptyModel()
        };
    }

    ModelStore.prototype.getHandleData = function(userId){
        this.shelf[userId].isLoading = true;
        this.getProfilePictureUrl(userId);
        this.getHorizonScore(userId);
    };

    ModelStore.prototype.getProfilePictureUrl = function(userId){
        var self = this;
        var request = $.ajax({
            type: "GET",
            url: self.getProfilePictureEndpoint + self.shelf[userId].handle
        });

        request.done(function(e) {
            console.log(e);
            self.shelf[userId].imagePath = e;
            self.shelf[userId].imageHtml = '<img id="imgA" class="centerInParent" src="' + e + '">';
            //self.shelf[userId].imageHtml = "testestset";
        });

        request.fail(function(error, status) {
            console.log(error);
            console.log(status);
        });
    };

    ModelStore.prototype.getHorizonScore = function(userId){
        var self = this;
        var request = $.ajax({
            type: "GET",
            url: self.getHorizonScoreEndpoint + self.shelf[userId].handle
        });

        request.done(function(e) {
            self.shelf[userId].followers = e.horizon.followers;
            self.shelf[userId].retweets = e.horizon.retweets;
            self.shelf[userId].favorites = e.horizon.favorites;
            self.shelf[userId].score = e.horizon.score;
            self.shelf[userId].rank = e.horizon.rank;
            self.shelf[userId].horizonObtained = true;
            self.shelf[userId].isLoading = false;
        });

        request.fail(function(error, status) {
            console.log(error);
            console.log(status);
        });
    };

    return ModelStore;
});