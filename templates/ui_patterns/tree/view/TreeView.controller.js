jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.TreeView", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var contentHeight = $(document).height()-50+"px";
	 		var rightPanelWidth = $(document).width()-340+"px";

	 		var leftPanel = sap.ui.getCore().byId(_View.getId()+"-panel-left");
	 		leftPanel.setHeight(contentHeight);

	 		var rightPanel = sap.ui.getCore().byId(_View.getId()+"-panel-right");
	 		rightPanel.setHeight(contentHeight);
	 		rightPanel.setWidth(rightPanelWidth);
	  	},

	 	onAfterRendering: function() {

	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},

	  	selectTreeNode : function(oEvent){
	  		var key = oEvent.getSource().data("key");
	  		alert(key);
	  		var params = "key="+ key;
	  		var dl = new DataLoader(_View, "t");
			dl.load("model/TreeView.model.json",params,false);
	  	}
	});

}());