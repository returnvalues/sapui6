jQuery.sap.declare("sapui6.ui.table.ExtendSimpleTable");
jQuery.sap.require("sap.ui.table.Table");

sap.ui.table.Table.extend("sapui6.ui.table.ExtendSimpleTable", { 
    library : "sapui6.ui.table",
    renderer : {},
});

sapui6.ui.table.ExtendSimpleTable.prototype.setColumn = function(mColumn){
    var length = mColumn.length;
    for(var i=0 ; i<length ; i++){
        var oColumn = new sap.ui.table.Column();
        if(mColumn[i].title != undefined) oColumn.setLabel(new sap.ui.commons.Label({text: mColumn[i].title, textAlign:sap.ui.core.TextAlign.Center, design:sap.ui.commons.LabelDesign.Bold}));
        if(mColumn[i].width != undefined) oColumn.setWidth(mColumn[i].width);
        oColumn.setSortProperty(mColumn[i].path);

        var template = new sap.ui.commons.TextView();
        if(mColumn[i].template != undefined){
            template = mColumn[i].template;
        }else{
            var format = mColumn[i].format;
            var path = mColumn[i].path;
            if(format != undefined && format != null && format != ""){
                if(format.indexOf("#") > -1){
                    template.bindText({
                        path: path,
                        type: this._getFormatType(format)
                    });
                }else if(format.indexOf("yy") > -1){
                    this._dateFormat = format;
                    template.bindText({
                        path: path,
                        formatter: (this._toDateFormat).bind(this)
                    });
                }else if(format == "%"){
                    template.bindText({
                        path: path,
                        formatter: this._toPercent
                    });
                }
            }else{
                template.bindText(path);
            }

            if(mColumn[i].align != undefined){
                if(mColumn[i].align.toLowerCase() == "right") template.setTextAlign(sap.ui.core.TextAlign.Right);
                else if(mColumn[i].align.toLowerCase() == "center") template.setTextAlign(sap.ui.core.TextAlign.Center);
                else template.setTextAlign(sap.ui.core.TextAlign.Left);
            }
        }

        oColumn.setTemplate(template);
        
        this.addColumn(oColumn);
    }
};

sapui6.ui.table.ExtendSimpleTable.prototype._getFormatType = function(sFormat){
    if(sFormat.indexOf("#") > -1){
        return this._getFloatType(sFormat);
    }else{
        return new sap.ui.model.type.Date({pattern:sFormat});
    }
};

sapui6.ui.table.ExtendSimpleTable.prototype._getFloatType = function(format){
    var groupingEnabled = false;
    var groupingSeparator = ",";
    var decimalSeparator = ".";
    var minIntegerDigits = 0;
    var maxIntegerDigits = 0;
    var minFractionDigits = 0;
    var maxFractionDigits = 0;

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

sapui6.ui.table.ExtendSimpleTable.prototype._countChar = function(sStr, sChar){
    var cnt = 0;
    var length = sStr.length;
    for(var i=0 ; i<length ; i++){
        if(sStr.charAt(i) == sChar) cnt++;
    }

    return cnt;
};

sapui6.ui.table.ExtendSimpleTable.prototype._dateFormat = "MM.dd.yyyy";

sapui6.ui.table.ExtendSimpleTable.prototype._toDateFormat = function(value) {
    if (value) {
        if(value instanceof Date){
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: this._dateFormat}); 
            return oDateFormat.format(new Date(value));
        }else{
            return this._toDateFormat2(value);
        }
        
    } else {
        return value;
    }
};

sapui6.ui.table.ExtendSimpleTable.prototype._toDateFormat2 = function(value) {
    if (value) {
        var date_format = this._dateFormat;
        date_format = date_format.replace("yyyy",value.substring(0,4));
        date_format = date_format.replace("MM",value.substring(4,6));
        date_format = date_format.replace("dd",value.substring(6));

        return date_format; 
    } else {
        return value;
    }
};

sapui6.ui.table.ExtendSimpleTable.prototype._toPercent = function(value){
    if(value){
        return String(value) + "%";
    }else{
        return value;
    }
};