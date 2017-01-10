jQuery.sap.declare("sapui6.ui.ux3.ScrollingMessage");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.ux3.ScrollingMessage", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
			"headerHeight" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "30px"},
			"bodyHeight" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "5px"},
			"iconHoverColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : "#d9534f"},
			"headerBackgroundColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : "#fff"},
			"headerTitleColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : "#333"},
			"title" : {type : "string", defaultValue : "&nbsp;"},
			"interval" : {type : "int", defaultValue :4000},
			"direction" : {type : "int", defaultValue : 0},
			"visibleItemCount" : {type : "int", defaultValue : 1},
			"visible" : {type:"boolean", defaultValue:true},
			"showBorder" : {type:"boolean", defaultValue:true},
			"scroll" : {type:"boolean", defaultValue:true},
			"collapsed" : {type:"boolean", defaultValue:true},
			"expandIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-down"},
			"collapseIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-up"}
		},
		defaultAggregation : "items",
		aggregations : {
	    	"items" : {type : "sap.ui.core.Control", multiple : true, singularName : "item"}
		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("margin", oControl.getMargin());
		oRm.writeStyles();
		oRm.addClass("sapui6_sm");
		oRm.writeClasses();
		oRm.write(">");

		oRm.write("<div");
		oRm.addStyle("background-color", oControl.getHeaderBackgroundColor());
		oRm.addStyle("color", oControl.getHeaderTitleColor());
		if(!oControl.getShowBorder()) oRm.addStyle("border","0px");
		oRm.addStyle("height", oControl.getHeaderHeight());
		oRm.writeStyles();
		oRm.addClass("sapui6_sm-heading");
		oRm.writeClasses();
		oRm.write(">");

		if(oControl.getCollapsed()){
			oRm.write("<span");
			oRm.addClass("sapui6_sm-btn-right");
			oRm.writeClasses();
			oRm.write(">");
			var oCollapseIcon = new sap.ui.core.Icon(oControl.getId()+"-sm-collapse-icon",{src:oControl.getExpandIcon(),press:(oControl.collapse).bind(oControl)});
			oCollapseIcon.setHoverColor(oControl.getIconHoverColor());
			oRm.renderControl(oCollapseIcon);
			oRm.write("</span>");
		}
		oRm.write('<span id="' + oControl.getId() + '-sm-title">');	
		oRm.write(oControl.getTitle());
		oRm.write("</span>");

		oRm.write("</div>");

		oRm.write('<ul id="' + oControl.getId() + '-sm-content' + '"');
		oRm.addClass("sapui6_sm-list-group");
		oRm.writeClasses();
		oRm.addStyle("height", "0px");
		oRm.addStyle("display", "none");
		if(oControl.getScroll()) oRm.addStyle("overflow", "auto");
		oRm.writeStyles();
		oRm.write(">");

		oControl.getItems().forEach(function(item,index){
			oRm.write('<li class="sapui6_sm-list-group-item">');
			oRm.renderControl(item);
			oRm.write('</li>');
		});
		oRm.write('</ul>');

		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	this.startMessage();
    }
});

sapui6.ui.ux3.ScrollingMessage.prototype.startMessage = function(){
	var titleSpan = $("#"+this.getId()+"-sm-title");
	var that = this;
	var itemIndex = 0;
	var length = this.getItems().length;
	var visibleItemCount = this.getVisibleItemCount();
	var messageHtml = "";
	for(var i=0 ; i<visibleItemCount ; i++){
		if(i < length){
			if(i > 0) messageHtml += "<br>";
			messageHtml += $($("#"+that.getId()+"-sm-content li")[i]).html()
		}
	}
	titleSpan.html(messageHtml);
	itemIndex = visibleItemCount;

	window.setInterval(function(){
		if(itemIndex == length) itemIndex = 0;
		messageHtml = "";
		for(var i=0 ; i<visibleItemCount ; i++){
			if(itemIndex < length) {
				if(i > 0) messageHtml += "<br>";
				messageHtml += $($("#"+that.getId()+"-sm-content li")[itemIndex]).html();
				itemIndex++;
			}
		}

		titleSpan.html(messageHtml);
	}, that.getInterval());
};

sapui6.ui.ux3.ScrollingMessage.prototype.collapse = function(){
	var panelContent = $("#"+this.getId()+"-sm-content");

	if(panelContent.css("display") == "block"){
		sap.ui.getCore().byId(this.getId()+"-sm-collapse-icon").setSrc(this.getExpandIcon());

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
		sap.ui.getCore().byId(this.getId()+"-sm-collapse-icon").setSrc(this.getCollapseIcon());
		panelContent.css("display","block");

		var panelContentHeight = this.getBodyHeight();
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