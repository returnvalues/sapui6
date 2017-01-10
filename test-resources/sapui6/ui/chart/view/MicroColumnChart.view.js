sap.ui.jsview("view.MicroColumnChart", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.chart.MicroChart");
        var chart = new sapui6.ui.chart.MicroChart({
            type:"Column",
            width:"100px",
            height:"30px",
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