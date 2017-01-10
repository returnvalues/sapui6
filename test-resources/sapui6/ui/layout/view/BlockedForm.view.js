sap.ui.jsview("view.BlockedForm", {

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(this.createBlockedForm());
        oLayout.addContent(this.createNoLabelBlockedForm());
        
        return oLayout;
	},

    createBlockedForm : function(){
        jQuery.sap.require("sapui6.ui.layout.BlockedForm");

        var oName = new sap.ui.commons.TextField({width:"100%"});
        var oCompany = new sap.ui.commons.TextField({width:"100%"});
        var oEmail = new sap.ui.commons.TextField({width:"100%"});
        var oPhone = new sap.ui.commons.TextField({width:"100%"});
        var oWebsite = new sap.ui.commons.TextField({width:"100%"});
        var oCountry = new sap.ui.commons.TextField({width:"100%"});
        var oComment = new sap.ui.commons.TextArea({width:"100%", rows:4});

        var settings = [
                {label:"Name", element:[oName], required:true},
                {label:"Company", element:[oCompany]},
                {label:"Email", element:[oEmail]},
                {label:"Phone", element:[oPhone]},
                // {label:"Website", element:[oWebsite]},
                {label:"Website", element:[oWebsite], colspan:2},
                {label:"Country", element:[oCountry]},
                {label:"Comment", element:[oComment]}
        ];

        var oBlockedForm = new sapui6.ui.layout.BlockedForm({
                columns : 3,
                width : "800px",
                margin : "10px",
                labelBackground : "#f1f1f1",
                labelBold : true,
                labelAlign : "right",
                widths : ["200px","400px","200px"],
                title : "Blocked Form",
                button : [
                        new sap.ui.commons.Button({text:"Button", style: sap.ui.commons.ButtonStyle.Accept,press:function(){alert("Press Button!")}}),
                ]
        });

        oBlockedForm.set(settings);

        return oBlockedForm;
    },

    createNoLabelBlockedForm : function(){
        jQuery.sap.require("sapui6.ui.layout.BlockedForm");

        var oName = new sap.ui.commons.TextField({width:"100%", placeholder:"Name"});
        var oCompany = new sap.ui.commons.TextField({width:"100%", placeholder:"Company"});
        var oEmail = new sap.ui.commons.TextField({width:"100%", placeholder:"Email"});
        var oPhone = new sap.ui.commons.TextField({width:"100%", placeholder:"Phone"});
        var oWebsite = new sap.ui.commons.TextField({width:"100%", placeholder:"Website"});
        var oCountry = new sap.ui.commons.TextField({width:"100%", placeholder:"Country"});
        var oComment = new sap.ui.commons.TextArea({width:"100%", rows:4, placeholder:"Comment"});
        var oButton = new sap.ui.commons.Button({text:"Save", height:"30px", width:"100px", style: sap.ui.commons.ButtonStyle.Accept});
        var oButton2 = new sap.ui.commons.Button({text:"Cancel", height:"30px", width:"100px", style: sap.ui.commons.ButtonStyle.Emph});


        var settings = [
                {element:[oName]},
                {element:[oCompany]},
                {element:[oEmail]},
                {element:[oPhone]},
                {element:[oWebsite]},
                {element:[oCountry]},
                {element:[oComment], colspan:3},
                {element:[oButton,oButton2], align:"right"}
        ];

        var oBlockedForm = new sapui6.ui.layout.BlockedForm({
                columns : 3,
                width : "800px",
                margin : "10px",
                labelBackground : "#f1f1f1",
                labelBold : true,
                labelAlign : "right",
                widths : ["200px","400px","200px"],
                title : "Blocked Form - No Label",
                button : [
                        new sap.ui.commons.Button({text:"Button", style: sap.ui.commons.ButtonStyle.Accept,press:function(){alert("Press Button!")}}),
                ]
        });

        oBlockedForm.set(settings);

        return oBlockedForm;
    },

    createToolbar : function(){
        var oToolbar = new sap.ui.commons.Toolbar("tb1");
        oToolbar.setDesign(sap.ui.commons.ToolbarDesign.Standard);

        oToolbar.addItem(new sap.ui.commons.TextView({text:"Table Title"}));
        oToolbar.addRightItem(new sap.ui.commons.Button({text:"Search"}));

        return oToolbar;
    }
});