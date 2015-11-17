Template.vis.rendered = function () {
    var svg, width = 500, height = 75;

    var color = d3.scale.category20();

    var nodes = [
    { x:   width/3, y: height/2 },
    { x: 2*width/3, y: height/2 }
    ];

    var links = [
    { source: 0, target: 1 }
    ];

    svg = d3.select('#circles').append('svg')
      .attr('width', width)
      .attr('height', height);

    var force = d3.layout.force()
        .charge(-120)
        .size([width, height])
        .nodes(nodes)
        .links(links);

    force.linkDistance(width/2);

    var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

    var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node');

force.on('end', function() {
      node.attr('r', width/25)
       .attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; });

       link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
});

force.start();


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
};
