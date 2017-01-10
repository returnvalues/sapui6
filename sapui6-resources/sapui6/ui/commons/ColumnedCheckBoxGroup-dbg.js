jQuery.sap.declare("sapui6.ui.commons.ColumnedCheckBoxGroup");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.ColumnedCheckBoxGroup", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
        	"rowsCount" : {type : "int", defaultValue : 1},
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

		var length = oControl.getCheckBoxs().length;
		var rowsCount = oControl.getRowsCount();
		for(var i= 0; i<length ; i++){
			var oCheckBox = oControl.getCheckBoxs()[i];
			
			if((i+1)%rowsCount == 1){
				oRm.write("<div");
				oRm.addStyle("float","left");
				// oRm.addStyle("margin-left","0px");
				oRm.writeStyles();
				oRm.write(">");
				oRm.write("<ul");
				oRm.addStyle("list-style-type","none");
				oRm.addStyle("padding-left","0px");
				oRm.writeStyles();
				oRm.write(">");
			}
			
			oRm.write("<li");
			oRm.addStyle("margin-bottom","10px");
			oRm.writeStyles();
			oRm.write(">");
			oRm.renderControl(oCheckBox);
			oRm.write("</li>");

			if((i+1)%rowsCount == 0){
				oRm.write("</ul>");
				oRm.write("</div>");
			}
		}
		

		oRm.write("</div>");
    }
});



