define(function(require, exports, module) 
	{
        var $ 		           = require('jquery'),
        	_         = require('underscore'),
            Backbone 		   = require('backbone'),
            YourBudgetItemView = require('views/your_budget_item_view'),
            List               = require('collections/list');
            

            return ListView = Backbone.View.extend({
        	
	        	el: $('.proposal_container'), // el attaches to existing element
	        	
	        	events: {
	        	 'click button#add': 'addItem'
	        	},

	        	initialize: function(){
	        		console.log('list_view')
	        	 	var self = this;
	        	 	this.calculateDiv();
	        		$.getJSON( "http://127.0.0.1:8000/api/category/?format=jsonp&callback=?", function( json ) {
	        			 var collectionData = json.objects;

	        			 self.collection = new List(_.map(collectionData, function(p) { return p }));
	        			 //self.collection.bind('add', self.appendItem); // collection event binder
	        			 console.log(List)
	        			 self.counter = 0;
	        			 self.render();
	        		});
	        	},

	        	render: function(){
	        		console.log(this.collection)
	        		var self = this;
	        		_(this.collection.models).each(function(item){ // in case collection is not empty
	        			self.appendItem(item);
	        		}, this);
	        		yourBudgetItemView = new YourBudgetItemView({collection: this.collection});
	        	    yourBudgetItemView.render();
	        	},

	    		appendItem: function(item){
		    	     var itemView = new ItemView({
		    	     	model: item
		    	     });
		    	     $(this.el).append(itemView.render().el);
	        	},

	        	calculateDiv: function() {
	        		var browserHeight = window.innerHeight,
	        		budget = $('.budget'),
	        		budgetHeight = budget.height();

	        		if(budgetHeight > browserHeight){
	        			var budgetContainer = $('.budget_container');
	        			budgetContainer.height(browserHeight-50);
	        			var containerHeight = budgetContainer.height();   	
	        		}
	        	}
	        });
		}
);

