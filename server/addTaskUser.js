Meteor.methods({
	addTaskUser: function(userId, uname) {
		console.log("add task user");
		AddTaskUsers.insert({
   			uid: userId,
				username: uname
 		});
	},
	removeTaskUser: function(uname){
		console.log(uname);
		AddTaskUsers.remove(uname);
	},
	clearTaskUsers: function(){
		AddTaskUsers.remove({});
	}
});
