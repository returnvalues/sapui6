jQuery.sap.declare("sapui6.ui.commons.NumberField");

sap.ui.commons.TextField.extend("sapui6.ui.commons.NumberField", { 
    library : "sapui6.ui.commons",

    renderer : {},

    onAfterRendering : function(){
        this.attachBrowserEvent("keydown",function(e){
			var key=(window.event)?event.keyCode:e.which;
			var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
			var shiftkey = (window.event)?event.shiftKey:e.shiftKey;
			
			if(shiftkey){
				if(window.event){
					if(event.preventDefault) event.preventDefault();
					else event.returnValue = false;
				}else e.preventDefault();
			}else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==109 || key==189){
				return true;
			}else if(ctrlkey && key==86){
				return true;
			}else if(ctrlkey && key==67){
				return true;
			}else {
				if(window.event){
					if(event.preventDefault) event.preventDefault();
					else event.returnValue = false;
				}else e.preventDefault();
			}
		});	
    }
});
