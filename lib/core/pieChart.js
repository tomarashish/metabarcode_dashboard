var data = [{
    "label": "Bacteria",
    "value": 65
  },
  {
    "label": "Virus",
    "value": 25
  },
  {
    "label": "Unclassified",
    "value": 10
  }, ];

var margin = {
    top: 5,
    right: 20,
    bottom: 10,
    left: 20
  },
  width = 200 - margin.left - margin.right,
  height = 200 - margin.bottom - margin.top,
  radius = Math.min(width, height) / 2;

//var color = d3.scale.category20c();
var colorPie = d3.scale.ordinal()
  .domain(["Bacteria", "Virus", "Unclassified"])
  .range(["#f45b5b", "#8085e9", "#8d4654", "#434348", "#f7a35c"]);

var svg = d3.select('#pieTaxon').append("svg")
  .data([data])
  .attr("height", height + margin.top + margin.bottom)
  .attr("width", width + margin.left + margin.right)
  .append("g")
  .attr("transform", "translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.bottom + margin.top) / 2 + ")");

var pie = d3.layout.pie().value(function (d) {
  return d.value;
});

// declare an arc generator function
var arc = d3.svg.arc()
  .innerRadius(0)
  .outerRadius(radius);

// select paths, use arc generator to draw
var arcs = svg.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

arcs.append("svg:path")
  .attr("d", function (d) {
    return arc(d);
  })
  //.attr("filter", "url(#dropshadow)")
  .style("fill", function (d) {
    console.log(d.data.label)
    return colorPie(d.data.label);
  })
  .style("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 1)
/*.on('mouseover', function (d, i) {



    d3.select(this)
      .transition()
      .duration(500)
      .style("stroke-width", "2px")
      .style("opacity", 0.8)
      .ease('elastic')
      .attr('transform', function (d) {
        var dist = 6;
        d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
        var x = Math.sin(d.midAngle) * dist;
        var y = -Math.cos(d.midAngle) * dist;
        return 'translate(' + x + ',' + y + ')';
      });
  }).on('mouseout', function (d, i) {
    d3.selectAll("path")
      .style("stroke-width", "1px")
      .style("opacity", 1);

    d3.select(this)
      .transition()
      .duration(100)
      .ease('bounce')
      .attr('transform', 'translate(0,0)')
  });
*/
/* For the drop shadow filter... 
    drop shadow taken from
    http://bl.ocks.org/marcbc/3281521
*/
var defs = svg.append("defs");

var filter = defs.append("filter")
  .attr("id", "dropshadow")

filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 1)
  .attr("result", "blur");
filter.append("feOffset")
  .attr("in", "blur")
  .attr("dx", 1)
  .attr("dy", 1)
  .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
  .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

//text lables
var text = svg.select(".labels").selectAll("text")
  .data(pie);

text.enter()
  .append("text")
  .attr("dy", ".35em")
  .style("fill", function (d) {
    console.log(d)
    return colorPie(d.data.label);
  })
  .text(function (d) {
    return (d.data.label);
  });

text.transition().duration(1000)
  .attrTween("transform", function (d) {
    this._current = this._current || d;
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t);
      var pos = outerArc.centroid(d2);
      pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    };
  })
  .styleTween("text-anchor", function (d) {
    this._current = this._current || d;
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t);
      return midAngle(d2) < Math.PI ? "start" : "end";
    };
  });

text.exit()
  .remove();

/* ------- SLICE TO TEXT POLYLINES -------*/

var polyline = svg.select(".lines").selectAll("polyline")
  .data(pie);

polyline.enter()
  .append("polyline");

polyline.transition().duration(1000)
  .attrTween("points", function (d) {
    this._current = this._current || d;
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function (t) {
      var d2 = interpolate(t);
      var pos = outerArc.centroid(d2);
      pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
      return [arc.centroid(d2), outerArc.centroid(d2), pos];
    };
  });

polyline.exit()
  .remove();

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
