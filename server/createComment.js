Meteor.methods({
	createComment: function(text, date, activity, userId) {
		console.log("creating comment");
		Comments.insert({
				text: text,
				date: 'on ' + date,
				activity: activity,
				user: Meteor.users.findOne(userId).username
		})
	}
});
