define(function(require, exports, module) 
	{
        var $ 		 = require('jquery'),
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
	            	}
            	});
    }
);