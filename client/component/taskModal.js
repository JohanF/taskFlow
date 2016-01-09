Template.taskModal.events({
    'click #closeTaskModal': function () {
       //close modal
        $("#taskModal").hide();
    }
});

Template.taskModal.helpers({
 taskActiviy: function () {
      return TaskActivities.find({task:Session.get('selectedTask')}, {sort: {createdAt: -1}});
    },
  taskname: function () {
    return Tasks.findOne({_id:Session.get('selectedTask')}).title;
  },
  taskusers: function () {
    var taskU = "";
    for(user in Tasks.findOne({_id:Session.get('selectedTask')}).assignedUsers){
      taskU = taskU + " " + Meteor.users.find({_id:Tasks.findOne({_id:Session.get('selectedTask')}).assignedUsers[user].uid}).fetch()[0].username;
    }
    return taskU;
  }
});

Template.registerHelper('last',
    function(list, elem) {
        return _.last(list) === elem;
    }
);
