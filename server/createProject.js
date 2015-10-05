Meteor.methods({
	createProject: function(title, description, userId) {
		console.log("creating project");
		Projects.insert({
   			title: title,    
			description: description,    
			members: [userId],
			creator: userId
 		});
	}
});
