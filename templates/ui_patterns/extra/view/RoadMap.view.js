sap.ui.jsview("view.RoadMap", {

    getControllerName : function() {
        return "view.RoadMap";
    },

	createContent : function (oController) {
        this.loadLibrary();

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createRoadmap(oController));
        oLayout.addContent(this.createForm(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    loadLibrary : function(){
        jQuery.sap.require("sap.ui.core.theming.Parameters");
        jQuery.sap.require("sapui6.ui.commons.BasicRoadMap");
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");
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

    createRoadmap : function(oController){
        var oBasicRoadMap = new sapui6.ui.commons.BasicRoadMap(this.getId()+"-roadmap", {
                width : "100%",
                activeStep : 1,
                press : oController.selectRoadMap
                // height : "50px"
        });

        oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Basic Information"}));
        oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Item Information"}));
        oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Summary"}));
        oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Confirm"}));

        return oBasicRoadMap;
    },

    createForm : function(oController){
        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oComboBox.bindProperty("selectedKey","t>/FormData/ComboBox");

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp
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

        var oBorderedForm = new sapui6.ui.layout.BorderedForm(this.getId()+"-basic-form",{
                columns : 4,
                width : "100%",
                marginTop : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Basic Information",
                button: [
                    new sap.ui.commons.Button(this.getId()+"-btn-create",{text:"Create", visible:false, style:sap.ui.commons.ButtonStyle.Emph, press:oController.doCreate}),
                    new sap.ui.commons.Button(this.getId()+"-btn-cancel",{text:"Cancel", visible:false, style:sap.ui.commons.ButtonStyle.Emph, press:oController.doCancel}),
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
            visible:false,
            columns:columns,
            marginTop:"10px",
            resize: true,
            selectionMode: "Multiple",
            title:"Item Information",
            button: [
                new sap.ui.commons.Button(this.getId()+"-btn-addLine",{text:"Add Line", style:sap.ui.commons.ButtonStyle.Emph, press:oController.addRows}),
                new sap.ui.commons.Button(this.getId()+"-btn-deleteLine",{text:"Delete Line", style:sap.ui.commons.ButtonStyle.Emph, press:oController.deleteRows}),
            ]
        });
        table.bindRows("t>/TableData");

        return table;
    }
});