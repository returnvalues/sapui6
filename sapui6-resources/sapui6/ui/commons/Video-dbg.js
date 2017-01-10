jQuery.sap.declare("sapui6.ui.commons.Video");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.Video", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
      properties : {
  			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
  			"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
  			"visible" : {type:"boolean", defaultValue:true},
  			"url" : {type : "string", defaultValue: null}
	    }
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
  		
      oRm.write('<video');
      oRm.writeControlData(oControl);
      oRm.addStyle("width", oControl.getWidth());
      oRm.addStyle("height", oControl.getHeight());
      oRm.writeClasses();
      oRm.write('controls>');

      oRm.write('<source src="'+ oControl.getUrl() +'" type="video/mp4">');
      oRm.write('<source src="'+ oControl.getUrl() +'" type="video/ogg">');
      oRm.write('Your browser does not support the video tag.');

      oRm.write('</video>');
    }
});