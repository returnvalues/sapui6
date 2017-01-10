jQuery.sap.declare("sapui6.ui.layout.HorizontalForm");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.layout.HorizontalForm", { 
    metadata : {     
    	library : "sapui6.ui.layout",                        
        properties : {
        	"visible" : {type : "boolean", group : "Behavior", defaultValue : true},
			"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"minusWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "0px"},
			"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginLeft" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginRight" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginTop" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"marginBottom" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"backgroundColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"widths" : {type : "sap.ui.core.CSSSize[]", group : "Appearance", defaultValue : null},
			"border" : {type : "boolean", group : "Appearance", defaultValue : true},
			"borderColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"strongColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"labelBackgroundColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"labelBold" : {type : "boolean", group : "Appearance", defaultValue : false},
			"labelAlign" : {type : "string", group : "Appearance", defaultValue : null},
			"fontSize" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"textColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"title" : {type : "string", defaultValue : null},
			"titleColor" : {type : "string" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "string", group : "Dimension", defaultValue : null},
			// "buttonSize" : {type : "string", group : "Dimension", defaultValue : "default"},
			"resize" : {type:"boolean", defaultValue : true}
		},
		defaultAggregation : "button",
		aggregations : {
	    	"button" : {type : "sap.ui.commons.Button", multiple : true, singularName : "button"},
	    	"toolbar" : {type : "sap.ui.commons.Toolbar", multiple : false},
	    	"item" : {type : "sap.ui.core.Control", multiple : true, singularName : "item"}
		}
    },

    settings : null,

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");
		
		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapTitleColor"), true);
    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiBaseBorder"), true);
    	if(!this.getStrongColor()) this.setProperty("strongColor", sap.ui.core.theming.Parameters.get("sapActiveColor"), true);
    	if(!this.getLabelBackgroundColor()) this.setProperty("labelBackgroundColor", sap.ui.core.theming.Parameters.get("sapUiListHeaderBackground"), true);
    	if(!this.getFontSize()) this.setProperty("fontSize", sap.ui.core.theming.Parameters.get("sapUiDesktopFontSize"), true);
    	if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    	if(!this.getBackgroundColor()) this.setProperty("backgroundColor", sap.ui.core.theming.Parameters.get("sapUiTableRowBG"), true);
    	if(!this.getTextColor()) this.setProperty("textColor", sap.ui.core.theming.Parameters.get("sapTextColor"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

  		if(!oControl.settings) return;

  		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("sapui6_formLayout");
		oRm.writeClasses();
		if(oControl.getWidth()) oRm.addStyle("width", oControl.getWidth());
		if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		oRm.writeStyles();
		oRm.write(">");
		
		if(oControl.getToolbar()){
            oRm.write("<div>");
            oRm.renderControl(oControl.getToolbar());
            oRm.write("</div>");
        }else if(oControl.getButton().length > 0 || oControl.getTitle()){
			oRm.write("<div");
			if(oControl.getButton().length == 0) {
				oRm.addStyle("margin-bottom","5px");
				oRm.writeStyles();
			}
			oRm.write(">");

			if(oControl.getButton().length > 0){
				oRm.write("<span");
				oRm.addClass("btn-right");
				oRm.writeClasses();
				oRm.write(">");
			
				oControl.getButton().forEach(function(button,index){
					oRm.write("<span style='margin-left:5px;'>");
					oRm.renderControl(button);
					oRm.write("</span>");
				});
			}
			oRm.write("</span>");
			if(oControl.getTitle()) {
				oRm.write("<span");
				oRm.addClass("title");
				oRm.writeClasses();
				oRm.addStyle("color",oControl.getTitleColor());
				oRm.addStyle("font-size",oControl.getTitleFontSize());
				if(oControl.getStrongColor()){
					oRm.addStyle("border-left-color",oControl.getStrongColor());
				}

				oRm.writeStyles();
				oRm.write(">");
				oRm.write(oControl.getTitle());
				oRm.write("</span>");
			}
			oRm.write("</div>");
		}
		
		oRm.write("<table");
		oRm.addStyle("border-top-color",oControl.getStrongColor());
		oRm.addStyle("border-left-color",oControl.getBorderColor());
		oRm.addStyle("border-right-color",oControl.getBorderColor());
		oRm.addStyle("border-bottom-color",oControl.getBorderColor());
		oRm.addStyle("font-size",oControl.getFontSize());
		oRm.addStyle("background-color",oControl.getBackgroundColor());
		oRm.addStyle("color",oControl.getTextColor());
		oRm.writeStyles();
		oRm.addClass("sapUiMlt");
		oRm.writeClasses();
		oRm.write(">");
		
		if(oControl.getWidths()){
			oRm.write("<colgroup>");
			var widthsLength = oControl.getWidths().length;
			for(var i=0 ; i<widthsLength ; i++){
				oRm.write("<col");
				oRm.addStyle("width", oControl.getWidths()[i]);
				oRm.writeStyles();
				oRm.write("/>");
			}
			oRm.write("</colgroup>");
		}		

		oRm.write("<tbody>");

		var items = oControl.getItem();
		var itemIndex = 0;
		var layoutCnt = 0;
		var length = oControl.settings.length;
		for(var i=0 ; i<length ; i++){
			var item = oControl.settings[i];

			oRm.write("<tr>")

			oRm.write("<td");
			oRm.addStyle("background-color", oControl.getLabelBackgroundColor());
			if(oControl.getLabelBold()) oRm.addStyle("font-weight", "bold");
			if(oControl.getLabelAlign()) oRm.addStyle("text-align", oControl.getLabelAlign());
			if(oControl.getLabelBackgroundColor() || oControl.getLabelBold() || oControl.getLabelAlign()) oRm.writeStyles();
		
			oRm.addClass("label");
			oRm.writeClasses();

			oRm.write(">");
			if(item["label"] != undefined) {
				var oLabel = new sap.ui.commons.Label({text:item["label"]});
				if(item["required"]) oLabel.setRequired(item["required"]);
				if(item["requiredAtBegin"]) oLabel.setRequiredAtBegin(item["requiredAtBegin"]);

				oRm.renderControl(oLabel);
			}
			oRm.write("</td>");

			oRm.write("<td class='sapUiMltCell'>");
			
			if(item["element"] != undefined){
				item["element"].forEach(function(ele,index){
					oRm.write("<span");
					if(index < item["element"].length-1) {
						oRm.addStyle("margin-right","5px");
						oRm.writeStyles();
					}
					oRm.write(">")
					// oRm.renderControl(ele);
					oRm.renderControl(items[itemIndex]);
					oRm.write("</span>");	
					itemIndex++;			
				});
			}
			
			oRm.write("</td>");
			oRm.write("</tr>");
		}
		
		oRm.write("</tbody>");
		oRm.write("</table>");

		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	var obj = $("#"+this.getId());
        var parentWidth = obj.parent().width();

        if(parentWidth == 0 && this.getWidth().indexOf("%") > -1){
        	var fnInterval = window.setInterval(function(){
        		parentWidth = obj.parent().width();
        		if(parentWidth > 0){
        			window.clearInterval(fnInterval);
        			objWidth = parentWidth * (parseFloat(that.getWidth().split("%")[0])/100);
        			
        			var leftRightMargin = 0;

		            if(that.getMarginLeft() || that.getMarginRight()){
		                if(that.getMarginLeft()) leftRightMargin += parseInt(that.getMarginLeft().split("px")[0]);
		                if(that.getMarginRight()) leftRightMargin += parseInt(that.getMarginRight().split("px")[0]);
		            }else if(that.getMargin()){
		                leftRightMargin = parseInt(that.getMargin().split("px")[0]) * 2;
		            }

		            $("#"+that.getId()).css("width", String(objWidth-leftRightMargin-parseInt(that.getMinusWidth().split("px")[0]))+"px");
        		}
        	}, 100);
        }else if(this.getWidth().indexOf("px")>-1){
            var w = this.getWidth().split("px")[0];
            $("#"+this.getId()).css("width", String(w-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
        }else{
        	if(obj.outerWidth() >= parentWidth){
	        	var leftRightMargin = 0;

	            if(this.getMarginLeft() || this.getMarginRight()){
	                if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
	                if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
	            }else if(this.getMargin()){
	                leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
	            }

	            $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
	        }
        }

    	if(this.getResize()){
            var widthRatio = parseFloat($("#"+this.getId()).outerWidth()/$(window).width());
            var that = this;
            jQuery.sap.delayedCall(50, that, function() {
                that.resizeLayout(widthRatio);
            });
            $(window).resize(function(){
                jQuery.sap.delayedCall(50, that, function() {
                    that.resizeLayout(widthRatio);
                });
            });
        }
    }
});

sapui6.ui.layout.HorizontalForm.prototype.resizeLayout = function(widthRatio){
	$("#"+this.getId()).css("width",String(parseInt($(window).width()*widthRatio))+"px");

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

        $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
    }
};

sapui6.ui.layout.HorizontalForm.prototype.set = function(oSettings){
	this.settings = oSettings;
	var that = this;
	this.settings.forEach(function(element){
		element["element"].forEach(function(ele){
			that.addAggregation("item",ele);
		});
	});
};

