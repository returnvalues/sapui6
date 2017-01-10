sap.ui.jsview("view.BootstrapContainer", {

	createContent : function (oController) {
        	jQuery.sap.require("sapui6.ui.layout.BootstrapContainer");
                var oContainer = new sapui6.ui.layout.BootstrapContainer({className:"container"});

                var oCol1 = new sapui6.ui.layout.BootstrapColumn({className:"col-md-4"});
                oCol1.addContent(new sap.ui.commons.Button({text:"Button1"}));

                var oCol2 = new sapui6.ui.layout.BootstrapColumn({className:"col-md-4"});
                oCol2.addContent(new sap.ui.commons.Button({text:"Button2"}));

                var oCol3 = new sapui6.ui.layout.BootstrapColumn({className:"col-md-4"});
                oCol3.addContent(new sap.ui.commons.Button({text:"Button3"}));

                var oRow = new sapui6.ui.layout.BootstrapRow();
                oRow.addColumn(oCol1);
                oRow.addColumn(oCol2);
                oRow.addColumn(oCol3);

                oContainer.addRow(oRow);

                return oContainer;
	}
});