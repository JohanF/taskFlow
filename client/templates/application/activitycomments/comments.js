Template.activityComments.helpers({
 comments: function () {
      return Comments.find({});
    }
});

Template.activityComments.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $commentText = $(e.target).find('[name=comment]');
    //   postId: template.data._id

        Comments.insert({
            text: $commentText.val(),
            date: 'on ' + moment(new Date(this.createdAt)).format('MMMM Do YYYY, h:mm:ss a')
        })
    }
});
