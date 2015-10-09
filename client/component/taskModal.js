Template.taskModal.events({
    'click #closeTaskModal': function () {
       //close modal
        $("#taskModal").hide();
    }
});

Template.taskModal.helpers({
 taskActiviy: function () {
      return TaskActivities.find({});
    }
});
