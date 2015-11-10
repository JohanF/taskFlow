Meteor.methods({
	searchAllUsers: function(input) {
      return Meteor.users.find({username: new RegExp(input)}).fetch();
	}
});
