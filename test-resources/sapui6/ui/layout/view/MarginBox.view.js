sap.ui.jsview("view.MarginBox", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.layout.MarginHBox");
                jQuery.sap.require("sapui6.ui.layout.MarginVBox");

                var oMarginHBox = new sapui6.ui.layout.MarginHBox({
                        marginRight : "10px"
                });
                oMarginHBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginHBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginHBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginHBox.addContent(new sap.ui.commons.Button({text:"test"}));

                var oMarginVBox = new sapui6.ui.layout.MarginVBox({
                        marginBottom : "10px"
                });
                oMarginVBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginVBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginVBox.addContent(new sap.ui.commons.Button({text:"test"}));
                oMarginVBox.addContent(new sap.ui.commons.Button({text:"test"}));

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oMarginHBox);
                oLayout.addContent(oMarginVBox);

                return oLayout;
	}
});