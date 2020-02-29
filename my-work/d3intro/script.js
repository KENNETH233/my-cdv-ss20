console.log("js loaded. hello!")

// console.log(document.getElementById("viz-container"));

let viz = d3.select("#viz-container")
.append("svg")
.attr("id","viz")
.attr("width",600)
.attr("height",600)
;

// load json

d3.json("data.json").then(gotData);

function xLocation(){
  return Math.random() * 600;
}


function gotData(incomingData){
  console.log(incomingData);

  let list=[];
  for(i=0; i<incomingData.length; i++){
    list.push(incomingData[i].average);
  }

  function getR(){
    for(i=0;i<list.length;i++){
      return list[i]*10;
    }
  }

  viz.selectAll("circle").data(list).enter()
    .append("circle")
    .attr("cx",xLocation)
    .attr("cy",300)
    .attr("r",getR)
    .attr("fill","white")
    .attr("stroke","black")

}



// <div id="viz-container"> <svg> <circle> </circle> </svg> </div>

//Create Circle
// viz.attr("height",400);
//
//  let myCircle = viz.append("circle")
//       .attr("cx",250)
//       .attr("cy",200)
//       .attr("r",20)
// ;
//
// myCircle.attr("fill","white")


//Create rect
//   let myRect = viz.append("rect")
//         .attr("x",50)
//         .attr("y",80)
//         .attr("width",40)
//         .attr("height",60)
//
// myRect.attr("fill","white");

//Create ellipse
//  let myEllipse = viz.append("ellipse")
//         .attr("cx",100)
//         .attr("cy",100)
//         .attr("rx",80)
//         .attr("ry",100)
//
// myEllipse.attr("fill","white");

//Create line
// let myLine = viz.append("line")
//       .attr("x1",50)
//       .attr("x2",80)
//       .attr("y1",40)
//       .attr("y2",30)
//
//   myLine.attr("stroke","white");


// let myData = [4,6,8,2,9];
//
// function xLocation(datapoint){
//   return datapoint * 40; //random number between 0 and 500
// }
//
// function changeColor(datapoint){
//   if(datapoint === 4){
//     return "green";
//   }if(datapoint === 6){
//     return "blue";
//   }if(datapoint === 8){
//     return "red";
//   }if(datapoint === 2){
//     return "white";
//   }if(datapoint === 9){
//     return "yellow"
//   }
// }
//
// viz.selectAll("circle").data(myData).enter()
//   .append("circle")
//     .attr("cx",xLocation)
//     .attr("cy",100)
//     .attr("r",20)
//     .attr("fill",changeColor)
// ;
