sap.ui.jsview("view.InlineForm", {

	createContent : function (oController) {
                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(this.createInlineForm());
                
                return oLayout;
	},

        createInlineForm : function(){
                jQuery.sap.require("sapui6.ui.layout.InlineForm");

                var oCompany = new sap.ui.commons.TextField();
                var oEmail = new sap.ui.commons.TextField();
                var oPhone = new sap.ui.commons.TextField();
                var oButton = new sap.ui.commons.Button({text:"Button", style: sap.ui.commons.ButtonStyle.Accept});

                var settings = [
                        {label:"Company", element:[oCompany]},
                        {label:"Email", element:[oEmail], required:true},
                        {label:"Phone", element:[oPhone]},
                        {element:[oButton], side:"right"}
                ];

                var oInlineForm = new sapui6.ui.layout.InlineForm({
                        width : "800px",
                        margin : "10px",
                        labelBold : true,
                        // strongColor : "#ec7600",
                        // borderColor : "#ffd2a6",
                        // backgroundColor : "#fff",
                        title : "Inline Form"
                });

                oInlineForm.set(settings);

                return oInlineForm;    
        }
});