sap.ui.jsview("view.QRCode", {

	createContent : function (oController) {
	       jQuery.sap.require("sapui6.uiext.qrcode.QRCode");

                var oQRCode = new sapui6.uiext.qrcode.QRCode({
                	width:200,
                        height:200,
                        text:"http://sapui6.com",
                        backgroundColor : "#000",
                        foregroundColor : "#fff"
                });

                var oLayout = new sap.ui.layout.VerticalLayout({width:"324px"});
                oLayout.addStyleClass("alignCenter");
                oLayout.addContent(new sap.ui.commons.Label({text:"http://sapui6.com"}));
                oLayout.addContent(oQRCode);

                return oLayout;
	}
});