if (Tasks.find().count() === 0) {
  Tasks.insert({
    title: 'Do laundry',
	description: 'Dirty clothes are bad, fix.',
	status: '50%',
	priority: 2,
	        assignedUsers : ["J7DZRBWTmGoW3StH6,dnTuiWp6D8DoXMTBk"],
	        project: "B3MowNggmDxdo5ugL"
  });

  Tasks.insert({
    title: 'Eat food',
	description: 'Eat food or die',
	status: 'Cooked',
	priority: 1,
	        assignedUsers : ["J7DZRBWTmGoW3StH6,dnTuiWp6D8DoXMTBk"],
	        project: "B3MowNggmDxdo5ugL"
  });

  Tasks.insert({
    title: 'Go to bed',
	description: 'It is nice',
	status: 'Insomnia ETA: 37 minutes',
	priority: 3,
	        assignedUsers : ["J7DZRBWTmGoW3StH6,dnTuiWp6D8DoXMTBk"],
	        project: "B3MowNggmDxdo5ugL"
  });
  Tasks.insert({
    title: 'Wake up',
	description: 'It is also nice',
	status: 'Insomnia ETA: 37 minutes',
	priority: 4,
	        assignedUsers : ["J7DZRBWTmGoW3StH6,dnTuiWp6D8DoXMTBk"],
	        project: "B3MowNggmDxdo5ugL"
  });
  Tasks.insert({
    title: 'Go to bed',
	description: 'It is nice',
	status: 'Insomnia ETA: 37 minutes',
	priority: 3,
	        assignedUsers : [""],
	        project: ""
  });
}

if(Chats.find().count() === 0) {
   //chat structure on creation
   Chats.insert({
      title:      'Training chat',
      description: 'Here we chat about what to train',
      members:    ['dnTuiWp6D8DoXMTBk', 'userId2', 'Etk4e8uZLnWzk8Sht'],
      admin:      ['couldBeUsefulInTheFuture'],
      messageHistory: []
   });
   Chats.insert({
      title:      'Party chat',
      description: 'Here we party!',
      members:    ['dnTuiWp6D8DoXMTBk', 'userId2', 'Etk4e8uZLnWzk8Sht'],
      admin:      ['couldBeUsefulInTheFuture'],
      messageHistory: []
   });
}
if (Projects.find().count() === 0) {

  Projects.insert({
    title: 'My first project',
	description: 'testing purposes...',
	members: ["wnc84uM4xND6aX3pB"],
	creator: "Hacker Man"
  });
  Projects.insert({
    title: 'The second project',
	description: 'testing purposes...',
	members: ["dnTuiWp6D8DoXMTBk"],
	creator: "Hacker Man"
  });
  Projects.insert({
    title: 'Ice cream',
	description: 'testing purposes...',
	members: ["dnTuiWp6D8DoXMTBk"],
	creator: "dnTuiWp6D8DoXMTBk"
  });
}

if (Comments.find().count() === 0){
    Comments.insert({
      text: 'Hello this is a test comment.',
      date: 'on March 5th, 2014'
    });
    Comments.insert({
      text: 'Hello this is a test comment and this comment is particularly very long and it goes on and on and on.',
      date: 'on March 5th, 2014'
    });
    Comments.insert({
      text: 'Hello this is a test comment.',
      date: 'on March 5th, 2014'
    });
}
