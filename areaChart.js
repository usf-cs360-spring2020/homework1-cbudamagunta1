/* ONLY UPDATE WHAT IS NOT REPEATED FROM SCATTERCHART.JS */

let passengerCount = new Map();

for (let m = 0; m < regions.length; m++) {
  passengerCount.set(regions[m], 0);
}

let svgArea = d3.select("body").select("svg#Vis2");
const plotArea = svgArea.append("g").attr("id", "plotArea");

plotArea.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* SCALES */

let countMinArea = 0;
let countMaxArea = 32000000;

let countScaleArea = d3.scaleLinear()
    .domain([countMinArea, countMaxArea])
    .range([plotHeight, 0])
    .nice();


/* AXES */

let xGroupArea = plotArea.append("g").attr("id", "x-axis").attr('class', 'axis');
let yGroupArea = plotArea.append("g").attr("id", "y-axis").attr('class', 'axis');

let xAxisArea = d3.axisBottom(regionScale);
let yAxisArea = d3.axisLeft(countScaleArea);

yAxisArea.ticks(7, 's').tickSizeOuter(0);

xGroupArea.attr("transform", "translate(0," + plotHeight + ")");
xGroupArea.call(xAxisArea);
yGroupArea.call(yAxisArea);

const gridAxisArea = d3.axisLeft(countScaleArea).tickSize(-plotWidth).tickFormat('').ticks(5);
let gridGroupArea = plotArea.append("g").attr("id", "grid-axis")
  .attr('class', 'axis')
  .call(gridAxisArea);


/* AXIS TITLES */

const yMiddleArea = margin.top + midpoint(countScaleArea.range());

const xTitleArea = svgArea.append('text')
  .attr('class', 'axis-title')
  .text('GEO Region');

xTitleArea.attr('x', xMiddle);
xTitleArea.attr('y', 30);
xTitleArea.attr('dy', -8);
xTitleArea.attr('text-anchor', 'middle');

const yTitleGroupArea = svgArea.append('g');
yTitleGroupArea.attr('transform', translate(4, yMiddleArea));

const yTitleArea = yTitleGroupArea.append('text')
  .attr('class', 'axis-title')
  .text('Passenger Count');

yTitleArea.attr('x', 0);
yTitleArea.attr('y', 0);

yTitleArea.attr('dy', 15);
yTitleArea.attr('text-anchor', 'middle');
yTitleArea.attr('transform', 'rotate(-90)');


/* LOAD THE DATA */
d3.csv("Air_Traffic_Passenger_Statistics - region - people.csv", parseAreaData).then(drawAreaChart);


/*
* Draw the Area Chart
*/
function drawAreaChart(data) {

  const groupArea = plotArea.append('g').attr('id', 'area');

  // Add scatter dots for low fare
  let pairs = Array.from(passengerCount.entries());

  const areaPoints = groupArea
    .datum(pairs)
    .append("path")
      .attr("d", d3.area()
        .x(function(d) {
          console.log(d[0]);
          return (regionScale(d[0]) + (regionScale.bandwidth() / 2)) })
        .y1(function(d) {
          console.log(d[1]);
          return countScaleArea(d[1]) })
        .y0(countScaleArea(0))
      )
      .style("fill", "dd9db3");
}


/*
 * Modeled from convert function in bubble.js example:
 * converts values as necessary and discards unused columns
 */
function parseAreaData(row){
  let keep = {};

  keep.passengers = parseInt(row["Passenger Count"]);
  keep.region = row["GEO Region"];

  if(passengerCount.has(keep.region)){
    passengerCount.set(keep.region, passengerCount.get(keep.region) + keep.passengers);
  } else {
    passengerCount.set(keep.region, keep.passengers);
  }

  return keep;
}
