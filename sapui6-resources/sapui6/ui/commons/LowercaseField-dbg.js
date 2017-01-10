jQuery.sap.declare("sapui6.ui.commons.LowercaseField");

sap.ui.commons.TextField.extend("sapui6.ui.commons.LowercaseField", { 
    library : "sapui6.ui.commons",

    renderer : {},

    onAfterRendering : function(){
        this.attachBrowserEvent("keyup",function(e){
			var v = this.getLiveValue();
			oTextField.setValue(v.toLowerCase());
		});	
    }
});
