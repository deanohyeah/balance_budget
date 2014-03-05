define(function(require, exports, module) 
	{
        var 
        $ 		 = require('jquery'),
        Backbone = require('backbone'),
        Item     = require('models/item')
             
    	return List = Backbone.Collection.extend({
    	  model: Item,
    	  url: '/api/v1/category/?format=jsonp&callback=?',
          parse: function(response) {
              this.recent_meta = response.meta || {};
              return response.objects || response;
          }
    	});	
    }
);


