Router.configure(
{
  layoutTemplate:'layout'
}
);

Router.route('/', {
    template: 'welcomeScreen'
});

Router.route('/signedin');

Router.route('/projectview', {
	template: 'projectview',
	path:'/project/:_projectId',
	data: function(){
		projectData= {
			_id : this.params._projectId
		};
		return projectData;
	}
});

Router.route('/profileview', {
	template: 'profileview',
	path:'/user/:_userId',
	data: function(){
		userData= {
			_id : this.params._userId
		};
		return userData;
	}
});
Router.route('/chatview', {
	template: 'chatview',
	path:'/chat/:_chatId',
	data: function(){
		chatData= {
			_id : this.params._chatId
		};
		return chatData;
	}
});
Router.route('/killworld', {
    template: 'ktw'
});


Router.configure({ notFoundTemplate: 'welcomeScreen'})
