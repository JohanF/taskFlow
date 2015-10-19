Meteor.methods({
	createTaskActivity: function(description, userId, createdAt, task) {
		console.log("creating taskActivity");
		TaskActivities.insert({
			description: description, // rename this
			user: userId,
			createdAt: createdAt,
			task: task
		});
}});
