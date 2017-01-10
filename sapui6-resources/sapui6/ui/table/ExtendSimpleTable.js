jQuery.sap.declare("sapui6.ui.table.ExtendSimpleTable"),jQuery.sap.require("sap.ui.table.Table"),sap.ui.table.Table.extend("sapui6.ui.table.ExtendSimpleTable",{library:"sapui6.ui.table",renderer:{}}),sapui6.ui.table.ExtendSimpleTable.prototype.setColumn=function(t){for(var e=t.length,i=0;e>i;i++){var a=new sap.ui.table.Column;void 0!=t[i].title&&a.setLabel(new sap.ui.commons.Label({text:t[i].title,textAlign:sap.ui.core.TextAlign.Center,design:sap.ui.commons.LabelDesign.Bold})),void 0!=t[i].width&&a.setWidth(t[i].width),a.setSortProperty(t[i].path);var n=new sap.ui.commons.TextView;if(void 0!=t[i].template)n=t[i].template;else{var r=t[i].format,l=t[i].path;void 0!=r&&null!=r&&""!=r?r.indexOf("#")>-1?n.bindText({path:l,type:this._getFormatType(r)}):r.indexOf("yy")>-1?(this._dateFormat=r,n.bindText({path:l,formatter:this._toDateFormat.bind(this)})):"%"==r&&n.bindText({path:l,formatter:this._toPercent}):n.bindText(l),void 0!=t[i].align&&("right"==t[i].align.toLowerCase()?n.setTextAlign(sap.ui.core.TextAlign.Right):"center"==t[i].align.toLowerCase()?n.setTextAlign(sap.ui.core.TextAlign.Center):n.setTextAlign(sap.ui.core.TextAlign.Left))}a.setTemplate(n),this.addColumn(a)}},sapui6.ui.table.ExtendSimpleTable.prototype._getFormatType=function(t){return t.indexOf("#")>-1?this._getFloatType(t):new sap.ui.model.type.Date({pattern:t})},sapui6.ui.table.ExtendSimpleTable.prototype._getFloatType=function(t){var e=!1,i=",",a=".",n=0,r=0,l=0,o=0;if(t.indexOf(",")>-1)if(e=!0,t.indexOf(".")>-1)if(t.indexOf(",")<t.indexOf(".")){i=",",a=".";var p=t.split(".")[0],s=t.split(".")[1];n=this._countChar(p,"0"),r=p.length,l=this._countChar(s,"0"),o=s.length}else{i=".",a=",";var p=t.split(",")[0],s=t.split(",")[1];n=this._countChar(p,"0"),r=p.length,l=this._countChar(s,"0"),o=s.length}else i=",",n=this._countChar(t,"0"),r=t.length;else if(t.indexOf(".")>-1){e=!1;var p=t.split(".")[0],s=t.split(".")[1];n=this._countChar(p,"0"),r=p.length,l=this._countChar(s,"0"),o=s.length}else e=!1,n=this._countChar(t,"0"),r=t.length;var u=new sap.ui.model.type.Float({minIntegerDigits:n,minFractionDigits:l,maxFractionDigits:o,groupingEnabled:e,groupingSeparator:i,decimalSeparator:a});return u},sapui6.ui.table.ExtendSimpleTable.prototype._countChar=function(t,e){for(var i=0,a=t.length,n=0;a>n;n++)t.charAt(n)==e&&i++;return i},sapui6.ui.table.ExtendSimpleTable.prototype._dateFormat="MM.dd.yyyy",sapui6.ui.table.ExtendSimpleTable.prototype._toDateFormat=function(t){if(t){if(t instanceof Date){var e=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:this._dateFormat});return e.format(new Date(t))}return this._toDateFormat2(t)}return t},sapui6.ui.table.ExtendSimpleTable.prototype._toDateFormat2=function(t){if(t){var e=this._dateFormat;return e=e.replace("yyyy",t.substring(0,4)),e=e.replace("MM",t.substring(4,6)),e=e.replace("dd",t.substring(6))}return t},sapui6.ui.table.ExtendSimpleTable.prototype._toPercent=function(t){return t?String(t)+"%":t};