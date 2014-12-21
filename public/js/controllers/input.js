define(function () {

    function InputController(base, widgetId, inputRowElementId) {
        /* Register with Base */
        this.base = base;
        this.base.registerChild(this, "Input");
        this.widgetId = widgetId;

        /* UI Components */
        this.inputRowId = inputRowElementId;
        this.inputRowSelector = '#' + this.inputRowId;

        /* Dynamic Class */
        var self = this;
        this.getColumnClass = function(){
            var e = (12 / self.base.getWidgetCount());
            //based on http://getskeleton.com/
            var intToLiteralString = {
                1: 'twelve', //take up whole row
                2: 'two',
                3: 'three',
                4: 'four',
                5: 'five',
                6: 'six',
                7: 'seven',
                8: 'eight',
                9: 'nine',
                10: 'ten',
                11: 'eleven',
                12: 'twelve'
            };
            return intToLiteralString[e] + ' columns';
        };

        /* Dynamic Input, Loader, Pic Id */
        this.handleInputId = 'handleInput' + this.widgetId;
        this.handleInputSelector = '#' + this.handleInputId;
        this.handlePictureId = 'handlePicture' + this.widgetId;
        this.handlePictureSelector = '#' + this.handlePictureId;
        this.pictureImgId = 'picture' + this.widgetId; //selector not needed
        this.loaderId = 'loader' + this.widgetId;
        this.base.fancyUI.linkToView(this.loaderId, this.pictureImgId); //fancyUI needs loader location and picture ids.
        this.getInputHtml = function(){
            return '<div class="'+self.getColumnClass()+'">' +
                     '<input id="'+this.handleInputId+'" class="centerInParent centertext" type="text" placeholder="JakeXSV">' +
                     '<div id="'+this.loaderId+'" class="centerInParent"></div>' +
                     '<div id="'+this.handlePictureId+'" class="centerInParent"></div>' +
                   '</div>'
        };
        this.getImageHtml = function(imgpath){
            var self = this;
            return '<img id="'+self.pictureImgId+'" class="centerInParent" src="'+imgpath+'">';
        };
        this.onSuccessColor = '#4CAF50';
        this.onFailColor = '#f44336';
        this.onWaitingColor = '#D1D1D1';
        /* End - UI Components */

        /* Startup Funcs */
        this.populateView();
        this.registerEvents();
    }

    InputController.prototype.populateView = function(){
        var self = this;
        $(self.inputRowSelector).append(self.getInputHtml());
    };

    /*
      load image onto page
      provide user feedback on success (green)/ or fail (red)
      tell Results controller to take over, and get horizon.
    */
    InputController.prototype.loadProfilePicture = function(pictureUrl, context){
        var self = context;
        var handleInput = $(self.handleInputSelector);
        if(pictureUrl !== undefined){
            $(self.handlePictureSelector).prop("innerHTML", self.getImageHtml(pictureUrl));
            self.base.fancyUI.wrapImages();
            handleInput.prop('disabled', true);
            handleInput.css("border-color", self.onSuccessColor);
            // Tell base to trigger the fetching of horizon score in results controller.
            self.base.initializeResults();
        }else{
            handleInput.css("border-color", self.onFailColor);
            self.base.fancyUI.stopLoader();
        }
    };

    /*
      Get the specified handle's profile image, then call load
    */
    InputController.prototype.getProfilePictureUrl = function(context){
        var self = context;
        self.base.fancyUI.startLoader();
        // Wipe results views incase of previous

        var handle = $(self.handleInputSelector)[0].value;
        self.base.modelStore.widgetModelStore[self.widgetId] = {
            'handle': handle
        };
        self.base.modelStore.getProfilePictureUrl(handle, self.loadProfilePicture, self);
    };

    InputController.prototype.registerEvents = function(){
        var self = this;
        self.base.inputWatcher.registerWatcher(self.handleInputSelector, self.getProfilePictureUrl, self);
    };

    InputController.prototype.enableInput = function(){
        var input = $(this.handleInputSelector);
        input.prop('disabled', false);
        input.css("border-color", this.onWaitingColor);
    };

    return InputController;
});