Template.profileview.helpers({
   userName: function() {
      if(Meteor.user()){
         return Meteor.user().username;
      }
      else{
         return "";
      }
   }
});
Template.imageGallery.helpers({
   profilePics: function() {
      console.log("returning images");
      console.log(Session.get("images"));
      return Session.get("images");
   }
});
Template.profileview.rendered = function() {
    $("#createImageModal").hide();
    //load img urls
    Meteor.call("getImageFilesInProfileFolder", function(err, data){
      if(err){
          console.log("error in imageGallery: ")
          console.log(err);
      }
      Session.set("images",data)
   });
}

Template.imageGallery.events({
    'click #closeImageModal': function () {
       //close modal
        $("#createImageModal").hide();

    },

});


showImageGallery = function() {
    $("#createImageModal").show();
}
selectNewProfilePic = function(data) {
    console.log("new pic selected");
    console.log(data);
}
