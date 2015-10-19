
Meteor.methods({
   getImageFilesInProfileFolder: function() {
       var fs = Npm.require('fs');
       var files = fs.readdirSync('../../../../../public/img/profile-pics/');

       var cleanedUpFiles = _(files).reject( function(fileName) {
           return fileName.indexOf('.png') < 0;
       });
       return cleanedUpFiles;

   }
});
