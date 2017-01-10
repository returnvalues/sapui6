jQuery.sap.declare("util.DataLoader");

function DataLoader(oControl, sName){
	this.control = oControl;
	this.busyControl = null;
	this.name = sName;
	this.fnAttachRequestFailed = null;
	this.fnAttachParseError = null;
	this.fnAttachRequestCompleted = null;

	this.model = new sap.ui.model.json.JSONModel();
};

DataLoader.prototype.init = function(){
	var control = this.control;
	var name = this.name;
	var fnAfterCompleted = this.fnAfterCompleted;
	var busyControl = this.busyControl;

	if(busyControl != null && typeof(busyControl) == "object") busyControl.setBusy(true);

	if(typeof(this.fnAttachRequestFailed) == "function") this.model.attachRequestFailed("",this.fnAttachRequestFailed);
	else {
		this.model.attachRequestFailed("", function(){
			if(busyControl != null && typeof(busyControl) == "object") busyControl.setBusy(false);
			sap.ui.commons.MessageBox.alert("Data load failed! Try again!",null,"System Information");
			jQuery.sap.log.info("Data load failed!");
	    	return;
		});
	}
	
	if(typeof(this.fnAttachParseError) == "function") this.model.attachParseError("",this.fnAttachParseError);
	else {
		this.model.attachParseError("", function(){
			if(busyControl != null && typeof(busyControl) == "object") busyControl.setBusy(false);
			sap.ui.commons.MessageBox.alert("Data parse error! Try again!",null,"System Information");
			jQuery.sap.log.info("Data parse error!");
	    	return;
		});
	}
	
	if(typeof(this.fnAttachRequestCompleted) == "function") this.model.attachRequestCompleted("",this.fnAttachRequestCompleted);
	else {
		this.model.attachRequestCompleted("", function(){
			if(name != undefined && name != "") control.setModel(this, name);
			else control.setModel(this);

			if(fnAfterCompleted != undefined && typeof(fnAfterCompleted) == "function") fnAfterCompleted();

			if(busyControl != null && typeof(busyControl) == "object") busyControl.setBusy(false);

			jQuery.sap.log.info("Data Binding Successful!");
		});
	}
};

DataLoader.prototype.attachRequestFailed = function(fnFunction){
	this.fnAttachRequestFailed = fnFunction;
};

DataLoader.prototype.attachParseError = function(fnFunction){
	this.fnAttachParseError = fnFunction;
};

DataLoader.prototype.attachRequestCompleted = function(fnFunction){
	this.fnAttachRequestCompleted = fnFunction;
};

DataLoader.prototype.setBusyControl = function(oControl){
	this.busyControl = oControl;
};

DataLoader.prototype.load = function(sUrl, sParams, bAsync, fnFunction){
	if(fnFunction != undefined && typeof(fnFunction) == "function") this.fnAfterCompleted = fnFunction;
	this.init();
	this.model.loadData(sUrl, sParams, bAsync);
};

DataLoader.prototype.loadOData = function(){

};
