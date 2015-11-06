Meteor.methods({
	addTaskUser: function(userId) {
		console.log("add task user");
		AddTaskUsers.insert({
   			uid: userId
 		});
	}, clearTaskUsers: function(){
		AddTaskUsers.remove({});
	}
});
