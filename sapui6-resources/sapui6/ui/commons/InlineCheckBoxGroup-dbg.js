jQuery.sap.declare("sapui6.ui.commons.InlineCheckBoxGroup");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.InlineCheckBoxGroup", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"visible" : {type : "boolean", group : "Misc", defaultValue : true}
		},
		defaultAggregation : "checkBoxs",
		aggregations : {
	    	"checkBoxs" : {type : "sap.ui.commons.CheckBox", multiple : true, singularName: "checkBox"}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

  		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("sapui6_inline-checkboxgroup");
		oRm.writeClasses();
		oRm.addStyle("display", "inline-block");
		oRm.writeStyles();
		oRm.write(">");
		
		oControl.getCheckBoxs().forEach(function(oCheckBox){
			oRm.renderControl(oCheckBox);
		});

		oRm.write("</div>");
    }
});



