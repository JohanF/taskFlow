Template.taskModal.events({
    'click #closeTaskModal': function () {
       //close modal
        $("#taskModal").hide();
    }
});

Template.taskModal.helpers({
 taskActiviy: function () {
      return TaskActivities.find({task:Session.get('selectedTask')}, {sort: {createdAt: -1}});
    }
});

Template.registerHelper('last',
    function(list, elem) {
        return _.last(list) === elem;
    }
);
