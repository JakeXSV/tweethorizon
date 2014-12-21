define(function () {

    function ResultsController(base, widgetId, linksToView) {
        /* Register with Base */
        this.base = base;
        this.base.registerChild(this, "Results");
        this.widgetId = widgetId;
        this.linksToView = linksToView;

        var self = this;

        /* UI Components */
        this.followersRowId = linksToView.resultsController.followersRowId;
        this.retweetsRowId = linksToView.resultsController.retweetsRowId;
        this.favoritesRowId = linksToView.resultsController.favoritesRowId;
        this.horizonRowId = linksToView.resultsController.horizonRowId;
        this.followersRowSelector = '#' + this.followersRowId;
        this.retweetsRowSelector = '#' + this.retweetsRowId;
        this.favoritesRowSelector = '#' + this.favoritesRowId;
        this.horizonRowSelector = '#' + this.horizonRowId;
        this.followersText = 'Followers';
        this.followersDescription = 'Glorious Followers';
        this.retweetsText = 'Retweets';
        this.retweetsDescription = 'Glorious Retweets';
        this.favoritesText = 'Favorites';
        this.favoritesDescription = 'Glorious Favorites';

        /* Dynamic Class */
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
        this.getStatisticHtml = function(value, statName, description){
            return '<div class="'+self.getColumnClass()+' value">' +
                        '<h2 class="value-multiplier centerInParent">'+value+'</h2>' +
                        '<h5 class="value-heading centerInParent">'+statName+'</h5>' +
                        '<p class="value-description centerInParent">'+description+'</p>' +
                    '</div>'
        };
        this.getHorizonScoreHtml = function(value, rank){
            return '<div class="'+self.getColumnClass()+' value">' +
                       '<h5 class="value-heading centerInParent">Horizon Score</h5>' +
                       '<h2 class="value-multiplier centerInParent">'+value+'</h2>' +
                       '<p class="value-description centerInParent">Rank #'+rank+' within tweet horizon.</p>' +
                   '</div>'
        };
        /* End Of UI Components */
    }

    ResultsController.prototype.populateView = function(){
        var self = this;
        var data = self.base.modelStore.widgetModelStore[self.widgetId];
        $(self.followersRowSelector).append(self.getStatisticHtml(data.horizon.followers, self.followersText, self.followersDescription));
        $(self.retweetsRowSelector).append(self.getStatisticHtml(data.horizon.retweets, self.retweetsText, self.retweetsDescription));
        $(self.favoritesRowSelector).append(self.getStatisticHtml(data.horizon.favorites, self.favoritesText, self.favoritesDescription));
        $(self.horizonRowSelector).append(self.getHorizonScoreHtml(data.horizon.score, data.horizon.rank));
        self.base.fancyUI.stopLoader();
        self.base.enableInput();
    };

    ResultsController.prototype.horizonApiResponse = function(response, context){
        if(
            response.horizon !== undefined &&
            response.horizon.handle !== undefined &&
            response.horizon.followers !== undefined &&
            response.horizon.retweets !== undefined &&
            response.horizon.favorites !== undefined
        ){
            context.populateView();
        }
    };

    ResultsController.prototype.initializeResults = function(){
        var handle = this.base.modelStore.widgetModelStore[this.widgetId].handle;
        this.base.modelStore.getHorizonScore(handle, this.horizonApiResponse, this, this.widgetId);
    };

    ResultsController.prototype.wrapImages = function(){

    };

    return ResultsController;
});