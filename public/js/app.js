require(['../lib/jquery/dist/jquery.js'], function(jQuery){ //global level, app level dep
    require([
        '../js/controllers/switch.js',
        '../js/widgets/manager.js'
    ], function(SwitchController, WidgetManager) {

        var widgetManager = new WidgetManager();
        var linksToView = {
            'inputController': {
                'inputRowId': 'inputRow'
            },
            'resultsController': {
                'followersRowId': 'followersRow',
                'retweetsRowId': 'retweetsRow',
                'favoritesRowId': 'favoritesRow',
                'horizonRowId': 'horizonRow'
            },
            'switchController': {
                'switchId': 'mainSwitch'
            }
        };

        // Default have one calc
        widgetManager.createHorizonCalcWidget(linksToView);

        // Switch controller watches toggle switch and creates/deletes widgets as needed
        var switchController = new SwitchController(linksToView, widgetManager);

    });
});