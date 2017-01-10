jQuery.sap.declare("sapui6.ui.layout.BootstrapContainer");

sap.ui.core.Control.extend("sapui6.ui.layout.BootstrapContainer", {  
    metadata : {     
        library : "sapui6.ui.layout",                        
        properties : {
            "width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "100%"},
            "className" : {type : "string", group : "Appearance", defaultValue : ""},   
            "visible" : {type : "boolean", group : "Appearance", defaultValue : true}      
        },

        defaultAggregation : "rows",
        aggregations : {
            "rows" : {type : "sapui6.ui.layout.BootstrapRow", multiple : true, singularName : "row"}
        }
    },

    renderer : function(oRm, oControl) {   
        if(!oControl.getVisible()) return;
        
        oRm.write('<div');
        oRm.writeControlData(oControl);
        oRm.addClass(oControl.getClassName());
        oRm.writeClasses();
        oRm.write('>');

        var rows = oControl.getRows();
        var len = rows.length;
        for(var i=0 ; i<len ; i++){
            oRm.write('<div');
            oRm.addClass("row");
            oRm.writeClasses();
            oRm.write('>');

            var row = rows[i];
            var columns = row.getColumns();
            var len2 = columns.length;
            for(var j=0 ; j<len2 ; j++){
                var column = columns[j];

                oRm.write('<div');
                oRm.addClass(column.getClassName());
                oRm.writeClasses();
                oRm.write('>');
                
                var content = column.getContent();
                var len3 = content.length;
                for(var k=0 ; k<len3 ; k++){
                    oRm.renderControl(content[k]);
                }
                oRm.write('</div>');
            }
            oRm.write('</div>');
        }
        oRm.write('</div>');
    }
});

jQuery.sap.declare("sapui6.ui.layout.BootstrapRow");

sap.ui.core.Element.extend("sapui6.ui.layout.BootstrapRow", { 
    metadata : {       
        library : "sapui6.ui.layout",                      
        properties : {},
        defaultAggregation : "columns",
        aggregations : {
            "columns" : {type : "sapui6.ui.layout.BootstrapColumn", multiple : true, singularName : "column"}
        }
    }
});

jQuery.sap.declare("sapui6.ui.layout.BootstrapColumn");

sap.ui.core.Element.extend("sapui6.ui.layout.BootstrapColumn", { 
    metadata : {       
        library : "sapui6.ui.layout",                      
        properties : {
            "className" : {type : "string", group : "Appearance", defaultValue : ""}   
        },
        defaultAggregation : "content",
        aggregations : {
            "content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
        }
    }
});

