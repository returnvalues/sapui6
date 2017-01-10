sap.ui.jsview("view.CKEditor", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.uiext.editor.CKEditor");
        var oCKEditor = new sapui6.uiext.editor.CKEditor({
            language : "en",
            editable : true,
            width : "100%",
            height : "300px",
            uiColor : ""
        });

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(oCKEditor);

        return oLayout;
	}
});