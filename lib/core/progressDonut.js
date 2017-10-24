progressDonut = function module(){

    var pie=d3.layout.pie()
        .value(function(d){return d})
        .sort(null);
    //var margin = {top:5, bottom:5, left:5, right:5} 
    var w= 200,h=150;

    var outerRadius=(w/3)-10;
    var innerRadius=70;

    var color = ['#f2503f','#ea0859','#404F70'];
 
    var createGradient=function(svg,id,color1,color2){
 
	var defs = svg.append("svg:defs");
 
	var red_gradient = defs.append("svg:linearGradient")
        .attr("id", id)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "50%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");
 
	red_gradient.append("svg:stop")
        .attr("offset", "50%")
        .attr("stop-color", color1)
        .attr("stop-opacity", 1);
 
	red_gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", color2)
        .attr("stop-opacity", 1);
     };
 
    //create a function to export and loop the data
    function exports(_selection){
        _selection.each(function(_data){
            
            var percent = _data;
            var ratio = percent/100;
            
            var svg=d3.select(this)
                .append("svg")
                .attr({
                    width: w ,
                    height:h,
                    class:'shadow'
                }).append('g')
                .attr({
                    transform:'translate('+w/2+','+h/2+')'
                });

            createGradient(svg,'gradient',color[0],color[1]);

            var arc=d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .endAngle(2*Math.PI);

            var arcLine=d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0);


            var pathBackground=svg.append('path')
                .attr({
                    d:arc
                })
                .style({
                    fill:color[2]
                });


            var pathChart = svg.append('path')
                .datum({endAngle:0})
                .attr({
                    d:arcLine
                })
                .style({
                    fill:'url(#gradient)'
                });

            var middleCount=svg.append('text')
                .text(function(d){
                    return d;
                })

                .attr({
                    class:'middleText',
                    'text-anchor':'middle',
                    dy:10,
                    dx:-10
                })
                .style({
                    fill:color[1],
                    'font-size':'30px'

                });
            
            svg.append('text')
                .text('%')
                .attr({
                    class:'percent',
                    'text-anchor':'middle',
                    dx:25,
                    dy:10

                })
                .style({
                    fill:color[1],
                    'font-size':'30px'

                });
            
            
            var arcTween=function(transition, newAngle) {
                transition.attrTween("d", function (d) {
                    var interpolate = d3.interpolate(d.endAngle, newAngle);
                    var interpolateCount = d3.interpolate(0, percent);
                    return function (t) {
                        d.endAngle = interpolate(t);
                        middleCount.text(Math.floor(interpolateCount(t)));
                        return arcLine(d);
                    };
                });
            };


            var animate=function(){
                pathChart.transition()
                        .duration(750)
                        .ease('cubic')
                        .call(arcTween,((2*Math.PI))*ratio);


            };
            
            setTimeout(animate,0);
            
        }); //end of selection
    }//end of exports

 
/*svg.append('text')
    .text("Total Reads")
    .attr({
        'text-anchor':'right',
        dx:70,
        dy:-40,
    })
    .style({
        fill:color[1],
        'font-size':'20px'
    })

svg.append('text')
    .text("1000000")
    .attr({
        'text-anchor':'right',
        dx:80,
        dy:-20,
    })
    .style({
        fill:color[1],
        'font-size':'20px'
    })
*/
 
  //export function to modules
    exports.width = function(_){
        if(!argument.length) return width;
        width = _;
        return exports;
    }
    
    exports.height = function(_){
        if(!argument.length) return height;
        height = _;
        return exports;
    }
    
    return exports;
}