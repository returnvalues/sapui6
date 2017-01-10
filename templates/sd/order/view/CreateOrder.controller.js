jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _ShipAddressDialog;

	sap.ui.controller("view.CreateOrder", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/CreateOrder.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	 		
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},

	  	openSoldtoVH: function(oEvent){
			var viewModel = _View.getModel("t");
			var oDialog = sap.ui.jsfragment("fragments.valuehelp.SoldtoParty");
			oDialog.attachClosed(function(){
				viewModel.setProperty("/SearchCondition/Soldto", oDialog.data("KUNNR"));
				viewModel.setProperty("/SearchCondition/SoldtoDesc", oDialog.data("NAME1"));
				oDialog.destroy();
			});
			
			oDialog.open();
		},

		openShipAddressVH: function(oEvent){
			var viewModel = _View.getModel();

			if(_ShipAddressDialog == undefined){
				_ShipAddressDialog = sap.ui.jsfragment("fragments.valuehelp.ShipAddress");
				_ShipAddressDialog.attachClosed(function(){
					viewModel.setProperty("/header/shipAddress", _ShipAddressDialog.data("shipAddress"));
				});
			}
			
			_ShipAddressDialog.open();
		},

	  	doSave: function(oEvent){
	  		var formData = _View.getModel("t").getProperty("/FormData");
	  	},

	  	openValueHelp: function(oEvent){
	  		var viewModel = _View.getModel("t");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				viewModel.setProperty("/FormData/ValueHF", _Dialog.data("code"));
				viewModel.setProperty("/FormData/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
	  	},

		selectRadio: function(oEvent){
			var oRadio = oEvent.getSource();
			oRadio.setProperty("/FormData/Radio", oRadio.getSelectedItem().getKey());
		},

	  	addRows: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var appendData = [
				{"column1":"","column2":"","column3":"","column4":false,"column5":0,"column6":"","column7":0,"column8":0,"column9":"Yes"}
			];
			oTable.appendRows(appendData);
		},

		deleteRows: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			var selectedIndex = oTable.getSelectedIndex();
            var length = selectedIndex.length;
            for(var i=length-1 ; i>=0 ; i--){
                oTable.deleteRow(selectedIndex[i]);
            }
		},

		openMaterialVH: function(oEvent){
			var oMaterial = oEvent.getSource();
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var oBindingInfo = oTable.getBindingInfo("rows");
			var tableModel = oBindingInfo.binding.getModel(oBindingInfo.model);

			var oDialog = sap.ui.jsfragment("fragments.valuehelp.Material");
			oDialog.attachClosed(function(){
				tableModel.setProperty(oBindingInfo.path+"/" + oTable.getSelectedRowIndex() + "/code", _tDialog.data("code"));
				// tableModel.setProperty(oBindingInfo.path+"/" + oTable.getSelectedRowIndex() + "/code", _tDialog.data("description"));
				oDialog.destroy();
			});
			
			oDialog.open();
		},

		selectRadioForTable: function(oEvent){
			var oRadio = oEvent.getSource();
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var oBindingInfo = oTable.getBindingInfo("rows");
			var tableModel = oBindingInfo.binding.getModel(oBindingInfo.model);
			tableModel.setProperty(oBindingInfo.path+"/" + oTable.getSelectedRowIndex() + "/column9", oRadio.getSelectedItem().getKey());
		}
	});

}());