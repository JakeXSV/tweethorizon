var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var LeaderboardRepository = require('../../domain/leaderboardRepository');

describe('LeaderboardRepository', function () {
    describe('get()', function () {
        it('should return empty dataset when datastore is empty.', function () {
            LeaderboardRepository.getInstance().get(function (result) {
                assert.deepEqual(result, []);
            });
        });
        it('should return data correctly (1).', function () {
            var Datastore = require('nedb');
            db = new Datastore();
            // Use nedb API to manually insert record, then initialize repo and attempt to get.
            db.insert({id: 1, data: "seoifj"}, function (err, insertResult) {
                LeaderboardRepository.getInstance(db).get(function (getResult) {
                    assert.deepEqual([insertResult], getResult);
                });
            });
        });
    });
    describe('add()', function () {
        it('should add user to database successfully.', function () {
            var Datastore = require('nedb');
            db = new Datastore();
            LeaderboardRepository.getInstance(db).add(
                {
                    handle: "JakeXSV",
                    score: 900
                },
                function (addResult) {
                    should.exist(addResult);
                    LeaderboardRepository.getInstance().get(function (getResult) {
                        assert.deepEqual([addResult], getResult);
                    });
                }
            );
        });
    });
});
