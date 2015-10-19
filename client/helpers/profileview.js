Template.profileview.helpers({
   userName: function() {
      if(Meteor.user()){
         return Meteor.user().username;
      }
      else{
         return "";
      }
   },
   profilePic: function() {
      if(Meteor.user().profile.pic != undefined){
         return Meteor.user().profile.pic;
      }else{
         return "/img/profile-pic/kungfu-Minion.png";
      }
   }
});
Template.imageGallery.helpers({
   profilePics: function() {
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
    Meteor.call("updateUserImage", Meteor.user()._id, data);
}
