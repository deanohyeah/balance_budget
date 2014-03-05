define(function(e,t,n){var r=e("jquery"),i=e("backbone");List=e("collections/list");itemTemplate=e("text!templates/item.html");listTemplate=e("text!templates/list.html");return ItemView=i.View.extend({template:_.template(listTemplate),tagName:"div",className:"proposal_section category",events:{"click .icon-info":"showInfo","dragstart .proposal":"dragStart","dragend .proposal":"dragEnd","hover .proposal":"proposalHover","click .proposal_list .proposal":"clickDrop","dragenter .budget_proposal_container, .proposal_container":"dragEnter","drop .budget_proposal_container, .proposal_container":"dragDrop","dragover .budget_proposal_container, .proposal_container":"dragOver"},initialize:function(){_.bindAll(this,"render");this.collection=new List(this.model.get("sections"));window.currentBudgetTotal=0},render:function(){var e=this.model.toJSON();listItem=this.model.get("sections");console.log(this.model.attributes);r(this.el).html(this.template(this.model.attributes));var t=r("<ul />",{"class":"proposal_list"});r(this.el).append(t);_(this.collection.models).each(function(e){this.appendItem(e)},this);return this},appendItem:function(e){r("ul",this.el).append(_.template(itemTemplate,e.attributes))},showInfo:function(e){r(e.target).find(".proposal_info").toggle();e.stopPropagation()},dragStart:function(e){var t=r(e.target).hasClass("inactive");if(t)return!1;e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("Text",e.target.getAttribute("id"));r(".budget_container").addClass("active")},dragEnd:function(e){e.preventDefault();r(".budget_container").removeClass("active")},dragEnter:function(e){e.preventDefault();return!1},dragOver:function(e){e.preventDefault();return!1},dragDrop:function(e){e.originalEvent.stopPropagation();e.originalEvent.preventDefault();var t=e.dataTransfer.getData("Text");this.proposalLogic(t);e.stopPropagation();return!1},clickDrop:function(e){e.stopPropagation();var t=r(e.target).closest(".proposal").attr("id"),n=r(e.target).hasClass("inactive");this.proposalLogic(t);e.stopPropagation()},proposalHover:function(e){var t=e.type=="mouseenter",n=r(this);n.find(".proposal_info").hide();var i=n.attr("id"),s=i.replace(/^\D+/g,"");if(t)if(i.indexOf("your_budget_section")==-1){var o=r("#your_budget_section"+s);if(o.css("display")=="list-item"){o.addClass("connected_proposal");n.addClass("connected_proposal")}}else{r("#section"+s).addClass("connected_proposal");n.addClass("connected_proposal")}else if(i.indexOf("your_budget_section")==-1){var o=r("#your_budget_section"+s);if(o.css("display")=="list-item"){o.removeClass("connected_proposal");n.removeClass("connected_proposal")}}else{r("#section"+s).removeClass("connected_proposal");n.removeClass("connected_proposal")}n.toggleClass("active")},proposalLogic:function(e){var t=e.indexOf("your_budget_");if(t!=-1)var n=r(".budget_proposal_container #"+e);else var n=r(".budget_proposal_container #your_budget_"+e);var i=n.height(),s=r(".proposal_section #"+e.replace("your_budget_","")),o=parseFloat(s.attr("data"));if(!s.hasClass("inactive")){if(this.calculateBudget(i)){n.slideDown();s.addClass("inactive");window.currentBudgetTotal=window.currentBudgetTotal+o;r("#balance_total").text(this.convertMoney(window.currentBudgetTotal)+currentBudgetAbrev)}else window.alert("Amount exceeds capacity. You only need $2000 to meet the highest goal for transportation funding. Your current budget: "+this.convertMoney(window.currentBudgetTotal)+currentBudgetAbrev);return}if(s.hasClass("inactive")){if(this.calculateBudget(-i)){n.slideUp();s.removeClass("inactive");window.currentBudgetTotal=window.currentBudgetTotal-o;r("#balance_total").text(this.convertMoney(window.currentBudgetTotal)+currentBudgetAbrev);s.removeClass("connected_proposal")}else window.alert("An error occurred when trying to remove a proposal...");return}},calculateBudget:function(e){var t=r(".budget_proposal_container").height(),n=0;r(".bottom_container").height()>0&&(n=r(".bottom_container").height());var i=n+e;if(i<t){this.checkBenchmarks(n,i);return!0}return!1},checkBenchmarks:function(e,t){r(".line").each(function(){var n=r(this).css("bottom"),i=parseInt(n,10);if(e<i&&t>=i){var s=r(".axis_label").filter(function(){return r(this).css("bottom")==n});s.append('<div class="icon-checkmark reached_goal"></div>').addClass("active")}if(e>=i&&t<i){var s=r(".axis_label").filter(function(){return r(this).css("bottom")==n});s.removeClass("active").find(".icon-checkmark").remove()}})},convertMoney:function(e){var t=!1;if(e<0){e*=-1;t=!0}e=e.toString();var n=e.length;e=parseInt(e,10);if(n>=10){e/=1e9;currentBudgetAbrev="B"}else if(n<10&&n>6){e/=1e6;currentBudgetAbrev="M"}else currentBudgetAbrev="";e=parseFloat(e).toFixed(2);e===0&&(currentBudgetAbrev="");t?e="-$"+e:e="$"+e;return e}})});