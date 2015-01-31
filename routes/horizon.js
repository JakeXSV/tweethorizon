var express = require('express');
var router = express.Router();
var twitterApi = new(require('../twitter/twitter_store.js'))();

function isValidTweet(tweet, handle){
    // Validate tweet was by user and not a retweet
    if(tweet && tweet.user && tweet.user.screen_name){
        if(tweet.user.screen_name.toLowerCase() === handle.toLowerCase()){
            if(tweet.retweeted !== undefined && tweet.retweeted === false && tweet.retweeted_status === undefined){
                return true;
            }
        }
    }
    return false;
}

router.get('/score/:handle', function(req, res) {
    var handle = req.params.handle;

    var stats = {
        horizon: {
            'handle': handle,
            'followers': 0,
            'retweets': 0,
            'favorites': 0,
            'score': 0,
            'rank': 0
        }
    };

    function getStats(timeline) {
        timeline.forEach(function(tweet) {
            if(isValidTweet(tweet, handle)) {
                if (stats.horizon.followers === 0) {
                    stats.horizon.followers += tweet.user.followers_count;
                }
                stats.horizon.retweets += tweet.retweet_count;
                stats.horizon.favorites += tweet.favorite_count;
            }
        });
        stats.horizon.score = (3*stats.horizon.followers) + (2*stats.horizon.retweets) + stats.horizon.favorites;
        res.json(stats);
    }

    function timelineResponseHandler(timeline) {
        if (timeline) {
            getStats(timeline);
        } else {
            res.status(500).end();
        }
    }

    twitterApi.getTimeline(handle, timelineResponseHandler);
});

router.get('/profile/image/:handle', function(req, res) {
    function twitterApiResponseHandler(imageUrl) {
        if (imageUrl) {
            res.send(imageUrl);
        } else {
            res.status(500).end();
        }
    }
    twitterApi.getProfilePictureUrl(req.params.handle, twitterApiResponseHandler);
});

module.exports = router;