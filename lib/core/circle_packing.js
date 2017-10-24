 var margin = 50,
    diameter = 500;

var color = d3.scale.category20b();

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.id; })

var svg = d3.select("#chart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")")
    .call(d3.behavior.zoom().on("zoom", zoomIn));

function zoomIn() {
 svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
 
var div = d3.select("body")
    .append("div") 
    .attr("class", "tooltip")
    .style("opacity", 0);
    
d3.json("flare.json", function(error, root) {
  if (error) throw error;

  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
      .on("mouseover", function (d) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0.9)
                            div.html('<b>'+"Name : " + d.name + '<br>' + '<a href="http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' + d.id + "\" >" + "Id : "+ d.id + "</a>" + '<br> Mean : '  + d.mean.toFixed(6) + '</b>')
                             .style("top", ( d3.event.pageY  - 60)+"px")   //Position of pointer from tooltip from top
                             .style("left", ( d3.event.pageX - 400 )+"px"); //Position of pointer from tooltip from left
                    })
                    .on("mouseout", function() {  div.transition()		
                                                        .duration(2000)	
                                                        .style("opacity", 0);
                                               });

  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("textPath")
      .attr()
      .attr("class", function(d) { return d.children ? "parent" : "child"})
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

   
  var node = svg.selectAll("circle,text");

  d3.select(window)
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }
    
  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
    
    
function sortCircle(){
        var cnt = 0,
            type = 'null';
    
        function sortElements(){
            
           if(cnt == 0){ type = 'ascending'; cnt++; };
           if(cnt == 1){type ='decending'; cnt = 0;};
            
            return type;
        }
    
        pack
            .sort(sortElements)
            .nodes(root);
    /*    
        node
            .attr("transform",function(d){
                return "translate(" + d.x + "," + d.y + ")";
                })
            .selectAll("circle")
            .attr('r', function(d) {reutrn d.r; });
        */    
    }
  
});
