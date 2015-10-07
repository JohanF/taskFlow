Template.projectview.rendered = function() {
    $("#taskModal").hide();
}
Template.projectview.events({
    'click #taskInfoButton': function() {
       //show modal
        $("#taskModal").show();
    }
});