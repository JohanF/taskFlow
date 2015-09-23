Template.signedin.events({	
	'click #pw-button': function(event) {
		event.preventDefault();
			 Router.go('projectview');
		
	}
});