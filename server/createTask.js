Meteor.methods({
	createTask: function(name, description, project, uidArray, prio) {
		console.log("creating task");
		Tasks.insert({
   			title: name,
			description: description,
			status: 'New task',
			priority: prio,
			assignedUsers: uidArray,
         	project: project
 		});
	}
});
