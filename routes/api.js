'use strict';
var twitterApi = new(require('../twitter/twitter_store.js'))();
var HorizonCalc = require('../twitter/horizon_calc');
var express = require('express');
var router = express.Router();

router.get('/:handle/score', function (req, res) {
    var handle = req.params.handle;

    twitterApi.getTimeline(handle, timelineResponseHandler);
    function timelineResponseHandler(timeline) {
        if (timeline) {
            getStats(timeline);
        } else {
            res.status(500).end();
        }
    }

    function getStats(timeline) {
        var stats = HorizonCalc.getInstance().calculateStatsByTimeline(timeline, handle);
        res.json(stats);
    }
});

router.get('/:handle/image', function (req, res) {
    twitterApi.getProfilePictureUrl(req.params.handle, twitterApiResponseHandler);
    function twitterApiResponseHandler(imageUrl) {
        if (imageUrl) {
            res.send(imageUrl);
        } else {
            res.status(500).end();
        }
    }
});

module.exports = router;
