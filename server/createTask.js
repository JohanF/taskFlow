Meteor.methods({
	createTask: function(name, description, project, uidArray) {
		console.log("creating task");
		Tasks.insert({
   			title: name,
			description: description,
			status: 'New task',
			priority: 3,
			assignedUsers: uidArray,
         	project: project
 		});
	}
});
