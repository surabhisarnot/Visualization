function createScreePlot(data,data_cumsum){
    d3.select("#graphId").remove();

    console.log("Inside bar chart")

    var margin = {top: 90, right: 70, bottom: 70, left: 70};
    var graphWidth = 1300 - margin.left - margin.right;
    var graphHeight = 600 - margin.top - margin.bottom;

    var graph = d3.select('body').append('svg')
        .attr("width", graphWidth + margin.left + margin.right)
        .attr("height", graphHeight + margin.top + margin.bottom)
        .attr("id","graphId")
        .attr("class", "svg_container")
        .append('g')
        .attr("transform", "translate("+ margin.left +","+ margin.top+")")

    var xAxisGroup = graph.append('g')
        .attr("transform", "translate(0,"+graphHeight+")");
    var yAxisGroup = graph.append('g')
    .attr("transform", "translate(0,0)");

    var y = d3.scaleLinear()
        .domain([0,d3.max(data_cumsum)])
        .range([graphHeight,0]);

    var x = d3.scaleBand()
        .domain(data.map(function(d,i){
            return (i+1)
        }))
        .range([0,graphWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    var line = d3.line()
    .x(function(d, i) { return x(i+1)+25; })
    .y(function(d) { return y(d); });

    graph.append("path")
    .datum(data_cumsum)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3);

    var h_line = graph.append("line")
        .attr("x1", 0)
        .attr("y1", y(0.75))
        .attr("x2", x(2)+20)
        .attr("y2", y(0.75))
        .attr("stroke-width", 1)
        .attr("stroke", "black")

    var v_line = graph.append("line")
        .attr("x1", x(2))
        .attr("y1", y(0.80))
        .attr("x2", x(2))
        .attr("y2", y(0))
        .attr("stroke-width", 1)
        .attr("stroke", "black")

    graph.selectAll("circle")
    .data(data_cumsum)
    .enter()
    .append("circle")
    .attr("fill", "#FF6600")
    .attr("stroke", "#fff")
    .attr("cx", function(d, i) { return x(i+1) +25 })
    .attr("cy", function(d) { return y(d) })
    .attr("r", 5);

     graph.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(i+1))
        .attr("y", d => y(d))
        .attr("fill", "#FF6600")
        .attr("width", x.bandwidth)
        .attr("height", d=> graphHeight - y(d))

        graph.append("g")
        .append("text")
        .attr("transform", "translate("+ 30 +","+(graphHeight/2)+")rotate(-90)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-style", "font-weight:bold")
        .text("Eigen Values")

        graph.append("g")
        .append("text")
        .attr("transform", "translate("+(graphWidth/2)+","+(graphHeight+margin.top+30)+")")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-style", "font-weight:bold")
        .text("PCA Axis")

         graph.append("g")
        .append("text")
        .attr("transform", "translate("+(graphWidth/2)+",100)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "30px")
        .attr("font-style", "font-weight:bold")
        .text("Scree Plot showing intrensic dimentionality of data")


    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

}