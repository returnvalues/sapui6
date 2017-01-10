/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.chart.MicroColumnChart");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.chart.MicroColumnChart", { 
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
        s.push('<svg width="' + width + '">');
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
    }
});