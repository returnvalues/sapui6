sap.ui.jsview("view.Signature", {

    createContent : function(oController){
        jQuery.sap.require("sapui6.m.Signature");
        var oSignature = new sapui6.m.Signature({
            width:"524px",
            height:"220px",
            borderStyle:"1px solid #000",
            strokeColor:"#000",
            lineWidth:3
        });

        var oLayout = new sap.ui.layout.VerticalLayout();
        oLayout.addContent(new sap.ui.commons.Button({text:"Clear",press:(oSignature.clear).bind(oSignature)}))
        oLayout.addContent(new sap.ui.commons.Button({text:"Get",press:function(){alert(oSignature.getDataURL());}}));
        oLayout.addContent(oSignature);
        
        return oLayout;
    }
    
});