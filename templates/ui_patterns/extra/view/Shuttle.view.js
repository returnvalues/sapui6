sap.ui.jsview("view.Shuttle", {

    getControllerName : function() {
        return "view.Shuttle";
    },

	createContent : function (oController) {
        var oHLayout = new sap.ui.layout.HorizontalLayout({width:"100%"});

        var oVLayout1 = new sap.ui.layout.VerticalLayout();
        oVLayout1.addContent(this.createLeftSearchField(oController));
        oVLayout1.addContent(this.createLeftTable(oController));
        oVLayout1.addContent(this.createLeftButtonField(oController));

        var oVLayout2 = new sap.ui.layout.VerticalLayout();
        oVLayout2.addContent(this.createRightSearchField(oController));
        oVLayout2.addContent(this.createRightTable(oController));
        oVLayout2.addContent(this.createRightButtonField(oController));

        oHLayout.addContent(oVLayout1);
        oHLayout.addContent(oVLayout2);
        return oHLayout;
	},

    createLeftSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.InlineForm");

        var oTextField = new sap.ui.commons.TextField(this.getId()+"-textfield1");
        var oButton = new sap.ui.commons.Button({text:"Search", icon:"sap-icon://search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearchLeft});
        
        var settings = [
                {label:"Label1", element:[oTextField]},
                {element:[oButton]}
        ];

        var oInlineForm = new sapui6.ui.layout.InlineForm({
                width : "400px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["100px","200px"],
                title : "Shuttle - Master Data"
        });

        oInlineForm.set(settings);

        return oInlineForm;
    },

    createLeftTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", path:"t>column1", width:"100px", align:"center", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"200px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-left-table",{
            width:"400px", 
            height:"350px",
            columns:columns,
            marginTop:"10px",
            marginBottom:"0px",
            noDataText:"No Data.",
            resize: true,
            selectionMode: "Multiple"
        });
        table.bindRows("t>/LeftTableData");

        return table;
    },

    createLeftButtonField : function(oController){
        var oButton = new sap.ui.commons.Button({text:"Add", icon:"sap-icon://add", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doAdd});
        
        jQuery.sap.require("sapui6.ui.layout.MarginVBox");
        var oMaringVBox = new sapui6.ui.layout.MarginVBox({
            marginTop: "5px",
            content: [
                oButton
            ]
        });
        return oMaringVBox;
    },

    createRightSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.InlineForm");

        var oTextField = new sap.ui.commons.TextField(this.getId()+"-textfield2");
        var oButton = new sap.ui.commons.Button({text:"Search", icon:"sap-icon://search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearchRight});
        
        var settings = [
                {label:"Label1", element:[oTextField]},
                {element:[oButton]}
        ];

        var oInlineForm = new sapui6.ui.layout.InlineForm({
                width : "400px",
                marginLeft : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["100px","200px"],
                title : "Shuttle - Own Data"
        });

        oInlineForm.set(settings);

        return oInlineForm;
    },

    createRightTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", path:"t>column1", width:"100px", align:"center", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"200px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-right-table",{
            width:"400px", 
            height:"350px",
            columns:columns,
            marginLeft:"10px",
            marginTop:"10px",
            marginBottom:"0px",
            noDataText:"No Data.",
            resize: true,
            selectionMode: "Multiple"
        });
        table.bindRows("t>/RightTableData");

        return table;
    },

    createRightButtonField : function(oController){
        var oButton = new sap.ui.commons.Button({text:"Remove", icon:"sap-icon://decline", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doDelete});
        
        jQuery.sap.require("sapui6.ui.layout.MarginVBox");
        var oMaringVBox = new sapui6.ui.layout.MarginVBox({
            marginTop: "5px",
            marginLeft: "10px",
            content: [
                oButton
            ]
        });
        return oMaringVBox;
    }
});