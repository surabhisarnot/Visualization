function fnLotArea() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("LotArea").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f2;
    currLabel = "Lot Area";
    createHistogram(f2, noOfBins);
}

function fnOverallQual() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("OverallQual").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f5;
    currLabel = "Overall Quality Rating";
    createHistogram(f5, noOfBins);
}

function fnTotalBsmtSF() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("TotalBsmtSF").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f7;
    currLabel = "Basement Area (sq ft)";
    createHistogram(f7, noOfBins);
}

function fnGrLivArea() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("GrLivArea").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f10;
    currLabel = "Ground Living Area";
    createHistogram(f10, noOfBins);
}

function fnBedroomAbvGr() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("BedroomAbvGr").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f11;
    currLabel = "Number of Bedrooms";
    createHistogram(f11, noOfBins);
}

function fnYrSold() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("YrSold").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f12;
    currLabel = "Year in which house was sold";
    createHistogram(f12, noOfBins);
}

function fnSalePrice() {
    document.getElementsByClassName("active")[0].className = "";
    document.getElementById("SalePrice").className = "active";
    document.getElementById("chart").innerHTML = "";
    currFtr = f15;
    currLabel = "Sale Price";
    createHistogram(f15, noOfBins);
}

noOfBins = 15;

function createHistogram(data, noOfBins) {
    document.getElementById("binWidthUpdate").style.visibility = "visible";

    isCategorical = false
    document.getElementById("chart").innerHTML = "";

    var ftrFreq = Array.apply(null, Array(noOfBins)).map(Number.prototype.valueOf, 0);

    var margin = { top: 60, right: 20, bottom: 100, left: 600 };
    var graphWidth = 1300 - margin.left - margin.right;
    var graphHeight = 600 - margin.top - margin.bottom;

    var binValues = [];

    var binWidth = (d3.max(data) - d3.min(data)) / (noOfBins);

    data.forEach(function(d) {
        ftrFreq[Math.floor((d - d3.min(data)) / binWidth)]++;
    });

    var min = d3.min(data);

    for (i = 0; i < noOfBins; i++) {
        var end = (+min + +binWidth).toFixed(1);
        binValues.push(min + "-" + end);
        min = end;
    }

    var svg = d3.select('svg')

    var graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisGroup = graph.append('g')
        .attr("transform", "translate(0," + graphHeight + ")");
    var yAxisGroup = graph.append('g');


    var y = d3.scaleLinear()
        .domain([0, d3.max(ftrFreq)])
        .range([graphHeight, 0]);

    var x = d3.scaleBand()
        .domain(binValues)
        .range([0, graphWidth])
        .padding(0.1);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])

    svg.call(tip);

    graph.selectAll("rect")
        .data(binValues)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d);
        })
        .attr("y", function(d, i) {
            return y(ftrFreq[i]);
        })
        .attr("fill", "aquamarine")
        .attr("width", x.bandwidth())
        .attr("height", function(d, i) {

            return graphHeight - y(ftrFreq[i]);
        })
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("x", x(d) - 5)
                .attr("y", y(ftrFreq[i]) - 15)
                .attr("width", x.bandwidth() + 10)
                .attr("height", graphHeight - y(ftrFreq[i]) + 15)
                .attr("fill", "blue");

            tip.html("<strong> <span style='color:red'>" + ftrFreq[i] + "</span></strong>");
            tip.show();

        })

    .on("mouseout", function(d, i) {
        d3.select(this)
            .attr("x", x(d))
            .attr("y", y(ftrFreq[i]))
            .attr("width", x.bandwidth())
            .attr("height", graphHeight - y(ftrFreq[i]))
            .attr("fill", "aquamarine");

        tip.hide();

    });

    graph.append("g")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 40)
        .attr("x", -200)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text("Frequency Count")

    graph.append("g")
        .append("text")
        .attr("y", 650)
        .attr("x", graphWidth / 2)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text(currLabel)

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');

    changeBinCount();
}