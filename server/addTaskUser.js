Meteor.methods({
	addTaskUser: function(userId, uname) {
		console.log("add task user");
		AddTaskUsers.insert({
   			uid: userId,
				username: uname
 		});
	}, clearTaskUsers: function(){
		AddTaskUsers.remove({});
	}
});
