
Meteor.methods({
   getImageFilesInProfileFolder: function() {
       var fs = Npm.require('fs');
       if(process.env.NODE_ENV === "production"){
         var files = fs.readdirSync('/img/profile-pics/');
       }
       else{
         var files = fs.readdirSync('../../../../../public/img/profile-pics/');
       }

       var cleanedUpFiles = _(files).reject( function(fileName) {
           return fileName.indexOf('.png') < 0;
       });
       return cleanedUpFiles;

   }
});
// var files = fs.readdirSync('../../../../../public/img/profile-pics/');
