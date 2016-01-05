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

    Meteor.call("createComment", $commentText.val(), moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'), Session.get('activityId'), Meteor.userId());
    template.find("form").reset();
    //@TODO add user connection
    }
});
