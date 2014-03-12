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
                var budgetContainer = $('.budget_container');
                this.containerHeight = budgetContainer.height() || 500;
            },

            getPixelHeight: function(value){ 
                var 
                pixel = value*this.containerHeight,
                pixel = pixel/this.maxValue;
                return pixel
            },

            getPixelHeightBenchmarks: function(value){
                var 
                value           = value + this.deficit, //offsets the deficit
                pixel           = value * this.containerHeight,
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