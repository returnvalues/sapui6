jQuery.sap.declare("sapui6.ui.layout.MarginVBox");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.layout.MarginVBox", { 
    metadata : {     
    	library : "sapui6.ui.layout",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginLeft" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName: "content"}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
		
		oRm.write("<div");
		oRm.writeControlData(oControl);
		if(oControl.getWidth()) oRm.addStyle("width", oControl.getWidth());
		if(oControl.getHeight()) oRm.addStyle("height", oControl.getHeight());
		if(oControl.getWidth() || oControl.getHeight()) oRm.writeStyles();
		oRm.write(">");

		oControl.getContent().forEach(function(content){
			oRm.write("<div");
			if(oControl.getMarginLeft()) oRm.addStyle("margin-left", oControl.getMarginLeft());
			if(oControl.getMarginRight()) oRm.addStyle("margin-right", oControl.getMarginRight());
			if(oControl.getMarginTop()) oRm.addStyle("margin-top", oControl.getMarginTop());
			if(oControl.getMarginBottom()) oRm.addStyle("margin-bottom", oControl.getMarginBottom());

			if(oControl.getMarginLeft() || oControl.getMarginRight() || oControl.getMarginTop() || oControl.getMarginBottom()) oRm.writeStyles();
			
			oRm.write(">");
			oRm.renderControl(content);
			oRm.write("</div>");
		});

		oRm.write("</div>");
		
    }
});
