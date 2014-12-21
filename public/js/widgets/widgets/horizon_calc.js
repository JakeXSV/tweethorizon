define(function (require) {

    function HorizonCalcWidget(widgetManager, linksToView) {
        this.widgetManager = widgetManager;
        this.linksToView = linksToView;
        this.inputRowId = this.linksToView.inputController.inputRowId;
        this.widgetId = this.widgetManager.generateWidgetId("HorizonCalc");
        this.baseController = new (require('../../controllers/base'))(this);
        this.inputController = new (require('../../controllers/input'))(this.baseController, this.widgetId, this.inputRowId);
        this.resultsController = new (require('../../controllers/results'))(this.baseController, this.widgetId, linksToView);
    }

    HorizonCalcWidget.prototype.getWidgetCount = function(){
        return this.widgetManager.horizonCalcCount;
    };

    HorizonCalcWidget.prototype.deleteViews = function(){
        $('#'+this.linksToView.inputController.inputRowId).prop('innerHTML', '');
        $('#'+this.linksToView.resultsController.followersRowId).prop('innerHTML', '');
        $('#'+this.linksToView.resultsController.retweetsRowId).prop('innerHTML', '');
        $('#'+this.linksToView.resultsController.favoritesRowId).prop('innerHTML', '');
        $('#'+this.linksToView.resultsController.horizonRowId).prop('innerHTML', '');
    };

    return HorizonCalcWidget;
});