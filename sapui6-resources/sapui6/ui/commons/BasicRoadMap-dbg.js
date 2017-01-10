jQuery.sap.declare("sapui6.ui.commons.BasicRoadMap");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.BasicRoadMap", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "50px"},
			"marginLeft" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"activeStep" : {type:"int", defaultValue:1},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "steps",
		aggregations : {
	    	"steps" : {type : "sapui6.ui.commons.BasicRoadMapStep", multiple : true, singularName: "step"}
		},
		events : {
			"press" : {}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

  		oRm.write("<ul");
		oRm.writeControlData(oControl);
		oRm.addClass("sapui6_basicroadmap");
		oRm.writeClasses();
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
		oRm.writeStyles();
		oRm.write(">");

		var length = oControl.getSteps().length;
		for(var i=0 ; i<length ; i++){
			var step = oControl.getSteps()[i];

			oRm.write("<li");
			if(oControl.getActiveStep() == (i+1)){
				oRm.addClass("active");
				oRm.writeClasses();
			}
			oRm.writeAttribute("data-sapui6_roadmap-step",(i+1));
			oRm.write(">");
			oRm.write("<span")
			oRm.addClass("step");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write(i+1);
			oRm.write("</span>");
			oRm.write("<span")
			oRm.addClass("title");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write(step.getTitle());
			oRm.write("</span>");
			oRm.write("</li>");
		}

		oRm.write("</ul>");
    }
});

sapui6.ui.commons.BasicRoadMap.M_EVENTS = {'press':'press'};

sapui6.ui.commons.BasicRoadMap.prototype.onclick = function(oEvent) {
	var obj = oEvent.target;

	var li = $("#" + this.getId() + " li");
	li.each(function(){
		$(this).removeClass("active");
	});

	if(obj.tagName != "UL" && obj.tagName == "SPAN") {
		while(obj.tagName != "LI") obj = obj.parentNode;
		
		$(obj).addClass("active");
		var step = $(obj).attr("data-sapui6_roadmap-step");
		this.firePress({step:step});

		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
};

// sapui6.ui.commons.BasicRoadMap.prototype.ontouchstart = sapui6.ui.commons.BasicRoadMap.prototype.onclick;
jQuery.sap.require("sap.ui.core.Element");
sap.ui.core.Element.extend("sapui6.ui.commons.BasicRoadMapStep", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
        	"title" : {type : "string", group : "Misc", defaultValue : null}
		}
    }
});
