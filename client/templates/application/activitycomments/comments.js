Template.activityComments.helpers({
 comments: function () {
      return Comments.find({activity:Session.get('activityId')});
    }
});

Template.activityComments.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $commentText = $(e.target).find('[name=comment]');
    //   postId: template.data._id

        Comments.insert({
            text: $commentText.val(),
            date: 'on ' + moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'),
            activity: Session.get('activityId')
        })
    }
});
