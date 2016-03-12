var HorizonCalc = (function () {
    var instance;

    function init() {

        function isValidTweet(tweet, handle) {
            // Validate tweet was by user and not a retweet
            if (tweet && tweet.user && tweet.user.screen_name) {
                if (tweet.user.screen_name.toLowerCase() === handle.toLowerCase()) {
                    if (tweet.retweeted !== undefined && tweet.retweeted === false && tweet.retweeted_status === undefined) {
                        return true;
                    }
                }
            }

            return false;
        }

        function calculateStatsByTimeline(timeline, handle) {
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

            timeline.forEach(function (tweet) {
                if (isValidTweet(tweet, handle)) {
                    if (stats.horizon.followers === 0) {
                        stats.horizon.followers += tweet.user.followers_count;
                    }
                    stats.horizon.retweets += tweet.retweet_count;
                    stats.horizon.favorites += tweet.favorite_count;
                }
            });

            stats.horizon.score = (3 * stats.horizon.followers) + (2 * stats.horizon.retweets) + stats.horizon.favorites;
            return stats;
        }

        return {
            calculateStatsByTimeline: calculateStatsByTimeline
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = HorizonCalc;
