jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.Detail", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		
	  	},

	 	onAfterRendering: function() {
	 		alert(_View.data("key"));
	 		
	 		var dl = new DataLoader(_View, "d");
			dl.load("model/Detail.model.json","",false);

			// var dl2 = new DataLoader(sap.ui.getCore().byId(_View.getId()+"-table"),"t");
			// dl2.load("model/Detail.model.json","",false);
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	      	if(_Dialog != undefined) _Dialog.destroyContent();
	  	},
		
		doPrint: function(oEvent) {
			alert("Print");
		},

		doEdit: function(oEvent){
			alert("Edit");
		}

	});

}());