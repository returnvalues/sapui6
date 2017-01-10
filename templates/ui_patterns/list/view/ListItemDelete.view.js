sap.ui.jsview("view.ListItemDelete", {

    getControllerName : function() {
        return "view.ListItemDelete";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createSearchField(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("f>/ComboBoxData", new sap.ui.core.ListItem({key:"{f>key}",text:"{f>text}"}));
        oComboBox.bindProperty("selectedKey","f>/SearchCondition/ComboBox");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{f>/SearchCondition/FromDate}"});
        var oTextView = new sap.ui.commons.TextView({text:"~"});
        var oDatePicker2 = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{f>/SearchCondition/ToDate}"});

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp
        });
        oValueHelpField.bindValue("f>/SearchCondition/ValueHF");

        var oValueHelpDesc = new sap.ui.commons.TextView({text:"{f>/SearchCondition/ValueHFDesc}"});

        var oTextField = new sap.ui.commons.TextField();
        oTextField.bindValue("f>/SearchCondition/TextField");
        
        jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{f>/SearchCondition/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{f>/SearchCondition/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{f>/SearchCondition/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{f>/SearchCondition/Chk4}"}));

        var settings = [
                {label:"Label1", element:[oComboBox], required:true},
                {label:"Label2", element:[oDatePicker,oTextView,oDatePicker2], required:true},
                {label:"Label3", element:[oValueHelpField,oValueHelpDesc]},
                {label:"Label4", element:[oTextField]},
                {label:"Label5", element:[oInlineCheckBoxGroup]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 6,
                width : "100%",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["100px","200px","100px","200px","100px","200px"],
                title : "Multi Edit - Delete Line Item",
                button : [
                        new sap.ui.commons.Button({text:"Search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearch}),
                        new sap.ui.commons.Button({text:"Delete", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doDelete}),
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", path:"t>column1", width:"100px", align:"center", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"100px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column3", path:"t>column3", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column4", path:"t>column4", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column5", path:"t>column5", width:"100px", align:"right", format:"#,###", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column6", path:"t>column6", width:"100px", align:"center", format:"MM-dd-yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column7", path:"t>column7", width:"100px", align:"right", format:"%", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column8", path:"t>column8", width:"100px", align:"right", format:"#,###.##", showSortMenuEntry:true, showFilterMenuEntry:true
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"500px",
            columns:columns,
            marginTop:"10px",
            noDataText:"No Data.",
            resize: true,
            selectionMode: "Multiple"
        });
        table.bindRows("t>/TableData");

        return table;
    }
});