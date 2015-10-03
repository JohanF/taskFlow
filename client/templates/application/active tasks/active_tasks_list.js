Template.activeTasksList.helpers({ 
 tasks: function () {
      var x = Projects.findOne({"projectTasks.assignedUsers":Meteor.userId()}, {projectTasks : 1});

      if(!x) return [];

      var tempArray = x.projectTasks || [];

      return _.filter(tempArray, function(temp) { return temp.priority <= 1});        
      // testing @TODO priority has to be changed to be contexual per user
      // testing @TODO add active project

    } 
});