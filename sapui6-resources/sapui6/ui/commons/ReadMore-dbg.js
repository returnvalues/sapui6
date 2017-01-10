jQuery.sap.declare("sapui6.ui.commons.ReadMore");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.ReadMore", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
			"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "0px"},
			"scroll" : {type : "boolean", defaultValue : false},
			"text" : {type : "string", defaultValue : "READ MORE"},
			"color" : {type : "string", defaultValue : null},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"},
	    	"icon" : {type : "sap.ui.core.Icon", multiple : true, singularName : "icon"},
	    	"button" : {type : "sap.ui.commons.Button", multiple : false}
		}
    },

    href : null,

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("margin", oControl.getMargin());
		oRm.writeStyles();
		oRm.addClass("sapui6_readmore");
		oRm.writeClasses();
		oRm.write(">");

		oRm.write("<div");
		oRm.addClass("heading");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("<span");
		oRm.addClass("btn-right");
		oRm.writeClasses();
		oRm.write(">");

		if(oControl.getButton()){
			var oButton = oControl.getButton();
			oButton.attachPress((oControl.collapse).bind(oControl));
			oRm.renderControl(oControl.getButton());
		}else{
			var oLink = new sap.ui.commons.Link({text:oControl.getText()});

			if(oControl.href) oLink.attachPress(oControl.href);
			else oLink.attachPress((oControl.collapse).bind(oControl));

			oRm.renderControl(oLink);
		}
		
		oRm.write("</span>");
		
		oRm.write("</div>");

		if(typeof(oControl.getContent()) != "object") return;

		oRm.write('<div id="' + oControl.getId() + '-readmore-content' + '"');
		oRm.addClass("body");
		oRm.writeClasses();
		oRm.addStyle("height", "0px");
		oRm.addStyle("display", "none");
		if(oControl.getScroll()) {
			oRm.addStyle("overflow","auto");
			oRm.addStyle("-webkit-overflow-scrolling","touch");
		}
		oRm.writeStyles();
		oRm.write(">");
		oControl.getContent().forEach(function(content,index){
			oRm.renderControl(content);
		});
		oRm.write("</div>");

		oRm.write("</div>");
    }
});

sapui6.ui.commons.ReadMore.prototype.setHref = function(fnFunction){
	if(typeof(fnFunction) == "function") this.href = fnFunction;
}

sapui6.ui.commons.ReadMore.prototype.collapse = function(oEvent){
	if(typeof(this.getContent()) != "object") return;

	var panelContent = $("#"+this.getId()+"-readmore-content");

	if(panelContent.css("display") == "block"){
		var sapui5js_panel_interval = window.setInterval(function(){
			if(panelContent.css("height") == "0px") {
				window.clearInterval(sapui5js_panel_interval);
				panelContent.css("display","none");
			}else {
				var decreaseHeight = parseInt(panelContent.css("height").replace("px",""));
				if(panelContent-30 < 0){
					panelContent.css("height","0px");
				}else{
					panelContent.css("height",parseInt(panelContent.css("height").replace("px",""))-30+"px");
				}
			}
		},10);

	}else{
		panelContent.css("display","block");

		var panelContentHeight = this.getHeight();
		var sapui5js_panel_interval = window.setInterval(function(){
			if(panelContent.css("height") == panelContentHeight) window.clearInterval(sapui5js_panel_interval);
			else {
				var increaseHeight = parseInt(panelContent.css("height").replace("px",""));
				if(increaseHeight+30 > parseInt(panelContentHeight.replace("px",""))){
					panelContent.css("height",panelContentHeight);
				}else{
					panelContent.css("height",parseInt(panelContent.css("height").replace("px",""))+30+"px");
				}
			}
		},10);
	}
};