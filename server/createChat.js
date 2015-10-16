Meteor.methods({
	createChat: function(title, description, userId) {
		console.log("creating project");
		Chats.insert({
   		title: title,
			description: description,
			members: [userId],
			admin: userId,
         messageHistory: []
 		});
	},
	addUserToChat: function(projectId, userId) {
		console.log("unimplemented method for adding a person to the chat");
	},
	postToChat: function(chatId, message){
		var tempText = message.text.toString();
		console.log("entering chat with:")
		console.log(message.text);
		//use server time
		var newMessage = message;
		console.log("test1");
		console.log(newMessage.text);
		newMessage.timestamp = (new Date).toTimeString().substring(0,8);
		//if user is also the lastone that posted, just continue on their message
		if(Chats.findOne(chatId).messageHistory.length != 0 && Chats.findOne(chatId).messageHistory[Chats.findOne(chatId).messageHistory.length-1].user == message.user){
			var newMessageHistory = Chats.findOne(chatId).messageHistory;
			console.log("1");
			newMessage.text = Chats.findOne(chatId).messageHistory[Chats.findOne(chatId).messageHistory.length-1].text;
			console.log("2");
			newMessage.text.push(tempText);
			console.log("3");
			newMessageHistory[newMessageHistory.length-1] =  newMessage;
			console.log("4WHY");
			console.log("nemessage.text");
			console.log(newMessage.text);
			Chats.update({_id: chatId}, { $set : {'messageHistory': newMessageHistory  }} , {multi:true} );
			console.log(newMessage.text);
		}
		else{
			//if user is trying to post to a chat that doesnt exist nothing will happen
			newMessage.text =  [message.text];
			console.log("the text is:")
			console.log(newMessage.text)
			console.log(message.text)
			Chats.update({_id: chatId}, { $push: {messageHistory: newMessage}});
		}
	},

	clearChat: function(chatId){
		Chats.update({_id: chatId}, { $set : {'messageHistory': [] }} , {multi:true} );
	}

});
