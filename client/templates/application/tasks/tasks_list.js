Template.tasksList.helpers({ 
 tasks: function () {
      var x = Projects.findOne({"projectTasks.assignedUsers":Meteor.userId()}, {projectTasks : 1});

      if(!x) return [];

      var tempArray = x.projectTasks || [];

      return _.sortBy(_.filter(tempArray, function(temp) {
      	return temp.assignedUsers == Meteor.userId();        // Filters and keeps tasks that belongs to the user
      }), function(sortTemp){ return sortTemp.priority; });  // then sorts them by priority.

      // testing @TODO add active project

    } 
});