define(function(require) 
    {
        var 
        $                      = require('jquery'),
        _                      = require('underscore'),
        List                   = require('collections/list'),
        ItemView               = require('views/item_view'),
        Benchmarks             = require('views/benchmark_view'),
        yourBudgetItemTemplate = require('text!templates/your_budget_item.html');

        return YourBudgetItemView = ItemView.extend({
            el: '.budget_container',
            
            events: {
            'click .icon-info'         : 'showInfo',
            'dragstart .proposal'    : 'dragStart',
            'dragend .proposal'      : 'dragEnd',
            'hover .proposal'        : 'proposalHover',
            'click .proposal'        : 'clickDrop',
            'dragenter .budget_proposal_container, .proposal_container'  : 'dragEnter',
            'drop .budget_proposal_container, .proposal_container'       : 'dragDrop',
            'dragover .budget_proposal_container, .proposal_container'   : 'dragOver'
            },

            initialize: function(){
                // overide ItemView init
                var test = new Benchmarks();
                console.log(test)
            },

            render: function(){
                var self = this;
                //refactor this as soon as possible
                //
                _(this.collection.models).each(function(item){ // in case collection is not empty
                    this.collection = new List(item.get('sections'));
                    _(this.collection.models).each(function(item){
                        self.appendItem(item);
                    });
                }, this);
                return this; // for chainable calls, like .render().el
            },

            appendItem: function(item){
                this.$el.find('.bottom_container').append( _.template( yourBudgetItemTemplate, item) );
            }
        });
    }
);

