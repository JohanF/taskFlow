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
      return ;
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
