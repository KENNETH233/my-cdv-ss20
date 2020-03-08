let viz=d3.select("#viz-container")
.append("svg")
.attr("id","viz")
.attr("width",600)
.attr("height",400)
.style("background-color","lavender")
;

function randomX(){
  return Math.random()*600;
}

function randomY(){
  return Math.random()*400;
}

function gotData(incomingData){

  // viz.selectAll(".food").data(incomingData).enter()
  //   .append("rect")
  //     .attr("x",randomX)
  //     .attr("y",randomY)
  //     .attr("width",20)
  //     .attr("height",20)
  //     .attr("fill","black")
  //     .attr("class","food")
  // ;
  //
  // viz.selectAll(".foodtext").data(incomingData).enter()
  //   .append("text")
  //     .attr("x",randomX)
  //     .attr("y",randomY)
  //     .text("food")
  //     .attr("fill","red")
  //     .attr("class","foodtext")
  // ;

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup")
  ;

  datagroups.append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",21)
  ;

  datagroups.append("text")
    .attr("x",0)
    .attr("y",0)
    .attr("fill","red")
    .text("Hello")
  console.log(datagroups);
}

d3.json("data.json").then(gotData)
