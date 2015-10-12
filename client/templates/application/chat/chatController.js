Template.entry.events({
  'keypress input': function(event) {
        if (event.charCode == 13) {
            event.stopPropagation();
            var element = $('.chat-div');
            element.append('<div class="message"><a href="" class="message_profile-pic"></a><a href="" class="message_username">Scott</a><span class="message_timestamp">13:37</span><span class="message_content">' + $('.chat-input-text').val() + '</span></div>');
            $('.chat-input-text').val("");
            console.log("scrolltop is " + element.prop("scrollHeight"));

            $('.container-fluid').scrollTop( element.prop("scrollHeight") );
        }
    }
});
