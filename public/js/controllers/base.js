define(function (require) {

    function BaseController(horizonCalculatorWidget) {
        this.widget = horizonCalculatorWidget;
        this.modelStore = new (require('../store/store'))();
        this.inputWatcher = new (require('../utils/input_watcher'))();
        this.fancyUI = new (require('../utils/fancy_ui'))();
        this.ControllerContexts = {};
    }

    BaseController.prototype.getWidgetCount = function(){
        return this.widget.getWidgetCount();
    };

    BaseController.prototype.getWidgetId = function(){
        return this.widget.widgetId;
    };

    BaseController.prototype.registerChild = function (context, ControllerType) {
        this.ControllerContexts[ControllerType] = context;
    };

    BaseController.prototype.initializeResults = function(){
        if(this.ControllerContexts['Results']){
            this.ControllerContexts['Results'].initializeResults();
        }
    };

    BaseController.prototype.enableInput = function(){
        if(this.ControllerContexts['Input']){
            this.ControllerContexts['Input'].enableInput();
        }
    };

    return BaseController;
});