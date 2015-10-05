/*if (Tasks.find().count() === 0) {
  Tasks.insert({
    title: 'Do laundry',    
	description: 'Dirty clothes are bad, fix.',    
	status: '50%',
	priority: 3 
  });
  
  Tasks.insert({
    title: 'Eat food',    
	description: 'Eat food or die',    
	status: 'Cooked', 
	priority: 1 
  });
  
  Tasks.insert({
    title: 'Go to bed',    
	description: 'It is nice',    
	status: 'Insomnia ETA: 37 minutes',  
	priority: 2 
  });
}*/
//testing
if (Projects.find().count() === 0) {
  
  Projects.insert({
    title: 'My first project',    
	description: 'testing purposes...',    
	status: 'Active',
	members: ["wnc84uM4xND6aX3pB"],
	creator: "Hacker Man",
	projectTasks : [ 
	    {
	        title: 'Do laundry',    
			description: 'Dirty clothes are bad, fix.',    
			status: '50%',
			priority: 3,
	        assignedUsers : ["wnc84uM4xND6aX3pB"]
	    },
	    {
	        title: 'Eat food',    
			description: 'Eat food or die',    
			status: 'Cooked', 
			priority: 1,
			assignedUsers : ["wnc84uM4xND6aX3pB"]
	    },
	    {
	        title: 'Go to bed',    
			description: 'It is nice',    
			status: 'Insomnia ETA: 37 minutes',  
			priority: 2,
			assignedUsers : []
	    }
	]

  });
  Projects.insert({
    title: 'The second project',    
	description: 'testing purposes...',    
	status: 'Active',
	members: ["dnTuiWp6D8DoXMTBk"],
	creator: "Hacker Man"
  });
  Projects.insert({
    title: 'Ice cream',    
	description: 'testing purposes...',    
	status: 'Active',
	members: ["dnTuiWp6D8DoXMTBk"],
	creator: "dnTuiWp6D8DoXMTBk"
  });
}