var f1 = [];
var f2 = [];
var f3 = [];
var f4 = [];
var f5 = [];
var f6 = [];
var f7 = [];
var f8 = [];
var f9 = [];
var f10 = [];
var f11 = [];
var f12 = [];
var f13 = [];
var f14 = [];
var f15 = [];

var currftr;
var currLabel;

d3.csv("housing.csv", function(data) {
    data.map(function(d) {
        f1.push(d.BldgType);
        f2.push(+d.LotArea);
        f3.push(d.Neighborhood);
        f4.push(d.HouseStyle);
        f5.push(+d.OverallQual);
        f6.push(d.Foundation);
        f7.push(+d.TotalBsmtSF);
        f8.push(d.CentralAir);
        f9.push(d.Electrical);
        f10.push(+d.GrLivArea);
        f11.push(+d.BedroomAbvGr);
        f12.push(+d.YrSold);
        f13.push(d.SaleType);
        f14.push(d.SaleCondition);
        f15.push(+d.SalePrice);
    });
    currLabel = "Building Type"
    createBarChart(f1);
});