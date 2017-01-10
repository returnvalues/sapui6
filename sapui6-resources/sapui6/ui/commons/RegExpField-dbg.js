jQuery.sap.declare("sapui6.ui.commons.RegExpField");

sap.ui.commons.TextField.extend("sapui6.ui.commons.RegExpField", { 
    library : "sapui6.ui.commons",
    metadata : {                             
        properties : {
            "message" : {type:"string", defaultValue:null},
        	"before" : {type:"string", defaultValue:null},
        	"after" : {type:"string", defaultValue:null}
        }
    },
    renderer : {},

    regExp : null,
    EMAIL : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    URL : /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    IP_ADDRESS : /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    USER_ID : /^[a-z0-9_-]{3,16}$/,

    onAfterRendering : function(){
    	if(this.getBefore()) $(this.getInputDomRef()).before('<span style="vertical-align:sub;">' + this.getBefore() + '</span>');
    	if(this.getAfter()) $(this.getInputDomRef()).after('<span style="vertical-align:sub;">' + this.getAfter() + '</span>');
        
        jQuery.sap.require("sap.ui.ux3.ToolPopup");
        var oToolPopup = new sap.ui.ux3.ToolPopup({
            opener: this,
            content : [new sap.ui.commons.TextView({text:this.getMessage()})]
        });

    	var that = this;
        this.attachBrowserEvent("blur",function(){
            jQuery.sap.require("sap.ui.commons.MessageBox");
            if(that.regExp && that.getLiveValue() !=""){
                if(!that.regExp.test(that.getLiveValue())){
                    if(that.getMessage()){
                        this.focus();
                        that.setValueState(sap.ui.core.ValueState.Error);

                        oToolPopup.open(sap.ui.core.Popup.Dock.BeginBottom, sap.ui.core.Popup.Dock.BeginTop);

                        jQuery.sap.delayedCall(2000, that, function() {
                            oToolPopup.close();
                        });
                    }    
                }else{
                    that.setValueState();
                }
            }else{
                that.setValueState();
            }
        });
    }
});

sapui6.ui.commons.RegExpField.prototype.setRegExp = function(regExp){
    this.regExp = regExp;
};