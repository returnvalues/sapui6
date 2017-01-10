sap.ui.jsfragment("fragments.input.SalesDocumentNumber", {
    createContent: function(oController) {
    	jQuery.sap.require("sapui6.ui.commons.NumberField");
        var oTextField = new sapui6.ui.commons.NumberField();
        oTextField.setMaxLength(10);	

		// oTextField.addStyleClass("");

        return oTextField;
    }
});