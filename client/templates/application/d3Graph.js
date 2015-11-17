Template.vis.rendered = function () {
    var svg, width = 960, height = 75, x;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    svg = d3.select('#circles').append('svg')
      .attr('width', width)
      .attr('height', height);


    var drawCircles = function (update) {
      var data = _.map(Projects.find().fetch(), function(proj){ return 10;});
      var circles = svg.selectAll('circle').data(data);
        circles = circles.enter().append('circle')
          .attr('cx', function (d, i) { return x(i); })
          .attr('cy', height / 2);
      circles.attr('r', function (d) { return d; });
    };

    Projects.find().observe({
      added: function () {
        x = d3.scale.ordinal()
          .domain(d3.range(_.map(Projects.find().fetch(), function(proj){ return 10;}).length))
          .rangePoints([0, width], 1);
        drawCircles(false);
      },
      changed: _.partial(drawCircles, true)
    });
};
