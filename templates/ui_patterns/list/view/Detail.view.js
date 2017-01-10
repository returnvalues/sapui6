sap.ui.jsview("view.Detail", {

    getControllerName : function() {
        return "view.Detail";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createSearchField(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oTextView1 = new sap.ui.commons.TextView({text:"{d>/FormData/Data1}"});
        var oTextView2 = new sap.ui.commons.TextView({text:"{d>/FormData/Data2}"});
        var oTextView3 = new sap.ui.commons.TextView({text:"{d>/FormData/Data3}"});
        var oTextView4 = new sap.ui.commons.TextView({text:"{d>/FormData/Data4}"});
        var oTextView5 = new sap.ui.commons.TextView({text:"{d>/FormData/Data5}"});
        
        jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", editable:false, checked:"{d>/FormData/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", editable:false, checked:"{d>/FormData/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", editable:false, checked:"{d>/FormData/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", editable:false, checked:"{d>/FormData/Chk4}"}));

        var settings = [
                {label:"Label1", element:[oTextView1]},
                {label:"Label2", element:[oTextView2]},
                {label:"Label3", element:[oTextView3,oTextView4]},
                {label:"Label4", element:[oTextView5]},
                {label:"Label5", element:[oInlineCheckBoxGroup]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 6,
                width : "100%",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                resize : true,
                widths : ["90px","140px","90px","140px","90px","200px"]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({title:"Column1", path:"d>column1", width:"100px", align:"left"}),
            new sapui6.ui.table.Column({title:"Column2", path:"d>column2", width:"100px", align:"left"}),
            new sapui6.ui.table.Column({title:"Column3", path:"d>column3", width:"100px", align:"center"}),
            new sapui6.ui.table.Column({title:"Column4", path:"d>column4", width:"100px", align:"center"}),
            new sapui6.ui.table.Column({title:"Column5", path:"d>column5", width:"100px", align:"right", format:"#,###"}),
            new sapui6.ui.table.Column({title:"Column6", path:"d>column6", width:"100px", align:"center", format:"MM-dd-yyyy"}),
            new sapui6.ui.table.Column({title:"Column7", path:"d>column7", width:"100px", align:"right", format:"%"}),
            new sapui6.ui.table.Column({title:"Column8", path:"d>column8", width:"100px", align:"right", format:"#,###.##"})
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"185px",
            columns:columns,
            marginTop:"10px",
            resize: true
        });
        table.bindRows("d>/TableData");

        return table;
    }
});