if(Meteor.isClient) {
	Template.tasksList.helpers({
	 tasks: function () {
	      return Tasks.find({assignedUsers:Meteor.userId(), project:projectData._id}, {sort: {priority: 1}});
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

				if(removedFirst){
					TaskActivities.insert({
						description:'Work stopped', // rename this
						user: Meteor.userId(),
						createdAt: Date.now(),
						task: Blaze.getData(el)._id
					});

					console.log($(this).sortable('toArray', { attribute: 'description' }));


					// bfr = ui.item.prev();
					// newFirst = null;
					//
					// while (bfr){
					// 	newFirst = bfr.get(0);
					// 	bfr = bfr.prev();
					// }
					//
					// TaskActivities.insert({
					// 	description:'Work being performed', // rename this
					// 	user: Meteor.userId(),
					// 	createdAt: Date.now(),
					// 	task: Blaze.getData(newFirst)._id
					// });

					removedFirst = false;
				}

	          Tasks.update({_id: Blaze.getData(el)._id}, {$set: {priority: newRank}})
	        }
	    })
			// this.$('#taskListDiv').sortable({
			this.$('#taskListDiv').sortable({
					start: function(e, ui) {
						if(ui.item.index() == 0){
							removedFirst = true;
						}
					},
				})
	}
 }
