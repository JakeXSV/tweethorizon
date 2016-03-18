"use strict";

var HandleResourceService = require('../service/handleResourceService');
var HandleStatService = require('../service/handleStatService');
var handleResourceService = new HandleResourceService();
var handleStatService = new HandleStatService();
var LeaderboardRepository = require('../domain/leaderboardRepository');
var express = require('express');
var router = express.Router();

router.get('/:handle/horizon', function (req, res) {
    try {
        var handle = req.params.handle;
        handleStatService.getScore(handle, function onSuccess(result) {
            LeaderboardRepository.getInstance().update(handle, result.horizon.score);
            res.json(result);
        });
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/:handle/image', function (req, res) {
    try {
        handleResourceService.getProfilePictureUrl(req.params.handle, function onSuccess(imageUrl) {
            res.json(imageUrl);
        });
    } catch (e) {
        res.status(500).end();
    }
});

module.exports = router;
