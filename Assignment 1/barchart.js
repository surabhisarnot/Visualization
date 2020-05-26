var isCategorical = true
function createBarChart(data){
    document.getElementById("binWidthUpdate").style.visibility = "hidden";
    isCategorical = true

    console.log("Create bar chart")

    var map = {};

    for(var i =0; i<data.length;i++){
        var key = data[i]
        if(!map[key]){
            map[key] = 1;
        }else{
            map[key]++;
        }
    }

    var svg = d3.select('svg');

    var margin = {top: 60, right: 20, bottom: 100, left: 600};
    var graphWidth = 1300 - margin.left - margin.right;
    var graphHeight = 600 - margin.top - margin.bottom;

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])

    svg.call(tip); 

    var graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr("transform", "translate("+ margin.left +","+ margin.top+")")

    var xAxisGroup = graph.append('g')
        .attr("transform", "translate(0,"+graphHeight+")");
    var yAxisGroup = graph.append('g');
    var y = d3.scaleLinear()
        .domain([0,d3.max(d3.keys(map),d=>map[d])])
        .range([graphHeight,0]);    

    var x = d3.scaleBand()
        .domain(d3.keys(map))
        .range([0,graphWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);

     graph.selectAll("rect")
        .data(d3.keys(map))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d))
        .attr("y", d => y(map[d]))
        .attr("fill", "aquamarine")
        .attr("width", x.bandwidth)
        .attr("height", d=> graphHeight - y(map[d]))
        .on("mouseover", function(d) {
            console.log("Hi")
            d3.select(this)
            .attr("x", x(d) - 5)
            .attr("y", y(map[d]) - 15)         
            .attr("width", x.bandwidth() + 10)
            .attr("height", graphHeight - y(map[d]) + 15)
            .attr("fill", "blue");

            tip.html( "<strong> <span style='color:red'>" + map[d] + "</span></strong>");
            tip.show();

        })
        .on("mouseout", function(d) {
            d3.select(this)   
            .attr("x", x(d))         
            .attr("y", y(map[d]))            
            .attr("width", x.bandwidth)
            .attr("height", graphHeight - y(map[d]))
            .attr("fill", "aquamarine");  
            tip.hide();

        })

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
        .attr("x", graphWidth/2)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text(currLabel)      
          

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr("font-size", "15px");       
}

function fnBldgType(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("BldgType").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f1;
    currLabel = "Building Type";
    createBarChart(f1);
}

function fnNeighborhood(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("Neighborhood").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f3;
    currLabel = "Neighborhood";
    createBarChart(f3);
}

function fnHouseStyle(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("HouseStyle").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f4;
    currLabel = "House Style";
    createBarChart(f4);
}

function fnFoundation(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("Foundation").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f6;
    currLabel = "Foundation";
    createBarChart(f6);
}

function fnCentralAir(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("CentralAir").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f8;
    currLabel = "Central air conditioning";
    createBarChart(f8);
}

function fnElectrical(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("Electrical").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f9;
    currLabel = "Electrical System";
    createBarChart(f9);
}

function fnSaleType(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("SaleType").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f13;
    currLabel = "Sale Type";
    createBarChart(f13);
}

function fnSaleCondition(){
    document.getElementsByClassName("active")[0].className="";
    document.getElementById("SaleCondition").className="active";
    document.getElementById("chart").innerHTML="";
    currFtr = f14;
    currLabel = "Sale Condition"
    createBarChart(f14);
}
