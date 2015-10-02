if (Tasks.find().count() === 0) {
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
}