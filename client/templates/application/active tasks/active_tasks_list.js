Template.activeTasksList.helpers({ 
 tasks: function () {
      // @TODO Sort by createDate

      var projectTasks = Tasks.find({project:projectData._id}).fetch();
      var userProjectTasks = _.groupBy(projectTasks, 'assignedUsers');
      
      var highPrioTaskObject = [];

      for (var key in userProjectTasks) {
            if (userProjectTasks.hasOwnProperty(key)) {
                  var obj = userProjectTasks[key];
                  highPrioTaskObject.push({name: Meteor.users.findOne({_id:key.toString()}).username, taskName: _.min(obj, function(o){return o.priority}).title});
            }
      }

      return highPrioTaskObject;

      //return highPrioTaskArray;

      // @TODO Implement!  _.groupBy(Tasks.find({project:projectData._id}).fetch(), 'assignedUsers');
      //return _.min(userProjectTasks, function(temp) { return temp.priority;});        
      // testing @TODO priority has to be changed to be contexual per user
      // testing @TODO add active project
      // _.max(_.map(_.groupBy(Tasks.find({project:projectData._id}).fetch(), 'assignedUsers'), 
            // function(n,k){ return n; })[0], function(o){return o.priority;});

      // Test 1::
      // _.map(_.groupBy(Tasks.find({project:"B3MowNggmDxdo5ugL"}).fetch(), 'assignedUsers'), function(obj){_.min(obj,function(o){return o.priority})})
      
      // Test 2::
      //_.each(_.values(_.groupBy(Tasks.find({project:"B3MowNggmDxdo5ugL"}).fetch(), 'assignedUsers')), alert)

      // _.groupBy([], )
      //_.groupBy(['one', 'two', 'three'], 'length')  => {3: ["one", "two"], 5: ["three"]}
      /*var taskArray = _.map(userProjectTasks, function(n,k) {return n;});
      var arrayLength = taskArray.length;
      var highPrioTaskArray = [];

      for (var i = 0; i < arrayLength; i++) {
            highPrioTaskArray.push(_.min(taskArray[i], function(o){return o.priority;}));
      }
      //var x = Tasks.find({assignedUsers:Meteor.userId(), project:"B3MowNggmDxdo5ugL"});
      //var tempArray = x.projectTasks || [];
      */
    } 
});