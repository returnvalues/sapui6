sap.ui.jsview("view.Barcode", {

	createContent : function (oController) {
	       jQuery.sap.require("sapui6.uiext.barcode.Barcode");

                var oBarcode = new sapui6.uiext.barcode.Barcode({
                	barWidth:"5",
                        barHeight:"100",
                        code:"12345670"
                        // backgroundColor : "#fff",
                        // foregroundColor : "#000"
                });

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oBarcode);

                return oLayout;
	}
});