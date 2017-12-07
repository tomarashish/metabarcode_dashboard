//csv to tree data using d3 functions
//https://stackoverflow.com/questions/17416186/d3-nest-key-and-values-conversion-to-name-and-children?rq=1


function groupAsTree(data) {

  var treeData = {
    "key": "Root",
    "values": d3.nest()
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
      .entries(data)
  };
  return treeData;
}

d3.csv("data/example_daniel.csv", function (error, taxoData) {
  //console.log(JSON.stringify(groupAsTree(taxoData)));
  console.log(groupAsTree(taxoData));

  var treeview = treeView();
  //var treeview = sunburstD3();

  var chartContainer = d3.select("#treeView")
    .datum(groupAsTree(taxoData))
    .call(treeview);

});
