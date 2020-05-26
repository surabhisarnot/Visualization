function createScatterPlot(data, label){
    d3.select("#graphId").remove();

    console.log(data[0])
    console.log(data[1])

    var margin = {top: 70, right: 70, bottom: 70, left: 70};
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

    graph.append("g")
        .append("text")
        .attr("transform", "translate("+ 30 +","+(graphHeight/2)+")rotate(-90)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-style", "font-weight:bold")
        .text("PCA Component 1")

        graph.append("g")
        .append("text")
        .attr("transform", "translate("+(graphWidth/2)+","+(graphHeight+margin.top+40)+")")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-style", "font-weight:bold")
        .text("PCA Component 2")

         graph.append("g")
        .append("text")
        .attr("transform", "translate("+(graphWidth/2)+",110)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "30px")
        .attr("font-style", "font-weight:bold")
        .text(label)

    var y = d3.scaleLinear()
    .domain([d3.min(data,d => d[1]),d3.max(data, d=>d[1])])
        .range([graphHeight,0]);

    var x = d3.scaleLinear()
    .domain([d3.min(data,d => d[0]),d3.max(data, d=>d[0])])
    .range([0,graphWidth]);

    graph.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("fill", "#FF6600")
    .attr("stroke", "#fff")
    .attr("cx", function(d,i) { return x(d[0])})
    .attr("cy", function(d,i) { return y(d[1])})
    .attr("r", 3);

    console.log("Hi")
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
}