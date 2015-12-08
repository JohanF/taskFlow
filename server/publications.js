Meteor.publish("tasks", function () {
  return Tasks.find();
});
Meteor.publish("projects", function () {
  return Projects.find();
});
Meteor.publish("taskActivities", function () {
  return TaskActivities.find();
});
Meteor.publish("chats", function () {
  return Chats.find();
});
Meteor.publish("comments", function () {
  return Comments.find();
});
Meteor.publish("addtaskusers", function () {
  return AddTaskUsers.find();
});

Meteor.publish("users", function () {
    return Meteor.users.find();
});

Meteor.publish("taskorder", function () {
  return TaskOrder.find();
});

Meteor.publish('projectSearchResults', function(query){
    if(query){
        var self = this;
        var searchUsers = Meteor.users.find({"username": /.*query.*/})
        searchUsers.forEach(function(doc){
            self.added('search_collection', doc._id, doc.username);
        });
        this.ready();
    } else {
        this.ready();
    }
});
