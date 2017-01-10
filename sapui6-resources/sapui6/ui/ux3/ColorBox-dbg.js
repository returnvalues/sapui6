jQuery.sap.declare("sapui6.ui.ux3.ColorBox");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.ux3.ColorBox", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"margin" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "5px"},
			"backgroundColor" : {type: "string", defaultValue: "#fff"},
			"statusColor" : {type: "string", defaultValue: null},
			"borderRadius" : {type : "sap.ui.core.CSSSize", defaultValue: "0px"},
			"borderColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"title" : {type : "string", defaultValue : ""},
			"titleColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"scroll" : {type: "boolean", defaultValue:true},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : false}
		}
    },

    info : "#5bc0de",
    danger : "#d9534f",
    warning : "#f0ad4e",
    normal : "#000000",
    href : null,

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");

		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapUiBaseText"), true);
		if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiMediumBorder"), true);
    	if(!this.getStatusColor()) this.setProperty("statusColor", sap.ui.core.theming.Parameters.get("sapUiActive"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
    	oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
		oRm.addStyle("margin", oControl.getMargin());
		oRm.addStyle("background-color", oControl.getBackgroundColor());
		oRm.addStyle("border-color", oControl.getBorderColor());
		oRm.addStyle("border-left-color", oControl.getStatusColor());
		oRm.addStyle("border-radius", oControl.getBorderRadius());
		if(oControl.getScroll()) {
			oRm.addStyle("overflow","auto");
			oRm.addStyle("-webkit-overflow-scrolling","touch");
		}
		oRm.writeStyles();
		oRm.addClass("sapui6_ColorBox");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("<span");
		oRm.addStyle("color", oControl.getTitleColor());
		oRm.addStyle("font-size", oControl.getTitleFontSize());
		oRm.writeStyles();
		oRm.addClass("title");
		oRm.writeClasses();
		oRm.write(">");

		if(typeof(oControl.href) == "function"){
			oRm.write("	<span");
			oRm.addClass("btn-right");
			oRm.writeClasses();
			oRm.write("	>");
			jQuery.sap.require("sap.ui.core.Icon");
			oRm.renderControl(new sap.ui.core.Icon({src:"sap-icon://action",press:oControl.href}));
			oRm.write("</span>");
		}

		oRm.write(oControl.getTitle());
		oRm.write("</span>");
		oRm.write("<div>");
		oRm.renderControl(oControl.getContent());
		oRm.write("</div>");
		oRm.write("</div>");
    }
});

sapui6.ui.ux3.ColorBox.prototype.setHref = function(fnFunction){
	this.href = fnFunction;
};
