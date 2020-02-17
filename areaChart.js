// let regions = ["Asia", "Australia / Oceania", "Canada", "Central America",
//   "Europe", "Mexico", "Middle East", "South America", "US"];

let passengerMap = new Map();
for (let m = 0; m < regions.length; m++) {
  passengerMap.set(regions[m], 0);
}

let svg2 = d3.select("body").select("svg#Vis2");
const plot2 = svg.append("g").attr("id", "plot2");

plot2.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* SCALES */

let bounds2 = svg2.node().getBoundingClientRect();
let plotWidth2 = bounds2.width - margin.right - margin.left;
let plotHeight2 = bounds2.height - margin.top - margin.bottom;

let countMin2 = 0;
let countMax2 = 30000000;

let countScale2 = d3.scaleLinear()
    .domain([countMin2, countMax2])
    .range([plotHeight2, 0])
    .nice();

let regionScale2 = d3.scaleBand()
  .domain(regions)
  .rangeRound([0, plotWidth2])
  .paddingInner(0.1);


/* AXES */

let xGroup2 = plot2.append("g").attr("id", "x-axis").attr('class', 'axis');
let yGroup2 = plot2.append("g").attr("id", "y-axis").attr('class', 'axis');

let xAxis2 = d3.axisBottom(regionScale2);
let yAxis2 = d3.axisLeft(countScale2);

yAxis2.ticks(7, 's').tickSizeOuter(0);

xGroup2.attr("transform", "translate(0," + plotHeight2 + ")");
xGroup2.call(xAxis2);
yGroup2.call(yAxis2);

const gridAxis2 = d3.axisLeft(countScale2).tickSize(-plotWidth2).tickFormat('').ticks(5);
let gridGroup2 = plot2.append("g").attr("id", "grid-axis")
  .attr('class', 'axis')
  .call(gridAxis2);


/* AXIS TITLES */

const xMiddle2 = margin.left + midpoint(regionScale2.range());
const yMiddle2 = margin.top + midpoint(countScale2.range());

const xTitle2 = svg2.append('text')
  .attr('class', 'axis-title')
  .text('GEO Region');

xTitle2.attr('x', xMiddle2);
xTitle2.attr('y', 30);
xTitle2.attr('dy', -8);
xTitle2.attr('text-anchor', 'middle');

const yTitleGroup2 = svg2.append('g');
yTitleGroup2.attr('transform', translate(4, yMiddle2));

const yTitle2 = yTitleGroup2.append('text')
  .attr('class', 'axis-title')
  .text('Passenger Count');

yTitle2.attr('x', 0);
yTitle2.attr('y', 0);

yTitle2.attr('dy', 15);
yTitle2.attr('text-anchor', 'middle');
yTitle2.attr('transform', 'rotate(-90)');


/* LOAD THE DATA */
d3.csv("Air_Traffic_Passenger_Statistics - region - people.csv", parseAreaData).then(drawAreaChart);

/*
* Draw the Scatter Chart
*/
function drawAreaChart(data) {

  // const group = plot2.append('g').attr('id', 'area');
  //
  // // Add scatter dots for low fare
  // let areaPairs = Array.from(passengerMap.entries());
  //
  // let bars = plot2.selectAll("rect")
  //     .data(areaPairs, function(d) { return d[0]; });
  //
  //   bars.enter().append("rect")
  //     .attr("class", "bar")
  //     .attr("width", regionScale2.bandwidth())
  //     .attr("x", d => regionScale2(d[0]))
  //     .attr("y", d => countScale2(d[1]))
  //     .attr("height", d => plotHeight2 - countScale2(d[1]));

}

/*
 * Modeled from convert function in bubble.js example:
 * converts values as necessary and discards unused columns
 */
function parseAreaData(row){
  let keep = {};

  keep.passengers = parseInt(row["Passenger Count"]);
  keep.region = row["GEO Region"];

  if(passengerMap.has(keep.region)){
    passengerMap.set(keep.region, passengerMap.get(keep.region) + keep.passengers);
  } else {
    passengerMap.set(keep.region, keep.passengers);
  }

  return keep;
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
