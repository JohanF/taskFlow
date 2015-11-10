Meteor.methods({
	addProjectUser: function(pid, userId) {
		Projects.update({ _id: pid},{ $push: { members: userId }});
	}
});
