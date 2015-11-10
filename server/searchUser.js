Meteor.methods({
	searchAllUsers: function(input) {
      return Meteor.users.find({username: new RegExp(input)}).fetch();
	},
	searchProjectUsers: function(input, projectId) {
		return Meteor.users.find({username: new RegExp(input), _id: { $in: Projects.findOne({_id: projectId}).members}}).fetch();
	}
});
