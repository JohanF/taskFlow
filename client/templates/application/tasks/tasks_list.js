if(Meteor.isClient) {
	Template.tasksList.helpers({
	 tasks: function () {
	      return Tasks.find({assignedUsers:Meteor.userId(), project:projectData._id}, {sort: {priority: 1}});
	    }
	});

	Template.tasksList.rendered = function() {
	    this.$('#taskListDiv').sortable({
	        stop: function(e, ui) {
	          el = ui.item.get(0)
	          before = ui.item.prev().get(0)
	          after = ui.item.next().get(0)


	          if(!before) {
							TaskActivities.insert({
					      description:'Work stopped', // rename this
								user: Meteor.userId(),
					      createdAt: Date.now(),
								task: Blaze.getData(after)._id
					    });
							
							TaskActivities.insert({
					      description:'Work being performed', // rename this
								user: Meteor.userId(),
					      createdAt: Date.now(),
								task: Blaze.getData(el)._id
					    });

	            newRank = Blaze.getData(after).priority - 1

							// A task overtakes highest priority position --> Alert activity for involved tasks

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
