var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
chai.should();

describe('LeaderboardRepository', function () {
    describe('get()', function () {
        it('should return empty dataset when datastore is empty.', function () {
            var LeaderboardRepository = require('../../domain/LeaderboardRepository');
            LeaderboardRepository.getInstance().get(function (result) {
                assert.deepEqual(result, []);
            });
        });
        it('should return data correctly (1).', function () {
            var Datastore = require('nedb');
            db = new Datastore();
            var insertedDoc = null;
            db.insert({id: 1, data: "seoifj"}, function (err, result) {
                insertedDoc = result;
            });

            var LeaderboardRepository = require('../../domain/LeaderboardRepository');
            LeaderboardRepository.getInstance(db).get(function (result) {
                assert.deepEqual(result, [insertedDoc]);
            });
        });
    });
});
