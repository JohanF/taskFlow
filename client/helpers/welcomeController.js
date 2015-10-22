Template.welcomeScreen.rendered = function() {
    this.autorun(function(){
        if(Meteor.userId()){
            //showloggedin
            //replace loggedInText with full template with projectview
            $("#loggedInText").show();
            $("#notLoggedInText").hide();
        } else {
            //hidelogin
            $("#loggedInText").hide();
            $("#notLoggedInText").show();
        }

    });
}
Template.welcomeScreen.helpers({
   isUserLoggedIn: function() {
      if(Meteor.user()){ return true; } else{ return false; }
   }
});

Template.loggedIn.helpers({
    projectList: function() {
        return Projects.find({members: Meteor.userId()});
        //});
    }
});
Template.loggedIn.rendered = function() {
    $("#createProjectModal").hide();
}
Template.loggedIn.events({
    'click #createNewProjectButton': function() {
       //show modal
        $("#createProjectModal").show();
    }
});

Template.createProjectModal.events({
    'click #closeProjectModal': function () {
       //close modal
        $("#createProjectModal").hide();
        $('#newProjectName').val('');
        $('#newProjectDescription').val('');
    },
    'click #createProjectName': function () {
        var pName = $('#newProjectName').val();
        var pDesc = $('#newProjectDescription').val();
        console.log("pName: "+ pName+ " pDesc: "+ pDesc);
        Meteor.call("createProject", pName, pDesc, Meteor.userId());
        $("#createProjectModal").hide();
        $('#newProjectName').val('');
        $('#newProjectDescription').val('');
    },
});

navigateProject = function(projectId) {
    Session.set('selectedProject', projectId);
    Router.go("projectview", {
        _projectId: projectId
    });
}
