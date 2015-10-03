Template.activeTaskItem.helpers({ 
 userName: function () {
 		return Meteor.users.find().fetch()[0].username;
 		// testing @TODO implement the correct user fetch logic
     } 
});