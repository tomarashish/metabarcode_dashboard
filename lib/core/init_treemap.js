 var taxoData;

drawChart();

function drawChart(){
  
    
d3.csv("../data/metagenomics_taxonomy.csv", function(error, data){
    taxoData = data;
});
  
    d3.json("../data/taxonomy_tree.json", function(error, root) {
        var treeData = _.cloneDeep(root.children[0]);  
        var treeChart = treeMap();
                    var sunburstContainer = d3.select("#treemap")
                        .datum(treeData)
                        .call(treeChart);

                    var sunChart = sunburstChart();
                    var sunburstContainer = d3.select("#sunburstChart")
                        .datum(root)
                        .call(sunChart);
        });
    
}//end of drawchart()

d3.select("#reset").on("click", drawChart);

function dataByGroup(data, keyName, name){
    
    var nestedData = d3.nest()
                    .key(function(d){ if(d[keyName] == name){                        
                            return d[keyName];
                        }
                    })
            .map(data); //Using map insted of entries to get an array of objects
    
    return nestedData[name];
}
// displayGroupBar();
//display Group bars
    function displayGroupBar(){
     
        var dataset = [
    [{
        x: 0,
        y: 20 // test with different values
    }],
    [{
        x: 0,
        y: 30 // test with different values
    }],

];
        
     var chart = taxonGroupBar();
        var chartContainer = d3.select("#groupBar")
            .datum(dataset)
            .call(chart);
        
    }