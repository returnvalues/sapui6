jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.TabView", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/TabView.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	}
	});

}());