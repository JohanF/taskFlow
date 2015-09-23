Router.configure(
{
  layoutTemplate:'layout'
}
);

Router.route('/', {
    template: 'notsignedin'
});

Router.route('/signedin');