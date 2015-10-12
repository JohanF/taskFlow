Template.taskActivityItem.helpers({
 activityDate: function () {
    return moment(new Date(this.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  }
});
