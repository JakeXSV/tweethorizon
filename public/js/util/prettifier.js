"use strict";
define('prettifier', [], function () {
    return (function () {
        var instance;
        function init() {
            function numberWithCommas(x) {
                if(x === undefined){ return ''; }
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return {
                numberWithCommas: numberWithCommas
            }
        }

        return {
            getInstance: function () {
                if ( !instance ) {
                    instance = init();
                }
                return instance;
            }
        };
    })();
});