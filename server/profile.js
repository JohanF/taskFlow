
Meteor.methods({
   getImageFilesInProfileFolder: function() {

       var fs = Npm.require('fs');
       var base = process.env.PWD;
       var meteor_root = Npm.require('fs').realpathSync( process.cwd() + '/../' );
       var application_root = Npm.require('fs').realpathSync( meteor_root + '/../' );
       var image_folder = meteor_root + '/public/img/profile-pics/';

       if(process.env.NODE_ENV === "development"){
          path = Npm.require('path');
          console.log(fs.readdirSync("./assets/app/profile-pics/"));
         var files = fs.readdirSync("./assets/app/profile-pics/");

       }
       else{

         //var files = fs.readdirSync(base+"meteor/");
         var files = fs.readdirSync("./assets/app/profile-pics/");
       }

       /*var cleanedUpFiles = _(files).reject( function(fileName) {
           return fileName.indexOf('.png') < 0;
       });*/
       return files;

   }
});
// var files = fs.readdirSync('../../../../../public/img/profile-pics/');
