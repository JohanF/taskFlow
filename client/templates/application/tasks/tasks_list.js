Template.tasksList.helpers({ 
 tasks: function () {
      //return Projects.find({"projectTasks.assignedUsers":Meteor.userId()}, {projectTasks : 1});

      return Projects.find({}, {'projectTasks.title': 1, description: 0});
    } 
});