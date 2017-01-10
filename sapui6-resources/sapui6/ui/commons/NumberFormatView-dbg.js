jQuery.sap.declare("sapui6.ui.commons.NumberFormatView");

sap.ui.commons.TextView.extend("sapui6.ui.commons.NumberFormatView", { 
    library : "sapui6.ui.commons",
    metadata : {                             
        properties : {
        	"format" : {type:"string", defaultValue:null},
        	"before" : {type:"string", defaultValue:null},
        	"after" : {type:"string", defaultValue:null}
        }
    },
    renderer : {},

    onAfterRendering : function(){
    	if(this.getBefore()) $(this.getDomRef()).before('<span style="vertical-align:middle;">' + this.getBefore() + '</span>');
    	if(this.getAfter()) $(this.getDomRef()).after('<span style="vertical-align:middle;">' + this.getAfter() + '</span>');
    }
});

sapui6.ui.commons.NumberFormatView.prototype.bindText = function(sPath){
	this.bindProperty("text",{path:sPath,type:this.getType()});
};

sapui6.ui.commons.NumberFormatView.prototype.getType = function(){
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

sapui6.ui.commons.NumberFormatView.prototype._countChar = function(sStr, sChar){
	var cnt = 0;
	var length = sStr.length;
	for(var i=0 ; i<length ; i++){
		if(sStr.charAt(i) == sChar) cnt++;
	}

	return cnt;
};