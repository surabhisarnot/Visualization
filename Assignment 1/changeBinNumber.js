function changeBinCount() {
    d3.select("#binWidthUpdate").on("mousedown", function() {
        if (!isCategorical) {
            var div = d3.select(this)
                .classed("active", true);

            var xPosition = d3.mouse(div.node())[0];
            var graphWidth = d3.select(window)
                .on("mousemove", mousemove)
                .on("mouseup", function() {
                    div.classed("active", false);
                    graphWidth.on("mousemove", null).on("mouseup", null);
                });

            function mousemove() {
                if (d3.mouse(div.node())[0] + 20 < xPosition && noOfBins < 25) {
                    noOfBins += 1;
                    createHistogram(currFtr, noOfBins);
                    xPosition = d3.mouse(div.node())[0];
                } else if (d3.mouse(div.node())[0] - 20 > xPosition && noOfBins > 4) {
                    noOfBins -= 1;
                    createHistogram(currFtr, noOfBins);
                    xPosition = d3.mouse(div.node())[0];
                }
            }
        }
    });
}