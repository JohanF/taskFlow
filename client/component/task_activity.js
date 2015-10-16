Template.taskActivityItem.helpers({
 activityDate: function () {
    return moment(new Date(this.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  },
  taskName: function () {
    return Tasks.findOne({_id:this.task}).title;
  },
  activityOwner: function() {
      return Meteor.users.findOne({_id:this.user}).username;
  }
});
