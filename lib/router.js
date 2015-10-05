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

Router.configure({ notFoundTemplate: 'welcomeScreen'})