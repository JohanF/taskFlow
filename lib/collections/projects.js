Tasks = new Mongo.Collection("tasks");
Projects = new Mongo.Collection("projects");
TaskActivities = new Mongo.Collection("taskActivities");
Chats = new Mongo.Collection("chats");
Comments = new Mongo.Collection("comments");
UserSettings = new Mongo.Collection("userSettings");

Tasks.initEasySearch('title');

EasySearch.createSearchIndex('users', {
  field: 'username',
  collection: Meteor.users,
  use: 'mongo-db',
  query: function (searchString, opts) {
    // Default query that is used for searching
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    return query;
  }
});


if(Meteor.is_server) {
Tasks.allow({
    update: function (taskId, priority) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
}
