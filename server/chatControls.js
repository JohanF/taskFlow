Meteor.methods({
	getMembersInChat: function(chatId) {
		var chatUsers = [];
		Chats.findOne(chatId).members.forEach(function(user) {
			if(Meteor.users.findOne(user) != undefined){
				chatUsers.push(Meteor.users.findOne(user));
			}
		});
		return chatUsers;
	},
	/***change chatTitle and description
	*/
	editChat: function(chatId, cTitle, cDesc) {
		Chats.update({_id: chatId}, { $set : {'title': cTitle, 'description': cDesc } } , {multi:true} );
	},
	isUserAdmin: function(chatId, userId) {
		var admin = Chats.findOne(chatId).admin;
		return admin == userId;
	},
	createEmptyChat: function (userId){
		console.log("newChat")
		Chats.insert({
   		title: "newChat",
			description: "emptyDescr",
			members: [userId],
			admin: userId,
         messageHistory: []
 		});
	},
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
	getUserProfilePicture: function(userId) {
		console.log(Meteor.users.findOne(userId).profile.pic);
		return Meteor.users.findOne(userId).profile.pic;
	},
	addUserToChat: function(userId, chatId){
		if(_.contains(Chats.findOne(chatId).members, userId)){
			console.log("was already in chat! :()")
		}
		else{
			Chats.update({_id: chatId}, { $push: {members: userId}});
		}
	},
	removeUserFromChat: function(userId, chatId){
		var tempArray = [];
		if(_.contains(Chats.findOne(chatId).members, userId)){
			tempArray = Chats.findOne(chatId).members;
			var index = tempArray.indexOf(userId);
			tempArray.splice(index,1);
				Chats.update({_id: chatId}, { $set: {members: tempArray}});
		}
		else{	console.log("wasnt in chat! :()") }
	},
	addUserToAllChats: function(userId){
		Chats.find().forEach(function(chat) {
			if(_.contains(chat.members, userId)){
			}
			else{
    			Chats.update({_id: chat._id}, { $push: {members: userId}});
			}
		});

		/*Chats.find().foreach(
			Chats.update({_id: _id}, { $push: {members: userId}})
		);*/
		/*forEach( var chat in Chats.find()){
			Chats.update({_id: chat._id}, { $push: {members: userId}});
		/*/
	},
	postToChat: function(chatId, message){
		var tempText = message.text.toString();
		//use server time
		var newMessage = message;
		newMessage.timestamp = (new Date).toTimeString().substring(0,8);
		//if user is also the lastone that posted, just continue on their message
		if(Chats.findOne(chatId).messageHistory.length != 0 && Chats.findOne(chatId).messageHistory[Chats.findOne(chatId).messageHistory.length-1].user == message.user){
			var newMessageHistory = Chats.findOne(chatId).messageHistory;
			newMessage.text = Chats.findOne(chatId).messageHistory[Chats.findOne(chatId).messageHistory.length-1].text;
			newMessage.text.push(tempText);
			newMessageHistory[newMessageHistory.length-1] =  newMessage;
			Chats.update({_id: chatId}, { $set : {'messageHistory': newMessageHistory  }} , {multi:true} );
		}
		else{
			//if user is trying to post to a chat that doesnt exist nothing will happen
			newMessage.text =  [message.text];
			Chats.update({_id: chatId}, { $push: {messageHistory: newMessage}});
		}
	},

	clearChat: function(chatId){
		Chats.update({_id: chatId}, { $set : {'messageHistory': [] }} , {multi:true} );
	},
	chatWasUpdated: function(chatId){
		tChat = Chats.findOne(chatId);


	}

});
