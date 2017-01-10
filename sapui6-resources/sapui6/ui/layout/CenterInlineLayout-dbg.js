jQuery.sap.declare("sapui6.ui.layout.CenterInlineLayout");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.layout.CenterInlineLayout", { 
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
			"resize" : {type:"boolean", defaultValue : true}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		}
    },

    onBeforeRendering : function(){},

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

  		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("text-align", "center");

		if(oControl.getWidth()) oRm.addStyle("width", oControl.getWidth());
		if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
		oRm.writeStyles();
		oRm.write(">");
		
		var items = oControl.getContent();
		var length = items.length;
		for(var i=0 ; i<length ; i++){
			oRm.write("<span");
			if(i < (length-1)){
				oRm.addStyle("margin-right","5px");
				oRm.writeStyles();
			}
			oRm.write(">");
			oRm.renderControl(items[i]);
			oRm.write("</span>");
		}
		

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

sapui6.ui.layout.CenterInlineLayout.prototype.resizeLayout = function(widthRatio){
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
