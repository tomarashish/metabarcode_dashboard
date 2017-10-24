function dataByGroup(data, keyName, name){
    
    var nestedData = d3.nest()
                    .key(function(d){ if(d[keyName] == name){                        
                            return d[keyName];
                        }
                    })
            .map(data); //Using map insted of entries to get an array of objects
    
    return nestedData[name];
}

var taxoData;

d3.csv("../data/metagenomics_taxonomy.csv", function(error, data){
    
    taxoData = data;
    $('#taxonLevel').text("Taxonomy Level : Phylum");
    var taxonData = dataByGroup(taxoData,"TaxonomyRank","phylum");
    
    var taxonomyBar = taxonomyBarChart();
    var chartContainer = d3.select("#phylumStack")
        .datum(taxonData)
        .call(taxonomyBar);
    
    var taxonDonut = donutChart();
    var donutContainer = d3.select("#phylumDonut")
        .datum(taxonData)
        .call(taxonDonut);

  });


var bDonut = progressDonut();
var bContainer = d3.select("#chart1")
                .datum(98)
                .call(bDonut);
var vContainer = d3.select("#chart2")
                .datum(2)
                .call(bDonut);

var uContainer = d3.select("#chart3")
                .datum(0)
                .call(bDonut);
    
    
$("#selectTaxon").on("click", "li a", function() {
    console.log(this);
     var taxonName = $(this).text();
    $('#taxonLevel').text("Taxonomy Level : " + taxonName);
    
    var taxonData = dataByGroup(taxoData,"TaxonomyRank", taxonName.toLowerCase());
    
    var taxonomyBar = taxonomyBarChart();
    var chartContainer = d3.select("#phylumStack")
        .datum(taxonData)
        .call(taxonomyBar);
    
    var taxonDonut = donutChart();
    var donutContainer = d3.select("#phylumDonut")
        .datum(taxonData)
        .call(taxonDonut);
});    

/* d3.json("../data/taxonomy_tree.json", function(error, root) {
     
                    var sunChart = sunburstChart();
                    var sunburstContainer = d3.select("#sunburstChart")
                        .datum(root)
                        .call(sunChart);
        });
    
*/
