let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

function gotData(incomingData){
  // all the data:
  console.log(incomingData);

  function filterFunction(datapoint){
    if (datapoint.Code == "CHN" || datapoint.Code == "USA") {
      return true;
    }else{
      return false;
    }
  }

  let filteredData = incomingData.filter(filterFunction);





  // JS DATE OBJECTS
  let yearToDateObjectConvertor = d3.timeParse("%Y");


  function mapFunction(datapoint){
    datapoint.Year = yearToDateObjectConvertor(datapoint.Year)
    return datapoint
  }

  let filteredAndTimeAdjustedData = filteredData.map(mapFunction);


  function findTime(datapoint){
    return datapoint.Year
  }

  // minimum
  let minTime = d3.min(filteredAndTimeAdjustedData,findTime);

  // max
  let maxTime = d3.max(filteredAndTimeAdjustedData,findTime);

  let xScale = d3.scaleTime().domain ([minTime,maxTime]).range([30,w -30d]);







  let dataGroups = viz.selectAll(".datagroup").data(filteredData).enter()
    .append("g")
    .attr("class","datagroup")
  ;

  let circles = dataGroups.append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",5)

  function getCountryCode(d,i){
    return d.Code;
  }

  let countryLabel = dataGroups.append("text")
    .attr("x",7)
    .attr("y",9)
    .text(getCountryCode)
;

  function getYear(d,i){
    return d.Year.getFullYear();
  }

  let year = dataGroups.append("text")
    .attr("x",-7)
    .attr("y",-9)
    .text(getYear)
  ;


  function getTranslate(d,i){
    let x = xScale(d.Year);
    let y = 300;
    return "translate("+x+","+y+")"

  }
  dataGroups.attr("transform",getTranslate)
}

d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
