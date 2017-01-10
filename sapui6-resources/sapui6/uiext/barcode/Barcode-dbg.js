jQuery.sap.declare("sapui6.uiext.barcode.Barcode");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.uiext.barcode.Barcode", { 
    metadata : {     
    	library : "sapui6.uiext.barcode",                        
        properties : {
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "5px"},
			"barWidth" : {type : "string", defaultValue : "2"},
			"barHeight" : {type : "string", defaultValue : "50"},
			"moduleSize" : {type : "string", defaultValue : "5"},
			"quietZone" : {type : "string", defaultValue : "1"},
			"code" : {type : "string", defaultValue : null},
			"barcodeType" : {type : "string", defaultValue : "ean8"},	//ean8, ean13, upc, std25, int25, code11, code39, code93, code128, codabar, msi
			"format" : {type : "string", defaultValue : "css"},
			"scroll" : {type : "boolean", defaultValue : false},
			"backgroundColor" : {type : "string", defaultValue : "#ffffff"},
			"color" : {type : "string", defaultValue : "#000000"},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("margin", oControl.getMargin());
		oRm.writeStyles();
		oRm.write(">");
		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	var settings = {
    		bgColor: this.getBackgroundColor(),
    		color: this.getColor(),
    		barWidth: this.getBarWidth(),
    		barHeight: this.getBarHeight(),
    		moduleSize: this.getModuleSize(),
    		output: this.getFormat(),
    		addQuietZone: this.getQuietZone(),
    		posX: "10",
    		posY: "20"
		};

    	$("#"+this.getId()).html("").show().barcode(this.getCode(),this.getBarcodeType(),settings);
    }
});