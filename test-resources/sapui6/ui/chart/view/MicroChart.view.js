sap.ui.jsview("view.MicroChart", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.chart.MicroChart");
        
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(this.createMicroColumnChart());
        oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
        oLayout.addContent(this.createMicroBarChart());
        oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
        oLayout.addContent(this.createMicroLineChart());

        return oLayout;
	},

    createMicroColumnChart : function(){
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

        return chart;
    },

    createMicroBarChart : function(){
        var chart = new sapui6.ui.chart.MicroChart({
            type:"Bar",
            width:"100px",
            height:"30px",
            color:"#ff9900",
            colors:["red","blue"],
            value:"{t>/BarChart}"
        });

        var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            chart.setModel(oModel,"t");
        });

        oModel.loadData("view/chart.model.json", "", false);

        return chart;
    },

    createMicroLineChart : function(){
        var chart = new sapui6.ui.chart.MicroChart({
            type:"Line",
            width:"100px",
            height:"30px",
            color:"#ff0000",
            value:"{t>/LineChart}"
        });

        var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            chart.setModel(oModel,"t");
        });

        oModel.loadData("view/chart.model.json", "", false);

        return chart;
    }
});