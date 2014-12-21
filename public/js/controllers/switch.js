define(function () {

    function SwitchController(linksToView, widgetManager) {
        this.widgetManager = widgetManager;
        this.linksToView = linksToView;
        this.switchButtonId = linksToView.switchController.switchId;
        this.switchButtonSelector = '#' + this.switchButtonId;
        this.registerEvents();
    }

    SwitchController.prototype.registerEvents = function () {
        var self = this;
        $(self.switchButtonSelector).click(function () {
            $(this).toggleClass('On').toggleClass('Off');
            /*
              Since the widgets are completely dynamic, you could have
              a slider control that represents the number of widgets on
              page. However due to front end framework, only 12 columns
              exist. Can have 1-12.
            */
            if(self.widgetManager.horizonCalcCount === 1){
                // Was one, make 2
                self.widgetManager.deleteAllHorizonCalcWidgets();
                self.widgetManager.horizonCalcCount = 2;
                self.widgetManager.createHorizonCalcWidget(self.linksToView);
                self.widgetManager.createHorizonCalcWidget(self.linksToView);
            }else{
                // was two, make one
                self.widgetManager.deleteAllHorizonCalcWidgets();
                self.widgetManager.horizonCalcCount = 1;
                self.widgetManager.createHorizonCalcWidget(self.linksToView);
            }
        });
    };

    return SwitchController;
});