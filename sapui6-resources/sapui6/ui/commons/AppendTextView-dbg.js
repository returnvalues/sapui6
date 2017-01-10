jQuery.sap.declare("sapui6.ui.commons.AppendTextView");

sap.ui.commons.TextView.extend("sapui6.ui.commons.AppendTextView", { 
    library : "sapui6.ui.commons",
    metadata : {                             
        properties : {
        	"before" : {type:"string", defaultValue:null},
        	"after" : {type:"string", defaultValue:null}
        }
    },
    renderer : {},

    onAfterRendering : function(){
    	if(this.getBefore()) $(this.getDomRef()).before('<span style="vertical-align:middle;">' + this.getBefore() + '</span>');
    	if(this.getAfter()) $(this.getDomRef()).after('<span style="vertical-align:middle;">' + this.getAfter() + '</span>');
    }
});