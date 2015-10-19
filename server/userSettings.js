Meteor.methods({
   updateUserImage: function(userId, url){
      Meteor.users.update({_id:userId}, {$set:{"profile.pic":"/img/profile-pics/"+url}});
   }
});
