
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
    },

});

Template.createProjectModal.events({
    'click #closeProjectModal': function () {
       //close modal
       console.log("click2");
        $("#createProjectModal").hide();
    },
    'click #createProjectModal': function () {
        
        //Call to backend.
        // $("#createModal").hide();
    },
});
