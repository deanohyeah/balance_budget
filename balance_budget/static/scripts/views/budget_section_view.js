define(function(require) 
    {
        var 
        $                      = require('jquery'),
        _                      = require('underscore'),
        Backbone               = require('backbone'),
        YourBudgetItemTemplate = require('text!templates/your_budget_item.html');


        return SectionView = Backbone.View.extend({
            
            template: YourBudgetItemTemplate,
            
            events: {
    
            },

            initialize: function() {
                this.model.youView = this;
                this.model.on('change:selected', this.update);
            },
            
            update: function(e){
                this.youView.$el.slideToggle(500);
            },

            render: function(){
                // sets $el to template output
                this.setElement(_.template(this.template, this.model))
                return this; // for chainable calls, like .render().el
            }

        });//end extend
    }
);

