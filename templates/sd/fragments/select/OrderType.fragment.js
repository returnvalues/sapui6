sap.ui.jsfragment("fragments.select.OrderType", {
    createContent: function(oController) {
        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("item>/OrderType", new sap.ui.core.ListItem({key:"{item>AUART}",text:"{item>BEZEI20}"}));
        // oComboBox.addStyleClass("");

        oComboBox.setBusy(true);
        var soldto = "";	
        var salesOrg = "";
        var distributionChannel = "";
        var division = "";
        var params = "KUNNR=" + soldto + "&VKORG=" + salesOrg + "&VTWEG=" + distributionChannel + "&SPART=" + division;
        var oModel = new sap.ui.model.json.JSONModel();
        
        oModel.attachRequestCompleted(function(){
                oComboBox.setModel(oModel,"item");
                oComboBox.setBusy(false);
            }
        );

        oModel.loadData("../fragments/select/OrderType.model.json",params,false);

        return oComboBox;
    }
});