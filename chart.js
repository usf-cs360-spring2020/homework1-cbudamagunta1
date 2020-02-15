//Create the visualization
//Code from in class Letter Count Bar Chart example

/*
* Draw the Scatter Chart
*/
let drawScatterChart = function() {

  let svg = d3.select("body").select("svg#Vis1");

  let countMin = 0;
  let countMax = 400000000; //d3.max(passengers.values());

  const width = 960;
  const height = 500;

  let regions = ["Asia", "Australia/Oceania", "Canada", "Central America",
    "Europe", "Mexico", "Middle East", "South American", "US"];

  const margin = {
    top: 15,
    bottom: 50,
    left: 65,
    right: 35
  };

  let bounds = svg.node().getBoundingClientRect();
  let plotWidth = bounds.width - margin.right - margin.left;
  let plotHeight = bounds.height - margin.top - margin.bottom;

  let countScale = d3.scaleLinear()
    .domain([countMin, countMax])
    .rangeRound([plotHeight, 0])
    .nice();

  let regionScale = d3.scaleBand()
    .domain(regions)
    .rangeRound([0, plotWidth])
    .paddingInner(0, 1);

  const plot = svg.append("g").attr("id", "plot");
  plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let xAxis = d3.axisBottom(regionScale);
  let yAxis = d3.axisLeft(countScale);

  yAxis.ticks(5, 's').tickSizeOuter(0);

  let xGroup = plot.append("g").attr("id", "x-axis");
  xGroup.call(xAxis);
  xGroup.attr("transform", "translate(0," + plotHeight + ")");

  let yGroup = plot.append("g").attr("id", "y-axis");
  yGroup.call(yAxis);


  const xMiddle = margin.left + midpoint(regionScale.range());
  const yMiddle = margin.top + midpoint(countScale.range());

  const xTitle = svg.append('text')
    .attr('class', 'axis-title')
    .text('GEO Region');

  xTitle.attr('x', xMiddle);
  xTitle.attr('y', height);
  xTitle.attr('dy', -8);
  xTitle.attr('text-anchor', 'middle');


  const yTitleGroup = svg.append('g');
  yTitleGroup.attr('transform', translate(4, yMiddle));

  const yTitle = yTitleGroup.append('text')
    .attr('class', 'axis-title')
    .text('Passenger Count');

  yTitle.attr('x', 0);
  yTitle.attr('y', 0);

  yTitle.attr('dy', 15);
  yTitle.attr('text-anchor', 'middle');
  yTitle.attr('transform', 'rotate(-90)');


  d3.csv("Air_Traffic_Passenger_Statistics - price.csv", parseData).then(
    function() {

    }
  )

}

/*
* Draw the Area Chart
*/
//let drawAreaChart = function() {


drawScatterChart();
//drawAreaChart();

/*
 * Modeled from convert function in bubble.js example:
 * converts values as necessary and discards unused columns
 */
function parseData(row){
  let keep = {};

  keep.passengers = row["Passenger Count"];
  keep.price = row["Price Category Code"];
  keep.region = row["GEO Region"];

}

/*
 * From bubble.js example:
 * calculates the midpoint of a range given as a 2 element array
 */
function midpoint(range) {
  return range[0] + (range[1] - range[0]) / 2.0;
}

/*
 * From bubble.js example:
 * returns a translate string for the transform attribute
 */
function translate(x, y) {
  return 'translate(' + String(x) + ',' + String(y) + ')';
}
