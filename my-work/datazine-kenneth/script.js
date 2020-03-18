let w=2400;
let h=800;
      // morning, noon, afternoon, night
let wrapData = [[],[],[],[]];


let viz = d3.select("#container")
  .append("svg")
    .attr("class","viz")
    .attr("width",w)
    .attr("height",h)
    .style("background-color","#B7D7D7")
;

// draw three line to divide the window to four time period
viz.append("line")
  .style("stroke","black")
  .attr("x1",0)
  .attr("y1",200)
  .attr("x2",2400)
  .attr("y2",200)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",0)
  .attr("y1",400)
  .attr("x2",2400)
  .attr("y2",400)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",0)
  .attr("y1",600)
  .attr("x2",2400)
  .attr("y2",600)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342)
  .attr("y1",0)
  .attr("x2",342)
  .attr("y2",800)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342*2)
  .attr("y1",0)
  .attr("x2",342*2)
  .attr("y2",800)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342*3)
  .attr("y1",0)
  .attr("x2",342*3)
  .attr("y2",800)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342*4)
  .attr("y1",0)
  .attr("x2",342*4)
  .attr("y2",800)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342*5)
  .attr("y1",0)
  .attr("x2",342*5)
  .attr("y2",800)
;

viz.append("line")
  .style("stroke","black")
  .attr("x1",342*6)
  .attr("y1",0)
  .attr("x2",342*6)
  .attr("y2",800)
;



let crown = `  <defs>
    <style>.cls-1{fill:#fff;stroke:#000;stroke-miterlimit:10;}</style>
  </defs>
  <title>crown</title>
  <polygon class="cls-1" points="2.99 11.62 9.48 25.71 15.81 25.71 15.81 4.74 11.44 15.22 2.99 11.62"/>
  <polygon class="cls-1" points="15.96 4.74 15.96 25.71 22.3 25.71 28.79 11.62 20.33 15.22 15.96 4.74"/>
  <ellipse class="cls-1" cx="1.86" cy="9.89" rx="1.36" ry="1.62"/>
  <path class="cls-1" d="M600,390.46a1.55,1.55,0,1,0-1.28-1.53A1.42,1.42,0,0,0,600,390.46Z" transform="translate(-584.04 -386.9)"/>
  <path class="cls-1" d="M614.18,395.17a1.56,1.56,0,1,0,1.28,1.53A1.42,1.42,0,0,0,614.18,395.17Z" transform="translate(-584.04 -386.9)"/>`

// Svg value of music type
let hiphop = `  <defs>
     <style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px;}</style>
  </defs>
  <title>hiphop</title>
  <polygon class="cls-1" points="11.07 40.95 1.12 20.95 11.16 1 31.16 1.05 41.12 21.06 31.07 41 11.07 40.95"/>`;
let pop = `  <defs>
    <style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px;}</style>
  </defs>
  <title>pop</title>
  <circle class="cls-1" cx="21" cy="21" r="20"/> `;
let rnb = `  <defs>
    <style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px;}</style>
  </defs>
  <title>rnb</title>
  <polygon class="cls-1" points="44.13 42.24 28.27 35.59 12.74 42.79 15.4 28.07 2.46 17.91 19.97 15.46 27.51 1.97 35.66 15.18 53.26 17.02 40.79 27.63 44.13 42.24"/> `;
let rock = `  <defs>
    <style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px;}</style>
  </defs>
  <title>rock</title>
  <rect class="cls-1" x="1" y="1" width="39" height="39"/> `;

// svg value of locatino
let balcony = `  <defs>
    <style>.cls-1{fill:#fbb03b;}</style>
  </defs>
  <title>balcony</title>
  <polygon class="cls-1" points="0 2.05 10.96 10.55 15.94 9.27 4.98 0.77 0 2.05"/>
  <polygon class="cls-1" points="11.92 1.29 22.87 9.79 27.85 8.5 16.89 0 11.92 1.29"/>
  <polygon class="cls-1" points="29.04 0 24.06 1.29 35.02 9.79 40 8.5 29.04 0"/>`;
let bathroom = `   <defs>
    <style>.cls-1{fill:#29abe2;}</style>
  </defs>
  <title>bathroom</title>
  <ellipse class="cls-1" cx="5.19" cy="5" rx="5.19" ry="5"/>
  <ellipse class="cls-1" cx="44.81" cy="5" rx="5.19" ry="5"/>
  <ellipse class="cls-1" cx="25" cy="5" rx="5.19" ry="5"/>`;
let bed = `  <defs>
    <style>.cls-1{fill:#8c6239;}</style>
  </defs>
  <title>bed</title>
  <polygon class="cls-1" points="34.21 0 34.21 6.17 0 6.17 0 10 40 10 40 6.17 40 0 34.21 0"/> `;
let livingroom = `  <defs>
    <style>.cls-1{fill:#ccc;}</style>
  </defs>
  <title>living</title>
  <polygon class="cls-1" points="46.36 0 46.36 6.7 8.64 6.7 8.64 0 0 0 0 6.7 0 10 55 10 55 6.7 55 0 46.36 0"/>`;

function gotData(incomingData){
  console.log(incomingData);

  // sort out the json data
  for(let i = 0; i < incomingData.length; i++){
    if (incomingData[i].time == "Morning"){
      wrapData[0].push(incomingData[i]);
    }
    if (incomingData[i].time == "Noon"){
      wrapData[1].push(incomingData[i]);
    }
    if (incomingData[i].time == "Afternoon"){
      wrapData[2].push(incomingData[i]);
    }
    if (incomingData[i].time == "Night"){
      wrapData[3].push(incomingData[i]);
    }
  }

  console.log(wrapData);

  // main body color = my mood
  function color(d,i){
    if(d.mood=="Sleepy"){
      return "blue";
    }else if(d.mood=="Tired"){
      return "white";
    }else if (d.mood=="Energetic") {
      return "black";
    }else if (d.mood=="Peaceful") {
      return "yellow";
    }
  }

  // musicType
  function getMusicType(d,i){
    if (d.musicType=="Hip-hop") {
      return hiphop;
    }
    else if (d.musicType=="R&B") {
      return rnb;
    }
    else if (d.musicType=="Rock") {
      return rock;
    }
    else if (d.musicType=="Pop") {
      return pop;
    }
  }

  // location
  function getLocation(d,i){
    if (d.location=="Bed") {
      return bed;
    }else if (d.location=="Balcony") {
      return balcony;
    }else if (d.location=="Bathroom") {
      return bathroom;
    }else if (d.location=="Living room") {
      return livingroom;
    }
  }

  // location feature's location
  function locationFeature(d,i){
    if(d.location=="Balcony"){
      return "translate(5,-50)";
    }
    if(d.location=="Bathroom"){
      return "translate(-3,-15)";
    }
    if(d.location=="Living room"){
      return "translate(-6,36)";
    }
    if(d.location=="Bed"){
      return "translate(6,40)";
    }
  }

  function getDate(d,i){
    return d.date;
  }

  function groupPos(d,i){
    let x;
    let y;

    let distribution = Math.floor(Math.random()*90);

    if(d.date==2.24){
      x = 128+distribution;
    }else if(d.date==2.25){
      x = 128*3+distribution;
    }else if(d.date==2.26){
      x = 128*6+distribution;
    }else if(d.date==2.27){
      x = 128*9+distribution;
    }else if(d.date==2.28){
      x = 128*12+distribution;
    }else if(d.date==2.29){
      x = 128*15+distribution;
    }else if(d.date==3.1){
      x = 120*18+distribution;
    }

    if(d.time=="Morning"){
      y = Math.floor(Math.random()*100+20);
    }else if (d.time=="Noon") {
      y = Math.floor(Math.random()*100+200);
    }else if (d.time=="Afternoon") {
      y = Math.floor(Math.random()*100+400);
    }else if (d.time=="Night") {
      y = Math.floor(Math.random()*100+600);
    }

    return "translate("+ x +", "+ y +")"
  }


  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup")
  ;

  datagroups.attr("transform",groupPos);

  datagroups.html(crown);

  let shapeGroup = datagroups.append('g')
        .attr("class","shapeGroup")
;

  let type = shapeGroup.html(getMusicType);

  let locationGroup = datagroups.append('g')
        .attr("class","locationGroup")
  ;

  let location = locationGroup.html(getLocation)
        .attr("transform", locationFeature)
  ;

  datagroups.append("text")
    .attr("x",0)
    .attr("y",0)
    .attr("fill","white")
    .text(getDate)
    .style("font-family","sans-serif")
  ;

}









d3.json("data.json").then(gotData);
