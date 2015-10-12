Template.sideBar.helpers({
   userName: function() {
      if(Meteor.userId()){
         return Meteor.user().username;
      }
      else{
         return ""
      }
   }
});

loadProfile = function() {
    Router.go("profileview", {
        _userId: Meteor.userId()
    });
}
goHome = function() {
    Router.go("/");
}

loadChat = function() {
    Router.go("chatview", {
        _userId: Meteor.userId()
    });
}
killWorld = function(){
	Router.go("/killworld");
}
