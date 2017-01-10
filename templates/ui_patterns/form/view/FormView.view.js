sap.ui.jsview("view.FormView", {

    getControllerName : function() {
        return "view.FormView";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createForm(oController));

        return oLayout;
	},

    createForm : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oComboBox = new sap.ui.commons.ComboBox({editable:false});
        oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oComboBox.bindProperty("selectedKey","t>/FormData/ComboBox");

        jQuery.sap.require("sapui6.ui.commons.AppendTextView");
        var oAppendTextView = new sapui6.ui.commons.AppendTextView({before:"(", after:")", text:"{t>/FormData/ValueHF}"});
        var oAppendTextViewDesc = new sap.ui.commons.TextView({text:"{t>/FormData/ValueHFDesc}"});

        var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
            columns : 2,
            items:[
                new sap.ui.core.Item({text:"Yes",key:"Yes"}),
                new sap.ui.core.Item({text:"No",key:"No"})
            ],
            editable: false
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
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{t>/FormData/Chk1}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{t>/FormData/Chk2}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{t>/FormData/Chk3}",editable:false}));
        oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{t>/FormData/Chk4}",editable:false}));
        
        jQuery.sap.require("sapui6.ui.commons.NumberField");
        var oNumberField = new sapui6.ui.commons.NumberField({value:"{t>/FormData/Code}", editable:false});

        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",editable:false});
        oCurrencyField.bindValue("t>/FormData/Currency");

        var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",editable:false});
        oQtyField.bindValue("t>/FormData/Qty");

        var oPercentField = new sapui6.ui.commons.AppendTextView({after:"%", text:"{t>/FormData/Percent}"});

        jQuery.sap.require("sapui6.ui.commons.YearPicker");
        var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{t>/FormData/Year}", editable:false});

        jQuery.sap.require("sapui6.ui.commons.MonthPicker");
        var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy", editable:false});
        oMonthPicker.bindValue("t>/FormData/Month");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/FormData/Date}", editable:false});

        jQuery.sap.require("sapui6.ui.commons.TimePicker");
        var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, editable:false});
        oTimePicker.bindValue("t>/FormData/Time");

        jQuery.sap.require("sapui6.ui.commons.UppercaseField");
        var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData/Uppercase}", editable:false});

        jQuery.sap.require("sapui6.ui.commons.LowercaseField");
        var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}", editable:false});

        jQuery.sap.require("sapui6.ui.commons.RegExpField");
        var oEmail = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/Email}",
            message: "The input value is not correct.",
            width:"250px",
            editable:false
        });
        oEmail.setRegExp(oEmail.EMAIL);

        var oURL = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/URL}",
            message: "The input value is not correct.",
            width:"250px",
            editable:false
        });
        oURL.setRegExp(oURL.URL);

        var oUserId = new sapui6.ui.commons.RegExpField({
            value: "{t>/FormData/UserId}",
            message: "The input value is not correct.",
            editable:false
        });
        oUserId.setRegExp(oUserId.USER_ID);

        var oTextField = new sap.ui.commons.TextField({value:"{t>/FormData/TextField}",editable:false});

        var oLink = new sap.ui.commons.Link({text:"2014 Sales Report"});

        var oSlider = new sap.ui.commons.Slider({
            width: '100%',
            min: 100,
            max: 300,
            value: "{t>/FormData/Slider}",
            totalUnits: 5,
            smallStepWidth: 5,
            stepLabels : true,
            editable:false
        });

        var oTextArea = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/FormData/TextArea}",editable:false});

        var settings = [
                {label:"ComboBox", element:[oComboBox]},
                {label:"TextView", element:[oAppendTextView,oAppendTextViewDesc]},
                {label:"RadioButton", element:[oRadioButtonGroup], marginLeft:"5px"},
                {label:"CheckBox", element:[oInlineCheckBoxGroup], marginLeft:"5px"},
                {label:"NumberField", element:[oNumberField]},
                {label:"Currency", element:[oCurrencyField]},
                {label:"Qty", element:[oQtyField]},
                {label:"Percent", element:[oPercentField], marginLeft:"6px"},
                {label:"YearPicker", element:[oYearPicker]},
                {label:"MonthPicker", element:[oMonthPicker]},
                {label:"DatePicker", element:[oDatePicker]},
                {label:"TimePicker", element:[oTimePicker]},
                {label:"Uppercase", element:[oUppercaseField]},
                {label:"Lowercase", element:[oLowercaseField]},
                {label:"User ID(RegExp)", element:[oUserId]},
                {label:"Email(RegExp)", element:[oEmail]},
                {label:"URL(RegExp)", element:[oURL]},
                {label:"TextField", element:[oTextField]},
                {label:"Slider", element:[oSlider]},
                {label:"Files", element:[oLink], marginLeft:"6px"},
                {label:"TextArea", element:[oTextArea]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Form View"
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    }
});