jQuery.sap.declare("sapui6.ui.commons.Breadcrumb");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.Breadcrumb", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"marginLeft" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"backgroundColor" : {type: "string", defaultValue: null},
			"color" : {type: "string", defaultValue: null},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "navs",
		aggregations : {
	    	"navs" : {type : "sap.ui.commons.Link", multiple : true, singularName: "nav"}
		}
    },

    info : "#5bc0de",
    danger : "#d9534f",
    warning : "#f0ad4e",
    normal : "#000000",
    href : null,

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
		
		oRm.write("<ol");
		oRm.writeControlData(oControl);
		oRm.addClass("sapui6_breadcrumb");
		oRm.writeClasses();
		if(oControl.getMarginLeft()) oRm.addStyle("margin-left", oControl.getMarginLeft());
		if(oControl.getMarginRight()) oRm.addStyle("margin-right", oControl.getMarginRight());
		if(oControl.getMarginTop()) oRm.addStyle("margin-top", oControl.getMarginTop());
		if(oControl.getMarginBottom()) oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		if(oControl.getBackgroundColor()) oRm.addStyle("background-color", oControl.getBackgroundColor());
		if(oControl.getMarginLeft() || oControl.getMarginRight() || oControl.getMarginTop() || oControl.getMarginBottom() || oControl.getBackgroundColor()) oRm.writeStyles();
		oRm.write(">");

		var length = oControl.getNavs().length;
		for(var i=0 ; i<length ; i++){
			var nav = oControl.getNavs()[i];

			oRm.write("<li");
			if(i == length-1) {
				nav.setEnabled(false);
				oRm.addClass("active");
				oRm.writeClasses();
			}
			oRm.write(">");
			oRm.renderControl(nav);
			oRm.write("</li>")
		}
		
		oRm.write("</ol>");
    }
});

