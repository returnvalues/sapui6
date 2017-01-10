sap.ui.jsview("view.Layout1c", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.layout.Layout1C");
        var oLayout = new sapui6.ui.layout.Layout1C({
            width : "100%"
            // minWidth : "800px",
            // animation : "slide",
            // visible : true
        });

        oLayout.addContent(new sap.ui.core.HTML({content:'<div style="width:100%;height:200px;font-weight:bold;font-size:100px;text-align:center;background-color:yellow;">A</div>'}));
        oLayout.addContent(new sap.ui.core.HTML({content:'<div style="width:100%;height:200px;font-weight:bold;font-size:100px;text-align:center;background-color:green;">B</div>'}));
        oLayout.addContent(new sap.ui.core.HTML({content:'<div style="width:100%;height:200px;font-weight:bold;font-size:100px;text-align:center;background-color:blue;">C</div>'}));
        oLayout.addContent(new sap.ui.core.HTML({content:'<div style="width:100%;height:200px;font-weight:bold;font-size:100px;text-align:center;background-color:red;">D</div>'}));

        return oLayout;
	}
});