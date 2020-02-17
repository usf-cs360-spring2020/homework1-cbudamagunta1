const width = 960;
const height = 500;

let regions = ["Asia", "Australia / Oceania", "Canada", "Central America",
  "Europe", "Mexico", "Middle East", "South America", "US"];

//To keep sum of passengers per region
let regionDataLow = new Map();
let regionDataOther = new Map();

for (let k = 0; k < regions.length; k++) {
  regionDataLow.set(regions[k], 0);
  regionDataOther.set(regions[k], 0);
}

const margin = {
  top: 15,
  bottom: 50,
  left: 65,
  right: 35
};

let svg = d3.select("body").select("svg#Vis1");
const plot = svg.append("g").attr("id", "plot");

plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* SCALES */

let bounds = svg.node().getBoundingClientRect();
let plotWidth = bounds.width - margin.right - margin.left;
let plotHeight = bounds.height - margin.top - margin.bottom;

let countMin = 0;
let countMax = 400000000;

let countScale = d3.scaleLinear()
    .domain([countMin, countMax])
    .range([plotHeight, 0])
    .nice();

let regionScale = d3.scaleBand()
  .domain(regions)
  .rangeRound([0, plotWidth])
  .paddingInner(0, 1);

let radiusScale = d3.scaleSqrt()
  .range([1,2])
  .domain([0,4000000000]);


/* AXES */

let xGroup = plot.append("g").attr("id", "x-axis").attr('class', 'axis');
let yGroup = plot.append("g").attr("id", "y-axis").attr('class', 'axis');

let xAxis = d3.axisBottom(regionScale);
let yAxis = d3.axisLeft(countScale);

yAxis.ticks(5, 's').tickSizeOuter(0);

xGroup.attr("transform", "translate(0," + plotHeight + ")");
xGroup.call(xAxis);
yGroup.call(yAxis);


/* AXIS TITLES */

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

d3.csv("Air_Traffic_Passenger_Statistics - price.csv", parseData).then(drawScatterChart);

/*
* Draw the Scatter Chart
*/
function drawScatterChart(data) {

  const group = plot.append('g').attr('id', 'scatter');

  // Add scatter dots for low fare
  let pairsLow = Array.from(regionDataLow.entries());

  const scatterLow = group
    .selectAll("dot")
    .data(pairsLow, function(d) { return d[0]; })
    .enter()
    .append("circle")
      .attr("cx", d => regionScale(d[0]))
      .attr("cy", d => countScale(d[1]))
      .attr("width", regionScale.bandwidth())
      .attr("height", d => plotHeight - countScale(d[1]))
      .attr("r", 6)
      .style("fill", "olive");

  // Add scatter dots for other fare
  let pairsOther = Array.from(regionDataOther.entries());

  const scatterOther = group
    .selectAll("dot")
    .data(pairsOther, function(d) { return d[0]; })
    .enter()
    .append("circle")
      .attr("cx", d => regionScale(d[0]))
      .attr("cy", d => countScale(d[1]))
      .attr("width", regionScale.bandwidth())
      .attr("height", d => plotHeight - countScale(d[1]))
      .attr("r", 6)
      .style("fill", "blue");
}

/*
 * Modeled from convert function in bubble.js example:
 * converts values as necessary and discards unused columns
 */
function parseData(row){
  let keep = {};

  keep.passengers = parseInt(row["Passenger Count"]);
  keep.price = row["Price Category Code"];
  keep.region = row["GEO Region"];

  //Low Fare
  if(keep.price === "Low Fare"){
    if(regionDataLow.has(keep.region)){
      regionDataLow.set(keep.region, regionDataLow.get(keep.region) + keep.passengers);
    } else {
      regionDataLow.set(keep.region, keep.passengers);
    }

  //Other
  } else {
    if(regionDataOther.has(keep.region)){
      regionDataOther.set(keep.region, regionDataOther.get(keep.region) + keep.passengers);
    }else {
      regionDataOther.set(keep.region, keep.passengers);
    }
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
