define('leaderModel', function () {
    return function(){
        return {
            type: "leaderModel",
            _id: undefined,
            handle: undefined,
            score: undefined,
            get: function(){
                return this;
            },
            set: function(e){
                this._id = e._id;
                this.handle = e.handle;
                this.score = e.score;
            }
        }
    };
});