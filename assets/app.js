// stacked bar chart http://bl.ocks.org/datapixie/5986521

//Input file name display
$("input[id='upload_file']").change(function (e) {
  var $this = $(this);
  $this.next().html($this.val().split('\\').pop());
});

function tryExample() {

  d3.select("#loadFile").style("display", "none");
  d3.select("#pasteUrl").style("display", "none");
  d3.select("#exampleData").style("display", "block");

}

function loadData() {

  d3.select("#pasteUrl").style("display", "none");
  d3.select("#exampleData").style("display", "none");
  d3.select("#loadFile").style("display", "block");

}

function pasteUrl() {

  d3.select("#loadFile").style("display", "none");
  d3.select("#exampleData").style("display", "none");
  d3.select("#pasteUrl").style("display", "block");

}

//file upload 
var raw_data,
  try_example = false,
  upload_file = false,
  upload_url = false;

var reader = new FileReader();

d3.select("#submit_file").on("click", function () {
  //console.log(d3.select("#upload_file")[0][0].files[0])
  reader.readAsText(d3.select("#upload_file")[0][0].files[0]);

  reader.onload = function (event) {
    var raw_data = event.target.result;
    upload_file = true;
    createVisualization(raw_data)
  }

});

function loadExample() {

  d3.csv("data/example_daniel.csv", function (error, data) {
    try_example = true;
    createVisualization(data)
  });

} //end of tryExample()

function createVisualization(taxon_data) {

  // console.log(taxon_data)
  var taxoData;
  if (try_example == true) {
    taxoData = taxon_data;
  }

  if (upload_file == true) {
    taxoData = d3.csv.parse(taxon_data, function (d) {
      return {
        TaxonomyID: d.TaxonomyID,
        TaxonomyName: d.TaxonomyName,
        TaxonomyRank: d.TaxonomyRank
      };
    });
  }

  //if (upload_url == true) {

  //}

  d3.select("#loadData").style("visibility", "hidden").style("display", "none");
  d3.select("#showViz").style("display", "block");


  //var phylumData = dataByGroup(taxoData, "TaxonomyRank", "phylum");
  //var classData = dataByGroup(taxoData, "TaxonomyRank", "class");
  var orderData = groupByTaxon(taxoData, "Order");
  var familyData = groupByTaxon(taxoData, "Family");
  var genusData = groupByTaxon(taxoData, "Genus");
  var speciesData = groupByTaxon(taxoData, "Species");

  //console.log(phylumData)
  //console.log(orderData)
  //console.log(familyData)

  /* var taxonomyBar = taxonomyBarChart();
  var chartContainer = d3.select("#phylumStack")
    .datum(phylumData)
    .call(taxonomyBar);

  var taxocBar = taxonomyBarChart();
  var chartContainer = d3.select("#classStack")
    .datum(classData)
    .call(taxocBar);
*/


  var taxoBar = taxonomyBarChart();
  var chartContainer = d3.select("#orderStack")
    .datum(orderData)
    .call(taxoBar);

  var taxoBar = taxonomyBarChart();
  var chartContainer = d3.select("#familyStack")
    .datum(familyData)
    .call(taxoBar);

  var taxgBar = taxonomyBarChart();
  var chartContainer = d3.select("#genusStack")
    .datum(genusData)
    .call(taxgBar);

  var taxsBar = taxonomyBarChart();
  var chartContainer = d3.select("#speciesStack")
    .datum(speciesData)
    .call(taxsBar);

  /* var taxpDonut = donutChart();
  var donutContainer = d3.select("#phylumDonut")
    .datum(phylumData)
    .call(taxpDonut);

  var taxcDonut = donutChart();
  var donutContainer = d3.select("#classDonut")
    .datum(classData)
    .call(taxcDonut);
*/
  var taxoDonut = donutChart();
  var donutContainer = d3.select("#orderDonut")
    .datum(orderData)
    .call(taxoDonut);

  var taxoDonut = donutChart();
  var donutContainer = d3.select("#familyDonut")
    .datum(familyData)
    .call(taxoDonut);

  var taxgDonut = donutChart();
  var donutContainer = d3.select("#genusDonut")
    .datum(genusData)
    .call(taxgDonut);

  var taxsDonut = donutChart();
  var donutContainer = d3.select("#speciesDonut")
    .datum(speciesData)
    .call(taxsDonut);

}

$(window).scroll(function () {
  if ($(this).scrollTop() >= 200) { // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200); // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200); // Else fade out the arrow
  }
});
$('#return-to-top').click(function () {
  console.log("hiii");
  // When arrow is clicked
  $('body,html').animate({
    scrollTop: 0 // Scroll to top of body
  }, 500);
});

function dataByGroup(data, keyName, name) {

  var nestedData = d3.nest()
    .key(function (d) {
      if (d[keyName] == name) {
        return d[keyName];
      }
    })
    .map(data); //Using map insted of entries to get an array of objects

  return nestedData[name];
}

function groupAsTree(data) {

  var treeData = d3.nest()
    .key(function (d) {
      return d.Order;
    })
    .key(function (d) {
      return d.Family;
    })
    .key(function (d) {
      return d.Genus;
    })
    .key(function (d) {
      return d.Species;
    })
    .entries(data);

  return treeData;
}

function groupByTaxon(data, keyName) {

  // var rootExp = tree(stratify(data));
  //  console.log(rootExp)
  var groupData = d3.nest()
    .key(function (d) {
      return d[keyName];
    })
    .rollup(function (d) {
      //console.log(d)
      return {
        TaxonomyRank: keyName,
        TaxonomyName: d[0][keyName],
        BF11_BR22: Math.round(d3.sum(d, function (e) {
          return +e.Sa04_184_BF11_BR22
        })),
        BR13_BF21: Math.round(d3.sum(d, function (e) {
          return +e.Sa05_155_BR13_BF21
        })),
        BR24_BF13: Math.round(d3.sum(d, function (e) {
          return +e.Sa04_214_BR24_BF13
        })),
        BF11_BR20: Math.round(d3.sum(d, function (e) {
          return +e.Sa04_184_BF11_BR20
        })),
        BF11_BR11: Math.round(d3.sum(d, function (e) {
          return +e.Sa05_5_BF11_BR11
        })),
        BF2B_BR2B: Math.round(d3.sum(d, function (e) {
          return +e.Sa05_65_BF2B_BR2B
        }))
      }
    })
    .map(data);

  var nestedData = d3.entries(groupData).map(function (d) {
    return d.value;
  })

  return nestedData;
}
