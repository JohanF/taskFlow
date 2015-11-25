Template.vis.rendered = function () {

  function myGraph() {

        this.addNode = function (id) {
            //graph.nodes.push({"name": id});
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
            graph.links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        this.printGraph = function() {
          console.log(graph);
        };

        var findNode = function (id) {
            for (var i in graph.nodes) {
                if (graph.nodes[i]["id"] === id) return graph.nodes[i];
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
        width = 500 - margin.left - margin.right,
        height = 125 - margin.top - margin.bottom;

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
                      {"name":"Energy"},
                      {"name":"Industrial Processes"},
                      {"name":"Electricity and heat"},
                      {"name":"Industry"},
                      {"name":"Land Use Change"},
                      {"name":"Agriculture"},
                      {"name":"Waste"},
                      {"name":"Transportation"}
                      // {"name":"Other Fuel Combustion"},
                      // {"name":"Fugitive Emissions"},
                      // {"name":"Road"},{"name":"Air"},
                      // {"name":"Rail - Ship and Other Transport"},
                      // {"name":"Residential Buildings"},
                      // {"name":"Commercial Buildings"},
                      // {"name":"Unallocated Fuel Combustion"},
                      // {"name":"Iron and Steel"},
                      // {"name":"Aluminium Non-Ferrous Metals"},
                      // {"name":"Machinery"},
                      // {"name":"Pulp - Paper and Printing"},
                      // {"name":"Food and Tobacco"},
                      // {"name":"Chemicals"},
                      // {"name":"Cement"},
                      // {"name":"Other Industry"},
                      // {"name":"T and D Losses"},
                      // {"name":"Coal Mining"},
                      // {"name":"Oil and Gas Processing"},
                      // {"name":"Deforestation"},
                      // {"name":"Harvest \/ Management"},
                      // {"name":"Agricultural Energy Use"},
                      // {"name":"Agriculture Soils"},
                      // {"name":"Livestock and Manure"},
                      // {"name":"Rice Cultivation"},
                      // {"name":"Other Agriculture"},
                      // {"name":"Landfills"},
                      // {"name":"Waste water - Other Waste"},
                      // {"name":"Carbon Dioxide"},
                      // {"name":"HFCs - PFCs"},
                      // {"name":"Methane"},
                      // {"name":"Nitrous Oxide"}
                      ],
              "links": [
                    // {"source":"Agricultural Energy Use","target":"Carbon Dioxide","value":"1.4"},
                    // {"source":"Agriculture","target":"Agriculture Soils","value":"5.2"},
                    // {"source":"Agriculture","target":"Livestock and Manure","value":"5.4"},
                    // {"source":"Agriculture","target":"Other Agriculture","value":"1.7"},
                    // {"source":"Agriculture","target":"Rice Cultivation","value":"1.5"},
                    // {"source":"Agriculture Soils","target":"Nitrous Oxide","value":"5.2"},
                    // {"source":"Air","target":"Carbon Dioxide","value":"1.7"},
                    // {"source":"Aluminium Non-Ferrous Metals","target":"Carbon Dioxide","value":"1.0"},
                    // {"source":"Aluminium Non-Ferrous Metals","target":"HFCs - PFCs","value":"0.2"},
                    // {"source":"Cement","target":"Carbon Dioxide","value":"5.0"},
                    // {"source":"Chemicals","target":"Carbon Dioxide","value":"3.4"},
                    // {"source":"Chemicals","target":"HFCs - PFCs","value":"0.5"},
                    // {"source":"Chemicals","target":"Nitrous Oxide","value":"0.2"},
                    // {"source":"Coal Mining","target":"Carbon Dioxide","value":"0.1"},
                    // {"source":"Coal Mining","target":"Methane","value":"1.2"},
                    // {"source":"Commercial Buildings","target":"Carbon Dioxide","value":"6.3"},
                    // {"source":"Deforestation","target":"Carbon Dioxide","value":"10.9"},
                    // {"source":"Electricity and heat","target":"Agricultural Energy Use","value":"0.4"},
                    // {"source":"Electricity and heat","target":"Aluminium Non-Ferrous Metals","value":"0.4"},
                    // {"source":"Electricity and heat","target":"Cement","value":"0.3"},
                    // {"source":"Electricity and heat","target":"Chemicals","value":"1.3"},
                    // {"source":"Electricity and heat","target":"Commercial Buildings","value":"5.0"},
                    // {"source":"Electricity and heat","target":"Food and Tobacco","value":"0.5"},
                    // {"source":"Electricity and heat","target":"Iron and Steel","value":"1.0"},
                    // {"source":"Electricity and heat","target":"Machinery","value":"1.0"},
                    // {"source":"Electricity and heat","target":"Oil and Gas Processing","value":"0.4"},
                    // {"source":"Electricity and heat","target":"Other Industry","value":"2.7"},
                    // {"source":"Electricity and heat","target":"Pulp - Paper and Printing","value":"0.6"},
                    // {"source":"Electricity and heat","target":"Residential Buildings","value":"5.2"},
                    // {"source":"Electricity and heat","target":"T and D Losses","value":"2.2"},
                    // {"source":"Electricity and heat","target":"Unallocated Fuel Combustion","value":"2.0"},
                    {"source":"Energy","target":"Industrial Processes","value":"24.9"},
                    {"source":"Energy","target":"Electricity and heat","value":"4.0"},
                    {"source":"Energy","target":"Industry","value":"14.7"},
                    {"source":"Energy","target":"Land Use Change","value":"8.6"},
                    {"source":"Energy","target":"Agriculture","value":"14.3"},

                    {"source":"Industrial Processes","target":"Waste","value":"34.3"},
                    {"source":"Electricity and heat","target":"Waste","value":"14.3"},
                    {"source":"Industry","target":"Waste","value":"14.3"},
                    {"source":"Land Use Change","target":"Transportation","value":"14.3"},
                    {"source":"Agriculture","target":"Transportation","value":"14.3"}

                    // {"source":"Food and Tobacco","target":"Carbon Dioxide","value":"1.0"},
                    // {"source":"Fugitive Emissions","target":"Coal Mining","value":"1.3"},
                    // {"source":"Fugitive Emissions","target":"Oil and Gas Processing","value":"3.2"},
                    // {"source":"Harvest \/ Management","target":"Carbon Dioxide","value":"1.3"},
                    // {"source":"Industrial Processes","target":"Aluminium Non-Ferrous Metals","value":"0.4"},
                    // {"source":"Industrial Processes","target":"Cement","value":"2.8"},
                    // {"source":"Industrial Processes","target":"Chemicals","value":"1.4"},
                    // {"source":"Industrial Processes","target":"Other Industry","value":"0.5"},
                    // {"source":"Industry","target":"Aluminium Non-Ferrous Metals","value":"0.4"},
                    // {"source":"Industry","target":"Cement","value":"1.9"},
                    // {"source":"Industry","target":"Chemicals","value":"1.4"},
                    // {"source":"Industry","target":"Food and Tobacco","value":"0.5"},
                    // {"source":"Industry","target":"Iron and Steel","value":"3.0"},
                    // {"source":"Industry","target":"Oil and Gas Processing","value":"2.8"},
                    // {"source":"Industry","target":"Other Industry","value":"3.8"},
                    // {"source":"Industry","target":"Pulp - Paper and Printing","value":"0.5"},
                    // {"source":"Iron and Steel","target":"Carbon Dioxide","value":"4.0"},
                    // {"source":"Land Use Change","target":"Deforestation","value":"10.9"},
                    // {"source":"Land Use Change","target":"Harvest \/ Management","value":"1.3"},
                    // {"source":"Landfills","target":"Methane","value":"1.7"},
                    // {"source":"Livestock and Manure","target":"Methane","value":"5.1"},
                    // {"source":"Livestock and Manure","target":"Nitrous Oxide","value":"0.3"},
                    // {"source":"Machinery","target":"Carbon Dioxide","value":"1.0"},
                    // {"source":"Oil and Gas Processing","target":"Carbon Dioxide","value":"3.6"},
                    // {"source":"Oil and Gas Processing","target":"Methane","value":"2.8"},
                    // {"source":"Other Agriculture","target":"Methane","value":"1.4"},
                    // {"source":"Other Agriculture","target":"Nitrous Oxide","value":"0.3"},
                    // {"source":"Other Fuel Combustion","target":"Agricultural Energy Use","value":"1.0"},
                    // {"source":"Other Fuel Combustion","target":"Commercial Buildings","value":"1.3"},
                    // {"source":"Other Fuel Combustion","target":"Residential Buildings","value":"5.0"},
                    // {"source":"Other Fuel Combustion","target":"Unallocated Fuel Combustion","value":"1.8"},
                    // {"source":"Other Industry","target":"Carbon Dioxide","value":"6.6"},
                    // {"source":"Other Industry","target":"HFCs - PFCs","value":"0.4"},
                    // {"source":"Pulp - Paper and Printing","target":"Carbon Dioxide","value":"1.1"},
                    // {"source":"Rail - Ship and Other Transport","target":"Carbon Dioxide","value":"2.5"},
                    // {"source":"Residential Buildings","target":"Carbon Dioxide","value":"10.2"},
                    // {"source":"Rice Cultivation","target":"Methane","value":"1.5"},
                    // {"source":"Road","target":"Carbon Dioxide","value":"10.5"},
                    // {"source":"T and D Losses","target":"Carbon Dioxide","value":"2.2"},
                    // {"source":"Transportation","target":"Air","value":"1.7"},
                    // {"source":"Transportation","target":"Rail - Ship and Other Transport","value":"2.5"},
                    // {"source":"Transportation","target":"Road","value":"10.5"},
                    // {"source":"Unallocated Fuel Combustion","target":"Carbon Dioxide","value":"3.0"},
                    // {"source":"Unallocated Fuel Combustion","target":"Methane","value":"0.4"},
                    // {"source":"Unallocated Fuel Combustion","target":"Nitrous Oxide","value":"0.4"},
                    // {"source":"Waste","target":"Landfills","value":"1.7"},
                    // {"source":"Waste","target":"Waste water - Other Waste","value":"1.5"},
                    // {"source":"Waste water - Other Waste","target":"Methane","value":"1.2"},
                    // {"source":"Waste water - Other Waste","target":"Nitrous Oxide","value":"0.3"}
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
            .attr("transform", function(d) { console.log(d.x + " , " + d.y);
            return "translate(" + d.x + "," + d.y + ")"; });
          // .call(d3.behavior.drag()
          //   .origin(function(d) { return d; })
          //   .on("dragstart", function() {
          //   this.parentNode.appendChild(this); })
          //   .on("drag", dragmove));

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
        };
        // Make it all go
        update();
    }





    // the function for moving the nodes
    // function dragmove(d) {
    // d3.select(this).attr("transform",
    //     "translate(" + (
    //          d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
    //       ) + "," + (
    //                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
    //         ) + ")");
    // sankey.relayout();
    // link.attr("d", path);
    // }
    //
    // var drawSankey = function (update) {
    //
    // };

    (function() {
      var initializing = true;
      theGraph = new myGraph();
      Tasks.find({project:Session.get('selectedProject')}).observe({
        added: function () {
          if (!initializing) {
            theGraph.addNode("test");
          }
        },
        changed: function () {
          theGraph.addNode("test");
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
      theGraph.addNode("test");
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
