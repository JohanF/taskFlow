Template.tasksList.helpers({ 
 tasks: function () {
      return Tasks.find({}, {sort: {priority: 1}});
    } 
});