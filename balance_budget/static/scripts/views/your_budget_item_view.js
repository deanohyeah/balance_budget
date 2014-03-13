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
                
            },

            render: function(){
                var self = this;
                //refactor this as soon as possible
                //
                _(this.collection.models).each(function(item){ // in case collection is not empty
                    this.collection = item.get('sections');
                    _(this.collection.models).each(function(item){
                        self.appendItem(item);
                    });
                }, this);
                this.fixedHeader();
                return this; // for chainable calls, like .render().el
            },

            appendItem: function(item){
                this.$el.find('.bottom_container').append( _.template( yourBudgetItemTemplate, item) );
            },

            fixedHeader: function(){
        //begin fixed header code
                  var $budgetUnique = $('#budgetUnique');//div to be fixed
                  var budget = $('.budget'); //container div of fixed div
                  var budgetHeight = budget.height();// height of container
                  var footer = $('#proposal_bottom');// div to unfix at
                  var containerStart, footerStart,p;
                  var containerOffset = 0; //space from top of viewport to become fixed
                  var fixed,hugged; //booleans for logic switching
                  $budgetUnique.width(budget.width()); //sets width of fixed item. Need this for percentage widths
            
                $(window).scroll(_.throttle(function() {
                    if (!containerStart && !footerStart){
                        // must be defined in event Gives false results on mediaqueries
                        containerStart = budget.offset().top-containerOffset;
                        footerStart = (footer.offset().top -budgetHeight-containerOffset);   
                    } 
                    p = $(window).scrollTop();
                   //checks if container left viewport
                    if (p > containerStart) {
                        if (!fixed){
                            $budgetUnique.addClass('fixed');
                            
                            fixed = true;
                            //console.log('2');                   
                        }
                        //console.log('1');
                    }
                    //removes fixed when it comes back into the viewport
                    else if (fixed){
                        $budgetUnique.removeClass('fixed');
                        budget.removeClass('hug_footer');
                        fixed = false;
                        hugged=false;
                        //console.log('3');                     
                    }
                    //checks footer position and changes fixed to hugged
                    if ( (p>footerStart) && !hugged){
                        $budgetUnique.removeClass('fixed');
                        budget.addClass('hug_footer');
                        fixed = true;
                        hugged=true;
                        //console.log('4');
                    }else if(hugged && (p<footerStart)){ //removes hugged
                        fixed = false;
                        hugged = false;
                        //console.log('5');
                    }
                    
                }, 100));//end windowscroll
            }


        });//end extend
    }
);

