var requirejs = require('requirejs');
requirejs.config({
   paths :{
       leaderBoardUnitTester: './unit/leaderBoard_units',
       leaderModel: '../public/js/store/models/leader',
       leaderBoardModel: '../public/js/store/models/leaderBoard',
       prettifier: '../public/js/util/prettifier'
   }
});
requirejs(
    [
        'leaderBoardUnitTester'
    ], function (leaderBoardUnitTester) {
        leaderBoardUnitTester.runSortSuite();
    }
);