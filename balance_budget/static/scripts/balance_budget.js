/** Global variable **/
/*global init */
 var currentBudgetTotal = 0;
 var currentBudgetAbrev = "M";
 var browserHeight = window.innerHeight;
 
//adds dataTransfer event to jquery
$.event.props.push('dataTransfer');
     
$(document).ready(function() {
    init();
    currentBudgetTotal = parseInt($('#deficit_label').attr('data'),10);
    $('#balance_total').text(convertMoney(currentBudgetTotal)+currentBudgetAbrev);
    var budget = $('.budget');
    var budgetHeight = budget.height();
    if(budgetHeight > browserHeight){
       calculateDiv();	
    }
    fixedHeader();
    	
}); /* end of document.ready */

function calculateDiv(){
    var budgetContainer = $('.budget_container');
    budgetContainer.height(browserHeight-50);
	var containerHeight = budgetContainer.height();
    var deficit = Math.abs($('#deficit_label').attr('data'));
    var maxValue = 2000000000;
    var axisLabels = $('.axis_label');
    $('.bottom_container li').each(function() {
	    var value = $(this).attr('data');
	    var pixel = (value * containerHeight)/(maxValue+deficit);
	    $(this).height(pixel);
    });
    
    $('.line').each(function(i) {
	    var value = parseInt($(this).attr('data'))+deficit;
	    var pixel = (value * containerHeight)/(parseInt(maxValue)+parseInt(deficit));
	    $(this).css('bottom',pixel);
	    axisLabels.eq(i).css('bottom',pixel);
    });
}
    

function init(){
     $('.proposal').on({
     'dragstart': dragStart,
     'dragend'  : dragEnd,
     'hover'    : proposalHover,
     'click' : clickDrop
     }).attr('draggable','true');
     
     
     
     $('.budget_proposal_container, .proposal_container').on({
     'dragenter': dragEnter,
     'drop'  : dragDrop,
     'dragover': dragOver
     });
     
     $('.icon-info').click(function(){
         $(this).find('.proposal_info').toggle();
         event.stopPropagation();
     });
     
}

function proposalHover(e){
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
}



//drag functions
function dragStart(ev) {
    var inactive = $(ev.target).hasClass('inactive');
    if(inactive){
        return false;
    }else{
        ev.dataTransfer.effectAllowed='move';
        ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
        $('.budget_container').addClass('active');
    }
}

function dragEnd() {
    $('.budget_container').removeClass('active');
}
function dragEnter() {
   return false;
}
function dragOver() {
    return false;
}
function dragDrop(ev) {
   var idelt = ev.dataTransfer.getData("Text");
   proposalLogic(idelt);
   ev.stopPropagation();
   return false; // return false so the event will not be propagated to the browser
}
//end drag functions

function clickDrop(){
    var idelt = $(this).attr('id');
    var inactive = $(this).hasClass('inactive');
    proposalLogic(idelt);
    
}


function proposalLogic(idelt){
    
    var yourBudgetFlag = idelt.indexOf('your_budget_');
    if (yourBudgetFlag != -1)
    {
        var budget_prop_container = $('.budget_proposal_container #'+idelt);
        
    }else{
        var budget_prop_container = $('.budget_proposal_container #your_budget_'+idelt);   
    }
    
    var divHeight = budget_prop_container.height();
    var proposal_section = $('.proposal_section #'+idelt.replace("your_budget_",""));
    var budgetDelta = parseFloat(proposal_section.attr('data'));
   
//adds proposal to budget container
    if(!proposal_section.hasClass('inactive'))
    {
        if (calculateBudget(divHeight))
        {
         budget_prop_container.slideDown();
         proposal_section.addClass('inactive');
         
         currentBudgetTotal = (currentBudgetTotal + budgetDelta);
         $('#balance_total').text(convertMoney(currentBudgetTotal)+currentBudgetAbrev);
         
        }else{
         window.alert("Amount exceeds capacity. You only need $1.7B to meet the highest goal for education funding. Your current budget: " + convertMoney(currentBudgetTotal) + currentBudgetAbrev);
        }
        return;
    }
//removes proposal to budget container
    if(proposal_section.hasClass('inactive'))
    {
        if (calculateBudget(-divHeight))
        {
            budget_prop_container.slideUp();
            proposal_section.removeClass('inactive');
            currentBudgetTotal = (currentBudgetTotal - budgetDelta);
            $('#balance_total').text(convertMoney(currentBudgetTotal)+currentBudgetAbrev);
            proposal_section.removeClass('connected_proposal');
        }else{
            window.alert("An error occurred when trying to remove a proposal...");
        }
        return;
   }
}//end proposalLogic


function calculateBudget(divSize)
{
   var mainDiv = $('.budget_proposal_container').height();
   var budgDiv = 0;
   if ($('.bottom_container').height() > 0)
      {budgDiv = $('.bottom_container').height();}
   var newBudgDiv = budgDiv + divSize;
   if(newBudgDiv < mainDiv)
      {
      checkBenchmarks(budgDiv, newBudgDiv);
      return true;
      }
   else
      {return false;}
}

function checkBenchmarks(oldValue, newValue){

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
}

function convertMoney(value){
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
   if(valueLength < 10)
   {
      value = (value / 1000000);
      currentBudgetAbrev = "M";
   }
   value = parseFloat(value).toFixed(2);
   if (value === 0) {currentBudgetAbrev = "";}
   if (negFlag) {value = '-$'+value;}
   else{value = '$'+value;}
   
   return value;
}




function fixedHeader(){
    //modernizer 
            var msg;
			if (window.FileReader && Modernizr.draganddrop){
				msg = 'Drag proposal options here to balance your budget.';	
			} else {
				msg = 'Click proposal options on the left to balance your budget.'
			}	
			document.getElementById('instructions').innerHTML = msg;
			
//begin fixed header code
		  var $budgetUnique = $('#budgetUnique');//div to be fixed
		  var budget = $('.budget'); //container div of fixed div
		  var budgetHeight = budget.height();// height of container
		  var footer = $('#proposal_bottom');// div to unfix at
		  var containerStart, footerStart,p;
		  var containerOffset = 50; //space from top of viewport to become fixed
		  var fixed,hugged; //booleans for logic switching
		  $budgetUnique.width(budget.width()); //sets width of fixed item. Need this for percentage widths
    
        $(window).scroll(function() {
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
            
        });//end windowscroll
}
