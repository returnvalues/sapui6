jQuery.sap.declare("sapui6.ui.commons.Accordion");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.commons.Accordion", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"margin" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "5px"},
			"visible" : {type:"boolean", defaultValue:true},
			"scroll" : {type:"boolean", defaultValue:true},
			"headerBackgroundColor" : {type : "sap.ui.core.CSSColor", group : "Misc", defaultValue : null},
			"borderRadius" : {type : "sap.ui.core.CSSSize", defaultValue: "0px"},
			"borderColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"title" : {type : "string", defaultValue : ""},
			"titleColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
			"titleFontSize" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
			"expandIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-down"},
			"collapseIcon" : {type : "string", group : "Misc", defaultValue : "sap-icon://slim-arrow-up"},
			"openedSectionsId" : {type : "string", group : "Misc", defaultValue : ""}
		},
		defaultAggregation : "sections",
		aggregations : {
	    	"sections" : {type : "sapui6.ui.commons.AccordionSection", multiple : true, singularName : "section"}
		}
    },

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");

		if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapUiBaseText"), true);
		if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    	if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiMediumBorder"), true);
    	if(!this.getHeaderBackgroundColor()) this.setProperty("headerBackgroundColor", sap.ui.core.theming.Parameters.get("sapUiBaseBG"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
    	oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		if(oControl.getHeight()) oRm.addStyle("height", oControl.getHeight());
		oRm.addStyle("margin", oControl.getMargin());
		oRm.writeStyles();
		oRm.addClass("sapui6_accordion");
		oRm.writeClasses();
		oRm.write(">");

		var id = oControl.getId();
		var aSections = oControl.getSections();

		aSections.forEach(function(section,index){
			oRm.write("<div");
			oRm.addStyle("border-color", oControl.getBorderColor());
			oRm.writeStyles();
			oRm.addClass("section");
			oRm.writeClasses();
			oRm.write(">");

			oRm.write('<div id="' + id + '-section-header-' + index + '" onclick="javascript:sap.ui.getCore().byId(\'' + id + '\').accordion(this);"');
			oRm.addStyle("border-color", oControl.getBorderColor());
			oRm.addStyle("color", oControl.getTitleColor());
			oRm.addStyle("font-size", oControl.getTitleFontSize());
			oRm.addStyle("background-color", oControl.getHeaderBackgroundColor());
			oRm.writeStyles();
			oRm.addClass("heading");
			oRm.writeClasses();
			oRm.write(">");

			if(oControl.getOpenedSectionsId() != ""){
				if(oControl.getOpenedSectionsId() == section.getId()) {
					oRm.renderControl(new sap.ui.core.Icon(id+'-section-icon-'+index, {src:oControl.getCollapseIcon()}));
				}else{
					oRm.renderControl(new sap.ui.core.Icon(id+'-section-icon-'+index, {src:oControl.getExpandIcon()}));
				}
			}else{
				if(section.getExpand()) {
					oControl.setProperty("openedSectionsId",section.getId(),true);
					oRm.renderControl(new sap.ui.core.Icon(id+'-section-icon-'+index, {src:oControl.getCollapseIcon()}));
				}else oRm.renderControl(new sap.ui.core.Icon(id+'-section-icon-'+index, {src:oControl.getExpandIcon()}));
			}
			
			oRm.write('<span class="title">');
			oRm.write(section.getTitle());
			oRm.write("</span>");
			oRm.write("</div>");

			oRm.write('<div id="' + id + '-section-content-' + index + '"');
			if(oControl.getOpenedSectionsId() != ""){
				if(oControl.getOpenedSectionsId() == section.getId()) {
					oRm.addStyle("height", section.getHeight());
					oRm.addStyle("display", "block");
				}else{
					oRm.addStyle("height", "0px");
					oRm.addStyle("display", "none");
				}
			}else{
				if(section.getExpand()){
					oRm.addStyle("height", section.getHeight());
					oRm.addStyle("display", "block");
				}else{
					oRm.addStyle("height", "0px");
					oRm.addStyle("display", "none");
				}
			}
			if(oControl.getScroll()) {
				oRm.addStyle("overflow","auto");
				oRm.addStyle("-webkit-overflow-scrolling","touch");
			}
			oRm.writeStyles();
			oRm.write(">");
			oRm.write('<div class="body">');
			section.getContent().forEach(function(content){
				oRm.renderControl(content);
			});
			oRm.write("</div>");
			oRm.write("</div>");

			oRm.write("</div>");
		});

		oRm.write("</div>");
    }
});

sapui6.ui.commons.Accordion.prototype.accordion = function(obj){
	var sectionContentId = obj.id.replace("-section-header-","-section-content-");

	var length = this.getSections().length;
	for(var i=0 ; i<length ; i++){
		var section = this.getSections()[i];
		if(sectionContentId == (this.getId()+"-section-content-" + i)){
			var selectedSection = $("#"+this.getId()+"-section-content-" + i);
			if(selectedSection.css("display") == "block"){
				sap.ui.getCore().byId(this.getId()+"-section-icon-" + i).setSrc(this.getExpandIcon());

				var sapui5js_accordion_interval = window.setInterval(function(){
					if(selectedSection.css("height") == "0px") {
						window.clearInterval(sapui5js_accordion_interval);
						selectedSection.css("display","none");
					}else {
						var decreaseHeight = parseInt(selectedSection.css("height").replace("px",""));
						if(decreaseHeight-30 < 0){
							selectedSection.css("height","0px");
						}else{
							selectedSection.css("height",parseInt(selectedSection.css("height").replace("px",""))-30+"px");
						}
					}
				},10);
			}else{
				sap.ui.getCore().byId(this.getId()+"-section-icon-" + i).setSrc(this.getCollapseIcon());
				selectedSection.css("display","block");
				this.setProperty("openedSectionsId",section.getId(),true);

				var sapui5js_accordion_interval = window.setInterval(function(){
					if(selectedSection.css("height") == section.getHeight()) window.clearInterval(sapui5js_accordion_interval);
					else {
						var increaseHeight = parseInt(selectedSection.css("height").replace("px",""));
						if(increaseHeight+30 > parseInt(section.getHeight().replace("px",""))){
							selectedSection.css("height",section.getHeight());
						}else{
							selectedSection.css("height",parseInt(selectedSection.css("height").replace("px",""))+30+"px");
						}
					}
				},10);
			}
		}else{
			sap.ui.getCore().byId(this.getId()+"-section-icon-" + i).setSrc(this.getExpandIcon());
			var unSelectedSection = $("#"+this.getId()+"-section-content-" + i);
			unSelectedSection.css("display","none");
			unSelectedSection.css("height","0px");
		}
	}
};

jQuery.sap.declare("sapui6.ui.commons.AccordionSection");
jQuery.sap.require("sap.ui.core.Element");

sap.ui.core.Element.extend("sapui6.ui.commons.AccordionSection", { 
    metadata : {       
    	library : "sapui6.ui.commons",                      
        properties : {
			"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "200px"},
			"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
			"expand" : {type : "boolean", group : "Behavior", defaultValue : false},
			"title" : {type : "string", group : "Misc", defaultValue : null}
		},
		defaultAggregation : "content",
		aggregations : {
	    	"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		}
    }

});
