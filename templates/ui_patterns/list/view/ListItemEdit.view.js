sap.ui.jsview("view.ListItemEdit", {

    getControllerName : function() {
        return "view.ListItemEdit";
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
        oComboBox.bindProperty("selectedKey","/SearchCondition/ComboBox");

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
                title : "Multi Edit - Eidt Line Item",
                button : [
                        new sap.ui.commons.Button({text:"Search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearch}),
                        new sap.ui.commons.Button({text:"Save", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSave})
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var oComboBox = new sap.ui.commons.ComboBox({selectedKey:"{t>column1}"});
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));

        var oTextField = new sap.ui.commons.TextField({value:"{t>column2}"});

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            value:"{t>column3}",
            width:"100px",
            valueHelpRequest : oController.openValueHelpForTable
        });

        var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox",checked:"{t>column4}"})

        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
        oCurrencyField.bindValue("t>column5");

        var oDatePicker = new sap.ui.commons.DatePicker({yyyymmdd:"{t>column6}", width:"100px"});

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
        oQtyField.bindValue("t>column7");

        var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
        oPercentField.bindValue("t>column8");

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ],
            select: oController.selectRadioForTable
        });

        oRadioButtonGroup.bindProperty("selectedIndex",{
            parts: [
                {path: "t>column9"},
            ],
            formatter: function(key){ 
              if(key == "Yes") return 0;
              else if(key == "No") return 1;
            }
        }); 

        var columns = [
            new sapui6.ui.table.Column({
                title:"ComboBox", path:"t>column1", width:"120px", align:"center", template:oComboBox
            }),
            new sapui6.ui.table.Column({
                title:"TextField", path:"t>column2", width:"120px", align:"center", template:oTextField
            }),
            new sapui6.ui.table.Column({
                title:"ValueHelp", path:"t>column3", width:"120px", align:"center", template:oValueHelpField
            }),
            new sapui6.ui.table.Column({
                title:"CheckBox", path:"t>column4", width:"120px", align:"center", template:oCheckBox
            }),
            new sapui6.ui.table.Column({
                title:"Currency", path:"t>column5", width:"120px", align:"center", template: oCurrencyField
            }),
            new sapui6.ui.table.Column({
                title:"Date", path:"t>column6", width:"120px", align:"center", template: oDatePicker
            }),
            new sapui6.ui.table.Column({
                title:"Qty", path:"t>column7", width:"120px", align:"center", template: oQtyField
            }),
            new sapui6.ui.table.Column({
                title:"Percent", path:"t>column8", width:"120px", align:"right", template: oPercentField
            }),
            new sapui6.ui.table.Column({
                title:"RadioButton", path:"t>column9", width:"120px", align:"center", template: oRadioButtonGroup
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            title:"Table Title",
            width:"100%", 
            height:"500px",
            columns:columns,
            marginTop:"10px",
            noDataText:"No Data.",
            resize: true,
            selectionMode: "Multiple",
            button: [
                new sap.ui.commons.Button({text:"addLine", style:sap.ui.commons.ButtonStyle.Emph, press:oController.addRows}),
                new sap.ui.commons.Button({text:"deleteLine", style:sap.ui.commons.ButtonStyle.Emph, press:oController.deleteRows}),
            ]
        });
        table.bindRows("t>/TableData");

        return table;
    }
});