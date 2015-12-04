Template.projectview.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $nameText =$('#name-text').val();
    var $descriptionText = $('#description-text').val();

    $('#name-text').val("");
    $('#description-text').val("");

    var taskUsers = [];

    var uidPrio = toUidPrioObj(_.pluck(AddTaskUsers.find({}, {fields: {'_id':0}}).fetch(), 'uid'));

    Meteor.call("createTask", $nameText, $descriptionText,
    Session.get('selectedProject'), uidPrio);
    Meteor.call('clearTaskUsers');
    //@TODO add user connection
    },
    'click #userSubmitButton': function() {
    $('#searchtext').val("");
    Session.set('projectSearchResults', undefined)
    Meteor.call("addTaskUser", this._id, this.username);
    }
});

function toUidPrioObj(arr) {
  var uidPrioObj = [];
  for (var i = 0; i < arr.length; ++i){
    var newPrio
    if(Tasks.find({project:Session.get('selectedProject'), assignedUsers: arr[i]}, {sort: {priority: -1}}).fetch()[0] != undefined){
      newPrio = Tasks.find({project:Session.get('selectedProject'), assignedUsers: arr[i]}, {sort: {priority: -1}}).fetch()[0].priority+1;
    } else {
      newPrio = 0;
    }

    uidPrioObj.push({"uid": arr[i], "priority": newPrio});
  }
  return uidPrioObj;
}

// links.push({"source": findNode(source), "target": findNode(target), "value": value});
