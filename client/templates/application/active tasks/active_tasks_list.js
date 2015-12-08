Template.activeTasksList.helpers({
 tasks: function () {
      // @TODO Sort by createDate

      var projectTasks = Tasks.find({project:projectData._id}).fetch();

      for (var key in projectTasks) {
        for (var userPrio in projectTasks[key].assignedUsers){
          if(get((projectTasks[key].assignedUsers[userPrio]).uid) == undefined){
            highPrioTaskObject[(projectTasks[key].assignedUsers[userPrio]).uid] = {priority:(projectTasks[key].assignedUsers[userPrio]).priority, task:projectTasks[key].title};
                    }
           else {
            if((get((projectTasks[key].assignedUsers[userPrio]).uid)).priority > (projectTasks[key].assignedUsers[userPrio]).priority){
              highPrioTaskObject[(projectTasks[key].assignedUsers[userPrio]).uid] = {priority:(projectTasks[key].assignedUsers[userPrio]).priority, task:projectTasks[key].title};
            }
          }
        }
      }

      var result = [];
      for (var key in highPrioTaskObject) result.push({name:key,task:highPrioTaskObject[key].task, priority:highPrioTaskObject[key].priority});
      return result;
    }
});

var highPrioTaskObject = new Object();

function get(k) {
    return highPrioTaskObject[k];
}
