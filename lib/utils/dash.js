/*var svgArea = dimple.newSvg("#areaElement", 900, 300);
    d3.tsv("../data/data.tsv", function (data) {
      var myChart = new dimple.chart(svgArea, data);
      myChart.setBounds(45, 20, 800, 200)
      var x = myChart.addCategoryAxis("x", "Elements");
      myChart.addMeasureAxis("y", "Total");
      myChart.addSeries(["Elements"], dimple.plot.bar);    
      x.addOrderRule("Elements");
    
      myChart.svg.attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 900 300");
        
      myChart.ease = "bounce";
      myChart.staggerDraw = true;
      myChart.draw(800);
    });
*/


var svg1 = dimple.newSvg('#userElement', 900, 400);

            var userEle = [{
                Total: 10,
                Type: "Msg",
                User: "User-1",
                Order: 1
            }, {
                 Total: 15,
                Type: "Msg",
                User: "User-2",
                Order: 2
            }, {
                 Total: 25,
                Type: "Msg",
                User: "User-3",
                Order: 3
            },{
                 Total: 30,
                Type: "Msg",
                User: "User-4",
                Order: 4
            }, {
                 Total: 45,
                Type: "Msg",
                User: "User-5",
                Order: 5
            }, {
                 Total: 35,
                Type: "Msg",
                User: "User-6",
                Order: 6
            }, {
                Total: 50,
                Type: "Docs",
                User: "User-1",
                Order: 1
            }, {
                Total: 115,
                Type: "Docs",
                User: "User-2",
                Order: 2
            }, {
                Total: 115,
                Type: "Docs",
                User: "User-3",
                Order: 3
            },{
                Total: 10,
                Type: "Files",
                User: "User-1",
                Order: 1
            }, {
                Total: 50,
                Type: "Task",
                User: "User-1",
                Order: 1
            }];

            //d3.tsv("/content/example_data.tsv", function (data) {
            var myChart = new dimple.chart(svg1, userEle);
            myChart.setBounds(50, 20, 900, 300);

            var x = myChart.addCategoryAxis("x", "Type");
            //x.addOrderRule(['Msg', 'Docs', 'Files', 'task']);
            var y = myChart.addMeasureAxis("y", "Total");

            // In order to deal with cases where order differs by column 
            // you need to include it in your series definition
            var s = myChart.addSeries(["Order", "User"], dimple.plot.bar);
               
    var s2 = myChart.addSeries(["Type"]);

var userLegend = myChart.addLegend(200, 5, 400, 20, "left", s);
var typeLegend = myChart.addLegend(600, 5, 400, 20, "left", s2);
            // Your function approach would also work, but as it is the default 
            // handling for a numeric column you can just specify order like this
            s.addOrderRule("Order");
           myChart.svg.attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 900 400");

           myChart.ease = "bounce";
            myChart.staggerDraw = true;
            myChart.draw(800);
            s.categoryFields = ["User"];
                                                                                                                                    s2.shapes.remove();


         myChart.legends = [];
    // Get a unique list of Owner values to use when filtering
        var typeFilterValues = dimple.getUniqueValues(userEle, "Type");
        var userFilterValues = dimple.getUniqueValues(userEle, "User");
        var hiddenUserValue = [];
        var hiddenTypeValue = [];
        
        typeFilterValues.forEach(function(typeName){
              
            var typeClass = ".dimple-legend .dimple-" + typeName.toLowerCase();
                   
            d3.selectAll(typeClass)
                .style("fill", "grey");
                //.style("stroke", "grey");
        });
                       
    legendBits = userLegend.shapes;
    legendBits[0] = legendBits[0]
        .concat(typeLegend.shapes[0]);

        // Get all the rectangles from now orphaned legend
        legendBits.selectAll("rect")
          // Add a click event to each rectangle
          .on("click", function (e) {
            // This indicates whether the item is already visible or not
            var hide = false;
            var newUserFilters = [];
            var newTypeFilters = [];
            var currentVaue = e.aggField.slice(-1)[0];
      
            
            userFilterValues.forEach(function(f){
                if(f === currentVaue){
                    var whereIsIt = hiddenUserValue.indexOf(currentVaue);

                    if (whereIsIt > -1) {
                        //it is hidden and needs to be shown.
                        hide = false;
                        //hiddenUserValue.splice(whereIsIt, 1);
                        hiddenUserValue = [];
                    } else {
                        //it needs to be hidden
                         hide = true;
                         hiddenUserValue.push(currentVaue);
                    }
                }
            });
            typeFilterValues.forEach(function(f){
                 
                if(f === currentVaue){
                    var whereIsIt = hiddenTypeValue.indexOf(currentVaue);
                      
                    if (whereIsIt > -1) {
                    
                        //it is hidden and needs to be shown.
                        hide = false;
                        hiddenTypeValue.splice(whereIsIt, 1);
                    } else {
                    //    it needs to be hidden
                         hide = true;
            
                         hiddenTypeValue.push(currentVaue);
                    }
                }
            });
            

           userFilterValues.forEach(function(userName){
                   
                   if(hiddenUserValue.indexOf(userName) == -1 && hiddenUserValue.length > 0){
                  
                        var usrClass = ".dimple-legend .dimple-" + userName.toLowerCase();
                   
                       d3.selectAll(usrClass)
                        .style("opacity", .3);
                   
               }else{
                  
                   var usrClass = ".dimple-legend .dimple-" + userName.toLowerCase();
                   
                   d3.selectAll(usrClass)
                    .style("opacity", 1);
               }
        
           })

            typeFilterValues.forEach(function(typeName){
                  
                   if(hiddenTypeValue.indexOf(typeName) == -1 && hiddenTypeValue.length > 0){
                  
                        var typeClass = ".dimple-legend .dimple-" + typeName.toLowerCase();
                   
                       d3.selectAll(typeClass)
                        .style("opacity", .3);
                   
               }else{
                   var typeClass = ".dimple-legend .dimple-" + typeName.toLowerCase();
                   
                   
                   d3.selectAll(typeClass)
                    .style("opacity", 1);
               }
        
           })

        
            if(hiddenTypeValue.length == "" ){
                newTypeFilters =  typeFilterValues;
            }else{
                newTypeFilters = hiddenTypeValue;
            }
            
            if( hiddenUserValue.length == 0){
                newUserFilters = userFilterValues;
                //d3.selectAll("rect").style("opacity", 1);
            }else{
                newUserFilters = hiddenUserValue;
            }
           
            // Filter the data
myChart.data = dimple.filterData(dimple.filterData(userEle, 'User', newUserFilters), 'Type', newTypeFilters);
       // Passing a duration parameter makes the chart animate. Without
       // it there is no transition
 
 myChart.draw(800);
         s2.shapes.remove();
          });

            
/*


var svg2 = dimple.newSvg("#taskStatus", 250, 250);
    d3.tsv("../data/task.tsv", function (data) {
      var myPie = new dimple.chart(svg2, data);
     myPie.setBounds(5, 5, 140, 150)
      myPie.addMeasureAxis("p", "Value");
        
      var ring = myPie.addSeries("Task_status", dimple.plot.pie);
      ring.innerRadius = "75%";
      myPie.addLegend(150, 10, 140, 100, "left");
      myPie.draw();
    });

var svg3 = dimple.newSvg("#eventStatus", 250, 250);
    d3.tsv("../data/event.tsv", function (data) {
      var myPie = new dimple.chart(svg3, data);
     myPie.setBounds(5, 5, 180, 190)
      myPie.addMeasureAxis("p", "Value");
      var ring = myPie.addSeries("Event_status", dimple.plot.pie);
      ring.innerRadius = "75%";
      myPie.addLegend(170, 20, 70, 150, "left");
         myPie.svg.attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 250 250");
      myPie.draw();
    });

var svg4 = dimple.newSvg("#elemDetail", 700, 400);
    var data1 = [
    [
      {week: 'week 1', value: 9},
      {week: 'week 2', value: 12},
      {week: 'week 3', value: 24},
      {week: 'week 4', value: 18}
    ],
    [
      {week: 'week 1', value: 12},
      {week: 'week 2', value: 19},
      {week: 'week 3', value: 36},
      {week: 'week 4', value: 38}
    ]
  ];

  var chart1 = new dimple.chart(svg4, data1);
  var xAxis = chart1.addCategoryAxis("x", "week");
  var yAxis = chart1.addMeasureAxis("y", "value");
  s1 = chart1.addSeries("Msg", dimple.plot.line);
  s1.data = data1[0];
  s1.plot=dimple.plot.line;
  s2 = chart1.addSeries("Files", dimple.plot.line);
  s2.data = data1[1];
  s2.plot=dimple.plot.line;
    s1.lineWeight = 2;
      s1.lineMarkers = true;
s2.lineWeight = 2;
      s2.lineMarkers = true;
 chart1.addLegend(150, 10, 140, 100, "left");
chart1.ease = "bounce",
    chart1.staggerDraw = "true",
  chart1.draw(1000);


 var svg5 = dimple.newSvg("#loginDetail", 700, 400);
    d3.tsv("../data/login_data.tsv", function (data) {
      var myChart = new dimple.chart(svg5, data);
      myChart.setBounds(70, 30, 600, 300);
      var x = myChart.addCategoryAxis("x", "Date");
      x.addOrderRule("Date");
      myChart.addMeasureAxis("y", "No Of Login");
      var s = myChart.addSeries(null, dimple.plot.line);
      s.lineWeight = 2;
      s.lineMarkers = true;
        myChart.svg.attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 700 400");
      myChart.ease = "bounce";
      myChart.staggerDraw = true;    
      myChart.draw(1000);
    });
*/