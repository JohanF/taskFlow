Router.configure(
{
  layoutTemplate:'layout'
}
);

Router.map(function(){
  this.route('notsignedin',{path:'/'});
});

Router.map(function(){
  this.route('signedin',{path:'/signedin'});
});