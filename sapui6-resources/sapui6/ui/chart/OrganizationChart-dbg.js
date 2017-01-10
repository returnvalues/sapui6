/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.chart.OrganizationChart");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.chart.OrganizationChart", { 
    library : "sapui6.ui.chart",
    metadata : {                             
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
            "width" : {type:"sap.ui.core.CSSSize", defaultValue : null}, 
            "height" : {type:"sap.ui.core.CSSSize", defaultValue : null}, 
            "fontSize" : {type:"string", defaultValue: "12px"},
            "textColor" : {type:"string", defaultValue: "#fff"},
            "boxColor" : {type:"string", defaultValue: "#990066"},
            "boxBorderColor" : {type:"string", defaultValue: "#fff"},
            "boxWidth" : {type:"string", defaultValue: "140px"},
            "boxHeight" : {type:"string", defaultValue: "40px"},
            "boxBorderWidth" : {type:"string", defaultValue: "0"},
            "boxVInterval" : {type:"string", defaultValue: "50px"},
            "lineColor" : {type:"string", defaultValue: "#000"},
            "imageWidth" : {type:"string", defaultValue: "30px"},
            "imageHeight" : {type:"string", defaultValue: "50px"},
            "backgroundColor" : {type:"string", defaultValue: "#fff"},
            "animation" : {type:"boolean", defaultValue:false}
        },
        defaultAggregation : "items",
        aggregations : {
            "items" : {type : "sapui6.ui.chart.OrganizationChartItem", multiple : true, singularName : "item", bindable : "bindable"}
        },
        events : {
            "select" : {}
        }
    },

    _level : 0,

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        oRm.write("<div");
        oRm.writeControlData(oControl); 
        oRm.addStyle("width", oControl.getWidth());
        oRm.addStyle("height", oControl.getHeight());
        oRm.addStyle("backgroundColor", oControl.getBackgroundColor());
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("</div>");
    },

    onAfterRendering : function(){
        if(this.getItems().length == 0) return;

        var width = $("#"+this.getId()).width();
        var height = $("#"+this.getId()).height();
        var boxWidth = parseFloat(this.getBoxWidth().split("px")[0]);
        var boxHeight = parseFloat(this.getBoxHeight().split("px")[0]);

        var s = [];
        s.push('<svg width="' + width + '" height="' + height + '"');
        s.push(' style="background-color:' + this.getBackgroundColor() + ';"');
        s.push('>');

        var scaleFactor = 1;
        if(this.getAnimation()) scaleFactor = 0.1;

        s.push('<g id="' + this.getId() + '-svg-group" transform="scale(' + scaleFactor + ')">');
        
        var root = this.getRoot();
        var x = (width/2) - (boxWidth/2);
        var boxColor = root.getBoxColor()?root.getBoxColor():this.getBoxColor();
        var textColor = root.getTextColor()?root.getTextColor():this.getTextColor();
        var fontSize = root.getFontSize()?root.getFontSize():this.getFontSize();
        var iFontSize = parseFloat(fontSize.split("px")[0])+5;
        var imageWidth = parseFloat(this.getImageWidth().split("px")[0]);
        var imageHeight = parseFloat(this.getImageHeight().split("px")[0]);
        var imageX = (width-boxWidth)/2 + 10;
        var imageY = (boxHeight-imageHeight)/2;

        s.push('<g id="' + this.getId() + '-group-' + root.getIdx() + '" data-sapui6-orgchart-idx="' + root.getIdx() + '">');
        s.push('<rect x="' + x + '" y="20" width="' + boxWidth + 'px" height="' + boxHeight + 'px" style="fill:' + boxColor + ';stroke:' + this.getLineColor() + ';stroke-width:' + this.getBoxBorderWidth() + ';"></rect>');
        
        if(root.getSrc()){
            s.push('<image x="' + (x+10) + '" y="' + (20+imageY) + '" width="' + this.getImageWidth() + '" height="' + this.getImageHeight() + '" xlink:href="' + root.getSrc() + '" />');
            if(root.getTitle() && root.getSubTitle()){
                s.push('<text x="' + (x+10+imageWidth+10) + '" y="' + (20+(boxHeight*0.4)) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getTitle() + '</text>');
                s.push('<text x="' + (x+10+imageWidth+10) + '" y="' + (20+(boxHeight*0.4)+iFontSize) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getSubTitle() + '</text>');
            }else if(root.getTitle()){
                s.push('<text x="' + (x+10+imageWidth+10) + '" y="' + (20+(boxHeight*0.5)) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getTitle() + '</text>');
            }
        }else{
            if(root.getTitle() && root.getSubTitle()){
                s.push('<text x="' + (width/2) + '" y="' + (20+(boxHeight*0.4)) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getTitle() + '</text>');
                s.push('<text x="' + (width/2) + '" y="' + (20+(boxHeight*0.4)+iFontSize) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getSubTitle() + '</text>');
            }else if(root.getTitle()){
                s.push('<text x="' + (width/2) + '" y="' + (20+(boxHeight*0.5)) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + root.getTitle() + '</text>');
            }
        }
        
        s.push('</g>');

        var pointX = width/2;
        var pointY = (20 + boxHeight);

        s.push(this.renderChild(root.getKey(), width, 0, pointX, pointY));

        s.push('</g>');
        s.push('</svg>');

        $("#"+this.getId()).html(s.join(""));

        if(this.getAnimation()){
            var that = this;
            var zoomFactor = 1;
            var fnTransform = window.setInterval(function(){
                if(zoomFactor > 10) window.clearInterval(fnTransform);
                else{
                    $("#"+that.getId()+"-svg-group").attr("transform", "scale(" + (0.1*zoomFactor) + ")");
                    zoomFactor++;
                }
            },70);
        }

        var that = this;
        window.setTimeout(function(){
            var length = that.getItems().length;
            for(var i=0 ; i<length ; i++){
                document.getElementById(that.getId() + "-group-" + i).onclick = (sap.ui.getCore().byId(that.getId()).mouseclick).bind(that);
            }
        },1000);
    }
});

sapui6.ui.chart.OrganizationChart.M_EVENTS = {'select':'select'};

sapui6.ui.chart.OrganizationChart.prototype.renderChild = function(key, w, pX, pointX, pointY){
    var child = this.getChild(key);
    var length = child.length;
    var cWidth = Math.floor(w/length);
    var boxWidth = parseFloat(this.getBoxWidth().split("px")[0]);
    var boxHeight = parseFloat(this.getBoxHeight().split("px")[0]);
    var vInterval = parseFloat(this.getBoxVInterval().split("px")[0]);
    var s = [];
    
    for(var i=0; i <length ; i++){
        var x = pX + (cWidth/2) + (cWidth*i) - (boxWidth/2);
        var clevel = this.getLevel(child[i].getKey());
        this._level = 0;
        
        var boxColor = child[i].getBoxColor()?child[i].getBoxColor():this.getBoxColor();
        var textColor = child[i].getTextColor()?child[i].getTextColor():this.getTextColor();
        var fontSize = child[i].getFontSize()?child[i].getFontSize():this.getFontSize();
        var iFontSize = parseFloat(fontSize.split("px")[0])+5;
        var imageWidth = parseFloat(this.getImageWidth().split("px")[0]);
        var imageHeight = parseFloat(this.getImageHeight().split("px")[0]);
        var imageX = (cWidth-boxWidth)/2 + 10;
        var imageY = (boxHeight-imageHeight)/2;

        s.push('<g id="' + this.getId() + '-group-' + child[i].getIdx() + '"  data-sapui6-orgchart-idx="' + child[i].getIdx() + '">');
        s.push('<rect x="' + x + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))) + '" width="' + boxWidth + 'px" height="' + boxHeight + 'px" style="fill:' + boxColor + ';stroke:' + this.getLineColor() + ';stroke-width:' + this.getBoxBorderWidth() + ';"></rect>');
        
        if(child[i].getSrc()){
            s.push('<image x="' + (pX+imageX+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(imageY)) + '" width="' + this.getImageWidth() + '" height="' + this.getImageHeight() + '" xlink:href="' + child[i].getSrc() + '" />');
            if(child[i].getTitle() && child[i].getSubTitle()){
                s.push('<text x="' + (pX+(imageX+10+imageWidth)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.4)) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getTitle() + '</text>');
                s.push('<text x="' + (pX+(imageX+10+imageWidth)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.4)+iFontSize) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getSubTitle() + '</text>');
            }else if(child[i].getTitle()){
                s.push('<text x="' + (pX+(imageX+10+imageWidth)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.5)) + '" style="text-anchor: start;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getTitle() + '</text>');
            }
        }else{
            if(child[i].getTitle() && child[i].getSubTitle()){
                s.push('<text x="' + (pX+(cWidth/2)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.4)) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getTitle() + '</text>');
                s.push('<text x="' + (pX+(cWidth/2)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.4)+iFontSize) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getSubTitle() + '</text>');
            }else if(child[i].getTitle()){
                s.push('<text x="' + (pX+(cWidth/2)+(cWidth*i)) + '" y="' + (20+((boxHeight+vInterval)*(clevel-1))+(boxHeight*0.5)) + '" style="text-anchor: middle;fill:' + textColor + ';font-size:' + fontSize + ';font-weight:bold;">' + child[i].getTitle() + '</text>');
            }
        }

        s.push('</g>');
        s.push('<polyline points="' + pointX + ',' + pointY + ' ' + pointX + ',' + (20+((boxHeight+vInterval)*(clevel-1))-25) + ' ' + (pX+(cWidth/2)+(cWidth*i)) + ',' + (20+((boxHeight+vInterval)*(clevel-1))-25) + ' ' + (pX+(cWidth/2)+(cWidth*i)) + ',' + (20+((boxHeight+vInterval)*(clevel-1))) + '" style="fill:transparent;stroke:' + this.getLineColor() + ';" />');
        

        var cpX = (pX+(cWidth/2)+(cWidth*i));
        var cpY = (20+((boxHeight+vInterval)*(clevel-1))) + boxHeight;

        s.push(this.renderChild(child[i].getKey(), cWidth, pX+(cWidth*i), cpX, cpY));

    }
    
    return s.join("");
};

sapui6.ui.chart.OrganizationChart.prototype.getRoot = function(){
    var root = null;
    var length = this.getItems().length;
    for(var i=0 ; i<length ; i++){
        var item = this.getItems()[i];
        if(item.getParentKey() == null || item.getParentKey() == "") {
            item.setProperty("idx",i,true);
            root = item;
            break;
        }
    }
    return root;
};

sapui6.ui.chart.OrganizationChart.prototype.getChild = function(parentKey){
    var child = [];
    var length = this.getItems().length;
    for(var i=0 ; i<length ; i++){
        var item = this.getItems()[i];
        if(item.getParentKey() && item.getParentKey() == parentKey) {
            item.setProperty("idx",i,true);
            child.push(item);
        }
    }

    return child;
};

sapui6.ui.chart.OrganizationChart.prototype.getLevel = function(key){
    var length = this.getItems().length;
    for(var i=0; i<length ; i++){
        var item = this.getItems()[i];
        if(item.getKey() && item.getKey() == key){
            this._level++;

            this.getLevel(item.getParentKey());
        }
    }

    return this._level;
};

sapui6.ui.chart.OrganizationChart.prototype.mouseclick = function(evt){
    var obj = evt.target ? evt.target : evt.srcElement;
    var g = obj;
    while(g.tagName.toLowerCase() != "g"){
        g = g.parentNode;
    }

    var idx = parseInt(g.getAttribute("data-sapui6-orgchart-idx"));
    this.fireSelect({dataIndex:idx, key:this.getItems()[idx].getKey(), parentKey:this.getItems()[idx].getParentKey(), obj:g});
};

jQuery.sap.declare("sapui6.ui.chart.OrganizationChartItem");
jQuery.sap.require("sap.ui.core.Element");

sap.ui.core.Element.extend("sapui6.ui.chart.OrganizationChartItem", { 
    metadata : {       
        library : "sapui6.ui.chart",                      
        properties : {
            "key" : {type : "string", defaultValue : null},
            "title" : {type : "string", defaultValue : null},
            "subTitle" : {type : "string", defaultValue : null},
            "parentKey" : {type : "string", defaultValue : null},
            "textColor" : {type : "string", defaultValue : null},
            "fontSize" : {type : "string", defaultValue : null},
            "boxColor" : {type : "string", defaultValue : null},
            "boxBorderColor" : {type : "string", defaultValue : null},
            "src" : {type :"string", defaultValue : null},
            "idx" : {type: "int", defaultValue:-1}
        }
    }
});