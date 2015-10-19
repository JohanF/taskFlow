Tasks = new Mongo.Collection("tasks");
Projects = new Mongo.Collection("projects");
TaskActivities = new Mongo.Collection("taskActivities");
Chats = new Mongo.Collection("chats");
Comments = new Mongo.Collection("comments");
UserSettings = new Mongo.Collection("userSettings");

if(Meteor.is_server) {
Tasks.allow({
    update: function (taskId, priority) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
}
