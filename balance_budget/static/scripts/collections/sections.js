define(function(require, exports, module) 
  {
    var 
    $      = require('jquery'),
    Backbone = require('backbone'),
    Item     = require('models/item')
         
  return Sections = Backbone.Collection.extend({
    model: Item
      
  }); 
  }
);


