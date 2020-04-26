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
