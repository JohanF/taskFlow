Router.configure(
{
  layoutTemplate:'layout'
}
);

Router.route('/', {
    template: 'welcomeScreen'
});

Router.route('/signedin');

Router.route('/projectview')