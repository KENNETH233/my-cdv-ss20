let w=2400;
let h=800;
      // morning, noon, afternoon, night
let wrapData = [[],[],[],[]];

let morningSet = [];
let noonSet = [];
let afternoonSet = [];
let nightSet = [];


let viz = d3.select("#container")
  .append("svg")
    .attr("class","viz")
    .attr("width",w)
    .attr("height",h)
    .style("background-color","#B7D7D7")
;

// four time periods
viz.append("rect")
  .attr("x",0)
  .attr("y",0)
  .attr("width",w)
  .attr("height",200)
  .attr("fill","#A88F65")
;

viz.append("rect")
  .attr("x",0)
  .attr("y",200)
  .attr("width",w)
  .attr("height",200)
  .attr("fill","#DDC19C")
;

viz.append("rect")
  .attr("x",0)
  .attr("y",400)
  .attr("width",w)
  .attr("height",200)
  .attr("fill","#B8A285")
;

viz.append("rect")
  .attr("x",0)
  .attr("y",600)
  .attr("width",w)
  .attr("height",200)
  .attr("fill","#977D53")
;

viz.append("text")
  .attr("x",20)
  .attr("y",100)
  .text("Morning")
  .style("font-family","sans-serif")
  .style("font-size",20)
  .style("strokeWeight","bold")
;

viz.append("text")
  .attr("x",20)
  .attr("y",300)
  .text("Noon")
  .style("font-family","sans-serif")
  .style("font-size",20)
  .style("strokeWeight","bold")
;

viz.append("text")
  .attr("x",20)
  .attr("y",500)
  .text("Afternoon")
  .style("font-family","sans-serif")
  .style("font-size",20)
  .style("strokeWeight","bold")
;

viz.append("text")
  .attr("x",20)
  .attr("y",700)
  .text("Night")
  .style("font-family","sans-serif")
  .style("font-size",20)
  .style("strokeWeight","bold")
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
let balcony = `
  <title>balcony</title>
  <polygon class="cls-1" points="0 2.05 10.96 10.55 15.94 9.27 4.98 0.77 0 2.05"/>
  <polygon class="cls-1" points="11.92 1.29 22.87 9.79 27.85 8.5 16.89 0 11.92 1.29"/>
  <polygon class="cls-1" points="29.04 0 24.06 1.29 35.02 9.79 40 8.5 29.04 0"/>`;
let bathroom = `
  <title>bathroom</title>
  <ellipse class="cls-1" cx="5.19" cy="5" rx="5.19" ry="5"/>
  <ellipse class="cls-1" cx="44.81" cy="5" rx="5.19" ry="5"/>
  <ellipse class="cls-1" cx="25" cy="5" rx="5.19" ry="5"/>`;
let bed = `
  <polygon class="cls-1" points="34.21 0 34.21 6.17 0 6.17 0 10 40 10 40 6.17 40 0 34.21 0"/> `;
let livingroom = `
  <title>living</title>
  <polygon class="cls-1" points="46.36 0 46.36 6.7 8.64 6.7 8.64 0 0 0 0 6.7 0 10 55 10 55 6.7 55 0 46.36 0"/>`;



function gotData(incomingData){
  console.log(incomingData);

  // sort out the json data
  for(let i = 0; i < incomingData.length; i++){
    if (incomingData[i].time == "Morning"){
      morningSet.push(incomingData[i]);
    }
    if (incomingData[i].time == "Noon"){
      noonSet.push(incomingData[i]);
    }
    if (incomingData[i].time == "Afternoon"){
      afternoonSet.push(incomingData[i]);
    }
    if (incomingData[i].time == "Night"){
      nightSet.push(incomingData[i]);
    }
  }

  console.log(morningSet);
  console.log(noonSet);
  console.log(afternoonSet);
  console.log(nightSet);


  function findDate(d,i){
    return d.date;
  }
  let minDate = d3.min(incomingData,findDate);
  console.log(minDate);

  let maxDate = d3.max(incomingData,findDate);

  let xScale = d3.scaleTime().domain([minDate,maxDate]).range([30,2000]);

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
      return "translate(-8,-15)";
    }
    if(d.location=="Living room"){
      return "translate(-10,35)";
    }
    if(d.location=="Bed"){
      return "translate(0,35)";
    }
  }

  // translate type graphics
  function translateType(d,i){
    if(d.musicType=="Hip-hop"){
      return "translate(-4,-4)";
    }
    if(d.musicType=="Pop"){
      return "translate(-5,-5)";
    }
    if(d.musicType=="R&B"){
      return "translate(-12,-8)";
    }
    if(d.musicType=="Rock"){
      return "translate(-4,-4)";
    }
  }

  function getDate(d,i){
    return d.date;
  }

  function groupPos(d,i){
    let x = 200+1200/9 * i;
    let y;

    if(d.time=="Morning"){
      y = 100;
    }else if (d.time=="Noon") {
      y = 300;
    }else if (d.time=="Afternoon") {
      y = 500;
    }else if (d.time=="Night") {
      y = 700;
    }

    return "translate("+ x +", "+ y +")"
  }

//Morning
  let morningGroups = viz.selectAll(".morningGroup").data(morningSet).enter()
      .append("g")
        .attr("class","morningGroup")
  ;

  morningGroups.attr("transform",groupPos);
  morningGroups.html(crown);

  let morningType = morningGroups.append('g')
        .attr("class","morningType")

      ;

  let drawMorningType = morningType.html(getMusicType)
      .attr("transform",translateType)
    ;

  let morningLocationGroups = morningGroups.append('g')
        .attr("class","morningLocationGroup")
      ;

  let morningLocation = morningLocationGroups.html(getLocation)
        .attr("transform", locationFeature)
      ;

  morningGroups.append("text")
    .attr("x",0)
    .attr("y",25)
    .attr("fill","white")
    .text(getDate)
    .style("font-family","sans-serif")
    .attr("transform","rotate(90)")
  ;


// noon
let noonGroups = viz.selectAll(".noonGroup").data(noonSet).enter()
    .append("g")
      .attr("class","noonGroup")
;

noonGroups.attr("transform",groupPos);
noonGroups.html(crown);

let noonType = noonGroups.append('g')
      .attr("class","noonType")
    ;

let drawNoonType = noonType.html(getMusicType)
    .attr("transform",translateType)
;

let noonLocationGroups = noonGroups.append('g')
      .attr("class","noonLocationGroup")
    ;

let noonLocation = noonLocationGroups.html(getLocation)
      .attr("transform", locationFeature)
    ;

noonGroups.append("text")
  .attr("x",0)
  .attr("y",25)
  .attr("fill","white")
  .text(getDate)
  .style("font-family","sans-serif")
  .attr("transform","rotate(90)")
;

// afternoon

let afternoonGroups = viz.selectAll(".afternoonGroup").data(afternoonSet).enter()
    .append("g")
      .attr("class","afternoonGroup")
;

afternoonGroups.attr("transform",groupPos);
afternoonGroups.html(crown);

let afternoonType = afternoonGroups.append('g')
      .attr("class","afternoonType")
    ;

let drawAfternoonType = afternoonType.html(getMusicType)
    .attr("transform",translateType)
;

let afternoonLocationGroups = afternoonGroups.append('g')
      .attr("class","afternoonLocationGroup")
    ;

let afternoonLocation = afternoonLocationGroups.html(getLocation)
      .attr("transform", locationFeature)
    ;

afternoonGroups.append("text")
  .attr("x",0)
  .attr("y",25)
  .attr("fill","white")
  .text(getDate)
  .style("font-family","sans-serif")
  .attr("transform","rotate(90)")
;

//night

let nightGroups = viz.selectAll(".nightGroup").data(nightSet).enter()
    .append("g")
      .attr("class","nightGroup")
;

nightGroups.attr("transform",groupPos);
nightGroups.html(crown);

let nightType = nightGroups.append('g')
      .attr("class","nightType")
    ;

let drawNightType = nightType.html(getMusicType)
    .attr("transform",translateType)
;

let nightLocationGroups = nightGroups.append('g')
      .attr("class","nightLocationGroup")
    ;

let nightLocation = nightLocationGroups.html(getLocation)
      .attr("transform", locationFeature)
    ;

nightGroups.append("text")
  .attr("x",0)
  .attr("y",25)
  .attr("fill","white")
  .text(getDate)
  .style("font-family","sans-serif")
  .attr("transform","rotate(90)")
;

//----------------------------------------------------------------------------
//   let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
//     .append("g")
//       .attr("class","datagroup")
//   ;
//
//   datagroups.attr("transform",groupPos);
//
//   datagroups.html(crown);
//
//   let shapeGroup = datagroups.append('g')
//         .attr("class","shapeGroup")
// ;
//
//   let type = shapeGroup.html(getMusicType);
//
//   let locationGroup = datagroups.append('g')
//         .attr("class","locationGroup")
//   ;
//
//   let location = locationGroup.html(getLocation)
//         .attr("transform", locationFeature)
//   ;
// //----------------------------------------------------------------------------
  // datagroups.append("text")
  //   .attr("x",0)
  //   .attr("y",0)
  //   .attr("fill","white")
  //   .text(getDate)
  //   .style("font-family","sans-serif")
  // ;

}









d3.json("data.json").then(gotData);