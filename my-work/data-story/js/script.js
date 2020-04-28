// global variables that we need at various spots:
let w = 600;
let h = 600;
let padding = 60;

// put the svg onto the page:
let viz = d3.select("#viz")
  .append("svg")
    .style("width", w)
    .style("height", h)
;

// IMPORT DATA
d3.json("us-states.json").then(function(geoData){
  d3.csv("StockX-statistics.csv").then(function(incomingData){
    d3.json("StockX-sneakerSales-US.json").then(function(salesData){

      console.log(geoData);
      console.log(incomingData);

      incomingData = incomingData.map(function(d,i){
        d.counts = Number(d.counts);
        return d;
      });

      let minCount = d3.min(incomingData,function(d,i){
        return d.counts
      })

      let maxCount = d3.max(incomingData,function(d,i){
        return d.counts
      })

      let colorScale = d3.scaleLinear().domain([minCount,maxCount]).range(["lightblue","blue"]);

      // PRINT DATA
      console.log(geoData);

      // SCALES (to translate data values to pixel values)
      // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
      // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
      // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
      // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

      let projection = d3.geoAlbersUsa() // citation: https://d3js.org.cn/document/d3-geo/#composite-projections
        .translate([w/2,h/2])
        .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
      ;


      let pathMaker = d3.geoPath(projection);

      function handleMouseOver(incomingData){

      }



      // CREATE SHAPES ON THE PAGE!
      let map =  viz.selectAll(".states").data(geoData.features).enter()
                  .append("path")
                    .attr("class", "state")
                    .attr("d", pathMaker)
                    .attr("fill","lightblue")
                    // .attr("fill",showData)
                    // .attr("fill", function(d,i){
                    //   // console.log(d.properties.name);
                    //
                    //   // see if d.properties.name is in incomingData
                    //
                    //   let correspondingDatapoint = incomingData.find(function(datapoint){
                    //     // console.log(datapoint);
                    //     if(datapoint.States == d.properties.name) {
                    //     return true
                    //   }else {
                    //     return false;
                    //     }
                    //   })
                    //
                    //   console.log(correspondingDatapoint);
                    //
                    //   if(correspondingDatapoint != undefined){;
                    //     return colorScale(correspondingDatapoint.counts)
                    //   }else {
                    //     return "black"
                    //   }
                    //
                    // })
                    .attr("stroke", "black")
                    .on("mouseover",function(d){
                      viz.append("text")
                        .text(function(){
                          return d.properties.name
                        })
                        .attr("x",50)
                        .attr("y",50)
                        .style("font-size","25px")
                        .style("color","white")

                      viz.append("text")
                        .text(function(){
                          let correspondingDatapoint = incomingData.find(function(datapoint){
                          // console.log(datapoint);
                          if(datapoint.States == d.properties.name){
                            return true;
                          }else{
                            return false
                          }
                        })

                        let counts = correspondingDatapoint.counts

                        return " Total purchases: "+ counts
                        })
                        .attr("x",50)
                        .attr("y",100)
                        .style("font-size","25px")
                        .style("color","white")
                    })
                    .on("mouseout",function(d){
                      d3.selectAll("text").remove();
                    })
        ;

        function show(){
          map.transition()
            .duration(1000)
            .attr("fill",function(d,i){
              // console.log(d.properties.name);

              // see if d.properties.name is in incomingData

              let correspondingDatapoint = incomingData.find(function(datapoint){
                // console.log(datapoint);
                if(datapoint.States == d.properties.name) {
                return true
              }else {
                return false;
                }
              })

              console.log(correspondingDatapoint);

              if(correspondingDatapoint != undefined){;
                return colorScale(correspondingDatapoint.counts)
              }else {
                return "black"
              }

            })
        }

        function hide(){
          map.transition()
            .duration(1000)
            .attr("fill","lightblue")
            ;
        }

          document.getElementById("show").addEventListener("click", show);
          document.getElementById("hide").addEventListener("click", hide);

    });
  });

});
