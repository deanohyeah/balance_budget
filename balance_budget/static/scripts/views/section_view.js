define(function(require) 
    {
        var 
        $                      = require('jquery'),
        _                      = require('underscore'),
        Backbone               = require('backbone'),
        List                   = require('collections/list'),
        ItemView               = require('views/item_view'),
        itemTemplate           = require('text!templates/item.html'),
        Benchmarks             = require('views/benchmark_view'),
        yourBudgetItemTemplate = require('text!templates/your_budget_item.html');

        return SectionView = Backbone.View.extend({
            
            template: itemTemplate,
            
            events: {
                'click'            : 'clickDrop',
                'click .icon-info'  : 'showInfo'
            },

            initialize: function() {
                this.model.view = this
                this.model.on('change:selected', this.update)
            },
            
            update: function(e){
                console.log(this.view.el)
                this.view.$el.toggleClass('inactive')
            },

            render: function(){
                // sets $el to template output
                this.setElement(_.template(this.template, this.model.attributes))
                return this; // for chainable calls, like .render().el
            },
            
            clickDrop: function(e){
                //e.stopPropagation();
                var 
                selected = this.model.get('selected');
                
                this.model.set('selected', this.toggleSelected(selected))
            },
            toggleSelected: function(selected){
               return selected ? false : true
            },

            showInfo: function(e){
               var element = $(e.target).find('.proposal_info');
               $('.proposal_info.show').not(element).toggle().toggleClass('show');
               element.toggle().toggleClass('show');
               e.stopPropagation();
            },

        });//end extend
    }
);

