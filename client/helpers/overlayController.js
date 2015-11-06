Template.sideBar.rendered = function() {
   console.log("sidebar")
   this.autorun(function(){
      console.log("sidebar2")

       if(Meteor.user()){
          console.log("sidebar3")

           if(Meteor.user().profile == undefined){
             console.log("sidebar4")

              Meteor.call("updateUserImage", Meteor.user()._id, "kungfu-panda.png")
           }
       }
   });

}

Template.sideBar.helpers({
   userName: function() {
      if(Meteor.user()){
         return Meteor.user().username;
      }
      else{
         return "";
      }
   },
   isUserLoggedIn: function() {
      if(Meteor.user()){ return true; } else{ return false; }
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
loadChat = function(chatId) {
    Router.go("chatview", {
        _chatId: chatId
    });
}
//temp method for testing. remove later
addUserToChats= function (){
   if(Meteor.user())
      Meteor.call("addUserToAllChats", Meteor.user()._id)
}
killWorld = function(){
	Router.go("/killworld");
}

getChats = function(){
   console.log("returning chats: ")
   console.log(Chats.find());
   return Chats.find();
}

Template.chatList.helpers ({
   chatList: function() {
      return Chats.find({members: Meteor.userId()});
   }
});
