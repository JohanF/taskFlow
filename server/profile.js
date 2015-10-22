
Meteor.methods({
   getImageFilesInProfileFolder: function() {

      console.log("in getimagefiles..")
      //read from txt instead of all crap
      var fs = Npm.require('fs');
      var array = fs.readFileSync('./assets/app/profile-pictures.txt').toString().split("\n");
      for(i in array) {
         if(array[i].length <3 ){
            array.splice(i,1);
         }
         else{
            array[i] = array[i].substring(array[i].length-1,0); //NEED to remove /r or everything fucks up in a cssertain place
         }
      }
      console.log(array);
      return array;

      //remove below
      /* var fs = Npm.require('fs');
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
      }*/

       /*var cleanedUpFiles = _(files).reject( function(fileName) {
           return fileName.indexOf('.png') < 0;
       });*/
       //return files;

   }
});
// var files = fs.readdirSync('../../../../../public/img/profile-pics/');
