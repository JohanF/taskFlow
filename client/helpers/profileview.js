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
      Meteor.call("getImageFilesInProfileFolder", function(err, data){
         if(err){
            console.log("error in imageGallery: ")
            console.log(err);
            return undefined;
         }
         console.log(data)
         return data;
      });

   }
});
Template.profileview.rendered = function() {
    $("#createImageModal").hide();
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
