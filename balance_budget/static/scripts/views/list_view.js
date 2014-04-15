define(function(require, exports, module) 
  {
        var 
        $                = require('jquery'),
        _                = require('underscore'),
        Backbone       = require('backbone'),
        YourBudgetItemView = require('views/your_budget_item_view'),
        List               = require('collections/list'),
        ItemView           = require('views/item_view');
            
        return ListView = Backbone.View.extend({
      
          el: '.proposal_container', // el attaches to existing element
          
          events: {
           'click button#add': 'addItem'
          },

          initialize: function(){

            var self = this;
            this.yourBudgetContainerHeight();
                
                this.collection = new List();
                this.collection.fetch({
                    success: function(){
                        self.render()
                    }
                })
          },

          render: function(){
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

             this.$el.append(itemView.render().el);
          },

          yourBudgetContainerHeight: function() {
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

