jQuery.sap.declare("sapui6.ui.commons.PercentField");

sap.ui.commons.TextField.extend("sapui6.ui.commons.PercentField", { 
    library : "sapui6.ui.commons",
    metadata : {                             
        properties : {
        	"format" : {type:"string", defaultValue:null},
        	"float" : {type:"boolean", defaultValue:false}
        }
    },
    renderer : {},

    onAfterRendering : function(){
    	$(this.getInputDomRef()).after('<span style="vertical-align:sub;">%</span>');
    	if(this.getFloat()){
    		this.attachBrowserEvent("keydown",function(e){
				var key=(window.event)?event.keyCode:e.which;
				var ctrlkey = (window.event)?event.ctrlKey:e.ctrlKey;
				var shiftkey = (window.event)?event.shiftKey:e.shiftKey;

				if(shiftkey){
					if(window.event){
						if(event.preventDefault) event.preventDefault();
						else event.returnValue = false;
					}else e.preventDefault();
				}else if((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key==9 || key==8 || key==13 || key==37 || key==39 || key==46 || key==110 || key==190 || key==109 || key==189){
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
    	}else{
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
        
    	var that = this;
		this.attachBrowserEvent("focus",function(){
			var oBindingInfo = that.getBindingInfo("value");
			if(oBindingInfo) {
				that.getInputDomRef().value = oBindingInfo.binding.oValue;
			}else{

			}
        });

        this.attachBrowserEvent("blur",function(){
            if(that.getBindingInfo("value")) that.setValue(that.getDomRef().value);
        });
    }
});

sapui6.ui.commons.PercentField.prototype.bindValue = function(sPath){
	this.bindProperty("value",{path:sPath,type:this.getType()});
};

sapui6.ui.commons.PercentField.prototype.getType = function(){
	var groupingEnabled = false;
	var groupingSeparator = ",";
	var decimalSeparator = ".";
	var minIntegerDigits = 0;
	var maxIntegerDigits = 0;
	var minFractionDigits = 0;
	var maxFractionDigits = 0;

	var format = this.getFormat();
	if(format.indexOf(",") > -1){
		groupingEnabled = true;

		if(format.indexOf(".") > -1){
			if(format.indexOf(",") < format.indexOf(".")){
				groupingSeparator = ",";
				decimalSeparator = ".";
				var sInteger = format.split(".")[0];
				var sFraction = format.split(".")[1];
				minIntegerDigits = this._countChar(sInteger,"0");
				maxIntegerDigits = sInteger.length;
				minFractionDigits = this._countChar(sFraction,"0");
				maxFractionDigits = sFraction.length;
			}else{
				groupingSeparator = ".";
				decimalSeparator = ",";
				var sInteger = format.split(",")[0];
				var sFraction = format.split(",")[1];
				minIntegerDigits = this._countChar(sInteger,"0");
				maxIntegerDigits = sInteger.length;
				minFractionDigits = this._countChar(sFraction,"0");
				maxFractionDigits = sFraction.length;
			}
		}else{
			groupingSeparator = ",";
			minIntegerDigits = this._countChar(format,"0");
			maxIntegerDigits = format.length;
		}
	}else if(format.indexOf(".") > -1){
		groupingEnabled = false;
		var sInteger = format.split(".")[0];
		var sFraction = format.split(".")[1];
		minIntegerDigits = this._countChar(sInteger,"0");
		maxIntegerDigits = sInteger.length;
		minFractionDigits = this._countChar(sFraction,"0");
		maxFractionDigits = sFraction.length;
	}else{
		groupingEnabled = false;
		minIntegerDigits = this._countChar(format,"0");
		maxIntegerDigits = format.length;
	}

	if(maxFractionDigits > 0) {
		this.setFloat(true);
	}

	var type = new sap.ui.model.type.Float({
		minIntegerDigits: minIntegerDigits, 
	  	// maxIntegerDigits: maxIntegerDigits, 
	  	minFractionDigits: minFractionDigits, 
	  	maxFractionDigits: maxFractionDigits, 
	  	groupingEnabled: groupingEnabled, 
	  	groupingSeparator: groupingSeparator,
	  	decimalSeparator: decimalSeparator
	});

	return type;
};

sapui6.ui.commons.PercentField.prototype._countChar = function(sStr, sChar){
	var cnt = 0;
	var length = sStr.length;
	for(var i=0 ; i<length ; i++){
		if(sStr.charAt(i) == sChar) cnt++;
	}

	return cnt;
};