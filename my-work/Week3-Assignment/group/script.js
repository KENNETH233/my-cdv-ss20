console.log("test");

//create canvas
let viz = d3.select("#viz-container")
    .append("svg")
    .attr("id","viz")
    .attr("width",2400)
    .attr("height",1200)
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

  function xLocation(datapoint){
    if(datapoint.date==2.24){
      return 128;
    }else if(datapoint.date==2.25){
      return 128*3;
    }else if(datapoint.date==2.26){
      return 128*6;
    }else if(datapoint.date==2.27){
      return 128*9;
    }else if(datapoint.date==2.28){
      return 128*12;
    }else if(datapoint.date==2.29){
      return 128*15;
    }else if(datapoint.date==3.1){
      return 128*18;
    }
  }

// vertical direction top->bottom = morning->night
  function yLocation(datapoint){
    if(datapoint.time=="Morning"){
    return Math.floor(Math.random()*300+100);
  }else if (datapoint.time=="Noon") {
    return Math.floor(Math.random()*300+300);
  }else if (datapoint.time=="Afternoon") {
    return Math.floor(Math.random()*300+600);
  }else if (datapoint.time=="Night") {
    return Math.floor(Math.random()*300+900);
  }
}

  function getDate(datapoint){
    if(datapoint.date==2.24){
      return "2.24";
    }else if(datapoint.date==2.25){
      return "2.25";
    }else if(datapoint.date==2.26){
      return "2.26";
    }else if(datapoint.date==2.27){
      return "2.27";
    }else if(datapoint.date==2.28){
      return "2.28";
    }else if(datapoint.date==2.29){
      return "2.29";
    }else if(datapoint.date==3.1){
      return "3.1";
    }
  }

let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class","datagroup")
;

datagroups.append("circle")
  .attr("cx",xLocation)
  .attr("cy",yLocation)
  .attr("r",20)
  .attr("fill",color)
  .attr("stroke-width",10)
  .attr("stroke",getStrokeColor)
;

datagroups.append("text")
  .attr("x",xLocation)
  .attr("y",50)
  .attr("fill","white")
  .text(gotDate)
;
// viz.selectAll("circle").data(incomingData).enter()
//   .append("circle")
//   .attr("cx",xLocation)
//   .attr("cy",yLocation)
//   .attr("r",40)
//   .attr("fill",color)
//   .attr("stroke-width",20)
//   .attr("stroke",getStrokeColor)

}
