Template.chatview.rendered = function() {
     this.autorun(function(){
        if(!Meteor.userId()){
            Router.go("/");
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
