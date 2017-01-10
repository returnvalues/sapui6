sap.ui.jsfragment("fragments.input.PurchaseOrderNumber", {
    createContent: function(oController) {
        var oTextField = new sap.ui.commons.TextField({width:"99%"});
        oTextField.setMaxLength(35);	

		// oTextField.addStyleClass("");

        return oTextField;
    }
});