// stacked bar chart http://bl.ocks.org/datapixie/5986521

d3.csv("../data/metagenomics_taxonomy.csv", function (error, data) {

  var taxoData = data;

  var phylumData = dataByGroup(taxoData, "TaxonomyRank", "phylum");
  var classData = dataByGroup(taxoData, "TaxonomyRank", "class");
  var orderData = dataByGroup(taxoData, "TaxonomyRank", "order");
  var genusData = dataByGroup(taxoData, "TaxonomyRank", "genus");
  var speciesData = dataByGroup(taxoData, "TaxonomyRank", "species");

  var taxonomyBar = taxonomyBarChart();
  var chartContainer = d3.select("#phylumStack")
    .datum(phylumData)
    .call(taxonomyBar);

  var taxocBar = taxonomyBarChart();
  var chartContainer = d3.select("#classStack")
    .datum(classData)
    .call(taxocBar);

  var taxoBar = taxonomyBarChart();
  var chartContainer = d3.select("#orderStack")
    .datum(orderData)
    .call(taxoBar);

  var taxgBar = taxonomyBarChart();
  var chartContainer = d3.select("#genusStack")
    .datum(genusData)
    .call(taxgBar);

  var taxsBar = taxonomyBarChart();
  var chartContainer = d3.select("#speciesStack")
    .datum(speciesData)
    .call(taxsBar);

  var taxpDonut = donutChart();
  var donutContainer = d3.select("#phylumDonut")
    .datum(phylumData)
    .call(taxpDonut);

  var taxcDonut = donutChart();
  var donutContainer = d3.select("#classDonut")
    .datum(classData)
    .call(taxcDonut);

  var taxoDonut = donutChart();
  var donutContainer = d3.select("#orderDonut")
    .datum(orderData)
    .call(taxoDonut);

  var taxgDonut = donutChart();
  var donutContainer = d3.select("#genusDonut")
    .datum(genusData)
    .call(taxgDonut);

  var taxsDonut = donutChart();
  var donutContainer = d3.select("#speciesDonut")
    .datum(speciesData)
    .call(taxsDonut);

});

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

function groupByEntries(data, keyName) {

  var groupData = d3.nest()
    .key(function (d) {
      return d[keyName];
    })
    .entries(data);
  return groupData;
}
