(function(){
var oPopup = null;

sap.ui.jsview("view.OrgChartSelect", {
    createContent : function (oController) {
        jQuery.sap.require("sap.ui.core.Popup");
        jQuery.sap.require("sapui6.ui.chart.OrganizationChart");
        var chart = new sapui6.ui.chart.OrganizationChart({
            width:"1400px",
            height:"600px",
            boxWidth:"160px",
            boxHeight:"100px",
            backgroundColor:"#3e3e3e",
            lineColor:"#fff",
            fontSize:"14px",
            select : this.selectOrg
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
	},

    selectOrg : function(data){
      if(oPopup != null){
        oPopup.close();
      }

      var key = data.getParameter("key");
      var parentKey = data.getParameter("parentKey");
      var selectObj = data.getParameter("obj");

      var content = new sap.ui.core.HTML({content:'<div style="width:200px;height:50px;background-color:#fff;">' + key + '</div>'});

      oPopup = new sap.ui.core.Popup();
      oPopup.setContent(content);
      oPopup.setShadow(true);
      oPopup.setAutoClose(false);
      oPopup.setDurations(0, 0); 

      var eDock = sap.ui.core.Popup.Dock;
      oPopup.open(50, eDock.CenterCenter, eDock.CenterCenter, selectObj, null, null, true);
    }
});

}());