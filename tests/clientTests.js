var requirejs = require('requirejs');
requirejs.config({
   paths :{
       leaderBoardUnitTester: './unit/leaderBoard_units',
       leaderModel: '../public/js/store/models/leader',
       leaderBoardModel: '../public/js/store/models/leaderBoard'
   }
});
requirejs(
    [
        'leaderBoardUnitTester'
    ], function (leaderBoardUnitTester) {
        leaderBoardUnitTester.runSortSuite();
    }
);