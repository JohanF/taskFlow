
Template.vis.rendered = function () {

  var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new myGraph()
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
    })();

  function myGraph() {

        this.addNode = function (id) {
            Meteor.call('addNode',Session.get('selectedProject'), id);
            // graph.nodes.push({"name": id});
            update();
        };

        this.updateFunc = function () {
            update();
        };

        this.removeNode = function (id) {
            Meteor.call('removeNode',Session.get('selectedProject'), id);
            // var i = 0;
            // var n = findNode(id);
            // while (i < graph.links.length) {
            //     if ((graph.links[i]['source'] == n) || (graph.links[i]['target'] == n)) {
            //         graph.links.splice(i, 1);
            //     }
            //     else i++;
            // }
            // graph.nodes.splice(findNodeIndex(id), 1);
            update();
        };

        this.removeLink = function (source, target) {
            Meteor.call('removeLink',Session.get('selectedProject'), source, target);
            // for (var i = 0; i < graph.links.length; i++) {
            //     if (graph.links[i].source.name == source && graph.links[i].target.name == target) {
            //
            //         // console.log("source name: " + graph.links[i].source.name);
            //         //   console.log("target name: " + graph.links[i].target.name);
            //         graph.links.splice(i, 1);
            //         break;
            //     }
            // }
            // console.log(graph.links);
            update();
        };

        this.sourceLinks = function (source) {

          var tempArray = Meteor.call('sourceLinks',Session.get('selectedProject'), source);
          console.log("Source Links : " + tempArray);
              // for (var i = 0; i < graph.links.length; i++) {
              //     if (graph.links[i].source.name == source && Tasks.find({title: graph.links[i].target.name, project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}).fetch().length > 0) {
              //       tempArray.push(graph.links[i]);
              //     }
              // } // @TODO only let users switch places on their own tasks
            return tempArray;
        };

        this.targetLinks = function (target) {

          var tempArray = Meteor.call('targetLinks',Session.get('selectedProject'), target);
              // for (var i = 0; i < graph.links.length; i++) {
              //     if (graph.links[i].target.name == target && Tasks.find({title: graph.links[i].source.name, project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}).fetch().length > 0) {
              //       tempArray.push(graph.links[i]);
              //     }
              // } // @TODO only let users switch places on their own tasks
            return tempArray;
        };

        this.removeallLinks = function () {
          Meteor.call('removeallLinks',Session.get('selectedProject'));
            // graph.links.splice(0, graph.links.length);
            update();
        };

        this.removeAllNodes = function () {
          Meteor.call('removeAllNodes',Session.get('selectedProject'));
            // graph.nodes.splice(0, graph.links.length);
            update();
        };

        this.addLink = function (source, target, value) {
          console.log("Target: " + target);
          console.log("Source: " + source);
          Meteor.call('addLink',Session.get('selectedProject'), source, target, value);
            // graph.links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        // this.printGraph = function() {
        //   console.log(graph.links);
        // };

        // var findNode = function (id) {
        //     for (var i in graph.nodes) {
        //         if (graph.nodes[i]["name"] === id) return graph.nodes[i];
        //     }
        //     ;
        // };
        //
        // var findNodeIndex = function (id) {
        //     for (var i = 0; i < graph.nodes.length; i++) {
        //         if (graph.nodes[i].id == id) {
        //             return i;
        //         }
        //     }
        //     ;
        // };

        var units = "Widgets";

        var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 1400 - margin.left - margin.right,
        height = 280 - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function(d) { return formatNumber(d) + " " + units; },
        color = d3.scale.category20();



        // append the svg canvas to the page
        var svg = d3.select("#circles").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        // Set the sankey diagram properties
        var sankey = d3.sankey()
        .nodeWidth(36)
        .nodePadding(10)
        .size([width, height]);

        var path = sankey.link();

        // load the data
        // var graph = {
        //       "nodes": [
        //               // {"name":"dawdwa"},
        //               // {"name":"Eat food"},
        // //               {"name":"Wake up"},
        // //               {"name":"Do laundry"}
        //               ],
        //       "links": [
        //             // {"source":"dawdwa","target":"Eat food","value":"25"},
        // //             {"source":"Eat food","target":"Wake up","value":"15"},
        // //             {"source":"Wake up","target":"Do laundry","value":"17.6"}
        //             ]
        //     };



        var update = function () {
          // if(!update){
          var graph = Graphs.findOne({project:Session.get('selectedProject')});

          var nodeMap = {};
          graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
          graph.links = graph.links.map(function(x) {
            return {
              source: nodeMap[x.source],
              target: nodeMap[x.target],
              value: x.value
            };
          });

          console.log("The graphnodes: " + graph.nodes);
         console.log("The graphlinks: " + graph.links);

          if(graph.nodes.length > 0 && graph.links.length > 0) {
          svg.selectAll("*").remove();

          sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(32);

          // add in the links
          var link = svg.append("g").selectAll(".link")
            .data(graph.links)
          .enter().append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            .sort(function(a, b) { return b.dy - a.dy; });

          // add the link titles
          link.append("title")
              .text(function(d) {
              return d.source.name + " → " +
                      d.target.name + "\n" + format(d.value); });

          // add in the nodes
          var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
              // console.log(d.x + " , " + d.y);
            return "translate(" + d.x + "," + d.y + ")"; })
            .call(d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", function() {
            this.parentNode.appendChild(this); })
            .on("drag", dragmove));

          // add the rectangles for the nodes
          node.append("rect")
            .attr("height", function(d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) {
            return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function(d) {
            return d3.rgb(d.color).darker(2); })
          .append("title")
            .text(function(d) {
            return d.name + "\n" + format(d.value); });

          // add in the title for the nodes
          node.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { return d.name; })
          .filter(function(d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");
            // }
            function dragmove(d) {
            d3.select(this).attr("transform",
                "translate(" + (
                     d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                  ) + "," + (
                           d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                    ) + ")");
            sankey.relayout();
            link.attr("d", path);
          }
          }
        };
        // Make it all go
        update();
    }


    // the function for moving the nodes

    //
    // var drawSankey = function (update) {
    //
    // };

    (function() {
      var initializing = true;
      var lastVal = undefined;
      theGraph = Singleton.getInstance();
      var lastValMap = new Object();
      var updateInt = 0;

      function getLastVal(k){
        return lastValMap[k];
      }

      // function initNodes(){
      //
      //   Tasks.find({project:Session.get('selectedProject')}, {sort: {'assignedUsers.priority': -1}}).fetch().forEach(function(task) {
      //     theGraph.addNode(task.title);
      //     // console.log(theGraph);
      //
      //     (task.assignedUsers).forEach(function(assUsr) {
      //       if(getLastVal(assUsr.uid) != undefined) {
      //          theGraph.addLink(task.title, getLastVal(assUsr.uid).title, 11);
      //          }
      //         lastValMap[assUsr.uid] = task;
      //     });
      //   });
      //
      // //  theGraph.printGraph();
      // }

      //'assignedUsers.uid': Meteor.userId()

      Tasks.find({project:Session.get('selectedProject')}).observe({
        added: function (task) {
          if (!initializing) {
            theGraph.addNode(task.title);
            console.log(Tasks.find({project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}, {sort: {'assignedUsers.priority': -1}}).fetch());
            if(Tasks.find({project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}, {sort: {'assignedUsers.priority': -1}}).fetch()[1] != undefined){
              // console.log(" LALALALA " + Tasks.find({project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}, {sort: {'assignedUsers.priority': -1}}).fetch());
              console.log("ADDING LINK");
            theGraph.addLink(Tasks.find({project:Session.get('selectedProject'), 'assignedUsers.uid': Meteor.userId()}, {sort: {'assignedUsers.priority': -1}}).fetch()[1].title, task.title,  11);
            }
            // console.log(Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0].title);
            // Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0].title
            // theGraph.addLink(task.title, "Industrial Processes", "25");
            // theGraph.addLink(task.title, "Electricity and heat", "14.9");
          } else {

          }
        },
        changed: function (task) {
          updateInt = updateInt +1;
          // console.log(task);
          // console.log(updateInt);
          // console.log(task);
          // console.log(Session.get('afterTaskBefore'));
          // console.log(Session.get('beforeTaskBefore'));
          // console.log(Session.get('beforeTaskAfter'));
          // console.log(Session.get('afterTaskAfter'));

          //Establish links between new neighbors
          if(Session.get('beforeTaskAfter') != "" && Session.get('afterTaskAfter') != ""){

          console.log("The task before, after the move : " + Session.get('beforeTaskAfter'));
          console.log("The task after, after the move : " + Session.get('afterTaskAfter'));

          theGraph.removeLink(Session.get('beforeTaskAfter'), (Session.get('afterTaskAfter')));
          // console.log("removed link between: " + Session.get('beforeTaskAfter') + " and " + (Session.get('afterTaskAfter')));
        }

          var sourceLinks = theGraph.sourceLinks(task.title);
          sourceLinks.forEach(function(entry) { //@TODO Make it only affect the users task.
              // console.log(task.title);
              // console.log(entry);
              if(entry.target.name != undefined){
                // console.log("banana");
              theGraph.removeLink(task.title, entry.target.name);
              // console.log("removed link between: " + task.title + " and " + entry.target.name);

                  if(Session.get('beforeTaskBefore') != "" && entry.target.name != ""){ // @TODO only add links between user tasks.
                    theGraph.addLink(Session.get('beforeTaskBefore'), entry.target.name, 11);
                    // console.log("added link between: " + Session.get('beforeTaskBefore') + " and " + entry.target.name);
                  }
              }
          });


          var targetLinks = theGraph.targetLinks(task.title);
          targetLinks.forEach(function(entry) {
          if(Session.get('beforeTaskBefore') != ""){
            theGraph.removeLink(Session.get('beforeTaskBefore'), task.title);
            // console.log("removed link between: " + Session.get('beforeTaskBefore') + " and " + task.title);
          }
        });

          if(Session.get('beforeTaskAfter') != ""){
                    theGraph.addLink(Session.get('beforeTaskAfter'), task.title, 11);
                    // console.log("added link between: " + Session.get('beforeTaskAfter') + " and " + task.title);
          }

          // console.log(Session.get('afterTaskBefore'));



         // @TODO moving forward works with this solution, moving backwards doesn't!!!

    if(Session.get('afterTaskAfter') != ""){
        theGraph.addLink(task.title, Session.get('afterTaskAfter'), 11);
      }
          //
          //           theGraph.printGraph();
          // //Repoint old neighbors.
          //
          // theGraph.printGraph();

          // console.log(theGraph.links);
          // var afterLink = _.find(theGraph.links, function(link){ return console.log(link.source) + " AND " + console.log(task.title); });
          // var beforeLink = _.find(theGraph.links, function(link){ return link.target = task.title; });
          // console.log(afterLink);
          // console.log(beforeLink);
          // theGraph.addNode("test");
          // _.partial(myGraph.update, false);

        }
      });
      if (initializing) {
      // theGraph.addNode("Energy");
      // theGraph.printGraph();
      // theGraph.addNode("Industrial Processes");
      // theGraph.addNode("Electricity and heat");
      // theGraph.printGraph();
      // theGraph.addNode("Industry");
      // theGraph.addNode("Land Use Change");
      // theGraph.addNode("Agriculture");
      // theGraph.addLink("Energy", "Industrial Processes", "24.9");
      // theGraph.addLink("Energy", "Electricity and heat", "4.0");
      // theGraph.addLink("Energy", "Industry", "14.7");
      // theGraph.addLink("Energy", "Land Use Change", "8.6");
      // theGraph.addLink("Energy", "Agriculture", "14.3");
      //  initNodes();
      //  theGraph.updateFunc();
       initializing = false;
      }
    })();
};



    // var drawCircles = function (update) {
    //   var data = _.map(Projects.find().fetch(), function(proj){ return 10;});
    //   var circles = svg.selectAll('circle').data(data);
    //     circles = circles.enter().append('circle')
    //       .attr('cx', function (d, i) { return x(i); })
    //       .attr('cy', height / 2);
    //   circles.attr('r', function (d) { return d; });
    // };
    //
    // Projects.find().observe({
    //   added: function () {
    //     x = d3.scale.ordinal()
    //       .domain(d3.range(_.map(Projects.find().fetch(), function(proj){ return 10;}).length))
    //       .rangePoints([0, width], 1);
    //     drawCircles(false);
    //   },
    //   changed: _.partial(drawCircles, true)
    // });
