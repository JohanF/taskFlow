Meteor.methods({
	createTask: function(name, description, project, userId) {
		console.log("creating task");
		Tasks.insert({
   			title: name,
			description: description,
			status: 'New task',
			priority: 3,
			assignedUsers: [userId],
         	project: project
 		});
	}
});
