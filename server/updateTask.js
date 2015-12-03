Meteor.methods({
	updateTaskPriority: function(taskId, uid, priority) {
		console.log("updating task priority");
		Tasks.update({_id: taskId, 'assignedUsers.uid': uid}, {$set: {'assignedUsers.priority': priority}})
	}
});

//@TODO fix this on friday.
