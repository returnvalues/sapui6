jQuery.sap.declare("sapui6.ui.commons.TextFieldWithClear");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.TextFieldWithClear", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

  	renderer : {},

  	onBeforeRendering : function(){
  		this.setIconURL("sap-icon://decline");
  		this.setWidth(this.getWidth());
  		this.attachValueHelpRequest((function(){
  			this.setValue("");
  		}).bind(this));
  	},

  	onAfterRendering : function(){
  		var icon = $("#"+this.getId()+"-icon");
  		icon.css("font-size","10px");
  		icon.css("padding-top","4px");
  		icon.css("display","none");
  	}
});

sapui6.ui.commons.TextFieldWithClear.prototype.onmouseover = function(){
	$("#"+this.getId()+"-icon").css("display","");
};

sapui6.ui.commons.TextFieldWithClear.prototype.onmouseout = function(){
	$("#"+this.getId()+"-icon").css("display","none");
};



