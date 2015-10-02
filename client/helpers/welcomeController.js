
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
