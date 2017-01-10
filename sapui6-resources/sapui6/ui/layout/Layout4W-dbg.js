jQuery.sap.declare("sapui6.ui.layout.Layout4W");

sap.ui.core.Control.extend("sapui6.ui.layout.Layout4W", {  
    metadata : {    
        library : "sapui6.ui.layout",                        
        properties : {
            "width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "100%"},
            "leftWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "25%"},
            "leftMinWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
            "leftMiddleWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "25%"},
            "leftMiddleMinWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
            "rightMiddleWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "25%"},
            "rightMiddleMinWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
            "rightWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "25%"},
            "rightMinWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
            "animation" : {type : "string", defaultValue : ""},
            "enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
            "visible" : {type : "boolean", group : "Appearance", defaultValue : true}      
        },

        defaultAggregation : "content",
        aggregations : {
            "content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
        }
    },

    renderer : function(oRm, oControl) {   
        if(!oControl.getVisible()) return;
           
        oRm.write('<table');
        oRm.writeControlData(oControl);
        oRm.addStyle("margin", "0px 0px 0px 0px");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("border-spacing", "0px");
        oRm.addStyle("width", oControl.getWidth());
        oRm.writeStyles();
        oRm.write('>');
        
        var content = oControl.getContent();
        var length = content.length;

        oRm.write('<tr>');

        oRm.write('<td');
        oRm.addStyle("vertical-align", "top");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("width", oControl.getLeftWidth());
        if(oControl.getLeftMinWidth() != "") oRm.addStyle("min-width", oControl.getLeftMinWidth());
        oRm.writeStyles();
        oRm.write('>');
        for(var i=0 ; i<length ; i++){
            oRm.write('<div');
            oRm.addStyle("margin", "0px 0px 0px 0px");
            oRm.addStyle("padding", "0px 0px 0px 0px");
            oRm.writeStyles();
            if(oControl.getAnimation() != "") {
                oRm.addClass("sapui6_"+oControl.getAnimation());
                oRm.writeClasses();
            }
            oRm.write('>');
            if(content[i].data("position") == "A") oRm.renderControl(content[i]);
            oRm.write('</div>');
        }
        oRm.write('</td>');

        oRm.write('<td');
        oRm.addStyle("vertical-align", "top");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("width", oControl.getLeftMiddleWidth());
        if(oControl.getLeftMiddleMinWidth() != "") oRm.addStyle("min-width", oControl.getLeftMiddleMinWidth());
        oRm.writeStyles();
        oRm.write('>');
        for(var i=0 ; i<length ; i++){
            oRm.write('<div');
            oRm.addStyle("margin", "0px 0px 0px 0px");
            oRm.addStyle("padding", "0px 0px 0px 0px");
            oRm.writeStyles();
            if(oControl.getAnimation() != "") {
                oRm.addClass("sapui6_"+oControl.getAnimation());
                oRm.writeClasses();
            }
            oRm.write('>');
            if(content[i].data("position") == "B") oRm.renderControl(content[i]);
            oRm.write('</div>');
        }
        oRm.write('</td>');

        oRm.write('<td');
        oRm.addStyle("vertical-align", "top");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("width", oControl.getRightMiddleWidth());
        if(oControl.getRightMiddleMinWidth() != "") oRm.addStyle("min-width", oControl.getRightMiddleMinWidth());
        oRm.writeStyles();
        oRm.write('>');
        for(var i=0 ; i<length ; i++){
            oRm.write('<div');
            oRm.addStyle("margin", "0px 0px 0px 0px");
            oRm.addStyle("padding", "0px 0px 0px 0px");
            oRm.writeStyles();
            if(oControl.getAnimation() != "") {
                oRm.addClass("sapui6_"+oControl.getAnimation());
                oRm.writeClasses();
            }
            oRm.write('>');
            if(content[i].data("position") == "C") oRm.renderControl(content[i]);
            oRm.write('</div>');
        }
        oRm.write('</td>');

        oRm.write('<td');
        oRm.addStyle("vertical-align", "top");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("width", oControl.getRightWidth());
        if(oControl.getRightMinWidth() != "") oRm.addStyle("min-width", oControl.getRightMinWidth());
        oRm.writeStyles();
        oRm.write('>');
        for(var i=0 ; i<length ; i++){
            oRm.write('<div');
            oRm.addStyle("margin", "0px 0px 0px 0px");
            oRm.addStyle("padding", "0px 0px 0px 0px");
            oRm.writeStyles();
            if(oControl.getAnimation() != "") {
                oRm.addClass("sapui6_"+oControl.getAnimation());
                oRm.writeClasses();
            }
            oRm.write('>');
            if(content[i].data("position") == "D") oRm.renderControl(content[i]);
            oRm.write('</div>');
        }
        oRm.write('</td>');

        oRm.write('</tr>');
        oRm.write('</table>');
    }
});

