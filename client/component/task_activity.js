Template.taskActivityItem.helpers({
 activityDate: function () {
    return moment(new Date(this.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  },
  taskName: function () {
    return Tasks.findOne({_id:this.task}).title;
  },
  activityOwner: function() {
      return Meteor.users.findOne({_id:this.user}).username;
  },
  activityId: function() {
      return this._id;
  },
  commentAmount: function() {
      return Comments.find({activity:this._id}).count();
  }
});

Template.taskActivityItem.events({
    'click #commentButton': function(){

        var $activityBody = $('#activityBody');
        $activityBody.find('.collapse.in').collapse('hide'); // Collapse other comments

        Session.set('activityId', this._id);
    }
});
