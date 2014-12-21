define(function (require) {

    function WidgetManager() {
        this.widgetIds = {};
        /* Horizon Calculator Widget */
        this.horizonCalcCount = 1; //this is needed since upon creation of a widget, it needs to know if more are going to be made, so it has proper style
        this.horizonCalcWidgetSet = [];
        this.HorizonCalc = require('./widgets/horizon_calc');
    }

    WidgetManager.prototype.generateWidgetId = function(type){
        var self = this;
        function getRandomNumber(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var id = getRandomNumber(0, 100);
        if(this.widgetIds[id] === undefined){
            this.widgetIds[id] = type;
            return id;
        }else{
            self.generateWidgetId();
        }
    };

    /* Horizon Calculator Widget Functions */
    WidgetManager.prototype.createHorizonCalcWidget = function(linksToView){
        if(!this.isHorizonWidgetLinksToViewValid(linksToView)){
            console.log("Error - Invalid linking to view configuration.");
            return;
        }
        this.horizonCalcWidgetSet.push(new this.HorizonCalc(this, linksToView));
    };
    WidgetManager.prototype.deleteAllHorizonCalcWidgets = function(){
        var self = this;
        this.horizonCalcWidgetSet.forEach(function(horizonCalcWidget){
            horizonCalcWidget.deleteViews();
        });
        self.horizonCalcWidgetSet = [];
        self.horizonCalcCount = 0;
        self.widgetIds.horizonCalc = {};
    };
    WidgetManager.prototype.isHorizonWidgetLinksToViewValid = function(linksToView){
        return linksToView !== undefined &&
            linksToView.inputController !== undefined &&
            linksToView.resultsController !== undefined &&
            linksToView.inputController.inputRowId !== undefined &&
            linksToView.resultsController.followersRowId !== undefined &&
            linksToView.resultsController.retweetsRowId !== undefined &&
            linksToView.resultsController.favoritesRowId !== undefined &&
            linksToView.resultsController.horizonRowId !== undefined;
    };
    /* End of Horizon Calculator Widget Functions */

    return WidgetManager;
});