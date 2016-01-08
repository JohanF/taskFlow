Template.addTaskUsers.helpers({
 addtaskusers: function () {
			return AddTaskUsers.find();
		}
});

Template.addTaskUsers.events({
    'click #removeAddTaskUserButton': function(){
        Meteor.call("removeTaskUser", this._id);
    }
});
