sap.ui.jsview("view.HorizontalForm", {

	createContent : function (oController) {
                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(this.createHorizontalForm());
                
                return oLayout;
	},

        createHorizontalForm : function(){
                jQuery.sap.require("sapui6.ui.layout.HorizontalForm");

                var oEmail = new sap.ui.commons.TextField({width:"70%"});
                var oPassword = new sap.ui.commons.PasswordField({width:"70%"});
                var oCheckBox = new sap.ui.commons.CheckBox({text:"Remember me"});
                var oButton = new sap.ui.commons.Button({text:"Sign in", height:"30px", width:"100px", style: sap.ui.commons.ButtonStyle.Accept});

                var settings = [
                        {label:"Email", element:[oEmail], required:true},
                        {label:"Password", element:[oPassword]},
                        {label:"", element:[oCheckBox]},
                        {label:"", element:[oButton]}
                ];

                var oHorizontalForm = new sapui6.ui.layout.HorizontalForm({
                        width : "800px",
                        margin : "10px",
                        // labelBackgroundColor : "#ffeedd",
                        labelBold : true,
                        labelAlign : "right",
                        // strongColor : "#ec7600",
                        // borderColor : "#ffd2a6",
                        widths : ["30%","70%"],
                        title : "Horizontal Form"
                });

                oHorizontalForm.set(settings);

                return oHorizontalForm;
        }
});