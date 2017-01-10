jQuery.sap.declare("sapui6.ui.commons.Panel");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.Panel", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
			"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginLeft" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"iconHoverColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : null},
			"headerBackgroundColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : null},
			"borderRadius" : {type : "sap.ui.core.CSSSize", defaultValue: "0px"},
			"borderColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"title" : {type : "string", defaultValue : ""},
			"titleColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"visible" : {type:"boolean", defaultValue:true},
			"scroll" : {type:"boolean", defaultValue:true},
			"collapsed" : {type:"boolean", defaultValue:true},
			"expandIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-down"},
			"collapseIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-up"},
			"resize" : {type:"boolean", defaultValue : true}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"},
	    	"icon" : {type : "sap.ui.core.Icon", multiple : true, singularName : "icon"}
		}
    },

    _collapseIconId : null,

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");

		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapUiBaseText"), true);
		if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiMediumBorder"), true);
    	if(!this.getHeaderBackgroundColor()) this.setProperty("headerBackgroundColor", sap.ui.core.theming.Parameters.get("sapUiBaseBG"), true);
    	if(!this.getIconHoverColor()) this.setProperty("iconHoverColor", sap.ui.core.theming.Parameters.get("sapUiActive"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		oRm.addStyle("border-color", oControl.getBorderColor());
		oRm.addStyle("border-radius", oControl.getBorderRadius());
		oRm.writeStyles();
		oRm.addClass("sapui6_panel");
		oRm.writeClasses();
		oRm.write(">");

		oRm.write("<div");
		oRm.addStyle("background-color", oControl.getHeaderBackgroundColor());
		oRm.addStyle("color", oControl.getTitleColor());
		oRm.addStyle("border-color", oControl.getBorderColor());
		oRm.writeStyles();
		oRm.addClass("heading");
		oRm.writeClasses();
		oRm.write(">");

		if(oControl.getCollapsed() || typeof(oControl.getIcon()) == "object"){
			oRm.write("<span");
			oRm.addClass("btn-right");
			oRm.writeClasses();
			oRm.write(">");
			oControl.getIcon().forEach(function(icon,index){
				oRm.write("<span style='margin-right:10px;'>");
				if(oControl.getIconHoverColor()) icon.setHoverColor(oControl.getIconHoverColor());
				oRm.renderControl(icon);
				oRm.write("</span>");
			});

			if(oControl.getCollapsed()){
				var oCollapseIcon = new sap.ui.core.Icon({src:oControl.getCollapseIcon(),press:(oControl.collapse).bind(oControl)});
				oControl._collapseIconId = oCollapseIcon.getId();
				if(oControl.getIconHoverColor()) oCollapseIcon.setHoverColor(oControl.getIconHoverColor());
				oRm.renderControl(oCollapseIcon);
			}
			
			oRm.write("</span>");
		}
		oRm.write(oControl.getTitle());
		oRm.write("</div>");

		oRm.write('<div id="' + oControl.getId() + '-panel-content' + '"');
		oRm.addClass("body");
		oRm.writeClasses();
		
		oRm.addStyle("height", oControl.getHeight().split("px")[0]-75+"px");
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
    },

    onAfterRendering : function(){
    	var obj = $("#"+this.getId());
        var parentWidth = obj.parent().width();

        if(obj.outerWidth() >= parentWidth){
            var leftRightMargin = 0;

            if(this.getMarginLeft() || this.getMarginRight()){
                if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
                if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
            }else if(this.getMargin()){
                leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
            }

            $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin)+"px");
        }

    	if(this.getResize()){
            var widthRatio = parseFloat($("#"+this.getId()).outerWidth()/$(window).width());
            var that = this;
            $(window).resize(function(){
                jQuery.sap.delayedCall(50, that, function() {
                    that.resizeLayout(widthRatio);
                });
            });
        }
    }
});

sapui6.ui.commons.Panel.prototype.resizeLayout = function(widthRatio){
	$("#"+this.getId()).css("width",String(parseInt($(window).width()*widthRatio))+"px");

	if(obj.outerWidth() >= parentWidth){
        var leftRightMargin = 0;

        if(this.getMarginLeft() || this.getMarginRight()){
            if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
            if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
        }else if(this.getMargin()){
            leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
        }

        $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin)+"px");
    }
};

sapui6.ui.commons.Panel.prototype.collapse = function(){
	var panelContent = $("#"+this.getId()+"-panel-content");

	if(panelContent.css("display") == "block"){
		sap.ui.getCore().byId(this._collapseIconId).setSrc(this.getExpandIcon());

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
		sap.ui.getCore().byId(this._collapseIconId).setSrc(this.getCollapseIcon());
		panelContent.css("display","block");

		var panelContentHeight = this.getHeight().split("px")[0]-75+"px";
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