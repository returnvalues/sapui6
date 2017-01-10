jQuery.sap.declare("sapui6.ui.layout.Layout1C");

sap.ui.core.Control.extend("sapui6.ui.layout.Layout1C", {  
    metadata : {     
        library : "sapui6.ui.layout",                        
        properties : {
            "width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "100%"},
            "minWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
            "animation" : {type : "string", defaultValue : ""},
            "visible" : {type : "boolean", group : "Appearance", defaultValue : true}      
        },

        defaultAggregation : "content",
        aggregations : {
            "content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
        }
    },

    renderer : function(oRm, oControl) {   
        if(!oControl.getVisible()) return;
           
        oRm.write('<div');
        oRm.writeControlData(oControl);
        oRm.addStyle("margin", "0px 0px 0px 0px");
        oRm.addStyle("padding", "0px 0px 0px 0px");
        oRm.addStyle("border-spacing", "0px");
        oRm.addStyle("width", oControl.getWidth());
        if(oControl.getMinWidth() != "") oRm.addStyle("min-width", oControl.getMinWidth());
        oRm.writeStyles();
        oRm.write('>');
        
        var content = oControl.getContent();
        var length = content.length;
        for(var i=0 ; i<length ; i++){
            oRm.write('<div');
            if(oControl.getAnimation() != "") {
                oRm.addClass("sapui6_"+oControl.getAnimation());
                oRm.writeClasses();
            }
            oRm.write('>');
            oRm.renderControl(content[i]);
            oRm.write('</div>');
        }

        oRm.write('</div>');
    }
});

