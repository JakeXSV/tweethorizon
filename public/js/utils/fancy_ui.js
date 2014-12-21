define(function () {

    function FancyUI() {
        /* UI Components */
        this.loaderId = '';
        this.loaderSelector = '#' + this.loaderId;
        this.pictureId = '';
        this.pictureSelector = '#' + this.pictureId;
    }

    FancyUI.prototype.wrapImages = function(){
        $(this.pictureSelector).wrap('<span class="image-wrap ' + $(this.pictureSelector).attr('class') +
        '" style="position:relative; background:url(' + $(this.pictureSelector).attr('src') + ') no-repeat center center;' +
        'width: ' + $(this.pictureSelector).width() + 'px; height: ' + $(this.pictureSelector).height() + 'px; ' +
        'background-size: 100%; -webkit-border-radius: 50em; -moz-border-radius: 50em; border-radius: 50em; margin-bottom: 15px; margin-top: 15px;" />');
        $(this.pictureSelector).css("opacity","0");
    };

    FancyUI.prototype.startLoader = function(){
        $(this.loaderSelector)[0].innerHTML = '<div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div>';
    };

    FancyUI.prototype.stopLoader = function(){
        $(this.loaderSelector)[0].innerHTML = '';
    };

    FancyUI.prototype.linkToView = function(loaderElementId, pictureElementId){
        this.loaderId = loaderElementId;
        this.loaderSelector = '#' + this.loaderId;
        this.pictureId = pictureElementId;
        this.pictureSelector = '#' + this.pictureId;
    };

    return FancyUI;
});