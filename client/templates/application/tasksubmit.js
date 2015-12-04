Template.projectview.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $nameText =$('#name-text').val();
    var $descriptionText = $('#description-text').val();

    $('#name-text').val("");
    $('#description-text').val("");

    var taskUsers = [];

    var prio;
    if(Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0] != undefined){
      prio = Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0].priority+1;
    } else {
      prio = 0;
    }


    Meteor.call("createTask", $nameText, $descriptionText,
    Session.get('selectedProject'), _.pluck(AddTaskUsers.find({}, {fields: {'_id':0}}).fetch(), 'uid'),
    prio);
    Meteor.call('clearTaskUsers');
    //@TODO add user connection
    },
    'click #userSubmitButton': function() {
    $('#searchtext').val("");
    Session.set('projectSearchResults', undefined)
    Meteor.call("addTaskUser", this._id, this.username);
    }
});
