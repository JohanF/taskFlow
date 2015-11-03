Template.projectview.rendered = function() {
    $("#taskModal").hide();
    $("#projectSettingsModal").hide();
}
Template.projectview.events({
    'click #taskInfoButton': function() {
       //show modal
        $("#taskModal").show();
    }
});

loadProjectSettings = function(){
	console.log("show project settings")
    $("#projectSettingsModal").show();
}

Template.projectviewsettings.events({
    'click #closeProjectSettings': function () {
       //close modal
        $("#projectSettingsModal").hide();
        $('#projectName').val('');
        $('#projectDescription').val('');
    },
    'click #saveProjectSettings': function () {
        var pName = $('#projectName').val();
        var pDesc = $('#projectDescription').val();
        $("#projectSettingsModal").hide();
        $('#projectName').val('');
        $('#projectDescription').val('');
    },
    'click #projectUserSubmitButton': function() {
    	console.log("add project user");
      Meteor.call("addProjectUser", this._id);
    }
});

Deps.autorun(function(){
    Meteor.subscribe('projectSearchResults', Session.get('currentQuery'));
});
