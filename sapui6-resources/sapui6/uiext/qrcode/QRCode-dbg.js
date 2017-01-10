jQuery.sap.declare("sapui6.uiext.qrcode.QRCode");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.uiext.qrcode.QRCode", { 
    metadata : {     
    	library : "sapui6.uiext.qrcode",                        
        properties : {
			"width" : {type : "int", defaultValue : 150},
			"height" : {type : "int", defaultValue : 150},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "5px"},
			"text" : {type : "string", defaultValue : null},
			"scroll" : {type : "boolean", defaultValue : false},
			"backgroundColor" : {type : "string", defaultValue : "#fff"},
			"foregroundColor" : {type : "string", defaultValue : "#000"},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
		oRm.addStyle("margin", oControl.getMargin());
		oRm.writeStyles();
		oRm.write(">");
		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	$("#"+this.getId()).qrcode({
    		width : this.getWidth(),
    		height : this.getHeight(),
    		text : this.getText(),
    		backgroundColor : this.getBackgroundColor(),
    		foregroundColor : this.getForegroundColor()
    	});
    }
});