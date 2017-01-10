jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.TreeTabView", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var contentHeight = $(document).height()-50;
	 		var rightPanelWidth = $(document).width()-340;

	 		var leftPanel = sap.ui.getCore().byId(_View.getId()+"-panel-left");
	 		leftPanel.setHeight(contentHeight+"px");

	 		var rightPanel = sap.ui.getCore().byId(_View.getId()+"-panel-right");
	 		rightPanel.setHeight(contentHeight+"px");
	 		rightPanel.setWidth(rightPanelWidth+"px");

	 		var rightTab = sap.ui.getCore().byId(_View.getId()+"-tab-right");
	 		rightTab.setWidth(rightPanelWidth-20+"px");
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
			dl.load("model/TreeTabView.model.json",params,false);
	  	}
	});

}());