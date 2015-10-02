Template.tasksList.helpers({ 
 tasks: function () {
      var x = Projects.findOne({"projectTasks.assignedUsers":Meteor.userId()}, {projectTasks : 1}).projectTasks;

      return x.find({assignedUsers:Meteor.userId()});

      // testing @TODO add active project

    } 
});