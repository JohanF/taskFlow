Meteor.methods({
	createProject: function(title, description, userId) {
		console.log("creating project");
		Projects.insert({
   			title: title,
			description: description,
			members: [userId],
			creator: userId
 		});
		Meteor.call("createTaskOrder", Projects.findOne({title: title})._id, '', '', '', '', '');
	},
	setProjectInfo: function(id, t, d) {
		Projects.update(id, {$set: {title: t}});
		Projects.update(id, {$set: {description: d}});
	}
});
