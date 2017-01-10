jQuery.sap.declare("sapui6.ui.commons.TabStrip");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.TabStrip", { 
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
  			"visible" : {type:"boolean", defaultValue:true},
  			"selectedIndex" : {type : "int", defaultValue: 0},
        "resize" : {type:"boolean", defaultValue : true}
  		},
  		defaultAggregation : "tabs",
  		aggregations : {
  	    	"tabs" : {type : "sapui6.ui.commons.Tab", multiple : true, singularName : "tab"}
  		}
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;

      oRm.write('<div');
      oRm.writeControlData(oControl);
      oRm.addStyle("width", oControl.getWidth());
      if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
      if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
      if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
      if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
      if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", "0px");
      oRm.writeStyles();
      oRm.write('>');
  		oRm.write('<ul');
  		oRm.addClass('sapui6_nav sapui6_nav-tabs');
  		oRm.writeClasses();
  		// oRm.addStyle("width", oControl.getWidth());
		  oRm.writeStyles();
  		oRm.write('>');

  		oControl.getTabs().forEach(function(tab,index){
  			oRm.write('<li id="' + oControl.getId() + '-tab-li-' + index + '"');
  			if(index == oControl.getSelectedIndex()){
  				oRm.addClass('active');
  				oRm.writeClasses();
  			}
  			oRm.write('>');
  			oRm.write('<a href="javascript:sap.ui.getCore().byId(\'' + oControl.getId() + '\').selectTab(' + index  + ');">');
  			oRm.write(tab.getTitle());
  			oRm.write('</a>');
  			oRm.write('</li>');
  		});

  		oRm.write('</ul>');
  		
  		oRm.write('<div id="' + oControl.getId() + '-tabstrip-content"');
  		oRm.addClass('sapui6_tab-content');
  		oRm.writeClasses();
  		oRm.addStyle("width", oControl.getWidth());
      oRm.addStyle("background-color", "#fff");
      if(oControl.getHeight().indexOf("px")>-1) {
        oRm.addStyle("height", parseInt(oControl.getHeight().split("px")[0])-44+"px");
      }else{
        oRm.addStyle("height", oControl.getHeight());
      }
		  
		  oRm.writeStyles();
  		oRm.write('>');

  		oControl.getTabs().forEach(function(tab,index){
  			oRm.write('<div id="' + oControl.getId() + '-tab-content-' + index + '"');
	  		oRm.addClass('sapui6_tab-pane sapui6_fade');
	  		if(index == oControl.getSelectedIndex()){
  				oRm.addClass('active in');
  				oRm.writeClasses();
  			}
	  		oRm.writeClasses();
	  		oRm.write('>');
	  		tab.getContent().forEach(function(content){
				oRm.renderControl(content);
			});
	  		oRm.write('</div>');
  		});

  		oRm.write('</div>');
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
          $("#"+this.getId()+"-tabstrip-content").css("width", String(parentWidth-leftRightMargin-20)+"px");
      }

      // $('#'+ this.getId() + '-tab-content-' + this.getSelectedIndex()).css("width", $("#"+this.getId()+"-tabstrip-content").width()+"px");

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

sapui6.ui.commons.TabStrip.prototype.resizeLayout = function(widthRatio){
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
    $("#"+this.getId()+"-tabstrip-content").css("width", String(parentWidth-leftRightMargin-20)+"px");
  }
    
  // $('#'+ this.getId() + '-tab-content-' + this.getSelectedIndex()).css("width", $("#"+this.getId()+"-tabstrip-content").width()+"px");
};

sapui6.ui.commons.TabStrip.prototype.selectTab = function(iSelectTabIndex){
	if(this.getSelectedIndex() != iSelectTabIndex){
		var preSelectedTab = $('#'+ this.getId() + '-tab-content-' + this.getSelectedIndex());
		preSelectedTab.css("display","none");
		preSelectedTab.removeClass("active");
		preSelectedTab.removeClass("in");
		$('#'+ this.getId() + '-tab-li-' + this.getSelectedIndex()).removeClass("active");

		var currentSelectedTab = $('#'+ this.getId() + '-tab-content-' + iSelectTabIndex);
		currentSelectedTab.css("display","block");
		currentSelectedTab.addClass("active");
		currentSelectedTab.addClass("in");
		$('#'+ this.getId() + '-tab-li-' + iSelectTabIndex).addClass("active");

		this.setProperty("selectedIndex", iSelectTabIndex, true);
    this.invalidate();
	}
};


jQuery.sap.declare("sapui6.ui.commons.Tab");
jQuery.sap.require("sap.ui.core.Element");

sap.ui.core.Element.extend("sapui6.ui.commons.Tab", { 
    metadata : {       
      library : "sapui6.ui.commons",                      
        properties : {
      "title" : {type : "string", group : "Misc", defaultValue : null}
    },
    defaultAggregation : "content",
    aggregations : {
        "content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
    }
    }
});