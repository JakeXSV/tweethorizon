define(function () {

    function InputWatcher() {
        this.doneTypingInterval = 400;
    }

    InputWatcher.prototype.registerWatcher = function (jQuerySelector, callback, context) {

        var self = this;
        var typingTimer;

        function callbackFunc(){
            callback(context);
        }

        $(jQuerySelector).keyup(function () {
            clearTimeout(typingTimer);
            if ($(jQuerySelector).val) {
                typingTimer = setTimeout(callbackFunc, self.doneTypingInterval);
            }
        });

    };

    return InputWatcher;
});