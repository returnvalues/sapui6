/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.chart.ColumnChart");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.chart.ColumnChart", { 
    library : "sapui6.ui.chart",
    metadata : {                             
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
            "width" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "100px"}, 
            "height" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "30px"}, 
            "color" : {type:"string", defaultValue: null},
            "colors" : {type:"string[]", defaultValue: []},
            "value" : {type:"float[]", defaultValue: [], bindable : "bindable"}
        }
    },

    _startX : 10,
    _startY : 10,

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        oRm.write("<div");
        oRm.writeControlData(oControl); 
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        oRm.addStyle("margin", "10px");
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("&nbsp;");
        oRm.write("</div>");
    },

    onAfterRendering : function(){
        this.renderChart();
    }
});

sapui6.ui.chart.ColumnChart.prototype.renderChart = function(){
    var that = this;
    var width = $("#"+this.getId()).width() - (this._startX)*2;
    var height = $("#"+this.getId()).height() - (this._startY)*2;
    var data = this.getValue();
    var color = this.getColor();
    var colors = this.getColors();
    var w1 = width/data.length;
    var columnWidth = w1*0.7;
    var columnInterval = w1*0.3;
    var maxValue = Math.max.apply(null, data);
    var h = height;

    var s = [];
    s.push('<svg width="' + width + '" height="' + height + '">');
    
    data.forEach(function(c,index){
        var columnHeight = Math.floor((c/maxValue)*h)-that._startY;
        var fill = colors[index]?colors[index]:color;
        var x = (index==0)?columnInterval:(columnWidth+columnInterval)*index;

        s.push('<rect ');
        s.push('x="' + x + '" ');
        s.push('y="' + (h-columnHeight) + '" ');
        s.push('width="' + columnWidth + '" ');
        s.push('height="' + columnHeight + '" ');
        s.push('fill="' + fill + '"');
        s.push('></rect>');
    });
    s.push('<line x1="' + this._startX + '" y1="' + this._startY + '" x2="' + this._startX + '" y2="' + height + '" style="stroke-width:2;stroke:#000;"></line>');
    s.push('<line x1="' + this._startX + '" y1="' + height + '" x2="' + width + '" y2="' + height + '" style="stroke-width:2;stroke:#000;"></line>');
    s.push('</svg>');

    $("#"+this.getId()).html(s.join(""));
};