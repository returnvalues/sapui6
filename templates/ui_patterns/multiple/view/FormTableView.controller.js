jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.FormTableView", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/FormTableView.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	 		var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},
	});

}());