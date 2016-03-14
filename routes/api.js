"use strict";

var HandleResourceService = require('../service/HandleResourceService');
var handleResourceService = new HandleResourceService();
var express = require('express');
var router = express.Router();

router.get('/:handle/score', function (req, res) {
    //var handle = req.params.handle;
});

router.get('/:handle/image', function (req, res) {
    try {
        function onSuccess(imageUrl) {
            res.json(imageUrl);
        }
        handleResourceService.getProfilePictureUrl(req.params.handle, onSuccess.bind(this));
    } catch (e) {
        console.log("500 end!");
        res.status(500).end();
    }
});

module.exports = router;
