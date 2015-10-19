Meteor.methods({
	updateTaskPriority: function(taskId, priority) {
		console.log("updating task priority");
		Tasks.update({_id: taskId}, {$set: {priority: priority}})
	}
});
