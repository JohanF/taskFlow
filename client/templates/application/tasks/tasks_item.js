Template.taskItem.events({
    'click #taskInfoButton': function(){
        Session.set('selectedTask', this._id);
    }
});
