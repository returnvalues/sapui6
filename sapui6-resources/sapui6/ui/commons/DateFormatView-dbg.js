jQuery.sap.declare("sapui6.ui.commons.DateFormatView");

sap.ui.commons.TextView.extend("sapui6.ui.commons.DateFormatView", { 
    library : "sapui6.ui.commons",
    metadata : {                             
        properties : {
        	"format" : {type:"string", defaultValue:null}
        }
    },
    renderer : {}
});

sapui6.ui.commons.DateFormatView.prototype.bindText = function(sPath){
	this.bindProperty("text",{
		parts:[
			{path:sPath}
		],
		formatter:this._toDateFormat
	});
};

sapui6.ui.commons.DateFormatView.prototype._toDateFormat = function(value) {
    if (value) {
        if(value instanceof Date){
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: this.getFormat()}); 
            return oDateFormat.format(new Date(value));
        }else{
            return this._toDateFormat2(value);
        }
        
    } else {
        return value;
    }
};

sapui6.ui.commons.DateFormatView.prototype._toDateFormat2 = function(value) {
    if (value) {
        var date_format = this.getFormat();
        date_format = date_format.replace("yyyy",value.substring(0,4));
        date_format = date_format.replace("MM",value.substring(4,6));
        date_format = date_format.replace("dd",value.substring(6));

        return date_format; 
    } else {
        return value;
    }
};
