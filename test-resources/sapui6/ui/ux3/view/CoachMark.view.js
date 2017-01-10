sap.ui.jsview("view.CoachMark", {

	createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.ux3.CoachMarks");

        var oCoachMark = new sapui6.ui.ux3.CoachMarks();

        var oCoachMarkBtn = new sap.ui.commons.Button({
            text : "Start CoachMark",
            style : sap.ui.commons.ButtonStyle.Emph,
            press : function(){oCoachMark.start()}
        });

        var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox"});
        var oTextView = new sap.ui.commons.TextView({text:"TextView"});
        var oTextField = new sap.ui.commons.TextField({value:"TextField"});
        var oRadioButton = new sap.ui.commons.RadioButton({text:"RadioButton"});
        var oPasswordField = new sap.ui.commons.PasswordField({width:"190px"});
        var oTextArea = new sap.ui.commons.TextArea({
          value : 'This text is longer than the output of the Text Area. But it should not break. So you should see a scrollbar.\nBut this is a manual line break.So it should be a new line.',
          cols : 50,
          rows : 4,
          wrapping : sap.ui.core.Wrapping.Off,
          valueState : sap.ui.core.ValueState.Warning
        });
        

       oCoachMark.add(oCheckBox, "This is a CheckBox!");
       oCoachMark.add(oTextView, "This is a TextView!");
       oCoachMark.add(oTextField, "This is a TextField!");
       oCoachMark.add(oRadioButton, "This is a RadioButton!");
       oCoachMark.add(oPasswordField, "This is a PasswordField!");
       oCoachMark.add(oTextArea, "This is a TextArea!");

       var oLayout = new sap.ui.layout.VerticalLayout();
       oLayout.addStyleClass("coachMarkDemo");
       oLayout.addContent(oCoachMarkBtn);
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"CheckBox : "}),oCheckBox]}));
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"TextView : "}),oTextView]}));
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"TextField : "}),oTextField]}));
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"RadioButton : "}),oRadioButton]}));
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"PasswordField : "}),oPasswordField]}));
       oLayout.addContent(new sap.ui.core.HTML({content:"<br>"}));
       oLayout.addContent(new sap.ui.layout.HorizontalLayout({content:[new sap.ui.commons.Label({width:"200px",text:"TextArea : "}),oTextArea]}));

       return oLayout;
	}
});