"use strict";

var HandleResourceService = require('../service/handleResourceService');
var HandleStatService = require('../service/handleStatService');
var handleResourceService = new HandleResourceService();
var handleStatService = new HandleStatService();
var express = require('express');
var router = express.Router();

router.get('/:handle/score', function (req, res) {
    try {
        handleStatService.getScore(req.params.handle, function onSuccess(score) {
            res.json(score);
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
