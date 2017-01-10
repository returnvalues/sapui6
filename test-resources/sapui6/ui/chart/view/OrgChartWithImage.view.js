sap.ui.jsview("view.OrgChartWithImage", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.chart.OrganizationChart");
        var chart = new sapui6.ui.chart.OrganizationChart({
            width:"1400px",
            height:"440px",
            boxWidth:"160px",
            boxHeight:"60px",
            imageWidth:"30px",
            imageHeight:"50px",
            backgroundColor:"#3e3e3e",
            lineColor:"#fff"
        });

        chart.bindItems("t>/OrganizationData3", new sapui6.ui.chart.OrganizationChartItem({
            key:"{t>key}",
            title:"{t>title}",
            subTitle:"{t>subTitle}",
            src:"{t>src}",
            parentKey:"{t>parent}"
        }));

        var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            chart.setModel(oModel,"t");
        });

        oModel.loadData("view/OrgChart.model.json", "", false);
        
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(chart);

        return oLayout;
	}
});