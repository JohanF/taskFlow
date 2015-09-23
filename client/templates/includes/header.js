Template.header.events({	
	'click .login-button': function(event) {
		event.preventDefault();

		if(Meteor.user()){
			 Router.go('signedin');
		} else {
			 Router.go('/');
		}
	}
});