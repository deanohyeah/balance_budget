define(function(require, exports, module) 
	{
        var 
        $ 		 = require('jquery'),
        Backbone = require('backbone'),
        Item     = require('models/item');
             
    	return List = Backbone.Collection.extend({
    	  model: Item,
    	  url: 'http://127.0.0.1:8000/api/v1/benchmark/?format=jsonp',
          parse: function(response) {
              this.recent_meta = response.meta || {};
              return response.objects || response;
          }
    	});	
    }
);
