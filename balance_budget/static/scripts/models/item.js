define(function(require, exports, module) 
	{
        var 
        $ 		 = require('jquery'),
        Backbone = require('backbone');
    	return Item = Backbone.Model.extend({
        	getPixelHeight: function(value){
        		var deficit = 100,
        		maxValue = 1000+deficit,
        		budgetContainer = $('.budget_container'),
        		containerHeight = budgetContainer.height(),
        		pixel = value*containerHeight,
        		pixel = pixel/maxValue;
        		return pixel
        	},
            getPixelHeightBenchmarks: function(value){
                var 
                containerHeight = 500,
                deficit  = 300,
                value    = value+deficit, //offsets the deficit
                maxValue = 900+deficit,
                pixel    = value*containerHeight,
                pixel    = pixel/maxValue;
                return pixel;
            }
    	});
    }
);