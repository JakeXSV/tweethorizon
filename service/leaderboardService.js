"use strict";

var LeaderboardService = (function () {

    var LeaderboardRepository = require('../domain/leaderboardRepository');

    var socket = null;
    var countCache = 0;

    function registerSocket(socketToRegister) {
        if (socketToRegister === null || socketToRegister === undefined) {
            throw new Error('LeaderboardService.registerSocket - Invalid socket.');
        }

        socket = socketToRegister;
    }

    function emit() {
        if (socket !== null) {
            LeaderboardRepository.getInstance().get(function() {
                socket.emit('leaderboard', leaderboard);
            })
        }
    }

    function update(handle, score) {
        if (countCache < 2) {
            LeaderboardRepository.getInstance().add({ handle: handle, score: score}, function () {
                countCache++;
                emit();
            });
        } else {
            LeaderboardRepository.getInstance().dropLastPlace(function () {
                LeaderboardRepository.getInstance().add({ handle: handle, score: score}, function () {
                    emit();
                });
            })
        }
    }

    return {
        registerSocket: registerSocket,
        emit: emit,
        get: get,
        update: update
    };
});

module.exports = LeaderboardService;
