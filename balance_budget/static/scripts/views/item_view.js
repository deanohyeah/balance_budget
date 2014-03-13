define(function(require, exports, module) 
  {
        var $      = require('jquery'),
            Backbone = require('backbone')
            List               = require('collections/list');
            itemTemplate = require('text!templates/item.html')
            listTemplate = require('text!templates/list.html')
            
            return ItemView = Backbone.View.extend({
                    template: _.template( listTemplate ),
                    tagName: 'div', // name of (orphan) root tag in this.el
                    className: 'proposal_section category',
                    events: {
                      'click .icon-info'         : 'showInfo',
                      'dragstart .proposal'      : 'dragStart',
                      'dragend .proposal'        : 'dragEnd',
                      'hover .proposal'          : 'proposalHover',
                      'click .proposal_list .proposal'           : 'clickDrop',
                      'dragenter .budget_proposal_container, .proposal_container'  : 'dragEnter',
                      'drop .budget_proposal_container, .proposal_container'       : 'dragDrop',
                      'dragover .budget_proposal_container, .proposal_container'   : 'dragOver'
                    },
                    initialize: function(){
                        _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
                        this.collection = this.model.get('sections');
                        window.currentBudgetTotal = 0;
                    },
                    render: function(){
                       
                        var json = this.model.toJSON();
                        $(this.el).html(this.template(this.model.attributes));

                        var ul = $('<ul />',{"class" : 'proposal_list'});
                        this.$el.append(ul);
                        
                        _(this.collection.models).each(function(item){ // in case collection is not empty
                          this.appendItem(item);
                        }, this);
                        return this; // for chainable calls, like .render().el
                    },
                    appendItem: function(item){

                      $('ul',this.el).append( _.template( itemTemplate, item.attributes) );
                      
                   },
                   showInfo: function(e){
                      var element = $(e.target).find('.proposal_info');
                      $('.proposal_info.show').not(element).toggle().toggleClass('show');
                      element.toggle().toggleClass('show');
                      e.stopPropagation();
                   },
                   //drag functions
                   dragStart: function(e) {
                       var inactive = $(e.target).hasClass('inactive');
                       if(inactive){
                           return false;
                       }else{
                           e.dataTransfer.effectAllowed='move';

                           e.dataTransfer.setData("Text", e.target.getAttribute('id'));
                           $('.budget_container').addClass('active');
                       }
                   },

                   dragEnd: function(e) {
                    e.preventDefault();
                       $('.budget_container').removeClass('active');
                   },

                   dragEnter: function(e) {
                        
                        e.preventDefault();
                      return false;
                   },
                   dragOver: function(e) {
                        e.preventDefault();
                       return false;
                   },
                   dragDrop: function(e) {
                      e.originalEvent.stopPropagation();
                      e.originalEvent.preventDefault();
                      var idelt = e.dataTransfer.getData("Text");
                      this.proposalLogic(idelt);
                      e.stopPropagation();
                      return false; // return false so the event will not be propagated to the browser
                   },
                   //end drag functions

                   clickDrop: function(e){
                       e.stopPropagation();
                       var 
                       //id = $(e.currentTarget).data('id'),
                       //model = this.collection.get(id),
                       //selected = model.get('selected'),
                       idelt = $(e.target).closest('.proposal').attr('id'),
                       inactive = $(e.target).hasClass('inactive');
                       
                       //model.set('selected', this.toggleSelected(selected))
                       this.proposalLogic(idelt);
                   },
                   toggleSelected: function(selected){
                      return selected ? false : true

                   },
                   proposalHover: function(e){
                       var mouseEnter = e.type=='mouseenter';
                       var proposal = $(this);
                       proposal.find('.proposal_info').hide();
                       var id = proposal.attr('id');
                       var idNumber = id.replace( /^\D+/g, '');
                       
                        //mouse enter
                       if (mouseEnter){
                           if (id.indexOf('your_budget_section')==-1){
                               var budgetSection = $('#your_budget_section'+idNumber);
                               if (budgetSection.css('display')=='list-item'){
                                   budgetSection.addClass('connected_proposal');
                                   proposal.addClass('connected_proposal');
                               }
                           }else{
                               $('#section'+idNumber).addClass('connected_proposal');
                               proposal.addClass('connected_proposal');
                           }
                       }else{//mouse leave
                           if (id.indexOf('your_budget_section')==-1){
                               var budgetSection = $('#your_budget_section'+idNumber);
                               if (budgetSection.css('display')=='list-item'){
                                   budgetSection.removeClass('connected_proposal');
                                   proposal.removeClass('connected_proposal');
                               }
                           }else{
                               $('#section'+idNumber).removeClass('connected_proposal');
                               proposal.removeClass('connected_proposal');
                           }        
                       }
                       
                       proposal.toggleClass('active');    
                   },
                   proposalLogic: function(idelt){
                    // todo: get rid of this and use adding to a new collection
                       
                       var yourBudgetFlag = idelt.indexOf('your_budget_');
                       if (yourBudgetFlag != -1)
                       {
                           var budget_prop_container = $('.budget_proposal_container #'+idelt);
                           
                       }else{
                           var budget_prop_container = $('.budget_proposal_container #your_budget_'+idelt);   
                       }
                       
                       var divHeight = budget_prop_container.height();
                       var proposal_section = $('.proposal_section #'+idelt.replace('your_budget_',''));
                       var budgetDelta = parseFloat(proposal_section.attr('data'));
                      
                   //adds proposal to budget container
                       if(!proposal_section.hasClass('inactive'))
                       {
                            
                           if (this.calculateBudget(divHeight))
                           {
                            budget_prop_container.slideDown();
                            proposal_section.addClass('inactive');
                
                            window.currentBudgetTotal = (window.currentBudgetTotal + budgetDelta);
                            $('#balance_total').text(this.convertMoney(window.currentBudgetTotal)+currentBudgetAbrev);
                            
                           }else{
                            window.alert("Amount exceeds capacity. You only need $2000 to meet the highest goal for transportation funding. Your current budget: " + this.convertMoney(window.currentBudgetTotal) + currentBudgetAbrev);
                           }
                           return;
                       }
                   //removes proposal to budget container
                       if(proposal_section.hasClass('inactive'))
                       {
                          
                           if (this.calculateBudget(-divHeight))
                           {
                               budget_prop_container.slideUp();
                               proposal_section.removeClass('inactive');
                               window.currentBudgetTotal = (window.currentBudgetTotal - budgetDelta);
                               $('#balance_total').text(this.convertMoney(window.currentBudgetTotal)+currentBudgetAbrev);
                               proposal_section.removeClass('connected_proposal');
                           }else{
                               window.alert("An error occurred when trying to remove a proposal...");
                           }
                           return;
                      }
                   },
                   calculateBudget: function(divSize)
                   {
                      var mainDiv = $('.budget_proposal_container').height();
                      var budgDiv = 0;
                      if ($('.bottom_container').height() > 0)
                         {budgDiv = $('.bottom_container').height();}
                      var newBudgDiv = budgDiv + divSize;
                      if(newBudgDiv < mainDiv)
                         {
                         this.checkBenchmarks(budgDiv, newBudgDiv);
                         return true;
                         }
                      else
                         {return false;}
                   },
                   checkBenchmarks: function(oldValue, newValue){

                       $('.line').each(function() {
                           var goalHeight = $(this).css('bottom');
                           var benchmarkValue = parseInt(goalHeight,10);
                           if ((oldValue < benchmarkValue) && (newValue >= benchmarkValue))
                           {
                               var goalDiv = $('.axis_label').filter(function () { 
                                   return $(this).css('bottom') == goalHeight; 
                               });
                               goalDiv.append('<div class="icon-checkmark reached_goal"></div>').addClass('active');
                               
                           }
                           if ((oldValue >= benchmarkValue) && (newValue < benchmarkValue))
                           {
                               var goalDiv = $('.axis_label').filter(function () { 
                                   return $(this).css('bottom') == goalHeight; 
                               });
                               goalDiv.removeClass('active').find('.icon-checkmark').remove();
                           }
                       });
                   },
                   convertMoney: function(value){
                      var negFlag = false;
                      if (value < 0)
                      {
                         value = value * (-1);
                         negFlag = true;
                      }

                      value = value.toString();        // Convert to string
                      var valueLength = value.length;  // Count string
                      value = parseInt(value, 10);         // Re-convert to Intiger
                      if(valueLength >= 10)
                      {
                         value = (value / 1000000000);
                         currentBudgetAbrev = "B";
                      }
                      else if(valueLength < 10 && valueLength > 6)
                      {
                         value = (value / 1000000);
                         currentBudgetAbrev = "M";
                      }else{
                        currentBudgetAbrev = '';
                      }

                      value = parseFloat(value).toFixed(2);
                      if (value === 0) {currentBudgetAbrev = "";}
                      if (negFlag) {value = '-$'+value;}
                      else{value = '$'+value;}
      
                      return value;
                   }

                });

    }
);

