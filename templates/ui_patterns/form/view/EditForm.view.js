sap.ui.jsview("view.EditForm", {

    getControllerName : function() {
        return "view.EditForm";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createForm(oController));

        return oLayout;
	},

    createForm : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

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

        jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
        var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/FormData/Chk1}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/FormData/Chk2}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/FormData/Chk3}"}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/FormData/Chk4}"}));
        
        jQuery.sap.require("sapui6.ui.commons.NumberField");
        var oNumberField = new sapui6.ui.commons.NumberField();

        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
        oCurrencyField.bindValue("t>/FormData/Currency");

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
        oQtyField.bindValue("t>/FormData/Qty");

        var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
        oPercentField.bindValue("t>/FormData/Percent");

        jQuery.sap.require("sapui6.ui.commons.YearPicker");
        var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{t>/FormData/Year}"});

        jQuery.sap.require("sapui6.ui.commons.MonthPicker");
        var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy"});
        oMonthPicker.bindValue("t>/FormData/Month");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/FormData/Date}"});

        jQuery.sap.require("sapui6.ui.commons.TimePicker");
        var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, value:"{t>/FormData/Time}"});

        jQuery.sap.require("sapui6.ui.commons.UppercaseField");
        var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData/Uppercase}"});

        jQuery.sap.require("sapui6.ui.commons.LowercaseField");
        var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}"});

        jQuery.sap.require("sapui6.ui.commons.RegExpField");
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
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Edit Form",
                button : [
                        new sap.ui.commons.Button({text:"Save", icon:"sap-icon://save", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSave})
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    }
});