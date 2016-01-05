Template.activeTasksList.helpers({
 tasks: function () {
      // @TODO Sort by createDate
      // var highPrioTaskObject = [];
      var usrHiPrio = []
      usrHiPrio.push({task:Tasks.find({'assignedUsers.uid':Meteor.userId(), project:projectData._id, _id:
      Tasks.find({'assignedUsers.uid':Meteor.userId(), project:projectData._id}, {sort: {'assignedUsers.priority': 1}}
    ).fetch()[0]._id}, {sort: {'assignedUsers.priority': 1}}).fetch()[0], user:Meteor.user().username});


      for(var user in Projects.findOne({_id:projectData._id}).members){
        if(Projects.findOne({_id:projectData._id}).members[user] != Meteor.userId()){
          usrHiPrio.push({task: (Tasks.find({'assignedUsers.uid':Projects.findOne({_id:projectData._id}).members[user], project:projectData._id, _id:
       Tasks.find({'assignedUsers.uid':Projects.findOne({_id:projectData._id}).members[user], project:projectData._id}, {sort: {'assignedUsers.priority': 1}}
     ).fetch()[0]._id}, {sort: {'assignedUsers.priority': 1}}).fetch()[0]), user: Meteor.users.find({_id:Projects.findOne({_id:projectData._id}).members[1]}).fetch()[0].username});

        }
      }

      return usrHiPrio;

    }
});
