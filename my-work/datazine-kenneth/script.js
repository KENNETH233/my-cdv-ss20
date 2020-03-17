let w=2400;
let h=800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class","viz")
    .attr("width",w)
    .attr("height",h)
    .style("background-color","grey")
;

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
      return Math.floor(Math.random()*200+50);
    }else if (datapoint.time=="Noon") {
      return Math.floor(Math.random()*200+200);
    }else if (datapoint.time=="Afternoon") {
      return Math.floor(Math.random()*200+400);
    }else if (datapoint.time=="Night") {
      return Math.floor(Math.random()*200+600);
    }
  }

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


  function getDate(d,i){
    return d.date;
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
    .attr("y",15)
    .attr("fill","white")
    .text(getDate)
    .style("font-family","sans-serif")
  ;

}









d3.json("data.json").then(gotData);
