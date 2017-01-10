sap.ui.jsfragment("fragments.sap.sd.select.incoterms", {
    createContent: function(oController) {
        var oComboBox = Fragment.ComboBox();
        oComboBox.bindItems("item>/Incoterms", new sap.ui.core.ListItem({key:"{item>key}",text:"{item>text}"}));
        
        // oComboBox.addStyleClass("");

        var dl = new DataLoader(oComboBox, "item");
        dl.setBusyControl(oComboBox);
        dl.load("fragments/sap/sd/select/incoterms.model.json", "", false);

        return oComboBox;
    }
});