//csv to tree data using d3 functions
//https://stackoverflow.com/questions/17416186/d3-nest-key-and-values-conversion-to-name-and-children?rq=1
var chartObj = [];

function getTaxonLevels(csv_data) {
  var keys = [];
  //if (csv_data[0]["Family"])

  if ("Kingdom" in csv_data[0])
    keys.push("Kingdom")

  if ("Phylum" in csv_data[0])
    keys.push("Phylum")

  if ("Class" in csv_data[0])
    keys.push("Class")

  if ("Order" in csv_data[0])
    keys.push("Order")

  if ("Family" in csv_data[0])
    keys.push("Family")

  if ("Genus" in csv_data[0])
    keys.push("Genus")

  if ("Species" in csv_data[0])
    keys.push("Species")

  return keys;
}

function groupAsTree(data, taxonLevels) {

  var nest = d3.nest();
  var treeData;

  taxonLevels.forEach(function (k) {
    treeData = nest.key(function (d) {
      return d[k];
    })
    /*
          .rollup(function (d) {
            return d3.sum(d, function (d) {
              return +d.Sa05_155_BR13_BF21;
            });
          });*/
  });


  var root = {
    "key": "root",
    "values": treeData.entries(data) //compute the nest
  }

  console.log(root);
  return root;
}
d3.csv("data/example_daniel.csv", function (error, taxoData) {

  //console.log(JSON.stringify(groupAsTree(taxoData)));
  //console.log(groupAsTree(taxoData));

  var taxonKeys = getTaxonLevels(taxoData);
  //var treeview = treeView();
  var treeview = sunburstD3();

  var chartContainer = d3.select("#treeView")
    .datum(groupAsTree(taxoData, taxonKeys))
    .call(treeview);

});

/*var root = {
  "key": "root",
  "values": d3.nest()
  for (var i = 0; i < taxonLevels.length; i++) {
    .key(function (d) {
      return d[taxonLevels[i]]
    })
  }
  .entries(data)
}
*/
