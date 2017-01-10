jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.OrderDetail", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var orderNo = _View.data("orderNo");
	 		var params = "orderNo=" + orderNo;
	 		
	 		_View.setBusy(true);
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/OrderDetail.model.json",params,false, function(){
				_View.setBusy(false);
			});
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