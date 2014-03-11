define(function(require, exports, module) 
    {
        var 
        $        = require('jquery'),
        Backbone = require('backbone');
        
        return Item = Backbone.Model.extend({
            defaults: {
                selected: false
            },
            initialize: function(){
                this.deficit = 0;
                this.maxValue = 2000+this.deficit;
            },

            getPixelHeight: function(value){ 
                var 
                budgetContainer = $('.budget_container'),
                containerHeight = budgetContainer.height(),
                pixel = value*containerHeight,
                pixel = pixel/this.maxValue;
                return pixel
            },

            getPixelHeightBenchmarks: function(value){
                var 
                containerHeight = 500,
                value           = value + this.deficit, //offsets the deficit
                pixel           = value * containerHeight,
                pixel           = pixel / this.maxValue;
                return pixel;
            },
            display: function(){
                // returns css value for display
                return this.get('selected') ? 'block' : 'hidden'
            }
        });
    }
);