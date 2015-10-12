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

Template.registerHelper('last',
    function(list, elem) {
        return _.last(list) === elem;
    }
);
