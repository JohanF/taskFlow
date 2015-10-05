Template.activeTaskItem.helpers({ 
 projectUsers: function () {
 		return Meteor.users.find({_id:Meteor.userId()}).fetch()[0].username;
 		// testing @TODO implement the correct user fetch logic
     } 
});