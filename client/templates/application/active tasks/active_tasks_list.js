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
            //  console.log("Get prio : " + (get((projectTasks[key].assignedUsers[userPrio]).uid)).priority);
            if((get((projectTasks[key].assignedUsers[userPrio]).uid)).priority > (projectTasks[key].assignedUsers[userPrio]).priority){
              highPrioTaskObject[(projectTasks[key].assignedUsers[userPrio]).uid] = {priority:(projectTasks[key].assignedUsers[userPrio]).priority, task:projectTasks[key].title};
            }
          }
        }
      }

      var result = [];
      for (var key in highPrioTaskObject){
        // console.log("Results: Name: " + Meteor.users.findOne({_id: key}).username + " Task: " + highPrioTaskObject[key].task + " Prio: " + highPrioTaskObject[key].priority);
        result.push({name:Meteor.users.findOne({_id: key}).username,task:highPrioTaskObject[key].task, priority:highPrioTaskObject[key].priority});
      }
      return result;
    }
});

var highPrioTaskObject = new Object();

function get(k) {
    return highPrioTaskObject[k];
}
