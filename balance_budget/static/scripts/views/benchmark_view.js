define(function(require, exports, module) 
	{
        var 
        $ 		           = require('jquery'),
        _         		   = require('underscore'),
        Backbone 		   = require('backbone'),
        Benchmarks         = require('collections/benchmarks'),
        Template           = require('text!templates/benchmarks.html');
            
        return BenchmarkView = Backbone.View.extend({
            el: '.benchmarks', // el attaches to existing element
            template: _.template( Template ),
            
            events: {
            },

            initialize: function(){
                console.log('bla')
                var self = this;
                this.collection = new Benchmarks();
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

            },

            appendItem: function(item){
                this.$el.append(this.template(item.attributes));
            }
        });
	}
);

