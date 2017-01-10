/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.chart.MicroChart");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.chart.MicroChart", { 
    library : "sapui6.ui.chart",
    metadata : {                             
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
            "type" : {type:"string", defaultValue:"Column"},
            "width" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "100px"}, 
            "height" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "30px"}, 
            "color" : {type:"string", defaultValue: null},
            "colors" : {type:"string[]", defaultValue: []},
            "value" : {type:"float[]", defaultValue: [], bindable : "bindable"}
        }
    },

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        oRm.write("<div");
        oRm.writeControlData(oControl); 
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("&nbsp;");
        oRm.write("</div>");
    },

    onAfterRendering : function(){
        if(this.getType().toLowerCase() == "column") this.renderColumnChart();
        else if(this.getType().toLowerCase() == "bar") this.renderBarChart();
        else if(this.getType().toLowerCase() == "line") this.renderLineChart();
    }
});

sapui6.ui.chart.MicroChart.prototype.renderColumnChart = function(){
    var width = $("#"+this.getId()).width();
    var height = $("#"+this.getId()).height();
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
        var columnHeight = Math.floor((c/maxValue)*h);
        var fill = colors[index]?colors[index]:color;
        s.push('<rect ');
        s.push('x="' + (columnWidth+columnInterval)*index + '" ');
        s.push('y="' + (h-columnHeight) + '" ');
        s.push('width="' + columnWidth + '" ');
        s.push('height="' + columnHeight + '" ');
        s.push('fill="' + fill + '"');
        s.push('></rect>');
    });
    s.push('</svg>');

    $("#"+this.getId()).html(s.join(""));
};

sapui6.ui.chart.MicroChart.prototype.renderBarChart = function(){
    var width = $("#"+this.getId()).width();
    var height = $("#"+this.getId()).height();
    var data = this.getValue();
    var color = this.getColor();
    var colors = this.getColors();
    var h1 = height/data.length;
    var barHeight = h1*0.7;
    var barInterval = h1*0.3;
    var maxValue = Math.max.apply(null, data);
    var w = width;

    var s = [];
    s.push('<svg width="' + width + '" height="' + height + '">');
    data.forEach(function(c,index){
        var barWidth = Math.floor((c/maxValue)*w);
        var fill = colors[index]?colors[index]:color;
        s.push('<rect ');
        s.push('y="' + (barHeight+barInterval)*index + '" ');
        s.push('x="0" ');
        s.push('width="' + barWidth + '" ');
        s.push('height="' + barHeight + '" ');
        s.push('fill="' + fill + '"');
        s.push('></rect>');
    });
    s.push('</svg>');

    $("#"+this.getId()).html(s.join(""));
};

sapui6.ui.chart.MicroChart.prototype.renderLineChart = function(){
    var width = $("#"+this.getId()).width();
    var height = $("#"+this.getId()).height();
    var data = this.getValue();
    var color = this.getColor();
    var colors = this.getColors();
    var interval = width/data.length;
    var maxValue = Math.max.apply(null, data);
    var h = height;

    var preX = 0;
    var preY = 0;
    var s = [];
    s.push('<svg width="' + width + '" height="' + height + '">');
    data.forEach(function(c,index){
        var y2 = Math.floor((c/maxValue)*h);
        var stroke = colors[index]?colors[index]:color;
        if(index == 0) preY = y2;

        s.push('<line ');
        s.push('x1="' + preX + '" ');
        s.push('y1="' + (h-preY) + '" ');
        s.push('x2="' + (interval*index) + '" ');
        s.push('y2="' + (h-y2) + '" ');
        s.push('style="stroke-width:1;stroke:' + stroke + ';" ');
        s.push('></line>');

        preX = (interval*index);
        preY = y2;
    });
    s.push('</svg>');

    $("#"+this.getId()).html(s.join(""));
};