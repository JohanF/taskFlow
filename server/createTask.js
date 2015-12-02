Meteor.methods({
	createTask: function(name, description, project, uidPrio) {
		console.log("creating task");
		Tasks.insert({
   		title: name,
			description: description,
			status: 'New task',
			assignedUsers: uidPrio,
      project: project
 		});
	}
});
