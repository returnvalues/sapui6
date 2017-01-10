jQuery.sap.declare("sapui6.ui.commons.PageTitle");

sap.ui.core.Control.extend("sapui6.ui.commons.PageTitle", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginLeft" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginRight" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginTop" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginBottom" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"visible" : {type:"boolean", defaultValue:true},
			"title" : {type : "string", defaultValue : ""},
			"titleColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "string", group : "Dimension", defaultValue : null},
			"strongColor" : {type : "string" , group : "Appearance", defaultValue : null}
		}
    },

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");

		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapUiBaseText"), true);
		if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
		if(!this.getStrongColor()) this.setProperty("strongColor", sap.ui.core.theming.Parameters.get("sapActiveColor"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
    	
    	oRm.write("<div");
		oRm.writeControlData(oControl);
		if(oControl.getWidth()) oRm.addStyle("width", oControl.getWidth());
		if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		oRm.writeStyles();
		oRm.write(">");

		oRm.write("<span");
		oRm.addStyle("color",oControl.getTitleColor());
		oRm.addStyle("font-size",oControl.getTitleFontSize());
		oRm.addStyle("font-weight","bold");
		if(oControl.getStrongColor()){
			oRm.addStyle("border-left-color",oControl.getStrongColor());
			oRm.addStyle("border-left-width","5px");
			oRm.addStyle("border-left-style","solid");
			oRm.addStyle("padding-left","5px");
			oRm.addStyle("margin-bottom","5px");
		}

		oRm.writeStyles();
		oRm.write(">");
		oRm.write(oControl.getTitle());
		oRm.write("</span>");
		oRm.write("</div>");
    }
});
