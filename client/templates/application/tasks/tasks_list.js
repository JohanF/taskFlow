if(Meteor.isClient) {



	Template.tasksList.helpers({
	 tasks: function () {
	      return Tasks.find({'assignedUsers.uid':Meteor.userId(), project:projectData._id}, {sort: {'assignedUsers.priority': 1}});
	    }
	});

	Template.tasksList.rendered = function() {

		removedFirst = false;

	    this.$('#taskListDiv').sortable({
					// start: function(e, ui) {
					// 	il = ui.item.index();
					// 		console.log(Blaze.getData(il));
					// },
	        stop: function(e, ui) {

					//
					// console.log("ui ")
					// console.log(ui);

	          el = ui.item.get(0)
	          before = ui.item.prev().get(0)
	          after = ui.item.next().get(0)
			//   beforebefore = ui.item.prev().prev().get(0);
			  //
			//   console.log(el);
			//   console.log(before);
			//   console.log(after);
			//   console.log(beforebefore);
	          if(!before && !removedFirst) {
							Meteor.call("createTaskActivity", 'Work stopped', Meteor.userId(), Date.now(), Blaze.getData(after)._id);

							Meteor.call("createTaskActivity", 'Work being performed', Meteor.userId(), Date.now(), Blaze.getData(el)._id);
              newRank = thisUserPriority(Blaze.getData(after).assignedUsers) - 1;
							// {$set: {btb: beforeTaskBefore,
							// atb: afterTaskBefore,
							// bta: beforeTaskAfter,
							// ata: afterTaskAfter}}
							Meteor.call("updateTaskOrder", projectData._id, Session.get('beforeTaskBefore'), '', '', Blaze.getData(after).title);
						  // Session.set('beforeTaskAfter', "");
							// Session.set('afterTaskAfter', Blaze.getData(after).title);
							// A task overtakes highest priority position --> Alert activity for involved tasks

	          } else if(!after) {
	            newRank = thisUserPriority(Blaze.getData(before).assignedUsers) + 1;

							Meteor.call("updateTaskOrder", projectData._id, Session.get('beforeTaskBefore'), '', Blaze.getData(before).title, '');
						  // Session.set('beforeTaskAfter', Blaze.getData(before).title);
							// Session.set('afterTaskAfter', "");
	          }
	          else {
	             newRank = (thisUserPriority(Blaze.getData(after).assignedUsers) +
	                       thisUserPriority(Blaze.getData(before).assignedUsers))/2;

							Meteor.call("updateTaskOrder", projectData._id, Session.get('beforeTaskBefore'), '', Blaze.getData(before).title, Blaze.getData(after).title);
 						 //  Session.set('beforeTaskAfter', Blaze.getData(before).title);
 						// 	Session.set('afterTaskAfter', Blaze.getData(after).title);
	            }

				if(removedFirst){
					Meteor.call("createTaskActivity", 'Work stopped', Meteor.userId(), Date.now(), Blaze.getData(el)._id);

					Meteor.call("createTaskActivity", 'Work being performed', Meteor.userId(), Date.now(), Blaze.getData($('#taskListDiv').children()[0])._id);

					removedFirst = false;
				}
					Meteor.call("updateTaskPriority",  Blaze.getData(el)._id, Meteor.userId(), newRank);

	        }
	    })
			// this.$('#taskListDiv').sortable({
			this.$('#taskListDiv').sortable({
					start: function(e, ui) {
						if(ui.item.index() == 0){
							removedFirst = true;
							Session.set('beforeTaskBefore', "");
						} else {
							before = ui.item.prev().get(0);
							Session.set('beforeTaskBefore', Blaze.getData(before).title);
						}

					},
				})
	}
 }

 function thisUserPriority(arr) {
	 for (var i = 0; i < arr.length; i++) {
        if (arr[i].uid == Meteor.userId()) {
            return arr[i].priority;
        }
    }
}
