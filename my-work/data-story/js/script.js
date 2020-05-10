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

let xAxisGroup = viz.append("g").attr("class", "xaxis").attr("opacity", 0);
let yAxisGroup = viz.append("g").attr("class", "yaxis").attr("opacity", 0);
let profitAxisGroup = viz.append("g").attr("class", "profitaxis").attr("opacity", 1);


//

let sneakerBefore = viz.append("g")
      .attr("class","sneakerBefore")
      .attr("opacity",0)
      .attr("visibility","visible")
    ;

let sneakerNow = viz.append("g")
      .attr("class","sneakerNow")
      .attr("opacity",0)
      .attr("visibility","visible")
    ;


let salingChart = viz.append("g")
      .attr("class", "salingChart")
      .attr("opacity", 0)
      .attr("visibility", "visible")
    ;

let map = viz.append("g")
      .attr("class","map")
      .attr("opacity",0)
      .attr("visibility","visible")
    ;

let profitChart = viz.append("g")
    .attr("class", "profitChart")
    .attr("opacity", 1)
    .attr("visibility", "visible")
  ;

let timeFormat = d3.timeParse("%m/%d/%y");
// let test = timeFormat("2/6/17");
// console.log(test);


// IMPORT DATA
d3.json("salingData.json").then(function(salesData){
  d3.csv("StockX-statistics.csv").then(function(incomingData){
    d3.json("us-states.json").then(function(geoData){
      // console.log(salesData);
      // console.log(incomingData);

      //Hover card
      function saleHover(d){
        d3.select(this).transition()
          .duration(500)
          .attr("opacity",1)
          .attr("r",function(d){
            return shoeScale(d.shoeSize)+3;
          })
        ;

        let hoverCard = d3.selectAll(".salingChart").append("g")
              .attr("class","hoverCard")
              .attr("opacity",1)
              // .attr("transform", function(){
              //   let x = xScale(d.releaseDate)-50;
              //   let y = yScale(d.retailPrice)-60;
              //   return "translate("+x+","+y+")";
              // })
              .attr("transform","translate(50,0)")
        ;

        hoverCard.append("rect")
          .attr("width", 150)
          .attr("height", 100)
          .attr("x", 0)
          .attr("y", 0)
          .attr("fill", "black")
          .attr("opacity",0.7)
        ;

        let textXPadding = 10;
        let textYPadding = 24;

        hoverCard.append("text")
            .text("Brand:")
            .attr("x", textXPadding)
            .attr("y", textYPadding)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        hoverCard.append("text")
            .text(function(){
              return d.Brand
            })
            .attr("x", textXPadding+45)
            .attr("y", textYPadding)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        hoverCard.append("text")
            .text("Retail Prices:")
            .attr("x", textXPadding)
            .attr("y", textYPadding * 2)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        hoverCard.append("text")
            .text(function(){
              return d.retailPrice;
            })
            .attr("x", textXPadding+90)
            .attr("y", textYPadding * 2)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

      }

      function reSaleHover(d){
        d3.select(this).transition()
          .duration(500)
          .attr("opacity",1)
          .attr("r",function(d){
            return shoeScale(d.shoeSize)+3;
          })
        ;

        let resaleHoverCard = d3.selectAll(".salingChart").append("g")
              .attr("class","resaleHoverCard")
              .attr("opacity",1)
              // .attr("visibility","hidden")
              // .attr("transform", function(){
              //   let x = xScale(d.orderDate)-55;
              //   let y = yScale(d.salePrice)-60;
              //   return "translate("+x+","+y+")";
              // })
              .attr("transform","translate(50,0)")
        ;

        resaleHoverCard.append("rect")
          .attr("width", 150)
          .attr("height", 100)
          .attr("x", 0)
          .attr("y", 0)
          .attr("fill", "black")
          .attr("opacity",0.7)
        ;

        let textXPadding = 10;
        let textYPadding = 24;

        resaleHoverCard.append("text")
            .text("Brand:")
            .attr("x", textXPadding)
            .attr("y", textYPadding)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text(function(){
              return d.Brand;
            })
            .attr("x", textXPadding+45)
            .attr("y", textYPadding)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text("Retail Prices:")
            .attr("x", textXPadding)
            .attr("y", textYPadding * 2)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text(function(){
              return d.retailPrice;
            })
            .attr("x", textXPadding+90)
            .attr("y", textYPadding * 2)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text("Resale Prices:")
            .attr("x", textXPadding)
            .attr("y", textYPadding * 3)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text(function(){
              return d.salePrice;
            })
            .attr("x", textXPadding+95)
            .attr("y", textYPadding * 3)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text("Profit:")
            .attr("x", textXPadding)
            .attr("y", textYPadding * 4)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;

        resaleHoverCard.append("text")
            .text(function(){
              return d.Profits;
            })
            .attr("x", textXPadding+45)
            .attr("y", textYPadding * 4)
            .attr("font-size", 14)
            .attr("fill", "white")
        ;


      }

      // Ramdomly pick data from the ENORMOUS dataset
      d3.shuffle(salesData)
      salesData = salesData.slice(0,500);
      // console.log(salesData.length);

      //-----------Filter data------------//
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
        datapoint.Profits = datapoint.Profits.replace(/,/g,"");

                // convert all the string to Number
        datapoint.retailPrice = Number(datapoint.retailPrice);
        datapoint.salePrice = Number(datapoint.salePrice);
        datapoint.Profits = Number(datapoint.Profits);
        datapoint.shoeSize = Number(datapoint.shoeSize);


        return datapoint;
      }

      let filteredData = salesData.map(mappingFunction);
      console.log(filteredData);

      let profitData = filteredData.map(function(datapoint){
        return datapoint.Profits;
      })

      console.log(profitData);
      //--------------------------------------//


//---------------------------------------------------------------------------------------------
// DATA PROCESSING

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
  let maxSales = d3.max(filteredData,function(d){
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

  let shoeScale = d3.scaleLinear().domain(shoeDomain).range([1,10]);

// shoe price scale

  let minPrice = d3.min(filteredData,function(d){
    return d.retailPrice;
  })
  let maxPrice = d3.max(filteredData,function(d){
    return d.salePrice;
  })
  // console.log(maxPrice);

  let priceDomain = [minPrice,maxPrice];

  let priceScale = d3.scaleLinear().domain(priceDomain).range([10,30]);

  //Draw axis
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+padding+",0)");
  yAxisGroup.selectAll("line").remove();

  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);
  // let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0,"+xAxisYPos+")");
  xAxisGroup.selectAll("line").remove();

// profit scale
  let minProfit = d3.min(filteredData,function(d){
    return d.Profits;
  });
  console.log(minProfit);
  let maxProfit = d3.max(filteredData,function(d){
    return d.Profits;
  });
  console.log(maxProfit);
  let profitDomain = [minProfit,maxProfit];
  let profitScale = d3.scaleLinear().domain(profitDomain).range([padding, w-(padding*2)]);

  let profitAxis = d3.axisBottom(profitScale);
  profitAxisGroup.call(profitAxis);
  profitAxisGroup.attr("transform", "translate(0,100)");

//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
// visualization

profitChart.selectAll(".profit").data(filteredData).enter()
  .append("g")
    .attr("class","profit")
    .attr("transform",function(d){
      let x = profitScale(d.Profits)
      let y = h/2
      return "translate("+x+","+y+")"
    })
;

let resale = profitChart.selectAll(".profit")
  .append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",function(d){
      return priceScale(d.salePrice);
    })
    .attr("fill",function(d){
      if(d.Brand==" Yeezy"){
        return "#e5dab7"
      }else {
        return "#FF6600"
      }
    })
    .style("opacity",0.7)
  ;

  let retail = profitChart.selectAll(".profit")
    .append("circle")
      .attr("cx",0)
      .attr("cy",0)
      .attr("r",function(d){
        return priceScale(d.retailPrice);
      })
      .attr("fill",function(d){
        if(d.Brand==" Yeezy"){
          return "#c9bdb7"
        }else {
          return "#cf4e04"
        }
      })
      .style("opacity",0.7)
    ;

    let simulation = d3.forceSimulation(filteredData)
      .force('forceX', d3.forceX().x(function(d,i){
          return xScale(d.Profits)
        }))
      .force('forceY', d3.forceY().y(function(d){
        return h/2;
      }))
      .force('collide', d3.forceCollide().radius(function(d,i){
        return priceScale(d.retailPrice)+1;
      }))
      .on('tick',simulationRan)
    ;

    function simulationRan(d){
      viz.selectAll(".profit")
      .attr("transform", function(d){
        return "translate("+d.x+","+d.y+")";
      })

    }

//-----------DRAW EVERYTHING OUT FIRST--------------//
  // Sneaker Before
  let sneakerBefore1 = d3.select(".sneakerBefore").append("g")
      .attr("class","sneakerBefore1")
    ;
  sneakerBefore1.html(aj1);
  //transform sneakerBefore1
  d3.select(".sneakerBefore1")
    .attr("transform", "scale(0.45)translate(0,200)")
  ;

  let sneakerBefore2 = d3.select(".sneakerBefore").append("g")
      .attr("class","sneakerBefore2")
    ;
  sneakerBefore2.html(aj11);
  //transform sneakerBefore2
  d3.select(".sneakerBefore2")
    .attr("transform", "scale(0.45)translate(1700,500)scale(-1,1)")
  ;

  enterView({
    selector: '#Before',
    enter: function(el) {
      // el.classList.add('entered');
      viz.selectAll(".sneakerBefore").transition().duration(800).attr("opacity",1);
    },
    exit: function(el) {
      // el.classList.remove('entered');
      viz.selectAll(".sneakerBefore").transition().duration(800).attr("opacity",0);
    },
    // progress: function(el, progress) {
    // 	el.style.opacity = progress;
    // },
    offset: 0.5, // enter at middle of viewport
  });
  //----------------------------------------------//

  //Sneaker Now

  //ow logo
  let owLogo = d3.select(".sneakerNow").append("g")
      .attr("class","offWhite")
    ;
  owLogo.html(offWhite);

  d3.select(".offWhite")
    .attr("transform", "scale(0.3)translate(0,200)")
  ;

  //ow90
  let ow90 = d3.select(".sneakerNow").append("g")
      .attr("class","airmax90")
    ;

  d3.select(".airmax90")
    .attr("transform", "scale(0.3)translate(150,600)")
  ;
  ow90.html(airmax90);

  //ow97
  let ow97 = d3.select(".sneakerNow").append("g")
      .attr("class","airmax97")
    ;

  d3.select(".airmax97")
    .attr("transform", "scale(0.25)translate(150,1400)")
  ;
  ow97.html(airmax97);

  //yeezy logo
  let yzylogo = d3.select(".sneakerNow").append("g")
      .attr("class","yeezy")
    ;

  d3.select(".yeezy")
    .attr("transform", "scale(0.95)translate(400,0)")
  ;
  yzylogo.html(yeezy);

  // yeezy350
  let yeezy1 = d3.select(".sneakerNow").append("g")
      .attr("class","yeezy350")
    ;

  d3.select(".yeezy350")
    .attr("transform", "scale(0.3)translate(1500,350)")
    .attr("opacity",0.6)
  ;
  yeezy1.html(yeezy350);

  //yeezy750
  let yeezy2 = d3.select(".sneakerNow").append("g")
      .attr("class","yeezy750")
    ;

  d3.select(".yeezy750")
    .attr("transform", "scale(0.27)translate(1700,1100)")
    .attr("opacity",0.6)
  ;
  yeezy2.html(yeezy750);

  ;

  enterView({
  selector: '#Now',
  enter: function(el) {
    // el.classList.add('entered');
    viz.selectAll(".sneakerBefore").transition().duration(800).attr("opacity",0);
    viz.selectAll(".sneakerNow").transition().duration(800).attr("opacity",1);
  },
  exit: function(el) {
    // el.classList.remove('entered');
    viz.selectAll(".sneakerNow").transition().duration(800).attr("opacity",0);
    viz.selectAll(".sneakerBefore").transition().duration(800).attr("opacity",1);
  },
  // progress: function(el, progress) {
  // 	el.style.opacity = progress;
  // },
  offset: 0.5, // enter at middle of viewport
});



  function showSales(){
    console.log(salesData);
    console.log(incomingData);

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
              return yScale(d.retailPrice)
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
            .attr('class','purchases')
            .on("mouseover",saleHover)
            .on("mouseout",function(){
              d3.selectAll(".hoverCard").transition(500)
                .remove()
              ;

              d3.select(this).transition()
                .duration(200)
                .attr("opacity",0.7)
                .attr("r",function(d){
                  return shoeScale(d.shoeSize);
                })
            })
          ;

          // let simulation = d3.forceSimulation(filteredData)
          //   .force("forceX",d3.forceX(function(filteredData){
          //     return xScale(filteredData.releaseDate)
          //   }))
          //   .force("forceY",d3.forceY(function(filteredData){
          //     return yScale(filteredData.retailPrice)
          //   }))
          //   .force("collide",d3.forceCollide(5))
          //   .on("tick",simulationRan)
          // ;

          // function simulationRan(){
          //   viz.selectAll(".purchases")
            // .attr("cx", function(filteredData){
            //   return xScale(filteredData.releaseDate);
            // })
            // .attr("cy", function(filteredData){
            //   yScale(filteredData.retailPrice);
            // })
          // }

            enterView({
              selector: '#Resale',
              enter: function(el) {
                // el.classList.add('entered');
                console.log("Resale");
                d3.selectAll(".purchases").transition()
                  .duration(1000)
                  .attr("cx",function(d){
                    return xScale(d.orderDate)
                  })
                  .attr("cy",function(d){
                    return yScale(d.salePrice)
                  })
                  // .on("mouseover",reSaleHover)
                  // .on("mouseout",function(){
                  //   d3.selectAll(".resaleHoverCard").transition(500)
                  //     .remove();
                  // })
                ;

                d3.selectAll(".purchases")
                  .on("mouseover",reSaleHover)
                  .on("mouseout",function(){
                    d3.selectAll(".resaleHoverCard").transition(500)
                      .remove();

                    d3.select(this).transition()
                      .duration(200)
                      .attr("opacity",0.7)
                      .attr("r",function(d){
                        return shoeScale(d.shoeSize);
                      })
                  })

                d3.selectAll(".purchases").append("line")
                  .attr("x1",function(d){
                    // console.log(d);
                    return xScale(d.orderDate)
                  })
                  .attr("y1",function(d){
                    return yScale(d.salePrice)
                  })
                  .attr("x2",function(d){
                    return xScale(d.orderDate)
                  })
                  .attr("y2",function(d){
                    return yScale(d.salePrice)
                  })
                  .attr("fill","none")
                  .style('opacity',0.5)
                  .attr("stroke",function(d){
                    if(d.Brand==" Yeezy"){
                      return "#e5dab7"
                    }else {
                      return "#FF6600"
                    }
                  })
                  .attr("stroke-width",1)
                  .attr("class","line")
                ;

                d3.selectAll(".line").transition()
                  .delay(500)
                  .duration(1000)
                  .attr("x2",function(d){
                    return xScale(d.releaseDate);
                  })
                  .attr("y2",function(d){
                    return yScale(d.retailPrice);
                  })

                salingChart.selectAll(".preCircle").data(filteredData).enter()
                  .append("g")
                    .attr("class","preCircle")
                    .attr("opacity",0)
                ;

                let preCircle = salingChart.selectAll(".preCircle")
                        .append("circle")
                          .attr("cx",function(d){
                            return xScale(d.releaseDate)
                          })
                          .attr("cy",function(d){
                            return yScale(d.retailPrice)
                          })
                          .attr("r",function(d){
                            return shoeScale(d.shoeSize);
                          })
                          .style("opacity",0.7)
                          .attr("fill",function(d){
                            if(d.Brand==" Yeezy"){
                              return "#c9bdb7"
                            }else {
                              return "#cf4e04"
                            }
                          })
                          .attr('class','preCircle')
                          .on("mouseover",saleHover)
                          .on("mouseout",function(){
                            d3.selectAll(".hoverCard").transition(500)
                              .remove()
                            d3.select(this).transition()
                              .duration(200)
                              .attr("opacity",0.7)
                              .attr("r",function(d){
                                return shoeScale(d.shoeSize);
                              })
                          ;
                          })
                        ;

                d3.selectAll(".preCircle").transition()
                  .delay(1200)
                  .duration(1000)
                  .attr("opacity",1)
                ;
              },
              exit: function(el) {
                // el.classList.remove('entered');
                  d3.selectAll(".preCircle").transition()
                    .duration(1000)
                    .attr("opacity",0)
                  ;

                  d3.selectAll(".line").transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("x2",function(d){
                      return xScale(d.orderDate);
                    })
                    .attr("y2",function(d){
                      return yScale(d.salePrice);
                    })
                  ;

                  d3.selectAll(".purchases").transition()
                    .delay(2000)
                    .duration(1000)
                    .attr("cx",function(d){
                      return xScale(d.releaseDate)
                    })
                    .attr("cy",function(d){
                      return yScale(d.retailPrice)
                    })



              },
              // progress: function(el, progress) {
              // 	el.style.opacity = progress;
              // },
              offset: 0.5, // enter at middle of viewport
            });

      }

      enterView({
      	selector: '#Changes',
      	enter: function(el) {
      		// el.classList.add('entered');
          showSales();
          viz.selectAll(".sneakerNow").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".salingChart").transition().duration(1000).attr("opacity",1);
          viz.selectAll(".xaxis").transition().duration(1000).attr("opacity",1);
          viz.selectAll(".yaxis").transition().duration(1000).attr("opacity",1);
      	},
      	exit: function(el) {
      		// el.classList.remove('entered');
          // showSales();
          viz.selectAll(".salingChart").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".xaxis").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".yaxis").transition().duration(1000).attr("opacity",0);

          viz.selectAll(".sneakerNow").transition().duration(800).attr("opacity",1);
      	},
      	// progress: function(el, progress) {
      	// 	el.style.opacity = progress;
      	// },
      	offset: 0.5, // enter at middle of viewport
      });





      function showProfit(){
        // console.log(geoData);
        // console.log(incomingData);
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

        let colorScale = d3.scaleLinear().domain([minCount,maxCount]).range(["#FBE9E7","#BF360C"]);

        // PRINT DATA
        // console.log(geoData);

        let projection = d3.geoAlbersUsa() // citation: https://d3js.org.cn/document/d3-geo/#composite-projections
          .translate([w/2,h/2])
          .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
        ;


        let pathMaker = d3.geoPath(projection);


        // CREATE SHAPES ON THE PAGE!
        let states =  map.selectAll(".states").data(geoData.features).enter()
                        .append("path")
                          .attr("class", "state")
                          .attr("d", pathMaker)
                          .attr("fill","#FBE9E7")
                          .attr("stroke", "lightbrown")
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

        states.transition()
          .delay(1300)
          .duration(1000)
          .attr("fill",function(d){
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

              if(correspondingDatapoint != undefined){;
                return colorScale(correspondingDatapoint.counts)
              }else {
                return "black"
              }

            })

      }

      enterView({
        selector: '#Market',
        enter: function(el) {
          // el.classList.add('entered');
          viz.selectAll(".map").transition().duration(1000).attr("opacity",1);
          viz.selectAll(".salingChart").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".xaxis").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".yaxis").transition().duration(1000).attr("opacity",0);
          showMap();
        },
        exit: function(el) {
        	el.classList.remove('entered');
          viz.selectAll(".map").transition().duration(1000).attr("opacity",0);
          viz.selectAll(".state").transition().duration(1000).remove();
          viz.selectAll(".salingChart").transition().duration(1000).attr("opacity",1);
          viz.selectAll(".xaxis").transition().duration(1000).attr("opacity",1);
          viz.selectAll(".yaxis").transition().duration(1000).attr("opacity",1);
        },
        // progress: function(el, progress) {
        // 	el.style.opacity = progress;
        // },
        offset: 0.5, // enter at middle of viewport
      });


    });
  });

});




//SVG
let airmax90 = `<g transform="translate(0.000000,495.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
  <path d="M2885 4840 c-53 -53 -93 -98 -90 -101 3 -3 -43 -50 -102 -104 -60
  -55 -123 -118 -142 -142 -41 -53 -53 -57 -16 -5 l27 37 -36 -40 c-24 -26 -44
  -64 -57 -109 -19 -61 -20 -75 -10 -138 11 -67 59 -207 82 -238 9 -13 10 -12 5
  3 -16 46 -16 50 -1 24 9 -16 14 -35 11 -43 -3 -8 -2 -13 3 -10 11 7 33 -53 24
  -67 -4 -6 -1 -7 7 -2 10 6 12 4 7 -9 -5 -11 -3 -15 5 -10 8 5 9 2 5 -10 -4 -9
  -3 -15 2 -12 5 4 25 -22 44 -56 18 -35 49 -89 66 -120 18 -32 31 -58 28 -58
  -3 0 -33 50 -67 110 -34 61 -64 110 -66 110 -13 0 117 -221 133 -227 8 -3 20
  -18 28 -34 18 -34 19 -43 3 -33 -7 5 -8 3 -4 -5 5 -7 11 -10 14 -6 3 3 26 -25
  49 -62 54 -85 65 -103 59 -103 -2 0 -26 34 -52 75 -46 72 -68 99 -43 53 22
  -41 131 -208 136 -208 2 0 1 5 -2 10 -3 6 -4 10 -1 10 3 0 12 -13 20 -29 l15
  -28 -48 -23 c-28 -13 -54 -19 -62 -15 -7 5 -10 4 -6 -2 5 -8 -172 -104 -191
  -102 -4 0 36 23 88 50 52 28 88 48 80 45 -13 -4 -224 -99 -300 -134 l-25 -12
  25 6 c14 4 32 8 40 11 8 2 0 -4 -19 -12 -18 -9 -40 -14 -48 -11 -8 3 -12 2 -9
  -2 6 -10 -114 -46 -244 -72 -104 -22 -256 -26 -339 -10 -57 11 -200 65 -216
  82 -7 8 -6 8 5 3 13 -8 13 -7 1 8 -16 20 -36 23 -25 5 4 -8 3 -10 -2 -5 -5 5
  -9 12 -9 16 0 4 -38 38 -85 75 -80 63 -53 31 35 -42 l40 -34 -50 34 c-27 18
  -112 96 -190 173 -78 77 -92 93 -31 35 l110 -105 -78 87 c-42 47 -94 99 -114
  114 -39 29 -71 64 -72 77 0 5 6 5 12 0 28 -17 -72 98 -127 147 -79 70 -162
  109 -245 115 -61 4 -62 4 -15 -4 84 -14 128 -29 178 -61 26 -16 47 -32 47 -34
  0 -3 -22 8 -48 25 -66 41 -140 59 -242 59 -94 0 -184 -19 -239 -51 l-36 -21
  25 21 c31 25 106 51 180 62 54 8 54 8 -12 4 -72 -4 -155 -34 -184 -66 -9 -10
  -13 -19 -9 -19 4 0 0 -9 -9 -19 -26 -28 -31 -89 -11 -141 9 -25 19 -52 21 -61
  4 -11 -8 -22 -46 -37 -29 -12 -57 -19 -63 -15 -6 3 -7 1 -3 -6 5 -8 -3 -16
  -23 -24 -21 -7 -31 -18 -31 -32 0 -21 -78 -316 -85 -324 -8 -8 -5 17 5 45 6
  15 9 29 6 31 -2 2 -39 -100 -81 -227 -42 -127 -75 -233 -73 -235 2 -2 23 54
  47 126 24 72 45 129 47 126 2 -2 -14 -57 -37 -123 -22 -65 -56 -177 -75 -249
  -18 -71 -31 -113 -28 -92 3 21 7 46 10 55 5 14 4 15 -4 2 -15 -22 -42 -162
  -42 -215 0 -48 15 -89 29 -80 5 2 8 -3 7 -13 0 -11 13 -24 37 -36 35 -17 38
  -21 33 -50 -3 -17 -8 -51 -10 -76 -4 -32 -1 -27 9 20 16 74 19 111 8 109 -21
  -3 -41 2 -59 17 -18 15 -18 15 3 5 12 -6 33 -11 47 -11 33 0 33 -6 1 -185
  l-24 -140 19 -195 c28 -271 27 -262 10 -267 -13 -4 -13 -3 0 7 13 10 13 11 0
  7 -8 -2 -15 -8 -15 -13 0 -5 -9 -21 -18 -36 -13 -18 -17 -37 -13 -60 23 -135
  29 -265 18 -353 -11 -86 -58 -262 -68 -253 -2 3 5 31 16 63 32 93 16 75 -19
  -22 -45 -122 -52 -222 -18 -278 13 -22 30 -39 38 -38 8 1 25 -7 39 -18 14 -11
  19 -18 13 -14 -7 3 -13 4 -13 1 0 -9 78 -46 95 -46 9 0 44 -26 77 -57 34 -32
  58 -52 54 -45 -4 6 -5 12 -3 12 10 0 91 -50 82 -50 -16 -1 43 -30 104 -51 114
  -40 441 -101 526 -98 17 1 -31 9 -105 20 -153 21 -302 51 -397 80 -95 30 -73
  32 26 3 172 -50 486 -93 836 -114 126 -8 710 -10 1940 -7 1482 3 1802 6 2025
  20 391 24 693 46 885 62 228 20 322 26 310 21 -11 -5 -373 -38 -665 -60 -96
  -8 -152 -14 -125 -15 110 -2 733 52 1075 94 221 28 269 37 150 30 -108 -6 -71
  1 150 30 283 36 495 80 793 166 80 23 148 37 160 34 16 -5 18 -4 8 3 -10 7 -4
  13 25 22 22 7 77 30 123 51 113 53 117 48 6 -7 -49 -25 -79 -42 -65 -38 34 9
  229 105 236 116 4 5 -12 0 -35 -11 -23 -12 -41 -19 -41 -16 0 11 82 45 93 39
  7 -4 9 -4 5 1 -5 5 6 17 22 27 36 21 44 23 34 5 -4 -7 -3 -9 2 -4 5 5 9 12 9
  17 0 5 31 31 68 58 95 69 312 284 376 371 29 41 48 70 42 67 -21 -14 -22 21
  -1 75 24 60 49 292 35 325 -4 10 -10 33 -12 49 -18 133 -74 266 -145 341 -26
  28 -45 53 -42 56 15 15 -127 90 -213 112 -94 25 -98 18 -5 -10 82 -24 159 -58
  197 -88 11 -9 -16 2 -60 24 -129 65 -327 103 -601 116 -71 3 -145 7 -164 9
  -19 2 -64 5 -100 6 -57 2 -60 3 -25 8 33 5 18 9 -80 19 -174 20 -327 48 -503
  92 -85 22 -157 38 -159 36 -10 -9 431 -114 497 -117 16 -1 19 -3 8 -6 -32 -8
  -318 54 -500 109 -37 11 -71 20 -75 20 -5 0 -12 3 -18 8 -5 4 -36 14 -69 21
  -36 8 -52 15 -42 19 10 3 -54 25 -146 49 -111 30 -172 51 -191 67 -35 30 -68
  38 -110 29 -46 -10 -113 -8 -139 5 -21 10 -21 10 -5 -3 24 -20 93 -30 117 -17
  40 22 125 3 147 -33 4 -7 65 -28 136 -47 70 -18 125 -35 123 -37 -2 -2 -60 10
  -127 28 -93 24 -133 40 -158 62 -30 26 -39 28 -80 22 -111 -16 -188 5 -255 68
  -16 15 -35 27 -42 27 -8 0 -14 11 -14 25 0 35 -24 79 -56 104 -15 12 -23 21
  -18 21 5 0 2 5 -6 10 -8 5 -33 9 -55 8 l-40 -1 45 -8 45 -7 -52 1 c-28 1 -50
  0 -48 -3 2 -3 -7 -13 -20 -22 -21 -16 -23 -16 -52 11 -17 15 -51 40 -76 56
  -44 28 -49 36 -60 108 -2 9 -9 23 -15 29 -12 12 -16 13 -102 27 l-55 8 43 2
  c24 0 53 -4 65 -10 22 -10 22 -10 2 6 -25 20 -122 17 -117 -3 1 -8 -2 -11 -7
  -8 -5 4 -21 2 -36 -4 -16 -6 -24 -6 -20 0 3 5 -8 16 -25 25 -18 9 -30 23 -30
  36 0 19 -26 79 -35 79 -2 0 3 -16 11 -35 7 -19 14 -42 13 -52 0 -10 -6 0 -13
  22 -34 108 -69 126 -199 102 -9 -2 -23 -10 -30 -17 -10 -12 -9 -12 8 0 19 13
  19 13 4 -4 -15 -16 -18 -16 -52 0 -20 10 -34 20 -32 24 2 4 -13 17 -34 29 -36
  19 -40 26 -46 74 -4 28 -12 59 -17 67 -8 13 -9 13 -5 -1 3 -9 8 -42 11 -75 5
  -52 4 -50 -10 21 -8 43 -20 85 -25 92 -6 6 -8 16 -5 21 17 28 -85 72 -142 62
  -33 -6 -42 -2 -87 34 -27 23 -44 33 -36 23 29 -37 -7 -14 -47 30 -24 27 -41
  40 -38 30 3 -11 2 -16 -4 -12 -6 3 -7 17 -4 30 9 35 -13 91 -46 119 -16 13
  -27 26 -24 29 3 2 -7 2 -21 0 -14 -3 -25 -1 -25 6 0 5 7 8 15 5 9 -4 -3 25
  -29 72 -24 44 -47 79 -52 79 -20 2 -54 17 -50 23 2 4 -22 7 -54 7 -32 0 -56
  -2 -53 -5 2 -3 -13 -12 -34 -21 -38 -16 -38 -16 -75 14 -20 16 -83 80 -138
  141 l-102 111 109 -111 c59 -60 122 -121 138 -135 27 -21 -185 203 -274 291
  l-36 35 35 -40 35 -40 -43 40 c-27 25 -40 45 -37 54 3 9 3 12 -1 8 -4 -4 -18
  3 -31 15 -24 23 -32 44 -10 32 16 -10 -84 105 -114 131 -13 11 5 -13 40 -52
  35 -40 61 -73 58 -73 -10 0 -157 172 -153 178 3 4 -29 44 -71 87 -41 44 -69
  71 -62 60 7 -11 40 -49 73 -85 36 -39 21 -27 -36 29 -53 52 -95 98 -93 101 9
  14 -152 150 -170 144 -5 -2 -24 9 -40 24 -17 15 -24 23 -15 17 10 -6 8 -2 -4
  13 -20 23 -42 31 -30 10 5 -9 2 -9 -9 1 -18 15 -23 26 -7 16 6 -3 10 -4 10 -2
  0 5 -132 105 -159 122 -10 5 -12 4 -7 -3 4 -7 3 -12 -3 -12 -5 0 -13 5 -16 10
  -4 6 -26 10 -50 9 -41 -3 -50 -9 -140 -99z m250 -35 c47 -33 85 -63 85 -66 0
  -4 -60 -58 -132 -120 -181 -155 -311 -285 -338 -338 -17 -35 -21 -56 -18 -98
  l5 -54 -60 -36 c-58 -35 -60 -35 -74 -17 -24 33 -53 150 -53 215 1 98 23 136
  153 258 62 58 162 154 222 213 61 59 113 107 117 105 4 -1 46 -29 93 -62z
  m211 -162 c143 -117 264 -240 475 -485 68 -79 182 -203 253 -276 77 -78 126
  -136 120 -141 -5 -5 -65 -34 -133 -65 l-125 -56 -69 11 c-66 10 -173 8 -227
  -5 -83 -19 -57 -41 -308 261 -126 153 -259 313 -294 355 -34 42 -68 77 -75 78
  -6 0 -44 -31 -84 -70 -77 -74 -99 -85 -99 -46 0 42 89 144 248 284 86 76 174
  154 196 174 23 21 43 38 47 38 3 0 36 -25 75 -57z m-102 -735 c152 -183 273
  -335 269 -339 -12 -11 -465 -279 -473 -279 -12 0 -300 489 -370 629 -46 92
  -47 85 25 123 62 32 156 102 205 152 24 25 50 46 56 46 7 0 137 -149 288 -332z
  m1199 -175 c8 -10 25 -40 36 -67 l21 -48 -29 -33 c-16 -18 -30 -37 -32 -43 -4
  -8 -307 -151 -446 -209 -81 -34 -103 -26 -138 54 -37 82 -32 102 35 135 168
  84 489 226 511 227 14 1 33 -7 42 -16z m-3514 -72 c83 -26 147 -76 221 -173
  144 -188 321 -361 470 -459 80 -53 200 -104 283 -120 70 -13 226 -13 312 1
  235 37 556 167 938 380 120 68 156 80 128 46 -12 -14 -222 -141 -401 -241
  -145 -82 -360 -183 -455 -215 -266 -88 -473 -81 -666 22 -119 63 -225 148
  -424 338 -195 186 -278 252 -355 281 -58 22 -130 24 -180 4 -85 -33 -118 -43
  -161 -49 -46 -7 -47 -7 -68 34 -27 53 -27 91 2 118 53 50 244 68 356 33z
  m2910 -80 c2 -1 -8 -10 -23 -22 -37 -29 -59 -76 -53 -113 3 -18 20 -63 37
  -100 29 -60 38 -71 77 -88 29 -13 54 -17 71 -13 15 3 103 40 196 81 165 74
  187 80 225 55 12 -8 9 -24 -17 -100 -45 -128 -42 -179 15 -227 l24 -21 -98
  -51 -98 -52 -190 84 c-104 47 -296 130 -425 186 -129 56 -238 105 -242 109
  -13 12 147 174 207 210 83 50 141 67 221 65 38 -1 71 -3 73 -3z m752 -31 c13
  -7 19 -21 19 -45 0 -45 -116 -377 -137 -392 -27 -21 -61 -15 -79 12 -16 24
  -14 32 47 212 75 220 92 244 150 213z m-3606 -94 c69 -32 138 -88 290 -236
  295 -287 446 -389 655 -441 266 -67 617 46 1162 374 98 59 184 107 192 107 9
  0 82 -29 163 -64 656 -283 673 -291 673 -304 0 -4 -73 -46 -163 -93 -89 -47
  -331 -176 -538 -288 l-377 -202 -93 27 c-52 14 -98 30 -102 34 -4 4 8 64 28
  133 19 69 35 134 35 145 0 16 -15 25 -77 46 -190 61 -342 106 -361 106 -25 0
  -34 -16 -103 -175 -38 -88 -51 -109 -66 -107 -10 2 -137 36 -283 77 -146 40
  -304 83 -352 96 -49 12 -88 27 -88 34 0 9 -330 114 -406 129 -79 15 -184 51
  -184 63 0 7 3 13 8 13 15 0 55 71 62 110 20 111 -76 313 -186 392 -24 17 -44
  35 -44 40 0 18 106 7 155 -16z m-187 -42 c73 -30 142 -117 187 -237 28 -77 32
  -125 10 -167 -17 -32 -72 -70 -104 -70 -17 0 -24 -11 -38 -60 -16 -60 -21 -65
  -238 -278 -288 -283 -427 -395 -472 -378 -39 15 -1 203 111 545 36 108 85 266
  111 351 26 85 50 166 54 179 13 44 208 129 299 130 23 1 59 -6 80 -15z m4176
  -173 c11 -12 24 -62 37 -138 23 -143 23 -129 -1 -153 -28 -28 -105 -28 -120 0
  -18 34 -48 242 -39 268 16 41 93 56 123 23z m-290 -31 c39 -22 77 -43 84 -48
  7 -5 17 -37 22 -73 6 -35 13 -75 16 -89 9 -40 -10 -15 -66 90 -29 52 -54 97
  -55 99 -2 2 -29 -11 -59 -29 -39 -22 -56 -27 -56 -18 0 20 31 108 37 108 3 0
  38 -18 77 -40z m491 -239 c3 -6 -7 -36 -23 -68 -49 -97 -66 -162 -66 -243 1
  -65 6 -86 38 -154 20 -44 55 -105 78 -135 65 -86 252 -275 358 -359 52 -42
  119 -98 147 -125 57 -51 121 -85 218 -114 51 -15 115 -18 445 -21 690 -6 1583
  45 2045 118 83 13 122 19 180 26 28 3 68 10 90 14 34 8 46 5 83 -16 48 -28
  116 -110 142 -169 9 -22 25 -73 35 -114 l18 -74 -33 -101 c-32 -96 -37 -105
  -104 -172 -79 -79 -165 -130 -321 -192 -97 -39 -257 -92 -275 -92 -5 0 -43 51
  -84 113 -120 183 -222 269 -396 336 -209 81 -487 97 -1155 66 -599 -27 -830
  -20 -1230 41 -118 18 -195 35 -195 44 0 5 14 31 30 57 70 111 102 284 76 418
  -39 198 -164 353 -476 587 -129 96 -148 107 -175 102 -16 -4 -31 -7 -32 -8 -1
  -1 3 -47 8 -101 47 -442 -109 -530 -781 -438 -284 38 -263 34 -248 48 13 13
  448 249 883 480 116 61 245 131 288 154 l78 44 29 -28 c23 -22 41 -29 82 -32
  89 -7 159 46 161 120 l1 35 37 -19 c21 -10 40 -23 44 -28z m209 11 c9 -10 29
  -77 46 -148 27 -116 28 -131 14 -151 -17 -27 -55 -30 -76 -5 -8 9 -28 77 -43
  149 -28 129 -28 133 -10 153 23 25 47 26 69 2z m-124 -172 c29 -136 50 -184
  89 -204 80 -42 160 1 168 90 3 27 1 66 -5 87 -11 38 -7 43 17 28 10 -7 13 -38
  12 -132 -1 -104 1 -130 17 -158 35 -65 118 -89 179 -51 43 26 57 54 63 127 l5
  61 65 -39 c36 -22 64 -44 63 -49 -6 -20 20 -166 34 -193 49 -97 189 -83 226
  24 l12 34 58 -31 59 -31 -54 -47 c-98 -88 -518 -346 -561 -346 -42 0 -320 253
  -434 395 -113 142 -150 251 -123 366 16 68 71 193 80 182 4 -4 17 -55 30 -113z
  m452 -7 c15 -14 18 -32 18 -131 0 -128 -10 -152 -61 -152 -47 0 -59 30 -59
  152 0 95 2 110 20 128 24 24 57 26 82 3z m-2994 -133 c68 -21 125 -40 127 -42
  9 -9 -63 -233 -76 -235 -8 -2 -97 22 -199 51 -130 38 -184 59 -182 68 5 21 85
  202 94 215 10 13 10 13 236 -57z m-1918 6 c0 -11 130 -56 207 -70 51 -10 103
  -28 103 -35 0 -5 -19 -21 -42 -36 -81 -54 -238 -176 -375 -293 -76 -64 -174
  -144 -218 -177 -93 -71 -254 -170 -262 -162 -3 3 2 46 10 94 9 48 19 113 23
  144 l6 57 87 70 c47 38 167 149 266 245 99 97 183 176 188 177 4 0 7 -6 7 -14z
  m4015 -115 c55 -42 148 -123 206 -181 93 -93 112 -117 154 -203 49 -97 49 -98
  52 -210 2 -98 -1 -121 -23 -187 -31 -90 -99 -195 -162 -250 -65 -56 -186 -115
  -278 -136 -236 -52 -608 33 -1176 271 -206 87 -579 253 -590 264 -4 3 99 64
  229 135 l236 128 201 -31 c293 -45 391 -54 560 -49 124 4 163 9 216 27 112 39
  166 93 206 203 12 32 16 80 15 186 l-1 144 28 -18 c15 -9 72 -51 127 -93z
  m-3135 69 c47 -12 186 -50 310 -85 124 -36 275 -77 335 -93 222 -59 620 -173
  628 -181 4 -4 -66 -47 -155 -95 l-162 -87 -36 14 c-19 8 -213 90 -430 182
  -217 92 -447 189 -510 215 -126 52 -132 59 -110 126 9 25 16 33 28 30 10 -2
  55 -14 102 -26z m4406 -28 c20 -13 32 -47 39 -113 9 -84 -2 -109 -50 -109 -42
  0 -51 14 -66 109 -9 62 -8 75 5 96 16 25 50 32 72 17z m-4731 -96 c133 -41
  141 -42 155 -25 14 16 30 11 280 -96 146 -62 377 -160 513 -217 136 -58 249
  -109 249 -114 1 -7 -161 -104 -195 -116 -6 -2 85 -182 130 -256 6 -10 60 14
  222 102 118 63 217 113 220 112 17 -10 445 -202 556 -249 332 -141 656 -253
  850 -293 179 -37 364 -39 480 -6 97 28 174 68 253 132 33 27 62 47 64 45 7 -8
  352 -65 483 -80 219 -26 486 -29 901 -10 450 20 908 16 1039 -9 222 -44 356
  -117 469 -254 56 -70 126 -179 126 -198 0 -14 -118 -44 -305 -78 -748 -135
  -1432 -127 -2700 29 -154 19 -305 37 -335 40 -30 3 -217 29 -415 56 l-360 51
  -108 55 c-342 172 -700 265 -1277 330 -227 25 -882 25 -1060 0 -126 -18 -239
  -43 -319 -72 l-43 -15 -49 36 c-90 66 -143 79 -319 78 -163 0 -307 -20 -512
  -68 -57 -13 -105 -22 -108 -20 -2 3 -14 96 -26 207 -15 148 -18 205 -10 213 6
  6 67 46 136 89 159 99 204 133 375 280 204 175 456 365 485 364 8 0 78 -20
  155 -43z m5186 -154 c18 -15 22 -28 21 -62 -3 -64 -21 -94 -59 -98 -24 -2 -35
  2 -47 21 -22 32 -7 114 24 139 28 22 32 22 61 0z m-156 -31 c-26 -120 22 -201
  121 -201 55 0 111 59 120 128 4 34 11 52 20 52 8 0 90 -18 184 -41 191 -46
  195 -49 139 -114 -38 -43 -76 -55 -314 -95 -267 -45 -358 -76 -533 -184 l-92
  -57 -79 20 c-83 21 -169 59 -190 85 -11 13 -9 18 19 33 17 10 111 65 209 123
  187 111 294 185 350 244 42 44 55 45 46 7z m780 -160 c103 -30 273 -69 330
  -76 28 -3 57 -8 65 -10 35 -10 281 -36 485 -50 356 -25 529 -48 522 -69 -4
  -11 -158 -39 -277 -50 -36 -3 -128 -12 -205 -21 -165 -17 -661 -51 -965 -65
  -271 -13 -960 -13 -960 -1 0 15 200 109 278 130 41 11 133 30 205 41 280 46
  354 75 398 161 14 29 25 39 37 35 9 -3 49 -14 87 -25z m-6140 -747 c33 -8 80
  -27 104 -41 l43 -25 -40 -42 c-53 -55 -64 -78 -64 -141 -1 -96 83 -235 252
  -417 l71 -78 -318 -156 -318 -156 -195 6 c-273 9 -420 40 -449 94 -19 36 -12
  99 23 210 67 209 79 326 52 522 -13 91 -13 96 6 112 25 22 88 41 243 74 257
  53 477 68 590 38z m1535 -10 c388 -32 761 -103 1025 -194 334 -115 601 -286
  862 -551 139 -142 334 -371 324 -382 -4 -4 -149 -2 -322 4 -173 6 -640 9
  -1039 7 -1095 -5 -1561 -2 -1815 11 -266 13 -719 42 -722 45 -1 1 132 69 297
  151 256 127 297 151 290 166 -5 9 -7 18 -5 21 3 3 -36 49 -86 104 -230 250
  -285 366 -216 457 16 21 50 48 77 62 213 108 751 148 1330 99z m6413 -91 c-40
  -350 -381 -541 -1353 -761 -196 -45 -519 -108 -594 -117 -27 -3 -103 -14 -170
  -25 -563 -89 -1215 -140 -1816 -140 l-175 0 -120 147 c-143 178 -389 426 -502
  508 -57 41 -77 61 -65 63 10 2 164 -17 342 -42 179 -25 352 -47 385 -51 33 -3
  166 -19 295 -35 1289 -159 2033 -156 2830 14 188 40 268 62 395 107 280 98
  449 208 515 333 14 25 28 46 32 46 4 0 4 -21 1 -47z m-283 -492 c0 -11 -117
  -106 -199 -161 -70 -47 -245 -133 -356 -175 -186 -70 -591 -170 -870 -214
  -557 -88 -1515 -165 -2500 -201 -438 -16 -1787 -33 -2090 -26 -154 3 -428 8
  -610 11 -904 15 -1482 91 -1677 220 -47 31 -48 42 -6 38 18 -2 121 -8 228 -13
  107 -6 249 -14 315 -20 624 -50 1172 -63 2012 -50 552 8 806 8 1176 -2 571
  -16 1307 -15 1587 1 245 14 589 45 795 71 83 10 176 22 208 25 203 20 878 150
  1178 225 266 67 549 161 694 231 108 51 115 54 115 40z"/>
  <path d="M2505 715 c-587 -13 -577 -11 -609 -79 -20 -42 -21 -125 -2 -170 7
  -18 26 -43 42 -56 l29 -22 436 7 c955 15 1101 20 1136 38 44 23 63 64 63 137
  0 76 -20 124 -59 144 -36 19 -217 19 -1036 1z m1013 -67 c16 -16 16 -133 0
  -145 -7 -6 -67 -13 -134 -16 l-121 -6 -21 45 c-27 54 -20 59 8 5 l20 -40 112
  6 c155 8 165 19 13 15 l-123 -4 -33 61 c-18 33 -35 58 -37 56 -2 -2 1 -13 8
  -24 6 -12 8 -21 6 -21 -3 0 -12 13 -21 30 l-15 29 169 -2 c93 -1 167 0 164 3
  -2 3 -82 7 -176 10 l-172 6 170 2 c122 1 174 -1 183 -10z m-741 -88 l-42 -90
  -86 0 -86 0 -37 80 c-20 43 -36 81 -36 84 0 5 81 9 252 14 l76 2 -41 -90z
  m331 63 c30 -45 76 -133 70 -138 -2 -3 -84 -8 -181 -11 -130 -5 -177 -4 -177
  4 0 7 17 45 37 86 l37 75 50 4 c138 9 143 9 164 -20z m-662 -68 c19 -42 32
  -80 29 -85 -10 -16 -285 -13 -285 3 0 6 14 45 32 85 l32 72 78 0 79 0 35 -75z
  m-283 38 c-4 -10 -8 -11 -13 -3 -4 6 -18 -14 -33 -49 l-26 -61 -55 0 c-59 0
  -66 7 -66 65 0 64 3 66 105 64 77 -1 92 -4 88 -16z"/>
</g>
`;
let airmax97 = `<g transform="translate(0.000000,609.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
  <path d="M3427 6064 c-127 -40 -207 -208 -194 -404 l5 -86 -106 -18 c-135 -23
  -172 -37 -172 -68 1 -34 128 -510 201 -747 10 -35 18 -65 17 -67 -12 -11 -480
  -236 -544 -262 -167 -65 -444 -128 -511 -116 -87 16 -203 89 -393 248 -269
  226 -390 362 -424 479 -8 28 -27 70 -42 91 -26 38 -27 43 -28 195 -1 153 -2
  157 -30 209 -58 103 -151 151 -309 160 -94 5 -99 4 -161 -27 -80 -39 -139
  -103 -194 -208 -54 -104 -68 -183 -52 -300 17 -134 48 -272 97 -443 57 -198
  60 -227 34 -382 -22 -126 -152 -657 -230 -934 -64 -229 -101 -490 -101 -711
  l0 -114 -61 -72 c-76 -90 -155 -245 -164 -321 -6 -46 -2 -72 19 -140 14 -46
  26 -90 26 -97 0 -8 -18 -40 -40 -72 -47 -70 -55 -103 -55 -222 0 -63 6 -104
  19 -138 11 -30 16 -60 12 -78 -3 -17 1 -46 11 -70 15 -38 15 -50 -1 -164 -34
  -259 -15 -393 70 -495 24 -28 27 -38 25 -104 -4 -144 57 -234 211 -308 126
  -61 373 -116 463 -102 31 4 59 0 101 -15 97 -34 442 -77 534 -66 30 3 105 19
  166 36 132 35 225 38 306 10 163 -56 1671 -63 2386 -11 95 7 134 14 165 30 23
  12 71 28 107 36 85 18 429 36 606 32 133 -3 143 -4 181 -30 22 -14 64 -34 94
  -43 61 -18 234 -45 293 -45 23 0 47 -7 58 -17 17 -16 33 -16 189 -5 184 13
  211 21 252 74 23 29 32 32 89 36 54 3 66 1 82 -17 11 -12 29 -21 42 -21 22 0
  64 -34 64 -52 0 -22 87 -48 163 -48 42 0 77 -4 77 -9 0 -15 56 -33 104 -33 25
  -1 63 6 83 15 21 9 63 19 94 22 67 7 112 33 136 78 16 31 21 33 48 26 20 -6
  38 -22 53 -50 28 -49 70 -69 144 -69 31 -1 61 -7 72 -15 30 -23 137 -20 167 4
  13 10 44 22 69 26 25 4 68 18 97 31 28 13 62 24 75 24 39 1 94 25 139 62 55
  45 90 51 143 27 23 -10 53 -19 67 -19 17 0 33 -9 43 -25 22 -34 80 -61 146
  -70 30 -4 75 -16 98 -27 37 -18 49 -19 81 -9 21 6 46 20 56 30 10 12 37 23 64
  27 55 7 88 26 103 59 11 24 11 24 35 5 13 -10 41 -21 62 -25 22 -4 47 -15 57
  -26 39 -43 134 -44 190 0 15 11 40 21 56 21 37 0 97 25 104 44 3 8 19 18 36
  21 16 4 51 26 77 49 43 39 55 43 114 49 36 3 80 2 99 -3 18 -6 45 -10 60 -10
  18 0 33 -8 44 -26 26 -39 71 -57 145 -59 45 -1 76 -7 93 -19 39 -25 98 -18
  111 12 7 16 40 38 102 68 86 41 93 47 114 91 18 41 30 52 73 71 35 15 70 22
  113 22 34 0 73 4 86 9 17 7 40 5 73 -5 64 -19 110 -18 176 5 30 10 66 17 80
  14 21 -4 31 2 49 27 13 18 41 39 61 47 37 15 53 39 77 114 12 36 12 36 56 32
  38 -5 55 1 142 47 53 29 145 82 203 120 58 37 150 93 204 124 166 96 206 125
  278 199 38 40 113 117 168 172 110 111 129 141 166 271 14 49 38 114 53 144
  15 30 31 69 35 85 11 43 8 275 -4 330 -6 25 -15 89 -20 142 -6 58 -18 114 -30
  138 -19 38 -73 85 -98 85 -7 0 -12 4 -12 9 0 16 -83 103 -135 141 -147 109
  -352 174 -925 293 -146 31 -359 72 -475 92 -115 21 -275 50 -355 65 -80 16
  -208 40 -285 55 -399 75 -591 136 -1033 332 -117 51 -234 102 -260 112 -26 11
  -135 61 -242 111 -342 162 -440 205 -645 285 -267 104 -1022 425 -1320 561
  l-120 55 -30 62 c-35 72 -72 101 -142 111 -44 6 -50 10 -67 47 -10 23 -29 44
  -43 50 -44 16 -106 10 -152 -16 -23 -14 -49 -25 -56 -25 -7 0 -46 16 -86 35
  -41 19 -78 35 -84 35 -8 0 -9 14 -2 48 8 39 7 54 -8 86 -37 79 -153 118 -230
  78 l-39 -19 -30 51 c-35 58 -97 96 -164 99 -37 1 -62 -11 -137 -67 -19 -14
  -147 49 -290 145 -71 47 -151 98 -177 113 -58 34 -284 138 -482 222 -167 71
  -188 84 -327 194 -147 117 -237 155 -394 165 -57 3 -94 0 -128 -11z m207 -59
  c101 -21 178 -62 292 -152 138 -110 162 -125 292 -178 63 -25 153 -65 200 -89
  48 -23 110 -50 137 -60 80 -29 182 -87 342 -193 82 -55 185 -114 228 -132 44
  -18 81 -35 83 -36 2 -2 -9 -26 -25 -54 -19 -35 -33 -49 -43 -45 -8 3 -80 17
  -160 32 -123 22 -174 26 -335 26 -167 0 -205 -3 -315 -27 -69 -14 -128 -23
  -131 -19 -4 4 -30 58 -59 121 -28 63 -70 144 -92 180 -23 36 -61 101 -86 145
  l-45 78 -96 -6 c-53 -4 -188 -14 -300 -22 -148 -11 -207 -12 -215 -4 -7 7 -11
  54 -11 118 0 124 20 199 68 257 59 72 136 89 271 60z m-2597 -414 c63 -28 118
  -85 132 -138 12 -41 15 -221 5 -271 -5 -22 -13 -31 -33 -35 -33 -7 -107 -81
  -138 -139 -26 -47 -26 -45 20 87 27 79 31 103 32 200 0 83 -4 121 -18 157 -25
  64 -92 122 -171 148 l-61 20 90 -3 c66 -3 104 -10 142 -26z m-193 -30 c3 -4
  -5 -13 -18 -19 -33 -15 -73 -70 -98 -134 -16 -41 -22 -84 -25 -183 -6 -154 10
  -267 60 -432 l34 -112 -33 -98 c-18 -54 -42 -127 -52 -163 l-20 -65 5 75 c4
  59 -1 94 -20 165 -121 449 -147 588 -128 694 21 111 95 234 159 263 39 18 127
  24 136 9z m3054 -4 c57 -68 262 -454 262 -491 0 -8 -12 -17 -27 -20 -16 -4
  -35 -9 -45 -12 -12 -4 -18 4 -23 28 -16 73 -28 85 -100 93 -67 7 -77 17 -28
  30 44 11 53 22 42 55 -10 27 -15 29 -77 34 -37 3 -110 15 -162 26 -119 25
  -142 25 -138 3 2 -10 -5 -19 -19 -22 -16 -4 -20 -10 -14 -20 5 -8 16 -11 25
  -8 10 4 16 1 16 -8 0 -24 -21 -28 -41 -6 -22 23 -25 51 -6 70 10 10 9 11 -5 6
  -24 -9 -23 -56 0 -86 21 -25 48 -21 60 9 7 17 10 17 61 -4 l54 -22 -42 -7
  c-44 -7 -47 -14 -30 -62 l10 -31 132 -13 c73 -7 124 -15 115 -17 -10 -2 -64 1
  -120 7 -56 5 -104 8 -106 6 -2 -2 1 -19 8 -39 12 -37 12 -37 130 -50 19 -2 2
  -2 -37 -1 -40 1 -73 -2 -73 -6 0 -19 22 -65 36 -76 14 -10 13 -13 -5 -22 -18
  -10 -26 -1 -90 102 -127 203 -163 304 -122 341 19 17 26 18 81 6 33 -7 63 -10
  66 -7 8 8 -78 64 -150 98 -83 39 -159 49 -186 24 -66 -60 -16 -205 167 -483
  52 -79 93 -145 91 -147 -2 -2 -84 -38 -182 -80 -129 -54 -181 -72 -187 -64 -4
  7 -24 71 -44 143 -20 72 -61 217 -90 321 -65 229 -85 314 -77 319 11 6 159 34
  242 45 41 6 174 17 295 26 280 19 309 21 316 23 4 1 11 -4 17 -11z m-2939 -66
  c37 -40 51 -93 51 -196 0 -77 -5 -103 -45 -221 -25 -73 -45 -140 -45 -148 0
  -9 -16 -38 -35 -64 -19 -27 -41 -63 -48 -81 l-14 -33 -26 94 c-44 161 -60 308
  -47 430 13 113 29 157 76 205 51 54 92 58 133 14z m4498 -295 c18 -20 33 -45
  33 -56 0 -31 -69 -162 -83 -157 -7 2 -58 19 -114 38 l-102 33 32 59 c18 32 49
  75 71 94 35 32 43 35 84 30 37 -4 53 -12 79 -41z m271 -86 c55 -34 59 -58 22
  -128 -17 -33 -43 -70 -56 -83 l-24 -23 -58 24 c-31 13 -72 30 -90 37 l-33 14
  31 37 c16 20 30 48 30 63 0 20 10 31 48 52 57 32 86 33 130 7z m-4482 -94 c50
  -152 164 -285 449 -521 189 -157 268 -210 366 -244 l52 -19 -74 -12 c-101 -17
  -190 -7 -264 29 -33 17 -131 87 -218 156 -144 115 -166 137 -249 248 -118 158
  -150 226 -156 327 -4 62 -1 82 13 104 l18 27 23 -22 c13 -12 31 -45 40 -73z
  m-128 48 c-12 -46 -2 -143 23 -210 20 -52 106 -184 187 -287 60 -76 347 -308
  432 -350 63 -31 69 -32 190 -32 107 0 137 4 210 27 47 15 150 43 230 63 196
  49 292 87 558 219 125 61 309 147 409 189 101 43 247 107 325 143 278 128 465
  193 679 236 135 26 404 32 529 10 269 -47 406 -86 629 -179 308 -128 824 -336
  1136 -458 228 -89 387 -157 595 -255 209 -98 477 -216 610 -267 63 -25 288
  -113 500 -198 359 -142 463 -180 695 -250 50 -14 155 -53 235 -85 80 -32 191
  -74 246 -93 200 -70 522 -138 1304 -277 129 -23 336 -64 460 -91 520 -115 693
  -172 827 -274 99 -74 105 -86 115 -254 14 -225 -3 -401 -54 -559 -47 -148 -71
  -168 -323 -262 -330 -124 -643 -217 -805 -239 -748 -105 -2236 -128 -3315 -50
  -507 36 -783 80 -1264 200 -270 68 -375 106 -686 252 -232 108 -269 124 -409
  184 -219 93 -383 139 -656 184 -113 19 -175 23 -380 23 -135 1 -291 -2 -346
  -6 -131 -10 -495 -47 -514 -53 -62 -19 -718 -94 -1060 -121 -364 -29 -731 -6
  -1085 67 -354 73 -576 178 -845 399 l-91 75 6 175 c10 266 54 526 133 780 71
  231 84 279 138 485 29 116 74 287 98 381 26 100 50 218 57 285 14 134 43 202
  119 283 26 28 51 62 55 76 15 50 89 150 111 150 2 0 -2 -16 -8 -36z m4876
  -244 c10 -10 -2 -70 -14 -70 -4 0 -57 21 -117 46 -59 25 -118 50 -131 55 l-23
  9 26 34 26 34 112 -49 c62 -28 116 -54 121 -59z m210 38 c9 -12 16 -36 16 -53
  0 -37 -28 -135 -38 -135 -4 0 -42 14 -85 32 -77 31 -78 32 -72 62 12 59 17 67
  53 91 49 32 105 33 126 3z m168 -99 c10 -5 25 -23 34 -40 14 -27 14 -33 1 -47
  -9 -10 -19 -29 -22 -45 -4 -15 -11 -29 -15 -32 -11 -7 -145 50 -145 61 1 5 7
  35 15 68 l14 58 50 -7 c27 -3 58 -11 68 -16z m188 -195 c69 -33 321 -143 865
  -376 116 -49 289 -120 385 -158 241 -93 399 -161 645 -278 116 -55 234 -110
  263 -122 29 -13 51 -25 48 -27 -2 -2 -156 56 -343 130 -186 75 -423 169 -528
  210 -171 68 -356 149 -765 337 -115 52 -518 218 -672 275 -27 10 -48 21 -48
  25 0 32 65 25 150 -16z m-5789 -150 c-11 -49 -32 -129 -46 -179 -14 -49 -48
  -178 -75 -285 -27 -107 -63 -238 -78 -290 -92 -303 -114 -386 -141 -518 -34
  -166 -49 -289 -57 -476 -5 -97 -9 -125 -17 -111 -13 24 -2 328 17 460 22 151
  42 242 98 440 27 99 74 278 104 398 30 121 76 276 104 347 27 70 62 171 77
  225 33 118 41 112 14 -11z m-410 -1940 c80 -88 303 -252 449 -332 322 -175
  977 -287 1485 -253 374 25 759 66 1217 131 466 67 972 77 1263 26 326 -56 466
  -107 1065 -386 236 -110 382 -161 655 -231 652 -166 1253 -225 2400 -236 571
  -5 1338 8 1530 27 55 6 197 19 315 30 313 29 416 46 600 97 163 44 541 174
  676 232 38 16 71 28 73 25 8 -8 -56 -89 -124 -158 -271 -273 -697 -466 -1362
  -615 -99 -23 -184 -41 -187 -41 -3 0 -6 18 -6 41 0 65 -20 129 -47 146 -27 18
  -95 16 -383 -11 -544 -50 -1361 -46 -2560 14 -217 11 -539 24 -715 30 -296 10
  -705 37 -920 60 -121 13 -506 37 -800 50 -132 6 -341 15 -465 20 -124 6 -360
  15 -525 20 -491 16 -843 31 -965 40 -63 5 -209 12 -325 16 -311 9 -369 -5
  -484 -118 -86 -85 -121 -159 -121 -253 0 -38 7 -99 14 -135 8 -36 12 -67 11
  -69 -2 -2 -28 20 -58 48 -36 34 -70 82 -103 142 -26 50 -58 97 -70 105 -17 11
  -57 14 -189 12 l-168 -3 -13 -61 c-7 -34 -24 -84 -38 -113 -27 -51 -121 -159
  -131 -149 -3 3 6 25 20 50 38 67 41 137 15 328 -12 91 -28 179 -35 195 -12 31
  -13 31 -126 43 -63 6 -229 27 -369 47 -342 47 -471 63 -619 74 -76 6 -127 15
  -132 22 -4 7 -5 26 -2 43 3 18 -4 57 -16 93 -37 111 -25 229 33 313 48 70 52
  103 20 196 -34 105 -29 151 31 270 40 80 134 204 154 204 4 0 18 -12 32 -26z
  m11986 -36 c7 -13 17 -66 23 -118 6 -51 15 -111 20 -134 5 -22 10 -103 10
  -179 0 -133 -1 -139 -30 -197 -16 -32 -43 -105 -59 -161 -37 -128 -69 -178
  -153 -248 -37 -31 -87 -83 -111 -116 -52 -72 -152 -150 -302 -236 -60 -34
  -164 -97 -230 -139 -196 -126 -258 -155 -335 -155 l-65 0 -23 -71 c-21 -66
  -25 -73 -63 -90 -23 -10 -48 -29 -57 -42 -8 -12 -21 -21 -27 -18 -7 2 -41 -4
  -75 -15 -75 -23 -97 -24 -160 -3 -39 13 -56 14 -81 5 -18 -6 -62 -11 -99 -11
  -57 0 -78 -5 -136 -35 -38 -19 -76 -35 -85 -35 -22 0 -57 29 -72 59 -16 31
  -31 32 -35 3 -4 -28 56 -92 88 -92 16 0 21 -5 18 -23 -2 -17 -27 -34 -105 -75
  -60 -30 -103 -59 -103 -67 0 -21 -17 -19 -51 6 -24 17 -39 20 -77 15 -26 -4
  -60 -3 -77 2 -39 11 -102 93 -110 145 -7 36 -28 58 -42 43 -4 -4 -1 -27 5 -53
  7 -25 10 -48 8 -51 -3 -2 -26 1 -51 7 -54 14 -197 -1 -242 -24 -56 -30 -123
  -6 -123 44 0 24 -18 37 -32 23 -13 -13 6 -74 31 -96 42 -38 -15 -99 -100 -109
  -38 -5 -59 -13 -72 -28 -26 -32 -89 -30 -125 3 -15 14 -44 29 -65 32 -48 9
  -73 34 -87 85 -10 39 -13 41 -49 41 -61 0 -101 -11 -101 -28 0 -12 10 -14 55
  -9 63 6 67 0 36 -62 -26 -51 -36 -57 -105 -70 -54 -10 -75 -22 -76 -43 0 -17
  -42 -17 -77 0 -21 11 -60 22 -88 25 -27 3 -62 10 -77 16 -39 15 -80 74 -86
  126 -7 62 -32 62 -32 0 0 -52 -6 -54 -71 -27 -60 25 -229 25 -257 -1 -20 -18
  -96 -23 -121 -8 -8 5 -17 26 -20 47 -7 40 -25 55 -35 28 -10 -27 12 -91 39
  -108 14 -9 25 -23 25 -30 0 -20 -72 -64 -116 -71 -22 -4 -51 -15 -66 -26 -33
  -23 -104 -25 -132 -4 -13 9 -43 15 -81 15 -39 0 -69 6 -83 16 -34 23 -65 92
  -71 159 -4 44 -10 60 -21 60 -12 0 -14 -12 -12 -57 3 -64 -2 -69 -49 -41 -28
  17 -31 17 -60 0 -36 -20 -46 -16 -65 30 -16 37 -34 36 -34 -3 0 -31 54 -88 75
  -80 25 9 17 -21 -11 -43 -14 -11 -46 -23 -72 -26 -26 -3 -68 -13 -94 -21 -65
  -19 -111 -18 -141 6 -20 16 -40 20 -104 20 -43 0 -89 6 -103 13 -27 14 -49 63
  -49 115 -1 21 -6 32 -16 32 -10 0 -15 -10 -15 -29 0 -43 -15 -46 -67 -15 -44
  25 -50 26 -135 20 -49 -4 -100 -11 -114 -16 -21 -8 -26 -6 -34 16 -6 14 -10
  33 -10 43 0 24 -11 33 -25 21 -16 -13 -4 -79 20 -116 10 -16 13 -30 8 -35 -6
  -6 -79 -14 -163 -20 -137 -10 -154 -9 -162 5 -6 11 -24 16 -60 16 -68 0 -252
  27 -308 46 -25 8 -56 23 -70 34 l-25 20 30 -5 c140 -21 292 -36 324 -30 54 9
  131 59 131 85 0 32 -27 35 -61 6 -17 -14 -42 -29 -56 -32 -30 -8 -138 0 -308
  21 -138 17 -510 20 -685 5 -180 -15 -498 -15 -548 -1 -24 7 -61 28 -83 48 -38
  34 -41 35 -57 19 -16 -16 -14 -20 29 -61 64 -60 103 -70 291 -70 l156 0 -59
  -27 c-33 -15 -75 -30 -92 -33 -78 -13 -887 -45 -1141 -45 -382 1 -1064 18
  -1155 29 -58 8 -79 15 -99 35 l-26 25 27 10 c29 11 35 26 15 34 -24 9 -113 -6
  -121 -19 -10 -17 -202 -20 -212 -4 -9 14 -92 13 -101 -2 -4 -6 1 -17 10 -24
  14 -10 15 -17 7 -32 -15 -29 -100 -47 -211 -46 -123 2 -393 40 -446 64 -32 14
  -66 18 -140 17 -189 -1 -441 80 -532 171 -43 43 -62 96 -62 172 0 59 -9 58
  100 17 172 -65 468 -111 675 -104 129 4 149 7 255 42 63 21 134 51 156 66 71
  48 140 157 164 256 l12 53 148 0 149 0 19 -28 c10 -15 34 -56 53 -92 136 -262
  482 -356 1072 -290 98 11 251 24 340 30 89 6 216 15 282 21 66 5 293 14 505
  19 429 11 808 2 1305 -30 861 -56 2532 -53 3400 5 723 49 1412 152 1969 294
  724 185 1177 463 1364 836 81 163 112 331 112 614 l0 203 23 -14 c12 -8 27
  -26 34 -40z m-11922 -1138 c99 -11 191 -22 205 -25 49 -10 625 -85 652 -85 16
  0 31 -7 36 -17 5 -10 20 -96 32 -191 27 -200 21 -252 -34 -325 -65 -85 -141
  -115 -316 -124 -179 -9 -455 31 -645 93 -102 33 -122 44 -167 91 -85 87 -102
  193 -72 444 l19 159 55 0 c30 0 136 -9 235 -20z m2665 -145 c124 -8 385 -19
  580 -25 195 -6 454 -15 575 -20 121 -6 387 -17 590 -25 389 -16 793 -42 1160
  -74 282 -25 514 -39 790 -46 121 -3 391 -15 600 -26 1159 -59 2060 -64 2615
  -13 317 29 331 29 347 9 19 -27 16 -45 -7 -45 -12 0 -20 -7 -20 -16 0 -12 7
  -15 25 -12 23 5 25 3 25 -37 l0 -42 -89 -17 c-49 -9 -91 -16 -94 -16 -2 0 -10
  14 -18 31 -12 30 -11 33 15 55 18 16 40 24 64 24 43 0 72 15 57 28 -6 5 -46 6
  -95 1 -47 -4 -323 -15 -615 -23 -291 -9 -550 -18 -575 -19 -87 -7 -1315 30
  -1815 54 -488 23 -465 23 -465 5 0 -13 11 -16 53 -16 94 0 225 -18 259 -36 44
  -22 45 -24 28 -34 -11 -7 -2 -10 29 -10 l45 0 -30 31 -29 32 94 -7 c52 -3 125
  -6 163 -6 l69 0 -16 -30 c-15 -28 -14 -30 4 -30 10 0 26 11 35 25 16 25 18 25
  155 25 128 0 139 -1 157 -21 14 -16 16 -23 6 -26 -23 -8 -1 -23 34 -23 l36 0
  -22 36 -22 35 123 -6 c331 -15 327 -15 322 -36 -8 -29 25 -36 43 -10 14 19 24
  21 115 21 97 0 135 -9 181 -42 23 -16 35 -2 20 23 -12 19 -10 20 250 17 242
  -3 908 13 1176 28 l113 6 -6 -25 c-4 -16 -1 -38 8 -57 9 -16 14 -30 12 -30 -2
  0 -86 -13 -187 -30 -248 -40 -452 -66 -703 -90 -253 -24 -295 -25 -295 -6 0 7
  -7 27 -15 42 -8 16 -15 38 -15 49 0 11 -5 27 -10 35 -9 13 -11 13 -20 0 -5 -8
  -8 -20 -5 -27 5 -14 -9 -16 -169 -32 -88 -9 -113 -15 -128 -31 -21 -22 -59
  -19 -90 7 -17 15 -38 10 -38 -8 0 -14 62 -49 88 -49 34 0 26 -18 -10 -24 -18
  -3 -99 -7 -180 -10 -115 -4 -146 -2 -142 8 3 7 -7 33 -21 58 -30 55 -43 58
  -222 58 -72 0 -124 4 -128 10 -10 16 -25 1 -25 -26 0 -22 -4 -24 -41 -24 -35
  0 -47 6 -75 36 -28 29 -35 33 -40 19 -11 -26 28 -69 77 -84 24 -8 45 -15 47
  -17 2 -1 -4 -14 -13 -28 -17 -26 -19 -26 -144 -26 -106 0 -131 3 -157 19 -35
  21 -74 93 -74 134 0 30 -26 38 -36 12 -5 -12 -24 -15 -84 -15 -87 0 -110 5
  -110 26 0 8 -7 14 -15 14 -9 0 -15 -10 -15 -26 0 -38 -18 -64 -44 -64 -30 0
  -74 35 -78 62 -4 31 -28 35 -28 5 0 -32 34 -75 73 -90 l31 -13 -35 -26 c-18
  -14 -52 -31 -74 -37 -44 -12 -337 -15 -513 -4 l-112 6 29 18 c39 24 80 86 88
  134 5 29 3 37 -8 33 -7 -2 -17 -19 -21 -36 -11 -41 -26 -40 -68 3 -33 32 -70
  46 -70 26 0 -4 22 -29 49 -54 45 -42 47 -47 32 -61 -51 -46 -166 -53 -233 -13
  -50 29 -72 57 -86 108 -5 20 -16 35 -26 37 -16 4 -18 -1 -11 -35 9 -52 38 -96
  88 -133 l42 -32 -190 7 c-179 6 -445 20 -860 47 -229 15 -1148 14 -1365 -1
  -91 -6 -264 -18 -385 -26 -121 -9 -278 -23 -350 -33 -181 -23 -508 -23 -629 1
  -48 10 -116 28 -149 41 -61 23 -62 23 -81 82 -13 40 -19 91 -20 159 -1 119 13
  153 99 240 64 64 114 91 187 105 63 11 344 5 658 -15z m4294 -508 c3 -13 17
  -40 30 -60 l25 -37 -128 0 c-70 0 -150 -3 -177 -6 l-49 -7 31 34 c17 19 41 49
  53 67 l22 32 94 0 c89 0 93 -1 99 -23z m790 -36 l25 -49 -31 -6 c-17 -3 -102
  -6 -190 -6 l-159 0 14 28 c8 15 17 39 21 55 l6 27 145 0 145 0 24 -49z m753
  15 l21 -33 -161 -10 c-89 -5 -163 -9 -165 -8 -1 1 0 21 4 44 l7 41 136 0 136
  0 22 -34z"/>
  <path d="M3980 4687 c-14 -6 -63 -29 -110 -50 -47 -22 -125 -57 -175 -79 -49
  -22 -110 -49 -135 -60 -25 -12 -70 -32 -100 -45 -120 -54 -139 -63 -145 -73
  -3 -5 26 -78 66 -162 39 -84 87 -186 105 -225 18 -40 36 -73 40 -73 5 0 160
  66 346 147 236 103 338 152 338 162 0 9 -27 88 -61 176 -33 88 -70 185 -81
  215 -32 85 -39 90 -88 67z m117 -239 l81 -212 -316 -138 c-174 -76 -319 -138
  -322 -138 -3 0 -45 89 -94 198 -49 108 -91 200 -93 203 -1 4 4 9 11 12 10 4
  24 -9 41 -39 25 -42 65 -64 51 -27 -4 9 -10 36 -13 60 -7 52 5 55 50 13 52
  -49 77 -34 59 34 -14 49 0 53 32 11 31 -41 63 -48 51 -12 -26 83 -13 98 41 46
  42 -40 57 -31 49 29 l-6 47 33 -38 c47 -53 58 -49 58 24 0 68 9 69 41 8 28
  -55 43 -46 40 24 -1 36 2 57 8 57 6 0 11 -3 11 -7 0 -5 16 -25 36 -46 47 -49
  60 -39 47 37 -6 31 -8 58 -5 61 18 18 37 -18 109 -207z"/>
  <path d="M6532 3817 c-8 -10 -1 -32 29 -87 63 -117 148 -298 172 -365 17 -47
  22 -83 22 -165 0 -96 -2 -110 -29 -165 -38 -76 -116 -154 -193 -193 -90 -46
  -185 -62 -388 -68 l-180 -6 -715 116 c-393 64 -780 127 -860 141 -171 29 -183
  31 -590 96 -283 45 -720 116 -1133 183 -153 26 -198 23 -211 -10 -9 -23 9 -50
  41 -62 15 -6 264 -84 553 -172 289 -88 550 -169 580 -180 30 -10 87 -28 125
  -39 39 -11 232 -70 430 -131 198 -62 387 -120 420 -129 168 -50 400 -123 480
  -151 110 -37 424 -129 560 -164 293 -74 446 -104 670 -131 72 -9 155 -19 185
  -23 30 -4 147 -7 260 -7 l205 0 98 37 c53 20 118 48 143 63 150 88 244 246
  244 410 0 218 -130 465 -447 850 -108 132 -216 230 -340 312 -83 54 -112 63
  -131 40z"/>
  <path d="M1304 2848 c-9 -15 -33 -143 -33 -180 -1 -26 2 -28 38 -28 32 0 40 4
  44 23 11 45 30 178 26 181 -13 11 -69 14 -75 4z"/>
  <path d="M1406 2828 c-17 -76 -27 -181 -18 -190 5 -5 25 -8 43 -6 l34 3 13 99
  c14 109 12 116 -40 116 -21 0 -29 -6 -32 -22z"/>
  <path d="M1594 2668 c-54 -90 -115 -189 -136 -222 -21 -32 -36 -62 -33 -66 3
  -4 25 -11 51 -15 52 -7 66 1 94 56 l19 37 78 -5 c43 -3 80 -7 81 -8 2 -2 6
  -23 9 -47 3 -24 10 -49 16 -55 10 -14 123 -18 131 -5 2 4 0 30 -6 57 -6 28
  -27 136 -47 240 l-36 190 -61 3 -61 3 -99 -163z"/>
  <path d="M2015 2800 c-8 -12 -62 -362 -67 -430 l-3 -45 62 -3 62 -3 6 48 c4
  26 19 131 35 233 15 102 25 188 21 191 -12 13 -109 20 -116 9z"/>
  <path d="M2205 2778 c-11 -35 -75 -461 -70 -466 3 -4 32 -7 63 -7 l56 0 7 40
  c4 22 10 61 13 87 l7 47 62 -5 c84 -7 92 -17 92 -112 l1 -77 59 -6 c33 -3 63
  -4 68 -2 13 7 8 162 -7 198 -13 31 -13 35 6 52 26 23 48 74 48 110 0 37 -33
  89 -67 106 -67 34 -329 61 -338 35z"/>
  <path d="M2683 2748 c-6 -7 -14 -59 -18 -115 l-8 -103 46 0 c52 0 51 -2 63
  138 l6 82 -25 0 c-14 0 -32 2 -40 5 -7 3 -19 0 -24 -7z"/>
  <path d="M2797 2734 c-3 -11 -9 -63 -13 -116 l-6 -98 46 0 c29 0 48 5 50 13 8
  27 21 199 15 203 -3 2 -24 6 -46 10 -35 5 -42 3 -46 -12z"/>
  <path d="M225 1951 c-14 -24 159 -118 326 -176 57 -20 181 -56 274 -81 182
  -48 352 -112 442 -166 64 -39 136 -113 176 -182 19 -33 31 -46 38 -39 17 17
  -37 111 -100 173 -87 87 -287 181 -486 229 -252 61 -460 136 -585 211 -75 44
  -76 44 -85 31z"/>
  <path d="M2900 1669 c-36 -4 -137 -15 -224 -24 -313 -33 -462 -102 -629 -294
  -51 -59 -147 -222 -147 -250 0 -32 30 -2 64 66 71 137 179 256 302 331 116 72
  233 100 534 127 196 18 210 20 210 41 0 15 -10 16 -110 3z"/>
  <path d="M142 1429 c6 -18 31 -23 313 -59 132 -17 361 -49 508 -71 147 -21
  274 -39 282 -39 8 0 15 7 15 15 0 8 -2 15 -4 15 -2 0 -127 18 -277 40 -252 37
  -658 92 -788 107 -43 5 -53 3 -49 -8z"/>
  <path d="M2554 1409 c-248 -22 -401 -102 -506 -263 -42 -65 -45 -76 -24 -76 8
  0 36 32 61 71 97 145 249 219 481 234 125 8 144 12 144 30 0 17 -12 17 -156 4z"/>
  <path d="M5120 1306 c0 -16 13 -19 150 -40 52 -8 187 -31 300 -50 391 -67 757
  -102 1180 -115 239 -8 289 -4 275 19 -2 4 -116 10 -252 13 -410 11 -808 49
  -1183 114 -242 41 -440 73 -457 73 -7 0 -13 -6 -13 -14z"/>
  <path d="M3448 1104 c-17 -17 -5 -23 55 -30 58 -7 60 -8 32 -17 -48 -15 -94
  -55 -131 -112 l-33 -53 -107 2 -106 1 -13 38 c-17 49 -39 73 -100 108 -41 24
  -62 29 -115 29 -76 0 -114 -15 -59 -24 19 -3 57 -7 86 -10 60 -6 113 -30 113
  -51 0 -8 6 -15 13 -15 19 0 38 -38 39 -78 l0 -37 128 3 127 4 7 -35 c8 -45 74
  -120 129 -146 57 -27 165 -28 223 -2 46 21 108 89 126 138 l12 33 152 0 152 0
  11 -43 c20 -82 79 -129 185 -145 63 -10 163 1 205 23 38 19 88 80 102 124 l11
  34 67 -7 c36 -3 148 -9 249 -12 l182 -7 0 -24 c0 -84 98 -153 217 -153 85 0
  166 54 194 128 8 21 14 24 45 19 29 -5 35 -3 30 9 -3 9 -6 18 -6 20 0 2 -11 4
  -24 4 -20 0 -24 6 -30 40 -4 23 -19 54 -37 75 -17 19 -29 35 -28 35 10 0 244
  -41 264 -46 22 -5 44 11 31 23 -13 14 -277 53 -391 58 -137 7 -266 -4 -273
  -22 -2 -9 9 -13 38 -13 l42 0 -26 -31 c-15 -17 -34 -45 -42 -62 l-16 -30 -152
  7 c-83 3 -190 9 -238 12 l-87 7 -16 48 c-33 97 -115 136 -271 126 -98 -6 -179
  -33 -191 -64 -10 -25 19 -34 42 -13 35 32 119 46 245 40 l45 -2 -48 -8 c-55
  -10 -62 -14 -52 -30 4 -7 25 -9 58 -6 81 9 119 -3 139 -45 17 -33 17 -39 2
  -89 -19 -65 -64 -113 -121 -130 -51 -16 -82 -8 -122 29 -29 27 -31 33 -31 100
  0 54 -3 71 -14 71 -30 0 -34 -110 -6 -163 19 -35 19 -37 2 -37 -10 0 -38 10
  -62 23 -53 26 -80 72 -80 135 0 35 -3 42 -20 42 -11 0 -20 -4 -20 -10 0 -6
  -60 -10 -160 -10 l-160 0 -29 -59 c-17 -32 -45 -71 -63 -86 l-32 -27 -29 33
  c-33 39 -57 89 -57 119 0 15 -5 20 -17 18 -34 -6 -11 -83 42 -146 l25 -30 -40
  -7 c-103 -17 -212 48 -241 145 -11 35 -9 43 15 84 14 24 38 54 52 65 39 31
  118 51 198 51 l71 -1 -35 -15 c-37 -16 -70 -42 -70 -56 0 -13 33 -9 54 7 24
  18 109 20 136 3 29 -18 36 -1 13 30 -36 49 -79 66 -165 67 -55 0 -78 4 -78 13
  0 8 -15 12 -42 12 -24 0 -59 3 -78 6 -19 3 -38 2 -42 -2z m2021 -145 c64 -13
  98 -40 112 -89 9 -31 9 -46 -1 -72 -37 -92 -99 -133 -189 -126 -111 8 -171 61
  -171 148 0 112 104 170 249 139z"/>
  <path d="M2204 959 c-3 -6 -2 -14 2 -19 5 -4 120 -10 256 -12 136 -3 250 -7
  253 -9 2 -3 0 -23 -6 -44 -22 -80 33 -160 127 -184 58 -15 91 -14 152 4 70 21
  154 95 108 95 -7 0 -19 -7 -26 -15 -11 -14 -16 -12 -41 17 -24 28 -27 39 -22
  73 3 22 12 50 19 63 13 20 13 22 -5 22 -50 0 -65 -83 -27 -158 l26 -51 -38
  -10 c-84 -24 -162 -10 -208 36 -39 39 -43 70 -18 133 9 23 14 44 10 47 -3 4
  -99 8 -214 10 -114 1 -237 5 -274 7 -40 3 -70 1 -74 -5z"/>
  <path d="M6135 943 c-31 -8 -59 -30 -78 -62 -26 -45 -3 -49 43 -7 39 35 42 36
  125 36 l85 0 -6 -40 c-5 -32 -4 -40 9 -40 9 0 18 12 22 30 4 17 13 30 20 30 8
  0 30 -13 48 -30 35 -30 57 -38 57 -21 0 18 -83 80 -128 95 -43 15 -153 20
  -197 9z"/>
  <path d="M9790 746 c-11 -11 -67 -17 -212 -25 -295 -16 -324 -15 -331 10 -3
  12 -11 19 -19 16 -7 -2 -11 -11 -9 -18 2 -8 6 -26 9 -42 5 -34 22 -45 34 -23
  7 13 25 16 91 16 137 0 461 22 474 32 9 8 9 14 0 29 -14 23 -18 23 -37 5z"/>
</g>
`;
let aj1 = `<g>
  <g transform="translate(0.000000,317.000000) scale(0.100000,-0.100000)">
    <path d="M3619.8,1171.5c-210.7-44.1-417.6-120.7-718.3-260.5c-501.9-233.7-798.8-318-1427.1-396.5c-513.4-67-582.3-86.2-681.9-189.6c-109.2-113-208.8-415.7-229.9-701.1c-15.3-222.2-141.7-934.8-170.5-969.2c-69-80.5-93.9-168.6-107.3-383.1c-7.7-120.7-30.6-302.6-53.6-402.2c-67-304.6-84.3-536.3-74.7-957.8c7.7-339.1,3.8-417.6-26.8-574.7c-46-222.2-38.3-505.7,21.1-735.6c44.1-164.7,59.4-191.5,137.9-231.8c76.6-40.2,486.5-118.8,793-151.3c695.3-74.7,867.7-78.5,3725.7-78.5h2787.1l275.8,44.1c929,147.5,1626.3,455.9,1932.7,850.5c76.6,99.6,82.4,116.8,93.9,258.6c13.4,187.7-17.2,331.4-90,415.7c-32.6,36.4-57.5,93.9-67.1,145.6c-36.4,227.9-193.5,434.8-406.1,532.5c-168.6,76.6-354.4,99.6-628.3,78.5c-377.4-30.6-902.2,32.6-1360,164.7c-197.3,57.5-172.4,44.1-879.2,482.7l-534.4,331.4h-122.6h-120.7l-358.2,229.9l-358.2,229.9l-101.5,174.3c-93.9,159-101.5,182-101.5,291.2c0,147.5-44.1,325.6-103.4,415.7c-32.6,49.8-47.9,109.2-57.5,229.9C4566,485.7,4338.1,962.7,4068,1142.7c-78.5,51.7-107.3,59.4-206.9,57.5C3796,1200.2,3688.7,1186.8,3619.8,1171.5z M3991.4,798c180.1-201.1,293.1-524.9,312.2-898.4c11.5-216.4,13.4-222.2,72.8-277.7c42.1-40.2,65.1-84.3,74.7-141.7l13.4-84.3l-270.1-272c-147.5-151.3-268.2-285.4-268.2-300.7c0-51.7,59.4-111.1,109.2-111.1c38.3,0,99.6,49.8,252.8,201.1l205,201.1l107.3-187.7l109.2-185.8l-84.3-86.2l-84.3-86.2l-310.3,9.6c-404.2,13.4-381.2-11.5-381.2,409.9v308.4l206.9,105.4l205,105.4l5.7,145.6c3.8,124.5,0,149.4-34.5,180.1c-34.5,30.7-49.8,32.6-137.9,11.5c-82.4-19.2-103.4-17.2-126.4,5.7c-46,46-13.4,82.4,105.4,116.9c160.9,46,164.7,53.6,153.2,201.1c-23,283.5-159,469.3-373.5,519.1C3598.7,744.3,2694.6,424.4,1256-232.6C1045.3-328.4,872.9-405,871-401.2c-1.9,1.9,7.7,69,21.1,149.4c32.6,183.9,95.8,356.3,139.8,381.2c19.2,9.6,227.9,44.1,463.6,74.7c697.2,95.8,1015.2,180.1,1450,386.9c308.4,147.5,434.8,199.2,605.3,245.2C3853.5,920.5,3884.1,916.7,3991.4,798z M3868.8,464.7c59.4-30.6,120.7-130.2,141.7-231.8c13.4-55.5,9.6-61.3-70.9-91.9c-105.4-40.2-164.7-101.5-185.8-193.5c-32.6-143.7,63.2-291.2,205-316.1c70.9-11.5,46-24.9-651.3-369.7c-722.2-354.4-726-356.3-863.9-496.1c-103.4-103.4-159-178.1-210.7-287.3l-70.9-149.4h-137.9c-176.2,0-408,38.3-687.7,113c-268.2,70.9-609.1,191.6-609.1,214.5c0,70.9,122.6,681.9,139.8,699.2C928.5-588.9,2393.8,49,2901.5,238.6c379.3,143.7,524.9,191.6,681.9,226C3746.2,499.1,3801.8,499.1,3868.8,464.7z M3638.9-979.6v-170.5l-291.2-143.7c-408-201.1-934.8-388.9-934.8-335.2c0,42.1,120.7,208.8,208.8,285.4c55.6,51.7,252.9,160.9,544,306.5c250.9,126.4,459.7,227.9,465.5,227.9C3635.1-809.2,3638.9-885.8,3638.9-979.6z M3822.8-1577.3c69-42.1,97.7-46,409.9-55.5c321.8-9.6,339.1-11.5,442.5-65.1c59.4-28.7,176.2-113,258.6-187.7c182-159,494.2-373.5,699.2-475c147.5-74.7,149.4-76.6,162.8-166.7c7.7-47.9,7.7-210.7,1.9-358.2c-11.5-304.6-63.2-540.2-166.7-773.9l-63.2-137.9h-164.7c-463.6,0-2400.2,109.2-2564.9,145.6c-36.4,7.7-70.9,61.3-170.5,272c-296.9,626.4-329.5,685.8-411.8,775.8c-46,49.8-80.4,90-76.6,90c3.8,0,254.8-90,557.4-199.2c810.3-295,1172.3-388.8,1572.6-408c348.6-17.2,540.2,51.7,636,224.1c28.7,53.6,36.4,97.7,30.6,220.3c-7.7,206.9-70.9,331.4-254.8,503.8c-124.5,118.8-383.1,289.2-480.8,318c-42.1,13.4-42.1,11.5,7.7-116.8c65.1-174.3,70.9-381.2,11.5-459.7c-23-28.7-69-70.9-101.5-90c-78.5-46-285.4-61.3-425.2-32.6c-57.5,11.5-787.3,222.2-1622.4,465.5l-1519,444.4l11.5,47.9c7.7,26.8,15.3,51.7,17.2,53.6c1.9,1.9,82.4-26.8,180.1-63.2c97.7-36.4,283.5-97.7,411.8-134.1c770-222.2,1239.3-185.8,2005.5,153.2c111.1,49.8,252.9,116.8,316.1,151.3l114.9,61.3l49.8-78.5C3727.1-1494.9,3782.6-1552.4,3822.8-1577.3z M5073.7-1525.6l176.2-113l-67.1-69l-69-67.1l-61.3,59.4c-34.5,32.6-113,93.9-172.4,134.1l-109.2,76.6l51.7,49.8c28.7,28.7,55.6,49.8,61.3,47.9C4889.8-1410.6,4976-1464.3,5073.7-1525.6z M5485.5-1791.8c26.8-19.2,30.6-47.9,26.8-143.6l-5.7-118.8l-109.2,72.8l-109.2,72.8l70.9,70.9C5437.6-1757.3,5439.5-1757.3,5485.5-1791.8z M5968.2-1941.2l126.4-80.4l-113-113l-114.9-113l-69,32.6l-70.9,34.5v159v159h57.5C5818.8-1862.7,5893.5-1893.3,5968.2-1941.2z M1256-2332c377.3-153.2,718.3-300.7,756.6-327.6c38.3-26.8,95.8-84.3,126.4-128.3c61.3-84.3,413.7-817.9,400.3-831.3c-9.6-11.5-664.7,59.4-1304.5,137.9c-626.4,78.5-733.6,95.8-750.9,113c-24.9,24.9-30.6,618.7-7.7,810.3c19.2,162.8,78.5,503.8,86.2,503.8C564.5-2054.2,876.8-2178.7,1256-2332z M6487.3-2264.9l82.4-49.8l-82.4-80.4l-84.3-82.4l-93.8,38.3c-51.7,19.2-128.3,51.7-168.6,69l-74.7,30.6l101.5,103.4l103.4,103.4l67.1-40.2C6376.2-2196,6443.3-2238.1,6487.3-2264.9z M6903-2521.6c57.5-36.4,139.8-76.6,182-90c74.7-21.1,78.5-26.8,78.5-97.7c0-40.2-7.7-72.8-15.3-72.8c-9.6,0-97.7,34.5-197.3,74.7c-99.6,42.1-214.6,88.1-254.8,105.4l-74.7,30.7l63.2,67C6757.4-2429.7,6757.4-2429.7,6903-2521.6z M6452.8-2722.8c227.9-95.8,446.3-185.8,486.5-203l72.8-30.7l-47.9-61.3c-111.1-143.7-226-446.3-268.2-706.8l-13.4-68.9l-195.4-7.7c-107.3-1.9-306.5-1.9-440.6,1.9c-220.3,5.8-245.2,9.6-231.8,38.3c128.3,302.7,187.7,591.9,187.7,934.8c1.9,155.1,9.6,273.9,19.2,273.9S6226.8-2628.9,6452.8-2722.8z M7550.4-2741.9c325.6-76.6,568.9-103.4,950.1-105.4c325.6,0,362-3.8,300.7-24.9c-132.2-46-354.4-82.4-561.2-93.9c-346.7-19.2-488.5-63.2-714.5-224.1c-95.8-67.1-113-72.8-151.3-51.7c-42.1,23-44.1,26.8-30.6,252.9c13.4,206.9,23,283.5,40.2,283.5C7387.6-2705.5,7462.3-2722.8,7550.4-2741.9z M9343.3-3000.5c55.6-65.1,99.6-170.5,99.6-247.1c0-86.2-662.8-283.5-1333.2-396.5c-350.5-59.4-1185.7-149.4-1206.8-130.3c-21.1,23,68.9,329.5,139.8,475c68.9,143.7,68.9,143.7,82.4,82.4c34.5-157.1,147.5-241.3,306.5-231.8c90,5.7,122.6,21.1,212.6,88.1c178.2,134.1,252.9,157.1,603.4,187.7c427.2,36.4,681.9,99.6,892.6,226C9232.2-2893.2,9253.3-2899,9343.3-3000.5z M9577-3510c19.2-36.4,9.6-46-118.8-105.4c-501.9-229.9-1450-388.8-2706.6-452.1c-509.5-24.9-1884.9-13.4-2442.3,21.1c-1021,61.3-2091.7,159-3047.6,277.7c-817.9,101.5-819.8,103.4-806.4,147.5c7.7,30.6,19.2,36.4,69,26.8c34.5-7.6,333.3-46,664.7-88.1c1697.2-212.6,3357.9-325.6,4798.4-325.6c833.3,0,1499.9,49.8,2181.8,164.7c475,78.5,1015.2,222.2,1260.4,333.3C9531.1-3462.1,9552.1-3462.1,9577-3510z M9498.5-3847.2c-53.6-63.2-252.9-204.9-406.1-285.4c-316.1-166.7-733.6-291.2-1268.1-377.4c-268.2-42.1-275.8-42.1-2710.5-46c-3154.9-5.7-3884.7,21.1-4551.3,164.7c-97.7,21.1-99.6,23-122.6,111.1c-13.4,49.8-28.7,162.8-34.5,250.9l-9.6,160.9l103.4-11.5c57.5-5.8,342.9-42.1,637.9-80.5c3208.5-409.9,5982.2-440.6,7627.6-82.4c218.4,46,400.4,101.5,752.8,224.1C9521.5-3818.4,9511.9-3829.9,9498.5-3847.2z"/><path d="M2796.1-311.1c-78.5-51.7-149.4-93.9-157.1-93.9c-9.6-1.9-15.3,32.6-15.3,72.8c0,95.8-15.3,105.4-91.9,57.5c-44.1-24.9-97.7-36.4-182-36.4c-249,0-411.8-90-503.8-279.7c-42.1-88.1-67-113-147.5-155.2l-97.7-47.9l82.4-49.8l80.5-47.9L1643-966.2c-67-42.1-145.6-91.9-178.1-113l-57.5-36.4h157.1c293.1,0,568.9,55.5,787.3,157.1c116.9,55.5,304.6,235.6,419.5,402.3c105.4,151.3,206.9,341,183.9,339C2945.5-217.3,2874.6-259.4,2796.1-311.1z"/>
  </g>
</g>
`;
let aj11 = `<g>
  <g transform="translate(0.000000,298.000000) scale(0.100000,-0.100000)">
    <path d="M3854.4,815.4c-84.7-42.4-196.4-150.2-258-252.2c-30.8-53.9-77-84.7-238.7-157.9c-233-107.8-429.4-159.8-768.2-209.9c-304.2-44.3-1080.1-84.7-1316.9-67.4c-190.6,13.5-259.9-3.9-292.6-75.1c-11.6-21.2-28.9-167.5-40.4-323.5c-36.6-494.8-123.2-901.1-223.3-1037.8c-211.8-292.6-294.6-587.2-329.2-1172.5c-9.6-181-21.2-234.9-57.8-298.4c-63.5-109.7-104-285-104-448.6c0-111.7-13.5-181-61.6-319.6c-57.8-159.8-61.6-196.4-63.5-406.3c0-209.9,3.9-240.7,50.1-336.9c100.1-211.8,194.5-281.1,573.7-412c637.3-221.4,1476.7-240.7,2543.4-57.8c258,44.3,319.6,46.2,741.3,40.4l462.1-5.8l173.3-67.4l173.3-65.5l1422.8-5.8c1186-3.9,1459.4,0,1646.2,25c566,73.2,1087.8,265.7,1538.3,568c221.4,148.3,350.4,271.5,419.7,406.2c50.1,92.4,55.8,123.2,55.8,286.9c0,211.8-17.3,252.2-207.9,516c-142.5,196.4-300.4,344.6-442.8,413.9c-63.5,30.8-340.8,111.7-645,186.8c-747,186.8-1124.4,298.4-1303.5,385.1c-387,184.8-879.9,564.1-1509.5,1153.3c-192.5,182.9-317.7,321.5-498.7,560.3c-465.9,614.2-878,1060.9-1062.8,1155.2C4112.4,852,3952.6,861.6,3854.4,815.4z M4125.9,491.9c104-69.3,177.1-140.5,381.2-373.5c184.8-209.9,512.1-616.1,512.1-635.4c0-11.6-329.2-179.1-336.9-169.4c-1.9,3.8-36.6,88.6-75.1,188.7C4484-185.8,4459-126.1,4382,6.8c-100.1,171.4-252.2,333.1-379.3,406.2l-105.9,59.7l44.3,34.7C3998.8,553.6,4037.3,551.6,4125.9,491.9z M3866,135.7l61.6-44.3l-57.8-27c-30.8-15.4-71.2-50.1-88.6-77c-28.9-50.1-40.4-52-643.1-132.9c-698.9-92.4-679.6-90.5-679.6-57.8c1.9,53.9,40.4,69.3,277.3,109.7c313.8,52,523.7,113.6,737.4,211.8C3667.7,207,3760.1,212.8,3866,135.7z M2246.8-166.5c0-7.7-23.1-100.1-52-206c-46.2-171.4-50.1-229.1-52-529.5c-1.9-373.5,23.1-516,140.5-775.9c119.4-267.6,363.9-583.4,594.9-774c65.5-52,113.6-98.2,109.8-104c-28.9-27-275.3,80.8-837.5,373.5c-354.3,182.9-691.2,348.5-749,363.9c-130.9,38.5-390.8,40.4-512.1,1.9c-52-15.4-98.2-25-102-21.2c-3.9,3.9,13.5,57.8,38.5,119.4l44.3,113.6l259.9,146.3l259.9,148.2l90.5-48.1c50.1-28.9,144.4-105.9,209.9-173.3c119.4-125.1,127.1-127.1,206-57.8c55.8,52,53.9,78.9-5.8,63.5c-42.4-11.6-65.5,3.8-157.9,104c-59.7,65.5-130.9,129-157.9,144.4c-48.1,25-50.1,28.9-46.2,207.9c5.8,209.9,71.2,415.9,154,487.1c63.5,53.9,55.8,130.9-15.4,138.6c-67.4,7.7-109.7-44.3-78.9-94.3c19.3-28.9,13.5-59.7-36.6-171.4c-57.8-129-63.5-132.8-88.6-96.3c-42.4,59.7-129,46.2-136.7-23.1c-3.9-36.6,5.8-57.8,36.6-73.2c42.4-23.1,42.4-23.1-23.1-84.7c-102-92.4-179.1-204.1-159.8-223.3c11.6-11.6,46.2,13.5,90.5,67.4c40.4,48.1,80.9,86.6,90.5,86.6c25,0,23.1-65.5-1.9-123.2c-27-57.8-358.1-285-336.9-231c113.6,285,190.6,648.8,217.6,1018.5l15.4,192.5l452.5,21.2c248.4,11.6,471.7,21.2,496.7,23.1C2227.5-153.1,2246.8-156.9,2246.8-166.5z M4314.6-594c38.5-102,69.3-190.6,69.3-196.4c0-30.8-125.2,27-194.5,90.5c-40.4,36.6-92.4,67.4-115.5,67.4c-23.1,0-132.8-86.6-273.4-217.6c-285-261.9-465.9-410.1-706.6-575.7c-173.3-119.4-514.1-323.5-541-323.5c-23.1,0-132.8,261.9-173.3,415.9c-40.4,152.1-63.5,583.4-32.7,614.2c15.4,15.4,1426.7,279.2,1492.1,279.2c23.1,0,48.1-9.6,55.8-21.2c21.2-34.6,217.6-7.7,275.3,36.6c27,21.2,55.8,32.7,61.6,25C4237.6-405.3,4274.1-493.8,4314.6-594z M5535.2-1123.4c11.6-48.1-310-279.2-388.9-279.2c-13.5,0-30.8,19.3-36.6,44.3c-13.5,48.1-184.8,184.8-259.9,204.1c-48.1,13.5-44.3,21.2,136.7,217.6l186.8,206l179.1-184.8C5448.6-1015.6,5531.4-1109.9,5535.2-1123.4z M4663.1-990.6c-53.9-78.9-63.5-202.2-27-304.2c21.2-57.8,7.7-82.8-358.1-662.3c-269.6-425.5-390.8-604.6-419.7-610.3c-23.1-5.8-125.2-19.3-225.3-28.9c-167.5-15.4-186.8-15.4-248.4,21.2c-100.1,57.8-325.4,233-452.5,348.5l-111.7,102L3040-1986c392.8,246.4,708.5,500.6,1020.4,820.2l167.5,171.4l169.4,3.8c119.4,1.9,186.8,11.6,227.2,34.7C4709.3-907.8,4715.1-913.6,4663.1-990.6z M5999.3-1525.8c105.9-94.3,194.5-177.1,194.5-184.8c0-23.1-65.5-73.2-123.2-96.3c-50.1-19.3-61.6-15.4-96.3,27c-52,61.6-163.7,127.1-217.6,127.1c-30.8,0-48.1,15.4-55.8,50.1c-11.6,48.1,1.9,211.8,25,269.6C5739.3-1296.7,5739.3-1298.6,5999.3-1525.8z M5535.2-1762.6c19.2-34.6,13.5-55.8-44.3-150.2c-75.1-127.1-169.4-346.6-206-479.4l-23.1-90.5l-136.7,15.4c-73.2,7.7-261.8,13.5-417.8,11.6l-283-3.8l281.1,423.6l281.1,421.6h111.7c90.5,0,136.7,13.5,252.2,73.2L5491-1470l11.6-125.1C5508.3-1664.5,5523.7-1739.5,5535.2-1762.6z M6790.6-2145.8c15.4-17.3-46.2-46.2-96.3-46.2c-28.9,0-59.7,9.6-71.2,21.2c-9.6,9.6-69.3,25-129,30.8l-107.8,11.5v119.4c0,65.5,5.8,123.2,11.5,129C6405.5-1870.5,6742.4-2099.6,6790.6-2145.8z M1380.4-2026.4c48.1-17.3,321.5-152.1,606.5-302.3c693.1-363.9,758.6-392.8,993.5-440.9c271.5-57.8,702.7-46.2,1057,27c369.7,75.1,577.6,94.3,856.8,82.8c419.7-19.3,664.2-98.2,1047.4-336.9c236.8-148.3,362-204.1,569.9-248.4c186.8-40.4,531.4-25,712.4,32.7c259.9,80.9,537.2,258,733.6,465.9l98.2,104l512.1-127.1c444.8-109.8,523.7-134.8,616.1-198.3c98.2-63.5,263.8-250.3,263.8-294.6c0-19.3-167.5-121.3-336.9-206c-132.9-65.5-375.4-140.5-554.5-167.5c-192.5-30.8-654.6-15.4-812.5,28.9c-154,42.4-356.2,32.7-471.7-23.1c-86.6-44.3-140.5-88.6-275.3-231c-132.9-144.4-313.8-148.2-542.9-13.5c-367.7,213.7-641.1,302.3-1047.4,336.9c-269.6,25-656.5,1.9-955-53.9c-127.1-25-273.4-32.7-548.7-32.7h-375.4l-346.6,88.6c-706.6,184.8-1320.8,277.3-2064,315.8c-198.3,9.6-261.8,19.3-283,44.3c-13.5,17.3-55.8,100.1-92.4,184.8l-65.5,154l13.5,240.7c7.7,130.9,21.2,298.4,27,371.6l13.5,132.9l84.7,38.5C991.4-1976.3,1205.1-1966.7,1380.4-2026.4z M6174.5-2055.3c0-73.2,36.6-177.1,78.9-225.3c34.7-38.5,34.7-44.3-53.9-298.4c-50.1-140.5-92.4-261.9-94.3-265.7c-3.9-3.9-48.1,19.2-98.2,52c-50.1,30.8-138.6,80.9-192.5,109.8c-55.8,28.9-102,61.6-102,75.1c0,55.8,84.7,321.5,144.4,450.5c52,111.7,73.2,138.6,100.1,130.9c19.3-5.8,65.4-1.9,102.1,5.8C6166.7-1993.7,6174.5-1995.6,6174.5-2055.3z M7252.7-2407.6c0-23.1-17.3-19.2-78.9,17.3c-79,46.2-69.3,69.3,11.5,30.8C7221.9-2376.8,7252.7-2398,7252.7-2407.6z M6933-2430.7c52-90.5,127.1-146.3,250.3-184.8l75.1-23.1l-13.5-100.1c-5.8-53.9-11.5-134.8-11.5-179.1c0-71.2-5.8-80.8-59.7-100.1c-132.9-46.2-375.4-67.4-517.9-46.2c-75.1,11.5-140.5,25-144.4,28.9c-3.9,3.8,27,144.4,65.5,311.9l71.2,308.1l113.6,32.7c63.5,17.3,117.4,32.7,119.4,34.6C6881.1-2347.9,6906.1-2384.5,6933-2430.7z M7724.4-2686.8l-96.3-88.6l-5.8,61.6c-7.7,75.1-3.9,78.9,77,98.2C7816.8-2586.7,7820.6-2598.2,7724.4-2686.8z M598.7-3177.8c80.9-181,192.5-246.4,421.7-246.4c525.6,0,1345.8-117.4,2033.2-290.7c589.2-148.3,897.2-163.7,1455.6-71.2c198.3,32.7,331.2,42.4,645,42.4c535.2,0,729.7-46.2,1114.8-265.7c227.2-130.9,331.1-165.6,491-165.6c175.2,0,325.4,79,444.7,231c119.4,152.1,250.3,186.8,519.9,132.9c610.3-123.2,1184.1-28.9,1688.5,273.4c171.3,104,188.7,102,188.7-25v-73.2l-254.2-125.1c-277.2-136.7-562.2-236.8-829.8-292.7c-146.3-28.9-173.3-30.8-211.8-5.8c-130.9,84.7-177.1,96.3-350.4,96.3c-296.5,0-508.3-80.9-714.3-275.3c-69.3-63.5-152.1-161.7-186.8-217.6l-61.6-104h-100.1c-94.3,0-115.5,11.6-413.9,206c-489,319.6-648.8,379.3-997.3,379.3c-242.6-1.9-338.9-25-770.1-190.6l-317.7-119.4l-750.9-17.3c-1297.7-28.9-1561.5-17.3-2012,82.8c-423.6,92.4-743.2,248.4-947.3,462.1c-129,136.7-177.1,221.4-157.9,281.1c7.7,23.1,13.5,123.2,9.6,221.4c-1.9,96.3,0,177.1,7.7,177.1C548.6-3077.6,575.6-3123.8,598.7-3177.8z M668-4030.7c390.8-300.3,1058.9-485.2,1788.6-492.9c273.4-3.9,109.7-30.8-286.9-46.2c-627.7-26.9-1263,77-1603.8,263.8c-115.5,63.5-167.5,173.3-167.5,352.3c0,77,5.8,144.4,13.5,152.1c7.7,7.7,44.3-21.2,78.9-65.5C527.4-3909.4,606.4-3982.6,668-4030.7z M9129.9-4096.1c-48.1-46.2-433.2-221.4-637.3-288.8c-377.4-125.2-733.6-182.9-1074.4-171.4l-192.5,5.8l107.8,115.5c127.1,136.7,248.4,207.9,421.6,250.3c221.4,52,344.6,34.6,444.8-61.6c48.1-46.2,59.7-48.1,179.1-36.6c146.3,15.4,516,105.9,654.6,161.7C9149.1-4075,9151-4075,9129.9-4096.1z M5852.9-4234.8c75.1-25,219.5-100.1,346.6-184.8l215.6-140.5l-779.8,5.8c-671.9,3.9-793.2,9.6-876,36.6c-200.2,69.3-198.3,75.1,96.3,186.8c144.4,53.9,311.9,111.7,371.6,127.1C5385.1-4163.5,5685.4-4178.9,5852.9-4234.8z"/>
  </g>
</g>
`;
let offWhite = `<g transform="translate(0.000000,397.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
  <path d="M10410 2920 l0 -80 130 0 130 0 0 -350 0 -350 95 0 95 0 0 350 0 350
  125 0 125 0 0 80 0 80 -350 0 -350 0 0 -80z"/>
  <path d="M11200 2570 l0 -430 85 0 85 0 2 333 3 332 74 -332 75 -333 92 0 92
  0 20 88 c11 48 44 195 74 326 l53 239 3 -326 2 -327 95 0 95 0 0 430 0 430
  -139 0 c-136 0 -139 0 -144 -22 -3 -13 -34 -155 -68 -315 -35 -161 -65 -293
  -68 -293 -4 0 -40 142 -81 315 l-75 315 -137 0 -138 0 0 -430z"/>
  <path d="M1375 2641 c-159 -26 -290 -90 -395 -194 -162 -161 -222 -333 -222
  -637 -1 -301 66 -485 235 -654 121 -120 251 -172 457 -183 388 -19 672 174
  769 525 48 175 48 449 0 624 -70 255 -257 447 -493 504 -73 17 -280 26 -351
  15z m261 -302 c58 -18 77 -30 129 -82 107 -109 155 -248 155 -447 0 -258 -90
  -440 -258 -518 -51 -24 -69 -27 -162 -27 -133 1 -186 22 -263 104 -99 108
  -147 250 -147 435 0 140 19 230 70 332 93 190 271 266 476 203z"/>
  <path d="M2740 2609 c-159 -27 -217 -108 -227 -321 l-6 -108 -78 0 -79 0 0
  -115 0 -115 75 0 75 0 0 -470 0 -470 155 0 155 0 0 470 0 470 105 0 105 0 0
  115 0 115 -105 0 -105 0 0 55 c0 46 4 60 29 87 27 30 34 33 105 36 l76 4 0
  129 0 129 -112 -1 c-62 -1 -138 -5 -168 -10z"/>
  <path d="M3473 2609 c-159 -26 -219 -110 -230 -321 l-6 -108 -78 0 -79 0 0
  -115 0 -115 75 0 75 0 0 -470 0 -470 155 0 155 0 0 470 0 470 105 0 105 0 0
  115 0 115 -106 0 -106 0 4 60 c4 49 9 66 31 88 24 23 37 27 102 30 l75 4 0
  129 0 129 -112 -1 c-62 -1 -137 -5 -165 -10z"/>
  <path d="M4534 2583 c37 -124 446 -1544 446 -1548 0 -3 72 -5 160 -5 157 0
  160 0 165 23 17 76 215 1117 215 1132 0 45 19 -7 34 -95 10 -52 62 -309 117
  -570 54 -262 99 -479 99 -483 0 -4 72 -7 160 -7 l159 0 25 83 c61 203 426
  1469 426 1478 0 6 -68 8 -172 7 l-173 -3 -102 -420 c-56 -231 -111 -472 -123
  -535 -12 -63 -24 -122 -27 -130 -3 -8 -18 50 -33 130 -29 150 -187 911 -196
  943 -5 15 -22 17 -180 17 -96 0 -174 -3 -174 -7 0 -4 -37 -180 -81 -392 -45
  -213 -96 -462 -113 -555 l-32 -169 -18 104 c-16 90 -207 953 -222 1002 -5 15
  -23 17 -185 17 -167 0 -180 -1 -175 -17z"/>
  <path d="M8030 2460 l0 -140 155 0 155 0 0 140 0 140 -155 0 -155 0 0 -140z"/>
  <path d="M6710 1800 l0 -790 159 0 160 0 3 388 c3 385 3 387 27 435 37 76 107
  117 198 117 90 0 153 -51 172 -140 7 -32 11 -193 11 -425 l0 -375 160 0 160 0
  0 378 c0 207 -5 419 -10 471 -18 167 -78 255 -220 324 -55 26 -80 32 -157 35
  -128 6 -205 -21 -285 -98 l-58 -56 0 263 0 263 -160 0 -160 0 0 -790z"/>
  <path d="M8670 2340 l0 -160 -80 0 -80 0 0 -115 0 -114 80 6 80 6 0 -384 c0
  -248 4 -398 11 -424 15 -55 64 -100 130 -119 33 -10 111 -19 202 -23 l147 -6
  0 115 0 116 -80 3 c-47 3 -84 9 -92 17 -10 10 -14 91 -16 352 l-3 340 96 0 95
  0 0 115 0 115 -95 0 -95 0 0 160 0 160 -150 0 -150 0 0 -160z"/>
  <path d="M9656 2205 c-142 -36 -266 -132 -332 -258 -133 -254 -102 -645 65
  -805 64 -61 158 -117 246 -145 58 -18 93 -22 200 -22 145 1 208 15 308 67 75
  40 180 147 217 222 50 100 55 96 -130 96 -96 0 -160 -4 -160 -10 0 -20 -66
  -84 -105 -101 -44 -20 -130 -25 -185 -9 -100 28 -174 115 -187 220 l-6 50 428
  0 428 0 -7 103 c-10 146 -30 231 -75 323 -67 136 -147 203 -306 260 -69 24
  -315 30 -399 9z m301 -261 c69 -25 143 -122 143 -189 l0 -25 -256 0 -255 0 7
  23 c53 173 197 249 361 191z"/>
  <path d="M8030 1610 l0 -580 155 0 155 0 0 580 0 580 -155 0 -155 0 0 -580z"/>
  <path d="M3830 1630 l0 -150 305 0 305 0 0 150 0 150 -305 0 -305 0 0 -150z"/>
</g>
`;
let yeezy = `<g transform="translate(0.000000,260.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
  <path d="M760 1635 c0 -8 38 -92 85 -185 l85 -170 0 -160 0 -161 53 3 52 3 3
  156 2 156 85 172 c47 95 85 179 85 187 0 10 -14 14 -55 14 l-55 0 -55 -110
  c-30 -60 -57 -110 -60 -110 -3 0 -30 50 -60 110 l-55 110 -55 0 c-42 0 -55 -3
  -55 -15z"/>
  <path d="M1310 1305 l0 -345 193 2 192 3 0 50 0 50 -137 3 -138 3 0 89 0 89
  128 3 127 3 0 50 0 50 -127 3 -128 3 0 89 0 89 138 3 137 3 0 50 0 50 -192 3
  -193 2 0 -345z"/>
  <path d="M1815 1638 c-3 -7 -4 -162 -3 -343 l3 -330 190 0 190 0 0 50 0 50
  -137 3 -138 3 0 89 0 89 128 3 127 3 0 50 0 50 -127 3 -128 3 0 89 0 90 141 0
  140 0 -3 53 -3 52 -188 3 c-145 2 -189 0 -192 -10z"/>
  <path d="M2314 1636 c-3 -8 -4 -31 -2 -52 l3 -39 118 -3 c64 -1 117 -5 117 -7
  0 -3 -19 -43 -42 -89 l-42 -85 -61 -3 -60 -3 -3 -52 -3 -53 30 0 c17 0 31 -3
  31 -6 0 -4 -23 -49 -51 -100 -42 -78 -50 -101 -47 -136 l3 -43 198 -3 197 -2
  0 55 0 55 -130 0 c-71 0 -130 2 -130 5 0 3 19 43 42 89 l42 85 61 3 60 3 0 50
  c0 47 -2 50 -27 53 -16 2 -28 6 -28 9 0 3 23 49 51 102 40 78 50 105 47 137
  l-3 39 -183 3 c-150 2 -183 0 -188 -12z"/>
  <path d="M2786 1642 c-3 -5 31 -85 77 -178 l82 -169 5 -165 5 -165 53 -3 52
  -3 0 154 0 154 89 184 c49 101 86 188 82 192 -5 5 -30 7 -57 5 l-49 -3 -55
  -107 c-30 -60 -57 -108 -60 -108 -3 0 -30 49 -61 108 l-56 107 -51 3 c-27 2
  -53 -1 -56 -6z"/>
</g>`;
let yeezy350 = `<g>
  <g transform="translate(0.000000,263.000000) scale(0.100000,-0.100000)">
    <path d="M4180.4,118.5c-26.8-13.4-72.7-78.5-111-151.2c-181.8-361.8-558.9-895.8-767.5-1091c-197.1-181.8-520.6-319.6-869-369.4l-88-13.4l-90,187.6c-122.5,250.7-212.5,400-313.9,507.2c-147.4,157-371.3,206.7-620.2,137.8c-130.2-36.4-147.4-55.5-300.5-327.3l-101.5-176.1l-76.6,55.5c-91.9,67-248.8,105.3-363.7,88.1c-124.4-19.1-283.3-118.7-335-212.5c-86.1-153.1-57.4-239.3,201-593.4l158.9-218.2l-47.9-149.3c-88-281.4-105.3-526.4-61.3-824.9l26.8-179.9l-72.7-135.9c-84.2-157-126.3-290.9-143.6-449.8c-23-208.6,74.6-520.6,231.6-733.1c59.3-82.3,82.3-97.6,195.2-130.2c409.6-120.6,1027.9-166.5,2587.8-193.3c3491.3-57.4,5035.9,26.8,6098.2,333.1c195.2,57.4,285.2,103.3,377.1,197.1c239.3,237.4,271.8,618.2,84.2,970.4c-168.4,317.7-436.4,453.6-1429.8,729.2c-174.2,47.9-606.8,179.9-960.9,290.9l-647,202.9v59.3c-1.9,67-28.7,109.1-90,143.6c-49.8,24.9-126.3,11.5-160.8-28.7c-19.1-23-28.7-21.1-74.7,5.7s-55.5,47.9-67,145.5c-9.6,90-23,126.3-67,168.5c-72.7,72.7-181.8,76.6-264.1,7.6c-57.4-47.9-59.3-47.9-116.7-15.3c-55.5,32.5-57.4,38.3-47.9,132.1c17.2,135.9-26.8,222-137.8,277.5c-97.6,45.9-170.4,40.2-258.4-23c-51.7-36.4-61.3-38.3-101.4-11.5l-44,28.7l26.8,189.5c30.6,212.5,19.1,269.9-63.2,323.5c-76.6,51.7-164.6,40.2-292.8-40.2c-65.1-38.3-126.3-63.2-137.8-55.5c-11.5,5.7-45.9,51.7-76.6,99.5c-42.1,67-55.5,111-55.5,185.7c0,114.8-42.1,287.1-95.7,392.4C4523,38.1,4295.3,174,4180.4,118.5z M4406.3-555.2c17.2-178,34.5-229.7,116.8-350.3c47.9-68.9,55.5-89.9,34.4-103.3c-15.3-9.6-214.4-126.3-444.1-258.4c-227.8-132.1-424.9-256.5-434.5-275.6c-51.7-97.6,21.1-229.7,126.3-229.7c32.5,0,231.6,103.4,516.8,268c256.5,147.4,472.8,268,482.3,268c7.7,0,61.3-38.3,114.8-84.2c55.5-47.9,126.3-103.4,157-126.3c32.5-23,57.4-47.9,57.4-55.5c0-9.6-155-137.8-342.6-287.1c-187.6-149.3-348.4-283.3-354.1-300.5c-40.2-107.2,26.8-218.2,134-218.2c53.6,0,126.3,49.8,447.9,306.3l384.7,308.2l172.3-109.1c93.8-59.3,168.4-114.8,166.5-124.4c-3.8-7.7-91.9-112.9-197.1-235.4c-187.6-216.3-193.3-220.1-273.7-222c-103.4,0-176.1-65.1-176.1-153.1c0-36.4,17.2-76.6,47.9-105.3c40.2-42.1,63.2-47.9,189.5-47.9c170.3,0,149.3-17.2,463.2,344.5c124.4,141.7,227.8,258.4,233.5,256.5c26.8-7.7,233.5-132.1,233.5-139.7c0-5.8-91.9-128.2-201-269.9c-216.3-277.5-231.6-319.6-160.8-409.6c30.6-38.3,55.5-49.8,112.9-49.8c84.2,0,90,5.7,354.1,350.3c122.5,160.8,179.9,222,201,212.5c112.9-45.9,1196.3-382.8,1627-505.3c553.2-158.9,930.2-283.3,1058.5-346.4c40.2-21.1,112.9-78.5,160.8-126.3c70.8-72.7,82.3-97.6,72.7-137.8c-21-80.4-93.8-162.7-197.1-218.2c-174.2-93.8-298.6-109.1-960.9-109.1c-1165.7,0-2306.4,67-3569.7,210.5c-273.7,30.6-937.9,91.9-1473.8,134c-993.4,76.6-1364.7,111-1741.8,164.6c-440.2,59.3-784.8,145.5-813.5,199.1c-40.2,74.7-63.2,380.9-40.2,549.3c11.5,91.9,28.7,174.2,38.3,183.7s42.1-19.1,78.5-72.7c65.1-93.8,128.2-132.1,199.1-112.9c24.9,5.7,179.9,145.5,344.5,312c375.2,377.1,371.3,365.6,141.6,576.1c-86.1,78.5-199.1,181.8-248.8,229.7l-91.9,86.1l42.1,65.1l40.2,63.2l53.6-101.4c74.6-147.4,189.5-269.9,319.6-338.8c170.4-90,304.3-118.7,570.4-118.7c601,0,1108.2,197.1,1433.6,558.9c153.1,170.4,442.2,568.5,578.1,798.2l130.2,216.3l34.5-80.4C4375.7-363.8,4396.7-469.1,4406.3-555.2z M1661.5-980.2c42.1-19.1,90-72.7,137.8-149.3c95.7-149.3,201-357.9,187.6-369.4c-23-24.9-229.7,63.2-306.2,130.2c-82.3,72.7-170.4,235.4-195.2,359.8c-11.5,57.4-9.6,59.3,49.8,59.3C1567.7-949.5,1625.1-962.9,1661.5-980.2z M645.1-1368.7c49.8-28.7,166.5-130.2,553.2-476.6l74.6-65.1L1131.3-2052l-141.6-141.7l-277.5,382.8c-153.1,210.5-279.5,394.3-283.3,407.7c-5.8,28.7,61.2,67,120.6,68.9C570.5-1332.3,614.5-1347.7,645.1-1368.7z M790.6-3497.1c72.7-23,132.1-42.1,132.1-42.1c0-1.9-13.4-70.8-28.7-153.1c-34.4-178-36.4-413.4-7.7-581.9c11.5-67,19.1-126.3,15.3-130.2c-3.8-3.8-49.8,3.8-99.5,15.3c-103.4,23-157,76.6-224,227.8c-59.3,135.9-80.4,275.6-57.4,394.3c19.1,105.3,101.4,310.1,124.4,310.1C652.8-3457,717.9-3474.2,790.6-3497.1z M1502.6-3677.1c0-21-13.4-114.8-26.8-206.7c-23-162.7-9.6-411.5,32.5-566.6c13.4-42.1,9.6-44-61.3-34.5c-40.2,7.7-128.2,17.2-193.3,23l-116.7,13.4l-21.1,86.1c-59.3,235.4-61.3,495.8-1.9,712l19.1,70.8l185.7-30.6C1483.5-3636.9,1506.5-3644.5,1502.6-3677.1z M1977.3-3696.2l126.3-13.4l-28.7-116.8c-26.8-116.7-23-493.8,5.7-635.5l13.4-57.4l-179.9,9.6l-178,9.6l-32.5,134c-40.2,172.3-42.1,398.1-3.8,566.6l30.6,135.9l61.2-11.5C1824.2-3679,1908.4-3690.5,1977.3-3696.2z M2603.2-3755.5c76.6-9.6,82.3-15.3,72.7-55.5c-49.8-197.1-55.5-402-17.2-645l11.5-72.7H2496h-172.3l-23,65.1c-51.7,157-57.4,503.4-11.5,648.9c5.7,17.2,15.3,45.9,21.1,61.3C2318-3726.8,2362.1-3726.8,2603.2-3755.5z M3271.2-3807.2c1.9-1.9-9.6-55.5-24.9-118.7c-42.1-178-32.5-403.9,23-589.5c9.6-28.7-7.7-32.5-181.8-32.5h-191.4l-24.9,80.4c-30.6,111-30.6,461.3,1.9,587.6l26.8,103.3l183.8-15.3C3185.1-3797.7,3269.3-3805.3,3271.2-3807.2z M3826.3-3851.2c40.2-7.7,40.2-9.6,11.5-97.6c-32.5-107.2-38.3-398.1-9.6-516.8l19.1-82.3h-178h-176.1l-26.8,91.9c-34.5,116.8-34.5,468.9-1.9,562.7l24.9,72.7l147.4-11.5C3717.2-3837.8,3803.3-3845.5,3826.3-3851.2z M4419.7-3904.8c5.7-5.8,0-84.2-13.4-176.1c-19.1-153.1-17.2-266.1,11.5-413.4l11.5-53.6h-183.8h-181.8l-19.1,72.7c-49.8,185.7-44,388.6,17.2,547.4l21.1,55.5l164.6-11.5C4337.4-3889.5,4415.8-3899.1,4419.7-3904.8z M9526.4-4054.1c-32.5-49.8-80.4-90-137.8-114.8c-118.7-51.7-535.9-155-572.3-141.6c-21.1,7.6-26.8,32.5-23,82.3l5.7,72.7l141.7,13.4c243.1,24.9,453.6,93.8,585.7,195.2C9587.7-3901,9587.7-3960.4,9526.4-4054.1z M4986.2-3966.1c26.8-9.6,30.6-23,19.1-90c-17.2-95.7-17.2-342.6,0-428.7l13.4-63.2h-191.4h-189.5l-15.3,72.7c-19.1,90-19.1,373.2,0,468.9l15.3,74.6l156.9-13.4C4881-3950.8,4967.1-3962.3,4986.2-3966.1z M5545.1-4021.6c36.4-7.6,38.3-23,38.3-268V-4548h-176.1c-178,0-178,0-191.4,53.6c-19.1,68.9-19.1,380.9,0,449.8l15.3,53.6l137.8-11.5C5445.6-4008.2,5524.1-4017.8,5545.1-4021.6z M6180.6-4077.1c1.9,0-5.7-45.9-15.3-97.6c-11.5-53.6-13.4-158.9-7.7-233.5L6171-4548h-181.8c-212.5,0-204.8-9.6-204.8,248.8c0,266.1-7.6,254.6,208.6,239.3C6094.5-4067.5,6178.7-4075.2,6180.6-4077.1z M6691.7-4107.7h59.3v-204.8c0-116.8-7.7-212.5-19.1-220.1c-9.6-7.6-93.8-15.3-185.7-15.3h-164.6l-13.4,124.4c-13.4,114.8,0,283.3,23,323.5c5.7,9.6,63.2,11.5,126.3,3.8C6580.6-4102,6659.1-4107.7,6691.7-4107.7z M7342.5-4169c-7.7-24.9-13.4-111-11.5-191.4c0-149.3,0-149.3-49.8-149.3c-28.7,0-109.1-5.7-178-11.5l-128.3-13.4l-21.1,101.4c-21,99.5-13.4,206.7,21.1,273.7c13.4,26.8,44,32.5,199.1,32.5C7353.9-4126.9,7355.8-4126.9,7342.5-4169z M7918.6-4299.1c0-178,17.2-162.7-222-181.8l-147.4-13.4l-13.4,95.7c-7.7,53.6-3.8,128.2,9.6,174.2l21,78.5h176.1h178L7918.6-4299.1z M8578.9-4201.5c0-30.6,5.7-80.4,11.5-111l11.5-55.5l-225.8-32.5c-178-26.8-227.8-26.8-241.2-7.7c-21.1,32.5-19.1,155,3.8,212.5c17.2,49.8,21,49.8,229.7,49.8h210.5V-4201.5z"/>
  </g>
</g>
`;
let yeezy750 = `<g>
  <g transform="translate(0.000000,343.000000) scale(0.100000,-0.100000)">
    <path d="M2652.1,1653c-814.9-46-1110.1-69-1160-90.1c-72.9-30.7-184.1-145.7-210.9-216.7c-9.6-24.9-23-99.7-30.7-166.8c-9.6-99.7-49.8-197.5-228.2-571.4L807.6,157.5l-51.8-373.9c-113.1-812.9-247.3-1441.8-385.4-1792.7c-44.1-117-94-264.6-107.4-325.9c-36.4-164.9-28.8-611.6,15.3-814.9l34.5-163l-61.4-103.5c-147.6-245.4-191.7-569.5-113.1-807.2c42.2-128.5,141.9-312.5,218.6-402.6c51.8-61.4,63.3-65.2,187.9-70.9c72.9-3.8,1171.5-42.2,2442.7-82.4c1951.9-65.2,2504-76.7,3556.7-76.7c1156.1,0,1265.4,3.8,1514.7,40.3c1075.6,157.2,1698.8,425.6,1806.2,780.4c49.8,168.7,46,554.1-9.6,696c-23,59.4-61.4,124.6-86.3,145.7c-23,21.1-546.5,224.3-1163.8,448.7c-952.9,349-1129.3,419.9-1179.2,469.7c-30.7,32.6-416.1,272.3-855.1,533l-797.6,471.7l-172.6,283.8c-172.6,279.9-174.5,283.8-366.2,866.6L5043,464.3l-49.8,427.6c-74.8,642.3-74.8,642.3-661.5,755.4c-207.1,38.3-423.7,70.9-481.3,69C3792.9,1716.3,3254.1,1687.5,2652.1,1653z M3773.7,1192.8c0-207.1-1.9-220.5-38.3-220.5c-21.1,0-51.8-21.1-69-47.9c-26.8-40.3-26.8-61.4-7.7-143.8c26.8-109.3,86.3-164.9,153.4-143.8c28.8,9.6,57.5-3.8,103.5-44.1c105.5-92,276.1-180.2,513.9-262.7l226.2-78.6L4533,230.3c-222.4-38.3-444.8-166.8-533-308.7c-21.1-36.4-65.2-74.8-95.9-84.4c-74.8-26.8-93.9-82.4-67.1-195.6c23-103.5,82.5-157.2,153.4-138c34.5,7.7,57.5-1.9,92-40.3c44.1-47.9,253.1-159.1,299.1-159.1c44.1,0,44.1-34.5-1.9-117c-30.7-55.6-49.9-132.3-57.5-224.3l-11.5-140l88.2-113.1c90.1-115,141.9-149.6,184.1-122.7c13.4,9.6,103.5,17.3,197.5,17.3h172.6l-9.6-109.3c-5.7-61.3-21.1-120.8-34.5-134.2c-44.1-44.1-23-97.8,74.8-187.9l99.7-90.1l-327.9-506.2l-325.9-506.2l-465.9-9.6c-536.9-11.5-515.8-5.8-774.6-212.8c-143.8-113.1-149.6-116.9-233.9-103.5c-53.7,7.7-82.4,21.1-76.7,34.5c5.8,13.4,74.8,180.2,155.3,372c251.2,600.1,253.1,625,164.9,2059.2c-57.5,910.7-59.4,928-105.5,998.9c-111.2,168.7-381.5,297.2-749.7,360.4c-122.7,21.1-255,38.3-293.3,38.3c-187.9,0-398.8,128.5-483.2,291.4c-34.5,67.1-36.4,90.1-19.2,212.8c23,163,46,186,191.7,187.9c80.5,0,1781.2,95.9,2001.7,111.2C3769.9,1413.3,3773.7,1390.3,3773.7,1192.8z M4314.4,1340.5c163-30.7,295.3-65.2,310.6-80.5c26.8-28.8,120.8-778.4,101.6-799.5c-19.2-17.3-283.8,70.9-444.8,147.6c-205.2,97.8-209,101.6-186,145.7c30.7,57.5-13.4,216.7-67.1,251.2c-40.3,26.8-44.1,42.2-44.1,209c0,132.3,5.8,180.2,24.9,180.2C4021,1394.2,4159.1,1369.2,4314.4,1340.5z M1714.5,491.1c101.6-49.9,166.8-65.2,368.1-88.2c134.2-15.3,249.3-34.5,256.9-40.3c7.7-7.7,40.3-464,72.9-1012.4c65.2-1098.6,63.3-1190.7-28.8-1535.8c-59.4-222.4-128.5-375.8-306.8-678.7l-143.8-239.7l-619.3-63.3c-339.4-32.6-636.6-65.2-659.6-69c-38.3-9.6-44.1,3.8-74.8,138c-42.2,180.2-47.9,604-9.6,734.3c13.4,47.9,57.5,172.6,97.8,278c130.4,339.4,256.9,922.2,383.5,1783.1l55.6,383.5l157.2,329.8l157.2,329.8l84.4-93.9C1557.3,587,1637.8,527.5,1714.5,491.1z M2734.5,241.8C2876.4,170.9,2949.2,92.3,2949.2,6c0-34.5,26.8-479.3,59.4-991.3c61.4-970.2,61.4-1104.4-1.9-1349.8c-32.6-130.4-312.5-828.3-341.3-855.1c-11.5-9.6-245.4,26.8-458.3,70.9c-40.3,7.7-36.4,17.3,74.8,205.2c197.5,333.6,297.2,594.4,350.9,920.3c38.3,241.6,36.4,433.3-19.2,1355.6c-55.6,933.8-55.6,939.5-23,939.5C2606,301.3,2669.3,274.4,2734.5,241.8z M4820.6,40.5c32.6-9.6,57.5-59.4,122.7-249.3c44.1-132.3,76.7-245.4,69-251.2c-5.8-5.8-92-32.6-187.9-57.5c-168.7-42.2-184.1-42.2-291.4-15.3c-61.4,15.3-151.5,46-197.5,67.1c-76.7,34.5-82.4,40.3-63.3,78.6c23,42.2-1.9,193.7-40.3,239.7C4207-116.7,4370-15.1,4483.1,11.8C4646.1,50.1,4753.5,59.7,4820.6,40.5z M5048.7-803.1c88.2-7.7,99.7-15.3,136.1-82.4l38.3-72.9l-101.6-109.3C5020-1177,5018-1177,4889.6-1188.5l-128.5-9.6l-59.4,82.5c-34.5,46-84.4,107.4-113.1,136.1c-47.9,47.9-49.9,55.6-21.1,93.9c15.3,23,53.7,57.5,82.5,76.7C4705.5-772.4,4736.2-770.5,5048.7-803.1z M5447.5-1315c5.8-17.3-122.7-245.4-170.6-299.1c-3.8-3.8-30.7,13.4-63.3,38.3c-44.1,34.5-57.5,61.4-57.5,113.1c-1.9,90.1,11.5,105.4,122.7,140C5401.5-1286.3,5436-1284.4,5447.5-1315z M6444.6-1903.7c418-247.3,761.2-454.4,761.2-460.2c0-13.4-410.3-791.9-462.1-874.3c-21.1-36.4-51.8-65.2-65.2-65.2c-23,0-1733.3,740.1-1750.5,755.4c-3.8,3.8,151.5,253.1,345.1,556c239.7,372,360.4,546.5,381.5,542.6C5669.9-1451.2,6026.6-1656.3,6444.6-1903.7z M7865.3-2797.1c243.5-90.1,444.8-164.9,446.7-168.7c9.6-9.6-1152.3,11.5-1161.9,19.2c-11.5,9.6,24.9,86.3,105.4,232c63.3,115,69,118.9,118.9,99.7C7403.2-2626.5,7623.7-2708.9,7865.3-2797.1z M5537.7-3036.8c391.1-170.6,707.5-312.5,703.7-316.4c-11.5-11.5-1593.3,303-1610.6,318.3c-17.3,15.3,157.2,306.8,182.1,306.8C4820.6-2728.1,5146.5-2868.1,5537.7-3036.8z M4366.2-3176.8c42.2-38.3,1951.9-414.1,2103.3-414.1c214.7,0,395,122.7,506.2,345.1c23,47.9,44.1,88.2,47.9,92c1.9,1.9,433.3-5.8,956.7-15.3l952.9-21.1l184.1-67.1c101.6-36.4,197.5-72.9,210.9-82.4c38.3-21.1-287.6-143.8-538.8-203.2c-471.7-113.1-1039.2-163-1846.4-163c-711.3,0-1188.8,24.9-2019,107.4c-239.7,23-1436.1,228.2-1579.9,270.4c-34.5,9.6-30.7,17.2,28.8,67.1c122.7,105.4,147.6,109.3,571.4,111.2C4258.8-3149.9,4343.2-3155.7,4366.2-3176.8z M2134.4-3326.3c5.7-5.8-3.8-90.1-21.1-189.8c-34.5-199.4-44.1-561.8-21.1-784.2l13.4-143.8l-214.7,5.8c-118.9,3.8-224.3,15.3-235.8,24.9c-32.6,32.6-21.1,638.5,17.3,803.4c67.1,297.2,59.4,283.8,151.5,293.3C1925.4-3305.2,2120.9-3311,2134.4-3326.3z M1503.6-3422.2c-53.7-266.5-70.9-421.8-70.9-659.6c0-147.6,5.8-283.8,13.4-301c11.5-28.8-9.6-32.6-199.4-32.6h-212.8l-15.3,72.9c-7.7,38.3-15.3,182.1-13.4,320.2c0,255,46,492.8,113.1,598.2c28.8,42.2,70.9,51.8,304.9,59.4l93.9,3.8L1503.6-3422.2z M2581.1-3393.4l180.2-32.6l-11.5-76.7c-26.8-193.6-34.5-680.7-13.4-814.9c11.5-76.7,19.2-143.8,17.3-147.6c-3.8-1.9-103.5,0-220.5,5.8c-253.1,13.4-232-19.2-249.3,370c-7.7,193.7-1.9,314.4,21.1,477.4c19.2,120.8,38.3,228.2,42.2,235.8C2360.6-3355.1,2374-3357,2581.1-3393.4z M888.1-3450.9c-90.1-233.9-126.5-678.7-72.9-901.2c9.6-42.2,5.7-44.1-124.6-44.1H554.5l-69,140c-111.2,226.2-111.2,408.4,3.8,636.6c86.3,172.6,107.4,186,349,197.5C891.9-3418.3,899.6-3424.1,888.1-3450.9z M9596.7-3755.8c-5.8-101.6-23-199.4-40.3-232c-55.6-111.2-268.4-218.6-665.3-339.4c-166.8-49.8-665.3-164.9-717.1-164.9c-3.8,0-13.4,49.8-21.1,111.2c-15.4,128.5-72.9,327.9-124.6,429.5l-36.4,70.9l63.3,9.6c32.6,5.8,164.9,23,291.4,40.3c448.7,61.4,820.6,163,1092.9,301l134.2,69l17.3-61.4C9598.6-3554.5,9602.4-3660,9596.7-3755.8z M3208.1-3510.4l172.6-32.6l-9.6-105.4c-5.8-57.5-9.6-272.3-7.7-477.4v-370l-113.1,11.5c-63.3,5.8-151.5,11.5-197.5,11.5h-80.5l-19.2,92c-38.3,170.7-46,414.1-24.9,627c13.4,117,26.8,226.2,32.6,245.4C2974.2-3468.2,2989.5-3468.2,3208.1-3510.4z M3827.4-3627.4c95.9-19.2,180.2-38.3,184.1-42.2c3.8-3.8,0-51.8-9.6-103.5c-23-118.9-28.8-500.4-9.6-640.4l15.3-103.5l-207.1,15.3c-115,7.7-210.9,15.3-212.8,17.2c-1.9,1.9-15.3,90.1-26.8,195.6c-19.2,174.5-15.3,372,15.3,607.8C3589.6-3575.6,3578.1-3577.5,3827.4-3627.4z M4479.3-3746.2l157.2-24.9l-13.4-116.9c-19.2-143.8-19.2-408.4-1.9-544.5l13.4-103.5l-203.2,13.4c-111.2,5.8-207.1,15.4-210.9,19.2c-26.8,24.9-47.9,301-36.4,481.3c15.3,295.3,23,322.1,86.3,310.6C4297.1-3717.5,4391.1-3732.8,4479.3-3746.2z M5196.4-3832.5l72.9-11.5l-15.3-78.6c-7.7-44.1-13.4-205.2-11.5-356.6v-274.2l-187.9,7.7c-111.2,5.8-199.4,19.2-212.8,32.6c-26.9,26.9-32.6,569.5-7.7,659.6l15.3,55.6l138-11.5C5064.1-3817.2,5158-3826.7,5196.4-3832.5z M5884.7-3890c5.7-3.8,3.8-55.6-5.8-117c-11.5-61.4-15.3-209-9.6-325.9l7.7-216.7h-207.1c-115,0-209,1.9-209,5.8c0,1.9-9.6,76.7-19.2,166.8c-17.3,151.5,1.9,454.4,32.6,502.3C5482-3859.3,5855.9-3872.8,5884.7-3890z M6415.8-3909.2l99.7-13.4v-312.5v-314.4h-209c-172.6,0-210.9,5.8-220.5,30.7c-15.3,38.3-15.3,456.3,0,550.3l13.4,70.9h107.4C6266.2-3897.7,6360.2-3903.4,6415.8-3909.2z M7840.4-4022.3c69-153.4,113.1-318.3,113.1-423.7v-78.6l-88.2-13.4c-49.9-5.7-182.1-11.5-297.2-11.5H7363l-1.9,197.5c0,107.4-9.6,241.6-21.1,299.1c-9.6,55.6-19.2,109.3-19.2,118.9c0,17.3,101.6,28.8,312.5,32.6l149.5,3.8L7840.4-4022.3z M7127.1-4010.8c30.7-140,47.9-391.1,32.6-469.7l-13.4-69h-218.6h-220.5v316.4v316.4h199.4H7106L7127.1-4010.8z"/>
  </g>
</g>
`;
