Template.activeTasksList.helpers({ 
 tasks: function () {
      //var x = Tasks.find({assignedUsers:Meteor.userId(), project:"B3MowNggmDxdo5ugL"});

      // @TODO Sort by createDate
      //var tempArray = x.projectTasks || [];

      var projectTasks = Tasks.find({project:"B3MowNggmDxdo5ugL"}).fetch();
      var userProjectTasks = _.groupBy(projectTasks, 'assignedUsers');

      // @TODO Implement!
      //return _.min(userProjectTasks, function(temp) { return temp.priority;});        
      // testing @TODO priority has to be changed to be contexual per user
      // testing @TODO add active project


      // Test 1::
      // _.map(_.groupBy(Tasks.find({project:"B3MowNggmDxdo5ugL"}).fetch(), 'assignedUsers'), function(obj){_.min(obj,function(o){return o.priority})})
      
      // Test 2::
      //_.each(_.values(_.groupBy(Tasks.find({project:"B3MowNggmDxdo5ugL"}).fetch(), 'assignedUsers')), alert)

      // _.groupBy([], )
      //_.groupBy(['one', 'two', 'three'], 'length')  => {3: ["one", "two"], 5: ["three"]}
    } 
});