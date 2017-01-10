sap.ui.jsview("view.ScrollingMessage", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.ScrollingMessage");

                var oScrollingMessage = new sapui6.ui.ux3.ScrollingMessage({
                	width: "400px",
                	headerHeight: "30px",
                        // iconHoverColor: "#d9534f",
                        interval : 3000,     // time interval for change items
                        visibleItemCount: 1     // show visible item count
                });

                oScrollingMessage.addItem(new sap.ui.commons.Link({text:"SAPUI6 opened.",href:"http://sapui6.com"}));
                oScrollingMessage.addItem(new sap.ui.commons.TextView({text:"You can get a lot of Components for SAPUI5."}));
                oScrollingMessage.addItem(new sap.ui.commons.TextView({text:"We provide a lot of Custom controls."}));
                oScrollingMessage.addItem(new sap.ui.commons.TextView({text:"We provide a lot of Fragments"}));
                oScrollingMessage.addItem(new sap.ui.commons.TextView({text:"We provide a lot of UI Templates"}));

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oScrollingMessage);

                return oLayout;
	}
});