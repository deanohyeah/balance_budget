define(function(require, exports, module) 
	{
        var 
        $ 		 = require('jquery'),
        Backbone = require('backbone'),
        Item     = require('models/item'),
        Sections = require('collections/sections')
             
    	return List = Backbone.Collection.extend({
    	  model: Item,
    	  url: '/api/v1/category/?format=jsonp&callback=?',
          parse: function(response) {
              this.recent_meta = response.meta || {};
              
              _.each(response.objects, function(category){
                category.sections = new Sections(category.sections);
              })

              return response.objects || response;
          }
    	});	
    }
);


