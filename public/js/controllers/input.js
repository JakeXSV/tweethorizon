define(function (require) {

    function BaseController() {
        this.widget = horizonCalculatorWidget;
        this.modelStore = new (require('../store/store'))();
        this.inputWatcher = new (require('../utils/input_watcher'))();
        this.fancyUI = new (require('../utils/fancy_ui'))();
    }

    return BaseController;
});