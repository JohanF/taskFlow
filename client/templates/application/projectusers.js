Template.projectUsers.helpers({
 projectusers: function () {
			return Meteor.users.find({_id:{ $in:
        Projects.find({_id:Session.get('selectedProject')}).fetch()[0].members}});
		}
});
