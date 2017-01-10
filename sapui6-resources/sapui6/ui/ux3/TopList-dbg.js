jQuery.sap.declare("sapui6.ui.ux3.TopList");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.ux3.TopList", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : ""},
			"marginLeft" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"backgroundColor" : {type: "string", defaultValue: null},
			"borderRadius" : {type: "string", defaultValue: null},
			"borderColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"scroll" : {type:"boolean", defaultValue:true},
			"line" : {type:"boolean", defaultValue:true},
			"showBorder" : {type:"boolean", defaultValue:true},
			"showOrderNumber" : {type:"boolean", defaultValue:true},
			"orderNumberBold" : {type:"boolean", defaultValue:false},
			"orderNumberColor" : {type : "string", defaultValue : null},
			"titleBold" : {type:"boolean", defaultValue:false},
			"titleColor" : {type : "string", defaultValue : null},
			"numberBold" : {type:"boolean", defaultValue:false},
			"numberColor" : {type : "string", defaultValue : null},
			"iconDownColor" : {type : "string", defaultValue : null},
			"iconUpColor" : {type : "string", defaultValue : null},
			"iconSameColor" : {type : "string", defaultValue : null},
			"visibleCount" : {type : "int", defaultValue : null},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "items",
		aggregations : {
	    	"items" : {type : "sapui6.ui.ux3.TopListItem", multiple : true, singularName: "item", bindable : "bindable"}
		},
		events : {
			"press" : {}
		}
    },

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");

    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiMediumBorder"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
		
		oRm.write("<ul");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
		oRm.addStyle("border-color", oControl.getBorderColor());
		if(oControl.getMarginLeft()) oRm.addStyle("margin-left", oControl.getMarginLeft());
		if(oControl.getMarginRight()) oRm.addStyle("margin-right", oControl.getMarginRight());
		if(oControl.getMarginTop()) oRm.addStyle("margin-top", oControl.getMarginTop());
		if(oControl.getMarginBottom()) oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		if(oControl.getBackgroundColor()) oRm.addStyle("background-color", oControl.getBackgroundColor());
		if(oControl.getBorderRadius()) oRm.addStyle("border-radius", oControl.getBorderRadius());
		if(!oControl.getShowBorder()) oRm.addStyle("border", "0px");
		if(oControl.getScroll()) {
			oRm.addStyle("overflow-y","auto");
			oRm.addStyle("-webkit-overflow-scrolling","touch");
		}
		oRm.writeStyles();
		oRm.addClass("sapui6_toplist");
		oRm.writeClasses();
		oRm.write(">");

		var length = oControl.getItems().length;
		if(oControl.getVisibleCount() && oControl.getVisibleCount() > 0) length = oControl.getVisibleCount();
		for(var i=0 ; i<length ; i++){
			var item = oControl.getItems()[i];

			oRm.write("<li");
			if(!oControl.getLine()){
				oRm.addStyle("border-bottom", "0px");
				oRm.writeStyles();
			}
			oRm.write(">");
			if(oControl.getShowOrderNumber()){
				oRm.write('<span data-sapui6_type="orderNumber"');
				oRm.addClass("orderNumber");
				oRm.writeClasses();
				if(oControl.getOrderNumberColor()) oRm.addStyle("color", oControl.getOrderNumberColor());
				if(oControl.getOrderNumberBold()) oRm.addStyle("font-weight", "bold");
				if(oControl.getOrderNumberColor() || oControl.getOrderNumberBold()) oRm.writeStyles();
				oRm.write(">");
				oRm.write(i+1+".");
				oRm.write("</span>");
			}
			
			oRm.write('<span data-sapui6_type="title"');
			oRm.addClass("title");
			oRm.writeClasses();
			if(oControl.getTitleColor()) oRm.addStyle("color", oControl.getTitleColor());
			if(oControl.getTitleBold()) oRm.addStyle("font-weight", "bold");
			if(oControl.getTitleColor() || oControl.getTitleBold()) oRm.writeStyles();
			oRm.write(">");
			oRm.write(item.getTitle());
			oRm.write("</span>");
			
			if(item.getNumber()){
				oRm.write('<span data-sapui6_type="number"');
				oRm.addClass("number");
				oRm.writeClasses();
				
				if(item.getNumberColor()) oRm.addStyle("color", item.getNumberColor());
				else if(oControl.getNumberColor()) oRm.addStyle("color", oControl.getNumberColor());
				
				if(oControl.getNumberBold()) oRm.addStyle("font-weight", "bold");
				if(oControl.getNumberColor() || oControl.getNumberBold()) oRm.writeStyles();
				oRm.write(">");
				oRm.write(item.getNumber());

				if(item.getIconDirection() || item.getIconDirection() == ""){
					oRm.write('<span');
					oRm.addClass("icon");
					oRm.writeClasses();
					oRm.write(">");
					var oIcon = new sap.ui.core.Icon({size:"10px"});

					if(item.getIconDirection() == "down") {
						oIcon.setSrc("sap-icon://down");
						if(oControl.getIconDownColor()) oIcon.setColor(oControl.getIconDownColor());
						else oIcon.setColor("#ff3333");
					}else if(item.getIconDirection() == "up") {
						oIcon.setSrc("sap-icon://up");
						if(oControl.getIconUpColor()) oIcon.setColor(oControl.getIconUpColor());
						else oIcon.setColor("#0ea106");
					}else if(item.getIconDirection() == "same") {
						oIcon.setSrc("sap-icon://less");
						if(oControl.getIconSameColor()) oIcon.setColor(oControl.getIconSameColor());
						else oIcon.setColor("#ddd");
					}else if(item.getIconDirection() == ""){
						oIcon.setSrc("sap-icon://less");
						oIcon.setColor("transparent");
					}

					oRm.renderControl(oIcon);
					oRm.write("</span>");
				}

				oRm.write("</span>");
			}

			oRm.write("</li>");
		}
		
		oRm.write("</ul>");
    }
});

sapui6.ui.ux3.TopList.M_EVENTS = {'press':'press'};

sapui6.ui.ux3.TopList.prototype.onclick = function(oEvent) {
	var obj = oEvent.target;
	if(obj.tagName != "UL") {
		while(obj.tagName != "LI") obj = obj.parentNode;
		
		var orderNumber = "";
		var title = "";
		var number = "";

		var span = $(obj).find("span");
		span.each(function(){
			if($(this).attr("data-sapui6_type") == "orderNumber") orderNumber = $(this).text().split(".")[0];
			if($(this).attr("data-sapui6_type") == "title") title = $(this).text();
			if($(this).attr("data-sapui6_type") == "number") number = $(this).text();
		});

		this.firePress({orderNumber:orderNumber,title:title,number:number});

		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
};

// sapui6.ui.ux3.TopList.prototype.ontouchstart = sapui6.ui.ux3.TopList.prototype.onclick;

sap.ui.core.Element.extend("sapui6.ui.ux3.TopListItem", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
        	"title" : {type : "string", group : "Misc", defaultValue : null},
			"number" : {type : "string", group : "Misc", defaultValue : null},
			"numberColor" : {type : "string", defaultValue : null},
			"iconDirection" : {type : "string", defaultValue : null}
		}
    }
});
