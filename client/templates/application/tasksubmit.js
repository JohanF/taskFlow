Template.projectview.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $nameText =$('#name-text').val();
    var $descriptionText = $('#description-text').val();

    $('#name-text').val("");
    $('#description-text').val("");

    var taskUsers = [];


    Meteor.call("createTask", $nameText, $descriptionText, Session.get('selectedProject'), _.pluck(AddTaskUsers.find({}, {fields: {'_id':0}}).fetch(), 'uid'));
    Meteor.call('clearTaskUsers');
    //@TODO add user connection
    },
    'click #userSubmitButton': function() {
    Meteor.call("addTaskUser", this._id, this.username);
    }
});
