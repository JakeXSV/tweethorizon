var express = require('express');
var router = express.Router();
var twitterApi = new (require('../twitter/twitter_store.js'))();

router.get('/score/:handle', function(req, res) {
  var handle = req.params.handle;

  var stats = {
    horizon:{
      'handle': handle,
      'followers': 0,
      'retweets': 0,
      'favorites': 0,
      'score': 0,
      'rank': 0
    }
  };

  function getStats(timeline){
    timeline.forEach(function(tweet){
      if(tweet.user.screen_name === handle && !tweet.retweeted){
        if(stats.horizon.followers === 0){
          stats.horizon.followers += tweet.user.followers_count;
        }
        stats.horizon.retweets += tweet.retweet_count;
        stats.horizon.favorites += tweet.favorite_count;
      }
    });
    stats.horizon.score = stats.horizon.followers + stats.horizon.retweets + stats.horizon.favorites;
    res.send(stats);
  }

  function timelineResponseHandler(timeline){
    if(timeline){
      getStats(timeline);
    }else{
      res.status(500).end();
    }
  }

  twitterApi.getTimeline(handle, timelineResponseHandler);
});

router.get('/profile/image/:handle', function(req, res) {
  function twitterApiResponseHandler(imageUrl){
    if(imageUrl){
      res.send(imageUrl);
    }else{
      res.status(500).end();
    }
  }
  twitterApi.getProfilePictureUrl(req.params.handle, twitterApiResponseHandler);
});

module.exports = router;