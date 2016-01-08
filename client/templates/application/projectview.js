Template.projectview.rendered = function() {
    $("#taskModal").hide();
    $("#projectSettingsModal").hide();
    $("#addModal").hide();
}
Template.projectview.events({
    'click #taskInfoButton': function() {
       //show modal
        $("#taskModal").show();
    }
});

loadProjectSettings = function(){
	// console.log("show project settings")
    $("#projectSettingsModal").show();
}

loadAddModal = function(){
	// console.log("show project settings")
    $("#addModal").show();
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
        Meteor.call("setProjectInfo",Session.get('selectedProject'), pName, pDesc);
        $("#projectSettingsModal").hide();
        $('#projectName').val(pName);
        $('#projectDescription').val(pDesc);
    },
    'click #projectUserSubmitButton': function() {
    	// console.log("add project user");
      Meteor.call("addProjectUser",Session.get('selectedProject'), this._id);
    }
});

Template.addviewsettings.events({
    'click #closeAddSettings': function () {
     //close modal
      $("#addModal").hide();
    }
});

Template.searchprojectsettinguser.events({
  'keypress input': function(event) {
         var text = $('.user-search').val()+String.fromCharCode(event.keyCode);
         //console.log(text);
         Meteor.call("searchAllUsers", text, Session.get('selectedProject'), function(error, result){
           if(error){
             //console.log(error);
             //console.log(error.reason);
             return;
           }
           console.log(result);
           Session.set("projectSettingSearchResults", result);
         });

    }
});

Template.addviewsettings.events({
  'keypress input': function(event) {
         var text = $('.project-user-search').val()+String.fromCharCode(event.keyCode);
         //console.log(text);
         Meteor.call("searchProjectUsers", text, Session.get('selectedProject'), function(error, result){
           if(error){
             //console.log(error);
             //console.log(error.reason);
             return;
           }
           console.log(result);
           Session.set("projectSearchResults", result);
         });

    }
});

Template.addviewsettings.helpers({
   projectSearchResults: function() {
      // console.log("autosearch");
      return Session.get("projectSearchResults");
   }
});

Template.projectviewsettings.helpers({
  projectSettingSearchResults: function() {
    //  console.log("autosearch");
     return Session.get("projectSettingSearchResults");
  },
  projName: function() {
    //  console.log("autosearch");
     return Projects.findOne({_id:Session.get('selectedProject')}).title;
  },
  projDesc: function() {
    //  console.log("autosearch");
     return Projects.findOne({_id:Session.get('selectedProject')}).description;
  }
});

// Deps.autorun(function(){
//     Meteor.subscribe('projectSearchResults', Session.get('currentQuery'));
// });
