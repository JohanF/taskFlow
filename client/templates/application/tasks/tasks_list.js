if(Meteor.isClient) {  
	Template.tasksList.helpers({ 
	 tasks: function () {
	      return Tasks.find({assignedUsers:Meteor.userId(), project:"B3MowNggmDxdo5ugL"}, {sort: {priority: 1}});
	    } 
	});

	Template.tasksList.rendered = function() {
	    this.$('#items').sortable({
	        stop: function(e, ui) {
	          el = ui.item.get(0)
	          before = ui.item.prev().get(0)
	          after = ui.item.next().get(0)
	 
	          if(!before) {
	            newRank = Blaze.getData(after).priority - 1
	          } else if(!after) {
	            newRank = Blaze.getData(before).priority + 1
	          }
	          else {
	            newRank = (Blaze.getData(after).priority +
	                       Blaze.getData(before).priority)/2
	            }
	          Tasks.update({_id: Blaze.getData(el)._id}, {$set: {priority: newRank}})
	        }
	    })
	}
 }