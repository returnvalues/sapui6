sap.ui.jsview("view.ListToEditTab", {

    getControllerName : function() {
        return "view.ListToEditTab";
    },

	createContent : function (oController) {
        this.loadLibrary();

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createSearchField(oController));
        oLayout.addContent(this.createResultTable(oController));

        var oTabStrip = new sapui6.ui.commons.TabStrip(this.getId()+"-tab",{
            width:"100%",
            height:"600px",
            visible:false
        });

        var oTab1 = new sapui6.ui.commons.Tab();    
        oTab1.setTitle("Tab 1");
        oTab1.addContent(this.createForm(oController));

        var oTab2 = new sapui6.ui.commons.Tab();    
        oTab2.setTitle("Tab 2");
        oTab2.addContent(this.createForm2(oController));

        var oTab3 = new sapui6.ui.commons.Tab();    
        oTab3.setTitle("Tab 3");
        oTab3.addContent(this.createTable(oController));

        oTabStrip.addTab(oTab1);
        oTabStrip.addTab(oTab2);
        oTabStrip.addTab(oTab3);
        oTabStrip.setSelectedIndex(0);

        oLayout.addContent(oTabStrip);

        return oLayout;
	},

    loadLibrary : function(){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");
        jQuery.sap.require("sapui6.ui.commons.TabStrip");
        jQuery.sap.require("sap.ui.core.theming.Parameters");
        jQuery.sap.require("sapui6.ui.commons.AppendTextView");
        jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
        jQuery.sap.require("sapui6.ui.commons.NumberField");
        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        jQuery.sap.require("sapui6.ui.commons.YearPicker");
        jQuery.sap.require("sapui6.ui.commons.MonthPicker");
        jQuery.sap.require("sapui6.ui.commons.TimePicker");
        jQuery.sap.require("sapui6.ui.commons.UppercaseField");
        jQuery.sap.require("sapui6.ui.commons.LowercaseField");
        jQuery.sap.require("sapui6.ui.commons.RegExpField");
    },

    createSearchField : function(oController){
        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oComboBox.bindProperty("selectedKey","t>/SearchCondition/ComboBox");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/SearchCondition/FromDate}"});
        var oTextView = new sap.ui.commons.TextView({text:"~"});
        var oDatePicker2 = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/SearchCondition/ToDate}"});

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp
        });
        oValueHelpField.bindValue("t>/SearchCondition/ValueHF");

        var oValueHelpDesc = new sap.ui.commons.TextView({text:"{t>/SearchCondition/ValueHFDesc}"});

        var oTextField = new sap.ui.commons.TextField();
        oTextField.bindValue("t>/SearchCondition/TextField");
        
        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/SearchCondition/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/SearchCondition/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/SearchCondition/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/SearchCondition/Chk4}"}));

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
                title : "List to Eidt Tab",
                button : [
                        new sap.ui.commons.Button({text:"Search", icon:"sap-icon://search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearch})
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createResultTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox", editable:false,checked:"{t>column4}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            editable : false,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ]
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
                title:"Column1", path:"t>column1", width:"120px", align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"120px", align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Column3", path:"t>column3", width:"120px", align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Column4", path:"t>column4", width:"120px", align:"center", template:oCheckBox
            }),
            new sapui6.ui.table.Column({
                title:"Column5", path:"t>column5", width:"120px", align:"right", format:"#,##0.##"
            }),
            new sapui6.ui.table.Column({
                title:"Column6", path:"t>column6", width:"120px", align:"center", format:"MM-dd-yyyy"
            }),
            new sapui6.ui.table.Column({
                title:"Column7", path:"t>column7", width:"120px", align:"right", format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Column8", path:"t>column8", width:"120px", align:"right", format:"#,###.##"
            }),
            new sapui6.ui.table.Column({
                title:"Column9", path:"t>column9", width:"120px", align:"center", template:oRadioButtonGroup
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-resultTable",{
            width:"100%", 
            height:"185px",
            columns:columns,
            marginTop:"10px",
            noDataText:"No Data.",
            resize: true,
            rowSelectionChange : oController.selectRow
        });
        table.bindRows("t>/ResultTableData");

        return table;
    },

    createForm : function(oController){
        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oComboBox.bindProperty("selectedKey","t>/FormData/ComboBox");

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp2
        });
        oValueHelpField.bindValue("t>/FormData/ValueHF");

        var oValueHelpDesc = new sap.ui.commons.TextView({text:"{t>/FormData/ValueHFDesc}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ],
            select: oController.selectRadio
        });

        oRadioButtonGroup.bindProperty("selectedIndex",{
            parts: [
                {path: "t>/FormData/Radio"},
            ],
            formatter: function(key){ 
              if(key == "Yes") return 0;
              else if(key == "No") return 1;
            }
        }); 

        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/FormData/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/FormData/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/FormData/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/FormData/Chk4}"}));
        
        var oNumberField = new sapui6.ui.commons.NumberField({value:"{t>/FormData/Code}"});

        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
        oCurrencyField.bindValue("t>/FormData/Currency");

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
        oQtyField.bindValue("t>/FormData/Qty");

        var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
        oPercentField.bindValue("t>/FormData/Percent");

        var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{t>/FormData/Year}"});

        var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy"});
        oMonthPicker.bindValue("t>/FormData/Month");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/FormData/Date}"});

        var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, value:"{t>/FormData/Time}"});

        var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData/Uppercase}"});

        var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}"});

        var oEmail = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/Email}",
            message: "The input value is not correct.",
            width:"250px"
        });
        oEmail.setRegExp(oEmail.EMAIL);

        var oURL = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/URL}",
            message: "The input value is not correct.",
            width:"250px"
        });
        oURL.setRegExp(oURL.URL);

        var oUserId = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/UserId}",
            message: "The input value is not correct."
        });
        oUserId.setRegExp(oUserId.USER_ID);

        var oTextField = new sap.ui.commons.TextField({value:"{t>/FormData/TextField}"});

        var oFileUploader = new sap.ui.commons.FileUploader({width:"400px"});

        var oSlider = new sap.ui.commons.Slider({
            width: '100%',
            min: 100,
            max: 300,
            value: "{t>/FormData/Slider}",
            totalUnits: 5,
            smallStepWidth: 5,
            stepLabels : true
        });

        var oTextArea = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/FormData/TextArea}"});

        var settings = [
                {label:"ComboBox", element:[oComboBox], required:true},
                {label:"ValueHelpField", element:[oValueHelpField,oValueHelpDesc]},
                {label:"RadioButton", element:[oRadioButtonGroup]},
                {label:"CheckBox", element:[oInlineCheckBoxGroup]},
                {label:"NumberField", element:[oNumberField]},
                {label:"Currency", element:[oCurrencyField]},
                {label:"Qty", element:[oQtyField]},
                {label:"Percent", element:[oPercentField]},
                {label:"YearPicker", element:[oYearPicker]},
                {label:"MonthPicker", element:[oMonthPicker]},
                {label:"DatePicker", element:[oDatePicker], required:true},
                {label:"TimePicker", element:[oTimePicker]},
                {label:"Uppercase", element:[oUppercaseField]},
                {label:"Lowercase", element:[oLowercaseField]},
                {label:"User ID(RegExp)", element:[oUserId]},
                {label:"Email(RegExp)", element:[oEmail]},
                {label:"URL(RegExp)", element:[oURL]},
                {label:"TextField", element:[oTextField]},
                {label:"Slider", element:[oSlider]},
                {label:"FileUploader", element:[oFileUploader]},
                {label:"TextArea", element:[oTextArea]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                minusWidth : "40px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Sub Form",
                titleFontSize : "14px"
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createForm2 : function(oController){
        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("/ComboBoxData", new sap.ui.core.ListItem({key:"{key}",text:"{text}"}));
        oComboBox.bindProperty("selectedKey","t>/FormData2/ComboBox");

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp3
        });
        oValueHelpField.bindValue("t>/FormData2/ValueHF");

        var oValueHelpDesc = new sap.ui.commons.TextView({text:"{t>/FormData2/ValueHFDesc}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ],
            select: oController.selectRadio
        });

        oRadioButtonGroup.bindProperty("selectedIndex",{
            parts: [
                {path: "t>/FormData2/Radio"},
            ],
            formatter: function(key){ 
              if(key == "Yes") return 0;
              else if(key == "No") return 1;
            }
        }); 

        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/FormData2/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/FormData2/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/FormData2/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/FormData2/Chk4}"}));
        
        var oNumberField = new sapui6.ui.commons.NumberField({value:"{t>/FormData2/Code}"});

        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
        oCurrencyField.bindValue("t>/FormData2/Currency");

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
        oQtyField.bindValue("t>/FormData2/Qty");

        var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
        oPercentField.bindValue("t>/FormData2/Percent");

        var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{t>/FormData2/Year}"});

        var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy"});
        oMonthPicker.bindValue("t>/FormData2/Month");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/FormData2/Date}"});

        var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, value:"{t>/FormData2/Time}"});

        var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData2/Uppercase}"});

        var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}"});

        var oEmail = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData2/Email}",
            message: "The input value is not correct.",
            width:"250px"
        });
        oEmail.setRegExp(oEmail.EMAIL);

        var oURL = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData2/URL}",
            message: "The input value is not correct.",
            width:"250px"
        });
        oURL.setRegExp(oURL.URL);

        var oUserId = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData2/UserId}",
            message: "The input value is not correct."
        });
        oUserId.setRegExp(oUserId.USER_ID);

        var oTextField = new sap.ui.commons.TextField({value:"{t>/FormData2/TextField}"});

        var oFileUploader = new sap.ui.commons.FileUploader({width:"400px"});

        var oSlider = new sap.ui.commons.Slider({
            width: '100%',
            min: 100,
            max: 300,
            value: "{t>/FormData2/Slider}",
            totalUnits: 5,
            smallStepWidth: 5,
            stepLabels : true
        });

        var oTextArea = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/FormData2/TextArea}"});

        var settings = [
                {label:"ComboBox", element:[oComboBox], required:true},
                {label:"ValueHelpField", element:[oValueHelpField,oValueHelpDesc]},
                {label:"RadioButton", element:[oRadioButtonGroup]},
                {label:"CheckBox", element:[oInlineCheckBoxGroup]},
                {label:"NumberField", element:[oNumberField]},
                {label:"Currency", element:[oCurrencyField]},
                {label:"Qty", element:[oQtyField]},
                {label:"Percent", element:[oPercentField]},
                {label:"YearPicker", element:[oYearPicker]},
                {label:"MonthPicker", element:[oMonthPicker]},
                {label:"DatePicker", element:[oDatePicker], required:true},
                {label:"TimePicker", element:[oTimePicker]},
                {label:"Uppercase", element:[oUppercaseField]},
                {label:"Lowercase", element:[oLowercaseField]},
                {label:"User ID(RegExp)", element:[oUserId]},
                {label:"Email(RegExp)", element:[oEmail]},
                {label:"URL(RegExp)", element:[oURL]},
                {label:"TextField", element:[oTextField]},
                {label:"Slider", element:[oSlider]},
                {label:"FileUploader", element:[oFileUploader]},
                {label:"TextArea", element:[oTextArea]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                minusWidth : "40px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Sub Form",
                titleFontSize : "14px"
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var oComboBox = new sap.ui.commons.ComboBox({selectedKey:"{t>column1}"});
        oComboBox.bindItems("/ComboBoxData", new sap.ui.core.ListItem({key:"{key}",text:"{text}"}));

        var oTextField = new sap.ui.commons.TextField({value:"{t>column2}"});

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            value:"{t>column3}",
            width:"100px",
            valueHelpRequest : oController.openValueHelpForTable
        });

        var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox",checked:"{t>column4}"});

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
            width:"100%", 
            height:"400px",
            columns:columns,
            minusWidth:"40px",
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