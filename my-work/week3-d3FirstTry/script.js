console.log("test");

//create canvas
let viz = d3.select("#viz-container")
    .append("svg")
    .attr("id","viz")
    .attr("width",1000)
    .attr("height",1000)
;


//load json
d3.json("data.json").then(gotData);

// main body color = my mood
function color(datapoint){
  if(datapoint.mood=="Sleepy"){
    return "blue";
  }else if(datapoint.mood=="Tired"){
    return "white";
  }else if (datapoint.mood=="Energetic") {
    return "black";
  }else if (datapoint.mood=="Peaceful") {
    return "yellow";
  }
}

//Stroke color = music type
function getStrokeColor(datapoint){
    if (datapoint.musicType=="Hip-hop") {
      return "brown"
    }else if (datapoint.musicType=="R&B") {
      return "lightblue"
    }else if (datapoint.musicType=="Rock") {
      return "red"
    }else if (datapoint.musicType=="Pop") {
      return "Orange"
    }
  }

function gotData(incomingData){
  console.log(incomingData);

  function xLocation(){
    return Math.random()*750;
  }

// vertical direction top->bottom = morning->night
  function yLocation(datapoint){
    if(datapoint.time=="Morning"){
    return Math.floor(Math.random()*250);
  }else if (datapoint.time=="Noon") {
    return Math.floor(Math.random()*250+250);
  }else if (datapoint.time=="Afternoon") {
    return Math.floor(Math.random()*250+500);
  }else if (datapoint.time=="Night") {
    return Math.floor(Math.random()*250+750);
  }
}


viz.selectAll("circle").data(incomingData).enter()
  .append("circle")
  .attr("cx",xLocation)
  .attr("cy",yLocation)
  .attr("r",40)
  .attr("fill",color)
  .attr("stroke-width",20)
  .attr("stroke",getStrokeColor)

}
