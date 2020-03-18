let w=2400;
let h=800;

let wrapData = [[],[],[],[]];

let viz = d3.select("#container")
  .append("svg")
    .attr("class","viz")
    .attr("width",w)
    .attr("height",h)
    .style("background-color","#B7D7D7")
;

// Svg value of music type
let hiphop = `  <defs>
    <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
  </defs>
  <title>hiphop</title>
  <polygon class="cls-1" points="11.47 24.51 21.52 50.42 31.34 50.42 31.34 11.89 24.56 31.15 11.47 24.51"/>
  <polygon class="cls-1" points="31.58 11.89 31.58 50.42 41.4 50.42 51.46 24.51 38.36 31.15 31.58 11.89"/>
  <ellipse class="cls-1" cx="9.71" cy="21.35" rx="2.1" ry="2.99"/>
  <ellipse class="cls-1" cx="31.58" cy="6.91" rx="1.99" ry="2.82"/>
  <ellipse class="cls-1" cx="53.56" cy="21.19" rx="1.99" ry="2.82"/>
  <polygon class="cls-2" points="16.05 60.92 1.12 30.92 16.18 1 46.18 1.08 61.12 31.09 46.05 61 16.05 60.92"/>`;
let pop = `    <defs>
    <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
  </defs>
  <title>pop</title>
  <polygon class="cls-1" points="10.03 24.8 20.62 48.47 30.97 48.47 30.97 13.27 23.82 30.86 10.03 24.8"/>
  <polygon class="cls-1" points="31.22 13.27 31.22 48.47 41.56 48.47 52.16 24.8 38.36 30.86 31.22 13.27"/>
  <ellipse class="cls-1" cx="8.18" cy="21.91" rx="2.22" ry="2.73"/>
  <ellipse class="cls-1" cx="31.22" cy="8.71" rx="2.09" ry="2.58"/>
  <ellipse class="cls-1" cx="54.37" cy="21.76" rx="2.09" ry="2.58"/>
  <circle class="cls-2" cx="31" cy="31" r="30"/>`;
let rnb = `    <defs>
    <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
  </defs><title>R&amp;amp;B</title>
  <polygon class="cls-1" points="20.01 29.24 27.93 46.92 35.65 46.92 35.65 20.63 30.32 33.77 20.01 29.24"/>
  <polygon class="cls-1" points="35.84 20.63 35.84 46.92 43.56 46.92 51.48 29.24 41.17 33.77 35.84 20.63"/>
  <ellipse class="cls-1" cx="18.63" cy="27.09" rx="1.66" ry="2.04"/>
  <ellipse class="cls-1" cx="35.84" cy="17.23" rx="1.56" ry="1.93"/>
  <ellipse class="cls-1" cx="53.13" cy="26.97" rx="1.56" ry="1.93"/>
  <polygon class="cls-2" points="56.05 61.37 35.57 51.59 15.5 62.18 18.94 40.54 2.23 25.6 24.84 22 34.58 2.18 45.11 21.59 67.84 24.29 51.74 39.89 56.05 61.37"/>`;
let rock = `    <defs>
    <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
  </defs>
  <title>Rock</title>
  <polygon class="cls-1" points="9.25 26.9 17.63 44.35 25.81 44.35 25.81 18.39 20.16 31.37 9.25 26.9"/>
  <polygon class="cls-1" points="26 18.39 26 44.35 34.18 44.35 42.56 26.9 31.64 31.37 26 18.39"/>
  <ellipse class="cls-1" cx="7.79" cy="24.77" rx="1.75" ry="2.01"/>
  <ellipse class="cls-1" cx="26" cy="15.04" rx="1.65" ry="1.9"/>
  <ellipse class="cls-1" cx="44.31" cy="24.66" rx="1.65" ry="1.9"/>
  <rect class="cls-2" x="1" y="1" width="50" height="60"/>`;

// svg value of locatino
let balcony = `  <defs>
    <style>.cls-1{fill:#fbb03b;}</style>
  </defs>
  <title>balcony</title>
  <polygon class="cls-1" points="0 4 16.44 20.55 23.91 18.05 7.47 1.5 0 4"/>
  <polygon class="cls-1" points="17.88 2.51 34.31 19.06 41.78 16.55 25.34 0 17.88 2.51"/>
  <polygon class="cls-1" points="43.56 0 36.09 2.51 52.53 19.06 60 16.55 43.56 0"/>`;
let bathroom = `  <defs>
    <style>.cls-1{fill:#29abe2;}</style>
  </defs>
  <title>bathroom</title>
  <ellipse class="cls-1" cx="6.23" cy="7.5" rx="6.23" ry="7.5"/>
  <ellipse class="cls-1" cx="53.77" cy="7.5" rx="6.23" ry="7.5"/>
  <ellipse class="cls-1" cx="30" cy="7.5" rx="6.23" ry="7.5"/>`;
let bed = `  <defs>
    <style>.cls-1{fill:#8c6239;}</style>
  </defs>
  <title>bed</title>
  <polygon class="cls-1" points="51.32 0 51.32 18.52 0 18.52 0 30 60 30 60 18.52 60 0 51.32 0"/>`;
let livingroom = `  <defs>
    <style>.cls-1{fill:#ccc;}</style>
  </defs>
  <title>livingroom</title>
  <polygon class="cls-1" points="67.43 0 67.43 26.78 12.57 26.78 12.57 0 0 0 0 26.78 0 40 80 40 80 26.78 80 0 67.43 0"/>`;

function gotData(incomingData){
  console.log(incomingData);


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
      return `  <defs>
          <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
        </defs>
        <title>hiphop</title>
        <polygon class="cls-1" points="11.47 24.51 21.52 50.42 31.34 50.42 31.34 11.89 24.56 31.15 11.47 24.51"/>
        <polygon class="cls-1" points="31.58 11.89 31.58 50.42 41.4 50.42 51.46 24.51 38.36 31.15 31.58 11.89"/>
        <ellipse class="cls-1" cx="9.71" cy="21.35" rx="2.1" ry="2.99"/>
        <ellipse class="cls-1" cx="31.58" cy="6.91" rx="1.99" ry="2.82"/>
        <ellipse class="cls-1" cx="53.56" cy="21.19" rx="1.99" ry="2.82"/>
        <polygon class="cls-2" points="16.05 60.92 1.12 30.92 16.18 1 46.18 1.08 61.12 31.09 46.05 61 16.05 60.92"/>`;
    }
    else if (d.musicType=="R&B") {
      return `    <defs>
          <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
        </defs><title>R&amp;amp;B</title>
        <polygon class="cls-1" points="20.01 29.24 27.93 46.92 35.65 46.92 35.65 20.63 30.32 33.77 20.01 29.24"/>
        <polygon class="cls-1" points="35.84 20.63 35.84 46.92 43.56 46.92 51.48 29.24 41.17 33.77 35.84 20.63"/>
        <ellipse class="cls-1" cx="18.63" cy="27.09" rx="1.66" ry="2.04"/>
        <ellipse class="cls-1" cx="35.84" cy="17.23" rx="1.56" ry="1.93"/>
        <ellipse class="cls-1" cx="53.13" cy="26.97" rx="1.56" ry="1.93"/>
        <polygon class="cls-2" points="56.05 61.37 35.57 51.59 15.5 62.18 18.94 40.54 2.23 25.6 24.84 22 34.58 2.18 45.11 21.59 67.84 24.29 51.74 39.89 56.05 61.37"/>`;
    }
    else if (d.musicType=="Rock") {
      return `    <defs>
          <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
        </defs>
        <title>Rock</title>
        <polygon class="cls-1" points="9.25 26.9 17.63 44.35 25.81 44.35 25.81 18.39 20.16 31.37 9.25 26.9"/>
        <polygon class="cls-1" points="26 18.39 26 44.35 34.18 44.35 42.56 26.9 31.64 31.37 26 18.39"/>
        <ellipse class="cls-1" cx="7.79" cy="24.77" rx="1.75" ry="2.01"/>
        <ellipse class="cls-1" cx="26" cy="15.04" rx="1.65" ry="1.9"/>
        <ellipse class="cls-1" cx="44.31" cy="24.66" rx="1.65" ry="1.9"/>
        <rect class="cls-2" x="1" y="1" width="50" height="60"/>`;
    }
    else if (d.musicType=="Pop") {
      return `    <defs>
          <style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#000;stroke-miterlimit:10;}.cls-2{fill:none;stroke-width:2px;}</style>
        </defs>
        <title>pop</title>
        <polygon class="cls-1" points="10.03 24.8 20.62 48.47 30.97 48.47 30.97 13.27 23.82 30.86 10.03 24.8"/>
        <polygon class="cls-1" points="31.22 13.27 31.22 48.47 41.56 48.47 52.16 24.8 38.36 30.86 31.22 13.27"/>
        <ellipse class="cls-1" cx="8.18" cy="21.91" rx="2.22" ry="2.73"/>
        <ellipse class="cls-1" cx="31.22" cy="8.71" rx="2.09" ry="2.58"/>
        <ellipse class="cls-1" cx="54.37" cy="21.76" rx="2.09" ry="2.58"/>
        <circle class="cls-2" cx="31" cy="31" r="30"/>`;
    }
  }

  // location
  function getLocation(d,i){
    if (d.location=="Bed") {
      return `  <defs>
          <style>.cls-1{fill:#8c6239;}</style>
        </defs>
        <title>bed</title>
        <polygon class="cls-1" points="51.32 0 51.32 18.52 0 18.52 0 30 60 30 60 18.52 60 0 51.32 0"/>`;
    }else if (d.location=="Balcony") {
      return `  <defs>
          <style>.cls-1{fill:#fbb03b;}</style>
        </defs>
        <title>balcony</title>
        <polygon class="cls-1" points="0 4 16.44 20.55 23.91 18.05 7.47 1.5 0 4"/>
        <polygon class="cls-1" points="17.88 2.51 34.31 19.06 41.78 16.55 25.34 0 17.88 2.51"/>
        <polygon class="cls-1" points="43.56 0 36.09 2.51 52.53 19.06 60 16.55 43.56 0"/>`;
    }else if (d.location=="Bathroom") {
      return `  <defs>
          <style>.cls-1{fill:#29abe2;}</style>
        </defs>
        <title>bathroom</title>
        <ellipse class="cls-1" cx="6.23" cy="7.5" rx="6.23" ry="7.5"/>
        <ellipse class="cls-1" cx="53.77" cy="7.5" rx="6.23" ry="7.5"/>
        <ellipse class="cls-1" cx="30" cy="7.5" rx="6.23" ry="7.5"/>`;
    }else if (d.location=="Living room") {
      return `  <defs>
          <style>.cls-1{fill:#ccc;}</style>
        </defs>
        <title>livingroom</title>
        <polygon class="cls-1" points="67.43 0 67.43 26.78 12.57 26.78 12.57 0 0 0 0 26.78 0 40 80 40 80 26.78 80 0 67.43 0"/>`;
    }
  }

  // location feature's location
  function locationFeature(d,i){
    if(d.location=="Balcony"){
      return "translate(5,-50)";
    }
    if(d.location=="Bathroom"){
      return "translate(-1,-20)";
    }
    if(d.location=="Living room"){
      return "translate(-8,40)";
    }
    if(d.location=="Bed"){
      return "translate(5,50)";
    }
  }

  function getDate(d,i){
    return d.date;
  }

  function groupPos(d,i){
    let x;
    let y;

    if(d.date==2.24){
      x = 128;
    }else if(d.date==2.25){
      x = 128*3;
    }else if(d.date==2.26){
      x = 128*6;
    }else if(d.date==2.27){
      x = 128*9;
    }else if(d.date==2.28){
      x = 128*12;
    }else if(d.date==2.29){
      x = 128*15;
    }else if(d.date==3.1){
      x = 128*18;
    }

    if(d.time=="Morning"){
      y = Math.floor(Math.random()*200+50);
    }else if (d.time=="Noon") {
      y = Math.floor(Math.random()*200+200);
    }else if (d.time=="Afternoon") {
      y = Math.floor(Math.random()*200+400);
    }else if (d.time=="Night") {
      y = Math.floor(Math.random()*200+600);
    }

    return "translate("+ x +", "+ y +")"
  }


  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup")
  ;

  datagroups.attr("transform",groupPos);

  let data = datagroups.html(getMusicType);

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
