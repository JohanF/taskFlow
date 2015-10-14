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
		//use server time
		message.timestamp = (new Date).toTimeString().substring(0,8);
		//if user is trying to post to a chat that doesnt exist nothing will happen
		Chats.update({_id: chatId}, { $push: {messageHistory: message}});
	},

	clearChat: function(chatID){
		Chats.update({}, { $set : {'messageHistory': [] }} , {multi:true} )
	}

});
