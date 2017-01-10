sap.ui.jsview("view.Input", {
	createContent : function (oController) {
                this.loadJsonData();
                
                jQuery.sap.require("sapui6.ui.commons.NumberField");
                var oNumberField = new sapui6.ui.commons.NumberField();

                jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
                var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
                oCurrencyField.bindValue("/FormData/Currency");

                var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
                oQtyField.bindValue("/FormData/Qty");

                var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
                oPercentField.bindValue("/FormData/Percent");

                jQuery.sap.require("sapui6.ui.commons.YearPicker");
                var oYearPicker = new sapui6.ui.commons.YearPicker({value:"{/FormData/Year}"});

                jQuery.sap.require("sapui6.ui.commons.MonthPicker");
                var oMonthPicker = new sapui6.ui.commons.MonthPicker({format:"MM.yyyy"});
                oMonthPicker.bindProperty("yyyymm","/FormData/Month");

                var that = this;
                var oButton = new sap.ui.commons.Button({text:"Get YYYYMM", press:function(){
                    alert(that.getModel().getProperty("/FormData/Month"));

                }});

                var oButton2 = new sap.ui.commons.Button({text:"Clear Value", press:function(){
                    that.getModel().setProperty("/FormData/Month","");
                    //oMonthPicker.setYyyymm("");

                }});

                jQuery.sap.require("sapui6.ui.commons.TimePicker");
                var oTimePicker = new sapui6.ui.commons.TimePicker({interval:30, value:"{/FormData/Time}"});

                jQuery.sap.require("sapui6.ui.commons.UppercaseField");
                var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{/FormData/Uppercase}"});

                jQuery.sap.require("sapui6.ui.commons.LowercaseField");
                var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{/FormData/Lowercase}"});

                jQuery.sap.require("sapui6.ui.commons.RegExpField");
                var oEmail = new sapui6.ui.commons.RegExpField({
                    value: "{/FormData/Email}",
                    message: "The input value is not correct.",
                    width:"250px"
                });
                oEmail.setRegExp(oEmail.EMAIL);

                var oURL = new sapui6.ui.commons.RegExpField({
                    value: "{/FormData/URL}",
                    message: "The input value is not correct.",
                    width:"250px"
                });
                oURL.setRegExp(oURL.URL);

                var oUserId = new sapui6.ui.commons.RegExpField({
                    value: "{/FormData/UserId}",
                    message: "The input value is not correct."
                });
                oUserId.setRegExp(oUserId.USER_ID);

                jQuery.sap.require("sapui6.ui.commons.InlineCheckBoxGroup");
                var oInlineCheckBoxGroup = new sapui6.ui.commons.InlineCheckBoxGroup();
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{/FormData/Chk1}"}));
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{/FormData/Chk2}"}));
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{/FormData/Chk3}"}));
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{/FormData/Chk4}"}));
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 5", checked:"{/FormData/Chk5}"}));
                oInlineCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 6", checked:"{/FormData/Chk6}"}));

                jQuery.sap.require("sapui6.ui.commons.ColumnedCheckBoxGroup");
                var oColumnedCheckBoxGroup = new sapui6.ui.commons.ColumnedCheckBoxGroup({
                        rowsCount : 2
                        // oneColumnCheckboxCount : 3
                });
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 1", checked:"{/FormData/Chk7}"}));
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 2", checked:"{/FormData/Chk8}"}));
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 3", checked:"{/FormData/Chk9}"}));
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 4", checked:"{/FormData/Chk10}"}));
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 5", checked:"{/FormData/Chk11}"}));
                oColumnedCheckBoxGroup.addCheckBox(new sap.ui.commons.CheckBox({text:"CheckBox 6", checked:"{/FormData/Chk12}"}));

                var oLayout = new sap.ui.layout.VerticalLayout();
                oLayout.addStyleClass("inputDemo");
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Number Field : "}),oNumberField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Currency Field : "}),oCurrencyField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Qty Field : "}),oQtyField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Percent Field : "}),oPercentField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"YearPicker : "}),oYearPicker]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"MonthPicker : "}),oMonthPicker,oButton,oButton2]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"TimePicker : "}),oTimePicker]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"User ID : "}),oUserId]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Email : "}),oEmail]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"URL : "}),oURL]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Uppercase Field : "}),oUppercaseField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Lowercase Field : "}),oLowercaseField]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Inline CheckBox Group : "}),oInlineCheckBoxGroup]}));
                oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
                oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"Columned CheckBox Group : "}),oColumnedCheckBoxGroup]}));

                return oLayout;
	},

        loadJsonData : function(){
                var model = new sap.ui.model.json.JSONModel();
                model.setData({
                        "FormData" : {
                                "Currency" : 47530.25,
                                "Qty" : 4215,
                                "Percent" : 12.05,
                                "Uppercase" : "",
                                "Lowercase" : "",
                                "Year" : "2015",
                                "Month" : "201602",
                                "Time" : "13:30",
                                "Email" : "",
                                "URL" : "",
                                "Chk1" : false,
                                "Chk2" : false,
                                "Chk3" : true,
                                "Chk4" : false,
                                "Chk5" : true,
                                "Chk6" : false,
                                "Chk7" : false,
                                "Chk8" : false,
                                "Chk9" : false,
                                "Chk10" : false,
                                "Chk11" : true,
                                "Chk12" : false
                        }
                });

                this.setModel(model);
        }
});