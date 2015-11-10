Template.chatview.rendered = function() {
     //on render scroll down!
     $('.container-fluid').scrollTop( $('.chat-div').prop("scrollHeight"));
     Session.set('scrollHeight', $('.chat-div').prop("scrollHeight"));
     this.autorun(function(){
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
	console.log("show settings")
    $("#chatSettingsModal").show();
}
loadAddUserToChat = function(){
	console.log("show add user")
    $("#addUserToChatModal").show();
    Session.set("chatSearchResults", []);

}

Template.searchchatuser.events({
  'keypress input': function(event) {
         //search for user here.
         var text = $('.user-search').val()+String.fromCharCode(event.keyCode);
         console.log(text);
         Meteor.call("searchAllUsers", text, function(error, result){
           if(error){
             console.log(error);
             console.log(error.reason);
             return;
           }
           console.log(result)
           Session.set("chatSearchResults", result);
         });
         //Session.set("searchResults", Meteor.call("searchAllUsers", text))

    }
});
Template.addusertochat.helpers({
   searchResults: function() {
      console.log("autosearch");
      return Session.get("chatSearchResults");
      //return Meteor.call("searchAllUsers", $('.user-search').val());
         //display search results from here instead
   }
});
Template.addusertochat.rendered = function() {
    $("#addUserToChatModal").hide();
}
Template.addusertochat.events({
    'click #closeAddUserToChat': function () {
       //close modal
       console.log("vlosing");
        $("#addUserToChatModal").hide();
    },
    'click #addUserToChat': function () {
        console.log("ok")
        $("#addUserToChatModal").hide();
    },
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
        var pName = $('#chatName').val();
        var pDesc = $('#chatDescription').val();
        $("#chatSettingsModal").hide();
        $('#chatName').val('');
        $('#chatDescription').val('');
    },
});
