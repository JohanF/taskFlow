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
							Meteor.call("createTaskActivity", 'Work stopped', Meteor.userId(), Date.now(), Blaze.getData(after)._id);

							Meteor.call("createTaskActivity", 'Work being performed', Meteor.userId(), Date.now(), Blaze.getData(el)._id);

	            newRank = Blaze.getData(after).priority - 1

						  Session.set('beforeTaskAfter', "");
							Session.set('afterTaskAfter', Blaze.getData(after).title);


							// A task overtakes highest priority position --> Alert activity for involved tasks

	          } else if(!after) {
	            newRank = Blaze.getData(before).priority + 1

						  Session.set('beforeTaskAfter', Blaze.getData(before).title);
							Session.set('afterTaskAfter', "");
	          }
	          else {
	            newRank = (Blaze.getData(after).priority +
	                       Blaze.getData(before).priority)/2
												 
						  Session.set('beforeTaskAfter', Blaze.getData(before).title);
							Session.set('afterTaskAfter', Blaze.getData(after).title);

							}

				if(removedFirst){
					Meteor.call("createTaskActivity", 'Work stopped', Meteor.userId(), Date.now(), Blaze.getData(el)._id);

					Meteor.call("createTaskActivity", 'Work being performed', Meteor.userId(), Date.now(), Blaze.getData($('#taskListDiv').children()[0])._id);

					removedFirst = false;
				}
					Meteor.call("updateTaskPriority",  Blaze.getData(el)._id, newRank);

	        }
	    })
			// this.$('#taskListDiv').sortable({
			this.$('#taskListDiv').sortable({
					start: function(e, ui) {
						if(ui.item.index() == 0){
							removedFirst = true;
								after = ui.item.next().get(0);
								Session.set('beforeTaskBefore', "");
						} else {
							before = ui.item.prev().get(0);
							// after = ui.item.next().get(0);
							Session.set('beforeTaskBefore', Blaze.getData(before));
							// Session.set('afterTaskBefore', Blaze.getData(after));
						}

					},
				})
	}
 }
