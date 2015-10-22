Template.projectview.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $nameText =$('#name-text').val();
    var $descriptionText = $('#description-text').val();

    $('#name-text').val("");
    $('#description-text').val("");

    Meteor.call("createTask", $nameText, $descriptionText, Session.get('selectedProject'), Meteor.userId());
    //@TODO add user connection
    }
});
