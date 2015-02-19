var requirejs = require('requirejs');
requirejs.config({
   paths :{
       leaderBoardUnitTests: './unit/leaderBoard_units',
       //leaderBoardIntegrationTests: './integration/leaderBoard_ints',
       leaderModel: '../public/js/store/models/leader',
       leaderBoardModel: '../public/js/store/models/leaderBoard'
   }
});
requirejs(
    [
        'leaderBoardUnitTests',
        //'leaderBoardIntegrationTests'
    ], function (leaderBoardUnitTests, leaderBoardIntegrationTests) {
        leaderBoardUnitTests.runSortSuite();
        //leaderBoardIntegrationTests.runIntegrationSuite();
    }
);