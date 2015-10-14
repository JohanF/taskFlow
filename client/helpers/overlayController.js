Template.sideBar.helpers({
   userName: function() {
      if(Meteor.user()){
         return Meteor.user().username;
      }
      else{
         return "";
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
loadChat = function(chatId) {
    Router.go("chatview", {
        _chatId: chatId
    });
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
