Template.activeTasksList.helpers({ 
 tasks: function () {
      //var x = Tasks.find({assignedUsers:Meteor.userId(), project:"B3MowNggmDxdo5ugL"});

      // @TODO Sort by createDate
      //var tempArray = x.projectTasks || [];

      return [_.min(Tasks.find({assignedUsers:Meteor.userId(), project:"B3MowNggmDxdo5ugL"}).fetch(), function(temp) { return temp.priority;})];        
      // testing @TODO priority has to be changed to be contexual per user
      // testing @TODO add active project

    } 
});