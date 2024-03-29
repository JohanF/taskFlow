Template.chatview.rendered = function() {
     //on render scroll down!
     $('.container-fluid').scrollTop( $('.chat-div').prop("scrollHeight"));
     Session.set('scrollHeight', $('.chat-div').prop("scrollHeight"));

     this.autorun(function(){
        Meteor.call("getMembersInChat", chatData._id, function(error, result){
          if(error){
            console.log(error.reason);
          }
          Session.set("membersInChat", result);
        });
        if(!Meteor.userId()){
            Router.go("/");
        }
        else if(Session.get("scrollHeight") != $('.chat-div').prop("scrollHeight")){
            Session.set('scrollHeight', $('.chat-div').prop("scrollHeight"));
            $('.container-fluid').scrollTop( $('.chat-div').prop("scrollHeight"));
        }
     });
}

Template.chatview.helpers({
   chatName: function() {
      if(Chats.findOne(chatData._id) != undefined ){
         return Chats.findOne(chatData._id).title;
      }
      return "";
   },
   chatDescription: function() {
      if(Chats.findOne(chatData._id) != undefined ){
         return Chats.findOne(chatData._id).description;
      }
      return "";

   },
   userIsAdmin: function() {

      return Chats.findOne(chatData._id).admin == Meteor.userId();//Meteor.call("isUserAdmin", chatData._id, Meteor.userId());

   }
});

Template.entry.events({
  'keypress input': function(event) {
        if (event.charCode == 13 && $('.chat-input-text').val() != "") {
            event.stopPropagation();
            //var element = $('.chat-div');
            /*element.append('<div class="message"><a href="" class="message_profile-pic"></a><a href="" class="message_username">Scott</a><span class="message_timestamp">13:37</span><span class="message_content">' + $('.chat-input-text').val() + '</span></div>');*/
            //Scroll down to bottom
            var msg= {  user: Meteor.user().username,
                        timestamp: '',
                        text: $('.chat-input-text').val(),
                        profilePic: Meteor.user().profile.pic
                     };
            Meteor.call("postToChat", chatData._id, msg);
            if(msg.text == 'ClearChat'){
               console.log("clearing chat");
               Meteor.call("clearChat", chatData._id);
            }
            //empty input container
            $('.chat-input-text').val("");
            $('.container-fluid').scrollTop( $('.chat-div').prop("scrollHeight"));
        }
    }
});

Template.messages.helpers({
   messageHistory: function(chatId) {
      if(Chats.findOne(chatData._id) != undefined && Chats.findOne(chatData._id).messageHistory.length >0){
         return Chats.findOne(chatData._id).messageHistory;
      }
      else{
         return null;
      }
   }
});
Template.message.helpers({
   profilePicX: function() {
      if(Meteor.user().profile.pic != undefined){
         return Meteor.user().profile.pic;
      }
      else{
         console.log("error: 'profile pic is undefined' - please inform your friendly neighbourhood administrators")
      }
   }
});

loadChatSettings = function(){
    $("#chatSettingsModal").show();
    $('#chatName').val(Chats.findOne(chatData._id).title);
    $('#chatDescription').val(Chats.findOne(chatData._id).description);
}
loadAddUserToChat = function(){
    $("#addUserToChatModal").show();
    Session.set("chatSearchResults", []);
}
loadRemoveUserFromChat = function(){
    $("#removeUserFromChatModal").show();
}
selectUserToAdd = function(id){
   console.log(id);
   Meteor.call("addUserToChat", id, chatData._id, function(error, result){
     if(error){
      console.log(error.reason);
      return;
     }
     Meteor.call("getMembersInChat", chatData._id, function(error, result){
      if(error){
         console.log(error.reason);
      }
      Session.set("membersInChat", result);
     });
   });
   $("#addUserToChatModal").hide();
}

selectUserToRemove = function(id){
   console.log(id);
   Meteor.call("removeUserFromChat", id, chatData._id, function(error, result){
     if(error){
      console.log(error.reason);
      return;
     }
     Meteor.call("getMembersInChat", chatData._id, function(error, result){
      if(error){
         console.log(error.reason);
      }
      Session.set("membersInChat", result);
     });
   });
   $("#removeUserFromChatModal").hide();
}



Template.searchchatuser.events({
  'keyup input': function(event) {
         //search for user here.
         if($('.user-search').val() !=""){

            var text = $('.user-search').val();//+String.fromCharCode(event.keyCode);
            Meteor.call("searchAllUsersNotInChat", text, chatData._id, function(error, result){
              if(error){
                console.log(error.reason);
                return;
              }
              Session.set("chatSearchResults", result);
            });
         }
         else{
            Session.set("chatSearchResults", []);
         }
         //Session.set("searchResults", Meteor.call("searchAllUsers", text))

    }
});
Template.addusertochat.helpers({
   searchResults: function() {
      return Session.get("chatSearchResults");
   }
});
Template.addusertochat.rendered = function() {
    $("#addUserToChatModal").hide();
}
Template.removeuserfromchat.rendered = function() {
    $("#removeUserFromChatModal").hide();
}
Template.addusertochat.events({
    'click #closeAddUserToChat': function () {
       //close modal
        $('.user-search').val('');

        $("#addUserToChatModal").hide();
    },
    'click #addUserToChat': function () {
        console.log("ok")
        $("#addUserToChatModal").hide();
    },
});
Template.removeuserfromchat.events({
    'click #closeRemoveUserFromChat': function () {
        $("#removeUserFromChatModal").hide();
    },
    'click #removeUserFromChat': function () {
        console.log("ok")
        $("#addUserToChatModal").hide();
    }
});

Template.removeuserfromchat.helpers({
   chatMembers: function() {
      return Session.get("membersInChat");
   }
});

Template.chatsettings.rendered = function() {
    $("#chatSettingsModal").hide();

}

Template.chatsettings.events({
    'click #closeChatSettings': function () {
       //close modal
        $("#chatSettingsModal").hide();
        $('#chatName').val('');
        $('#chatDescription').val('');
    },
    'click #saveChatSettings': function () {
        var cName = $('#chatName').val();
        var cDesc = $('#chatDescription').val();
        Meteor.call("editChat", chatData._id, cName, cDesc, function(error, result){
          if(error){
           console.log(error.reason);
           return;
          }
        });
        $("#chatSettingsModal").hide();
        $('#chatName').val('');
        $('#chatDescription').val('');
    },
});
Template.chatmembers.rendered = function(){
   Meteor.call("getMembersInChat", chatData._id, function(error, result){
     if(error){
       console.log(error.reason);
     }
     Session.set("membersInChat", result);
   });
}

Template.chatmembers.helpers({
   chatMembers: function() {
      return Session.get("membersInChat");
   }
});
