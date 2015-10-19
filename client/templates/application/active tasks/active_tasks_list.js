Template.activeTasksList.helpers({
 tasks: function () {
      // @TODO Sort by createDate

      var projectTasks = Tasks.find({project:projectData._id}).fetch();
      var userProjectTasks = _.groupBy(projectTasks, 'assignedUsers');

      var highPrioTaskObject = [];

      for (var key in userProjectTasks) {
            if (userProjectTasks.hasOwnProperty(key)) {
                  var obj = userProjectTasks[key];
                  if(Meteor.users.findOne({_id:key.toString()})){
                      highPrioTaskObject.push({name: Meteor.users.findOne({_id:key.toString()}).username, taskName: _.min(obj, function(o){return o.priority}).title});
                  }
            }
      }

      return highPrioTaskObject;
    }
});
