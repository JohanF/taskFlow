Template.vis.rendered = function () {

  function myGraph() {

        this.addNode = function (id) {
            graph.nodes.push({"name": id});
            update();
        };

        this.updateFunc = function () {
            update();
        };

        this.removeNode = function (id) {
            var i = 0;
            var n = findNode(id);
            while (i < graph.links.length) {
                if ((graph.links[i]['source'] == n) || (graph.links[i]['target'] == n)) {
                    graph.links.splice(i, 1);
                }
                else i++;
            }
            graph.nodes.splice(findNodeIndex(id), 1);
            update();
        };

        this.removeLink = function (source, target) {
            for (var i = 0; i < graph.links.length; i++) {
                if (graph.links[i].source.id == source && graph.links[i].target.id == target) {
                    graph.links.splice(i, 1);
                    break;
                }
            }
            update();
        };

        this.removeallLinks = function () {
            graph.links.splice(0, graph.links.length);
            update();
        };

        this.removeAllNodes = function () {
            graph.nodes.splice(0, graph.links.length);
            update();
        };

        this.addLink = function (source, target, value) {
            // console.log("Target: " + findNode(target));
            // console.log("Source: " + findNode(source));
            graph.links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        this.printGraph = function() {
          console.log(graph);
        };

        var findNode = function (id) {
            for (var i in graph.nodes) {
                if (graph.nodes[i]["name"] === id) return graph.nodes[i];
            }
            ;
        };

        var findNodeIndex = function (id) {
            for (var i = 0; i < graph.nodes.length; i++) {
                if (graph.nodes[i].id == id) {
                    return i;
                }
            }
            ;
        };

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
        var graph = {
              "nodes": [
                      // {"name":"dawdwa"},
                      // {"name":"Eat food"},
        //               {"name":"Wake up"},
        //               {"name":"Do laundry"}
                      ],
              "links": [
                    // {"source":"dawdwa","target":"Eat food","value":"25"},
        //             {"source":"Eat food","target":"Wake up","value":"15"},
        //             {"source":"Wake up","target":"Do laundry","value":"17.6"}
                    ]
            };

        var nodeMap = {};
        graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
        graph.links = graph.links.map(function(x) {
          return {
            source: nodeMap[x.source],
            target: nodeMap[x.target],
            value: x.value
          };
        });

        var update = function () {
          // if(!update){
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
      theGraph = new myGraph();
      var lastValMap = new Object();

      function getLastVal(k){
        return lastValMap[k];
      }

      function initNodes(){

        Tasks.find({project:Session.get('selectedProject')}, {sort: {priority: 1}}).fetch().forEach(function(task) {
          theGraph.addNode(task.title);
          // console.log(theGraph);

          (task.assignedUsers).forEach(function(assUsr) {
            if(getLastVal(assUsr) != undefined) {
               theGraph.addLink(task.title, getLastVal(assUsr).title, 11);
               }
              lastValMap[assUsr] = task;
          }); //@TODO add priority ordering functionality... Going to be a f*in hassle.
        });

      }

      Tasks.find({project:Session.get('selectedProject')}).observe({
        added: function (task) {
          if (!initializing) {
            theGraph.addNode(task.title);
            theGraph.addLink(Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[1].title, task.title,  11);
            // console.log(Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0].title);
            // Tasks.find({project:Session.get('selectedProject'), assignedUsers: Meteor.userId()}, {sort: {priority: -1}}).fetch()[0].title
            // theGraph.addLink(task.title, "Industrial Processes", "25");
            // theGraph.addLink(task.title, "Electricity and heat", "14.9");
          } else {

          }
        },
        changed: function () {
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
       initNodes();
       theGraph.updateFunc();
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
