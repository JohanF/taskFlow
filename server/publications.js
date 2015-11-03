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
