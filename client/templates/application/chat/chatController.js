Template.entry.events({
  'keypress input': function(event) {
        if (event.charCode == 13) {
            event.stopPropagation();
            $('.chat-div').append('<div class="message"><a href="" class="message_profile-pic"></a><a href="" class="message_username">Scott</a><span class="message_timestamp">13:37</span><span class="message_content">' + $('.chat-input-text').val() + '</span></div>');
            $('.chat-input-text').val("");
        }
    }
});
