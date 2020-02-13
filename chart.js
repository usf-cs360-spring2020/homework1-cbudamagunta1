//Create the visualization
//Code from in class Letter Count Bar Chart example



//x-axis is months
//y-axis is passenger amount

let drawBarChart = function(data) {

  let svg = d3.select("body").select("svg#Vis1");

  let passengers = parseData(data);

  let countMin = 0;
  let countMax = d3.max(passengers.values());

}
