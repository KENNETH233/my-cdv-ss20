// global variables that we need at various spots:
let w = 800;
let h = 600;
let padding = 30;

// put the svg onto the page:
let viz = d3.select("#viz")
  .append("svg")
    .style("width", w)
    .style("height", h)
;

// global virables
let xScale, yScale;

let xAxisGroup = viz.append("g").attr("class", "xaxis").attr("opacity", 1);
let yAxisGroup = viz.append("g").attr("class", "yaxis").attr("opacity", 1);

//

let salingChart = viz.append("g")
    .attr("class", "salingChart")
    .attr("opacity", 0)
    .attr("visibility", "visible")
  ;

// let profitChart = viz.append("g")
//     .attr("class", "profitChart")
//     .attr("opacity", 0)
//     .attr("visibility", "hidden")
//   ;

let timeFormat = d3.timeParse("%m/%d/%Y");
// let test = timeFormat("2/6/17");
// console.log(test);


// IMPORT DATA
d3.json("salingData.json").then(function(salesData){
  d3.csv("StockX-statistics.csv").then(function(incomingData){
    d3.json("us-states.json").then(function(geoData){
      // console.log(salesData);
      // console.log(incomingData);

      // Ramdomly pick data from the ENORMOUS dataset
      d3.shuffle(salesData)
      salesData = salesData.slice(0,5000);
      console.log(salesData.length);

      //-----------Processing data------------//
      function mappingFunction(datapoint){
        //Format time
        datapoint.orderDate = timeFormat(datapoint.orderDate);
        datapoint.releaseDate = timeFormat(datapoint.releaseDate);

        // Remove dollar sign $
        datapoint.retailPrice = datapoint.retailPrice.substring(1);
        datapoint.salePrice = datapoint.salePrice.substring(1);
        datapoint.Profits = datapoint.Profits.substring(1);

        // remove "," if the prices are hight than 1k
        datapoint.salePrice = datapoint.salePrice.replace(/,/g,"");

        // convert all the string to Number
        datapoint.retailPrice = Number(datapoint.retailPrice);
        datapoint.salePrice = Number(datapoint.salePrice);
        datapoint.Profits = Number(datapoint.Profits);
        datapoint.shoeSize = Number(datapoint.shoeSize);

        return datapoint;
      }

      let filteredData = salesData.map(mappingFunction);
      console.log(filteredData);

      //--------------------------------------//

      //---------------SCALE------------------//

      // // X SCALE
      // let minDate = d3.min(filteredData, function(d){
      //   return d.releaseDate;
      // });
      //
      // //console.log(minDate);
      //
      // let maxDate = d3.max(filteredData, function(d){
      //   return d.orderDate;
      // });
      //
      // // console.log(maxDate);
      //
      // let xDomain=[minDate,maxDate];
      // let xScale = d3.scaleTime().domain(xDomain).range([padding, w-(padding*2)]);
      //
      // // console.log(xScale(timeFormat("2/16/16")));
      //
      // //Draw x axis
      // let xAxis = d3.axisBottom(xScale);
      //
      // xAxisGroup.call(xAxis);
      //
      // let xAxisYPos = h - 30;
      // xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
      //
      // // Y SCALE
      // let maxSales = d3.max(salesData,function(d){
      //   return d.salePrice;
      // })
      //
      // console.log("maxSales",maxSales);
      //
      // let yDomain = [0,maxSales];
      //
      // let yScale = d3.scaleLinear().domain(yDomain).range([xAxisYPos, padding]);
      //
      // let test = yScale(3000);
      // console.log(test);
      //
      // let yAxis = d3.axisLeft(yScale);
      // yAxisGroup.call(yAxis);
      // yAxisGroup.attr("transform", "translate("+padding+",0)");
      //
      // // shoes size scale
      // let minSize = d3.min(filteredData,function(d){
      //   return d.shoeSize;
      // })
      //
      // console.log(minSize);
      //
      // let maxSize = d3.max(filteredData,function(d){
      //   return d.shoeSize;
      // })
      //
      // console.log(maxSize);
      //
      // let shoeDomain = [minSize,maxSize];
      //
      // let shoeScale = d3.scaleLinear().domain(shoeDomain).range([3,10]);
      //
      // salingChart.selectAll(".purchases").data(filteredData).enter()
      //   .append("g")
      //     .attr("class","purchases")
      // ;
      //
      // let purchases = salingChart.selectAll(".purchases")
      //       .append("circle")
      //         .attr("cx",function(d){
      //           return xScale(d.releaseDate)
      //         })
      //         .attr("cy",function(d){
      //           return yScale(d.salePrice)
      //         })
      //         .attr("r",function(d){
      //           return shoeScale(d.shoeSize);
      //         })
      //         .style("opacity",0.5)
      //         .attr("fill",function(d){
      //           if(d.Brand==" Yeezy"){
      //             return "lightbrown"
      //           }else {
      //             return "orange"
      //           }
      //         })

//---------------------------------------------------------------------------------------------
  // X SCALE
  let minDate = d3.min(filteredData, function(d){
    return d.releaseDate;
  });

  let maxDate = d3.max(filteredData, function(d){
    return d.orderDate;
  });

  let xDomain=[minDate,maxDate];
  let xScale = d3.scaleTime().domain(xDomain).range([padding, w-(padding*2)]);

  let xAxisYPos = h - 30;

  // Y SCALE
  let maxSales = d3.max(salesData,function(d){
    return d.salePrice;
  })

  let yDomain = [0,maxSales];

  let yScale = d3.scaleLinear().domain(yDomain).range([xAxisYPos, padding]);

// shoes size scale
  let minSize = d3.min(filteredData,function(d){
    return d.shoeSize;
  })

  let maxSize = d3.max(filteredData,function(d){
    return d.shoeSize;
  })

  let shoeDomain = [minSize,maxSize];

  let shoeScale = d3.scaleLinear().domain(shoeDomain).range([3,10]);

//----------------------------------------------------------------------//

  function showSales(){
    console.log(salesData);
    console.log(incomingData);

    // viz.select("salingChart")
  //   .transition()
    //   .duration(1000)
    //   .attr("opacity",1)
    //   .attr("visibility","visible")
    // ;

    // viz.selectAll(".xaxis").attr("opacity",1);
    // viz.selectAll(".yaxis").attr("opacity",1);
    //Draw axis

    let yAxis = d3.axisLeft(yScale);
    yAxisGroup.call(yAxis);
    yAxisGroup.attr("transform", "translate("+padding+",0)");
    yAxisGroup.selectAll("line").remove();

    let xAxis = d3.axisBottom(xScale);
    xAxisGroup.call(xAxis);
    let xAxisYPos = h - 30;
    xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
    xAxisGroup.selectAll("line").remove();


    salingChart.selectAll(".purchases").data(filteredData).enter()
      .append("g")
        .attr("class","purchases")
    ;

    let purchases = salingChart.selectAll(".purchases")
          .append("circle")
            .attr("cx",function(d){
              return xScale(d.releaseDate)
            })
            .attr("cy",function(d){
              return yScale(d.salePrice)
            })
            .attr("r",function(d){
              return shoeScale(d.shoeSize);
            })
            .style("opacity",0.7)
            .attr("fill",function(d){
              if(d.Brand==" Yeezy"){
                return "#e5dab7"
              }else {
                return "#FF6600"
              }
            })

      }

      enterView({
      	selector: '#Changes',
      	enter: function(el) {
      		// el.classList.add('entered');
          console.log('a #Market element entered');
          showSales();
          viz.selectAll(".salingChart").attr("opacity",1);
          viz.selectAll(".xaxis").attr("opacity",1);
          viz.selectAll(".yaxis").attr("opacity",1);
      	},
      	exit: function(el) {
      		// el.classList.remove('entered');
          // showSales();
          viz.selectAll(".salingChart").attr("opacity",0);
          viz.selectAll(".xaxis").attr("opacity",0);
          viz.selectAll(".yaxis").attr("opacity",0);
      	},
      	// progress: function(el, progress) {
      	// 	el.style.opacity = progress;
      	// },
      	offset: 0.35, // enter at middle of viewport
      });

      function showProfit(){
        console.log(geoData);
        console.log(incomingData);
      }


      function showMap(){
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

        let projection = d3.geoAlbersUsa() // citation: https://d3js.org.cn/document/d3-geo/#composite-projections
          .translate([w/2,h/2])
          .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
        ;


        let pathMaker = d3.geoPath(projection);


        // CREATE SHAPES ON THE PAGE!
        let map =  viz.selectAll(".states").data(geoData.features).enter()
                    .append("path")
                      .attr("class", "state")
                      .attr("d", pathMaker)
                      .attr("fill","lightblue")
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

          // function show(){
          //   map.transition()
          //     .duration(1000)
          //     .attr("fill",function(d,i){
          //       // console.log(d.properties.name);
          //
          //       // see if d.properties.name is in incomingData
          //
          //       let correspondingDatapoint = incomingData.find(function(datapoint){
          //         // console.log(datapoint);
          //         if(datapoint.States == d.properties.name) {
          //         return true
          //       }else {
          //         return false;
          //         }
          //       })
          //
          //       console.log(correspondingDatapoint);
          //
          //       if(correspondingDatapoint != undefined){;
          //         return colorScale(correspondingDatapoint.counts)
          //       }else {
          //         return "black"
          //       }
          //
          //     })
          // }

          // function hide(){
          //   map.transition()
          //     .duration(1000)
          //     .attr("fill","lightblue")
          //     ;
          // }

            // document.getElementById("show").addEventListener("click", show);
            // document.getElementById("hide").addEventListener("click", hide);
      }

      enterView({
        selector: '#Market',
        enter: function(el) {
          // el.classList.add('entered');
          console.log('a #Market element entered');
          showMap();
        },
        exit: function(el) {
        	el.classList.remove('entered');
          console.log('a #Changes element exited');
          // showMap();
          viz.selectAll(".state").transition().duration(500).remove();
        },
        // progress: function(el, progress) {
        // 	el.style.opacity = progress;
        // },
        offset: 0.5, // enter at middle of viewport
      });


    });
  });

});
