sap.ui.jsview("view.OrgChartColor", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.chart.OrganizationChart");
        var chart = new sapui6.ui.chart.OrganizationChart({
            width:"1400px",
            height:"600px",
            boxWidth:"160px",
            boxHeight:"100px",
            backgroundColor:"#3e3e3e",
            lineColor:"#fff",
            fontSize:"14px"
        });

        chart.bindItems("t>/OrganizationData4", new sapui6.ui.chart.OrganizationChartItem({
            key:"{t>key}",
            title:"{t>title}",
            subTitle:"{t>subTitle}",
            parentKey:"{t>parent}",
            boxColor:"{t>color}",
            textColor:"{t>textColor}"
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