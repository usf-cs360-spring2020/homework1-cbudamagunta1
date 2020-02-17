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

let svg = d3.select("body").select("svg#Vis1");
const plot = svg.append("g").attr("id", "plot");

plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let bounds = svg.node().getBoundingClientRect();
let plotWidth = bounds.width - margin.right - margin.left;
let plotHeight = bounds.height - margin.top - margin.bottom;

let countMin = 0;
let countMax = 400000000;


// /* SCALES */
// const scales = {
//   x: d3.scaleLinear(),
//   y: d3.scaleBand()
// }

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
// scales.x.range([0, plotWidth]);
// scales.x.domain(regions);
//
// scales.y.range([plotHeight, 0]);
// scales.y.domain([0, 400000000]);

let xGroup = plot.append("g").attr("id", "x-axis").attr('class', 'axis');
let yGroup = plot.append("g").attr("id", "y-axis").attr('class', 'axis');

// let xAxis = d3.axisBottom(scales.x);
// let yAxis = d3.axisLeft(scales.y);

let xAxis = d3.axisBottom(regionScale);
let yAxis = d3.axisLeft(countScale);


yAxis.ticks(5, 's').tickSizeOuter(0);


xGroup.attr("transform", "translate(0," + plotHeight + ")");
xGroup.call(xAxis);
yGroup.call(yAxis);


/* AXIS TITLES */
// const xMiddle = margin.left + midpoint(scales.x.range());
// const yMiddle = margin.top + midpoint(scales.y.range());

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
  console.log("loaded:", data.length, data[0]);

  const group = plot.append('g').attr('id', 'scatter');

  // const scatter = group.selectAll('circle')
  //   .data(data)
  //   .enter()
  //   .append('circle');
  //
  //   scatter.attr('cx', regionScale(d.region));
  //   scatter.attr('cy', d => countScale(d.passengers));
  //   scatter.attr('r',  1.5);
  //
  //   scatter.style('stroke', 'white');
    //scatter.style('fill', d => scales.fill(d.trend));

    // .attr("cx", function (d) { return x(d.GrLivArea); } )
    //   .attr("cy", function (d) { return y(d.SalePrice); } )
    //   .attr("r", 1.5)
    //   .style("fill", "#69b3a2");

    // scatter.attr("width", regionScale.bandwidth())
    //   .attr("x", d => regionScale(d.region));
    //
    // scatter.attr("y", d => countScale(d.passengers))
    //   .attr("height", d => plotHeight - countScale(d.passengers));
    //
    // scatter.attr("r", d => scales.radiusScale(2))
    //   .style("fill", "#69b3a2");


    // Add dots
  const scatter = group
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return regionScale(d.region); } )
      .attr("cy", function (d) { return countScale(d.passengers); } )
      .attr("r", 5);
      //.style("fill", "#69b3a2");

}

//
//
// /*
// * Draw the Scatter Chart
// */
// let drawScatterChart = function(input) {
//
//   let svg = d3.select("body").select("svg#Vis1");
//
//   let countMin = 0;
//   let countMax = 400000000;
//
//   const width = 960;
//   const height = 500;
//
//   let regions = ["Asia", "Australia/Oceania", "Canada", "Central America",
//     "Europe", "Mexico", "Middle East", "South American", "US"];
//
//   const margin = {
//     top: 15,
//     bottom: 50,
//     left: 65,
//     right: 35
//   };
//
//   let bounds = svg.node().getBoundingClientRect();
//   let plotWidth = bounds.width - margin.right - margin.left;
//   let plotHeight = bounds.height - margin.top - margin.bottom;
//
//   let countScale = d3.scaleLinear()
//     .domain([countMin, countMax])
//     .range([plotHeight, 0])
//     .nice();
//
//   let regionScale = d3.scaleBand()
//     .domain(regions)
//     .rangeRound([0, plotWidth])
//     .paddingInner(0, 1);
//
//   const plot = svg.append("g").attr("id", "plot");
//   plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   let xAxis = d3.axisBottom(regionScale);
//   let yAxis = d3.axisLeft(countScale);
//
//   yAxis.ticks(5, 's').tickSizeOuter(0);
//
//   let xGroup = plot.append("g").attr("id", "x-axis");
//   xGroup.call(xAxis);
//   xGroup.attr("transform", "translate(0," + plotHeight + ")");
//
//   let yGroup = plot.append("g").attr("id", "y-axis");
//   yGroup.call(yAxis);
//
//
//   const xMiddle = margin.left + midpoint(regionScale.range());
//   const yMiddle = margin.top + midpoint(countScale.range());
//
//   const xTitle = svg.append('text')
//     .attr('class', 'axis-title')
//     .text('GEO Region');
//
//   xTitle.attr('x', xMiddle);
//   xTitle.attr('y', height);
//   xTitle.attr('dy', -8);
//   xTitle.attr('text-anchor', 'middle');
//
//
//   const yTitleGroup = svg.append('g');
//   yTitleGroup.attr('transform', translate(4, yMiddle));
//
//   const yTitle = yTitleGroup.append('text')
//     .attr('class', 'axis-title')
//     .text('Passenger Count');
//
//   yTitle.attr('x', 0);
//   yTitle.attr('y', 0);
//
//   yTitle.attr('dy', 15);
//   yTitle.attr('text-anchor', 'middle');
//   yTitle.attr('transform', 'rotate(-90)');
//
//
//
//
//   d3.csv("Air_Traffic_Passenger_Statistics - price.csv", parseData).then(
//     function (data) {
//       console.log("loaded:", data.length, data[0]);
//
//       dataLow = data.filter(row => row.price === "Low Fare");
//       dataOther = data.filter(row => row.price === "Other");
//
//       for (let i = 0; i < dataLow.length; i++) {
//         console.log("loaded low:", dataLow[i]);
//       }
//       for (let j = 0; j < dataOther.length; j++) {
//         console.log("loaded other:", dataOther[j]);
//       }
//
//       // const group = plot.append('g').attr('id', 'points');
//       //
//       // const points = group.selectAll('rect')
//       //     .data(dataLow)
//       //     .enter()
//       //     .append('rect');
//       //
//       // points.attr('cx', d => regionScale(d.region));
//       // points.attr('cy', d => countScale(d.passengers));
//
//
//
//
//       let bars = plot.selectAll("rect")
//         .data(data.entries(), function(d) { return d.region });
//
//        bars.enter()
//         .append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return regionScale(d.region) })
//         .attr("width", regionScale.rangeBand())
//         .attr("y", function(d) { return countScale(d.passengers) })
//         .attr("height", function(d) { return plotHeight - countScale(d.passengers) })
//         .each(function(d, i, nodes) {
//            console.log("Added bar for:", d);
//         });
//
//     }
//   );
// }
//
// /*
// * Draw the Area Chart
// */
// //let drawAreaChart = function() {
//
//
// drawScatterChart();

/*
 * Modeled from convert function in bubble.js example:
 * converts values as necessary and discards unused columns
 */
function parseData(row){
  let keep = {};

  keep.passengers = parseInt(row["Passenger Count"]);
  keep.price = row["Price Category Code"];
  keep.region = row["GEO Region"];

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
