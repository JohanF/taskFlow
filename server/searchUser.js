Meteor.methods({
	searchAllUsers: function(input) {
      return Meteor.users.find({username: new RegExp(input)}).fetch();
	},
	searchAllUsersNotInChat: function(input, chatId) {
		var list = [];
      var users = Meteor.users.find({username: new RegExp(input)}).fetch();
		var members = Chats.findOne(chatId).members;
			users.forEach(function(user) {
				console.log("user:");
				console.log(user._id);
				if(_.contains(members, user._id)){
					//users.remove(user);
				}
				else{
					list.push(user);
				}
			});
		return list;
	},
	searchProjectUsers: function(input, projectId) {
		return Meteor.users.find({username: new RegExp(input), _id: { $in: Projects.findOne({_id: projectId}).members}}).fetch();
	}
});
