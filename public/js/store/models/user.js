define('userModel', function () {
    return function(){
        return {
            handle: undefined,
            imagePath: undefined,
            followers: undefined,
            retweets: undefined,
            favorites: undefined,
            score: undefined,
            rank: undefined,
            isLoading: false,
            horizonObtained: false
        }
    };
});