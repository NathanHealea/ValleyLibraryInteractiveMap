var d3 = require("d3")

var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.xml("floor6N.svg", "image/svg+xml", function(xml) {
    var floor = svg.selectAll("item").data("1").enter().append("g").attr("class", "item").attr("transform", function(d,i){
        return "scale(0.5)";
    })

    
  var importedNode = document.importNode(xml.documentElement, true);
  
  d3.select(".item")[0][0].appendChild(importedNode.cloneNode(true));

});

//example https://bl.ocks.org/jhellier/fb4772b5ca6f2a5ee51a