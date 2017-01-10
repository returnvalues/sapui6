sap.ui.jsview("view.BorderedForm", {

	createContent : function (oController) {
                var oLayout = new sap.ui.layout.VerticalLayout({width:"1000px"});
                oLayout.addContent(this.createBorderedForm());
                
                return oLayout;
	},

        createBorderedForm : function(){
                jQuery.sap.require("sapui6.ui.layout.BorderedForm");

                var oFirstName = new sap.ui.commons.TextField({width:"100px",placeholder:"First Name"});
                var oLastName = new sap.ui.commons.TextField({width:"100px",placeholder:"Last Name"});
                var oCompany = new sap.ui.commons.TextField({width:"100%"});
                var oEmail = new sap.ui.commons.TextField({width:"100%"});
                var oPhone = new sap.ui.commons.TextField({width:"100%"});
                var oWebsite = new sap.ui.commons.TextField({width:"100%"});
                var oCountry = new sap.ui.commons.TextField({width:"100%"});
                var oComment = new sap.ui.commons.TextArea({width:"100%", rows:4});

                var settings = [
                        {label:"Name", element:[oFirstName,oLastName], rowspan:2, required:true},
                        {label:"Company", element:[oCompany]},
                        {label:"Email", element:[oEmail]},
                        {label:"Phone", element:[oPhone]},
                        {label:"Website", element:[oWebsite]},
                        {label:"Country", element:[oCountry]},
                        {label:"Comment", element:[oComment]}
                ];

                var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                        columns : 6,
                        width : "100%",
                        margin : "10px",
                        // labelBackgroundColor : "#ffeedd",
                        labelBold : true,
                        // labelAlign : "right",
                        // strongColor : "#ec7600",
                        // borderColor : "#ffd2a6",
                        widths : ["100px","200px","100px","200px","100px","200px"],
                        title : "Borderd Form",
                        button : [
                                new sap.ui.commons.Button({text:"Rows Border",press:function(){if(oBorderedForm.getRowsBorder())oBorderedForm.setRowsBorder(false);else oBorderedForm.setRowsBorder(true);}}),
                                new sap.ui.commons.Button({text:"Columns Border",press:function(){if(oBorderedForm.getColsBorder())oBorderedForm.setColsBorder(false);else oBorderedForm.setColsBorder(true);}}),
                                new sap.ui.commons.Button({text:"Theme Color",press:function(){oBorderedForm.setStrongColor(null);oBorderedForm.setBorderColor(null)}}),
                                new sap.ui.commons.Button({text:"Oragne Color",press:function(){oBorderedForm.setStrongColor("#ff9933");oBorderedForm.setBorderColor("#ffdab5")}}),
                                new sap.ui.commons.Button({text:"Green Color",press:function(){oBorderedForm.setStrongColor("#33cc00");oBorderedForm.setBorderColor("#6fff3e")}}),
                                new sap.ui.commons.Button({text:"Label Background - Theme",press:function(){oBorderedForm.setLabelBackgroundColor(null)}}),
                                new sap.ui.commons.Button({text:"Label Background - Gray",press:function(){oBorderedForm.setLabelBackgroundColor("#ddd")}}),
                                new sap.ui.commons.Button({text:"Label Text Align - Left",press:function(){oBorderedForm.setLabelAlign("left")}}),
                                new sap.ui.commons.Button({text:"Label Text Align - Center",press:function(){oBorderedForm.setLabelAlign("center")}}),
                                new sap.ui.commons.Button({text:"Label Text Align - Right",press:function(){oBorderedForm.setLabelAlign("right")}})
                        ]
                });
        
                oBorderedForm.set(settings);

                return oBorderedForm;
        }
});