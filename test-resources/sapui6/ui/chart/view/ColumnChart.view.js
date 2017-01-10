sap.ui.jsview("view.ColumnChart", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.chart.ColumnChart");
        var chart = new sapui6.ui.chart.ColumnChart({
            width:"800px",
            height:"500px",
            color:"#ff9900",
            colors:["red","red","red"],
            value:"{t>/ColumnChart}"
        });

        var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            chart.setModel(oModel,"t");
        });

        oModel.loadData("view/chart.model.json", "", false);
        
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(chart);

        return oLayout;
	}
});