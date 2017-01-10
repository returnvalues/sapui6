jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.EditTab", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/EditTab.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},

	  	doSave: function(oEvent){
	  		var formData = _View.getModel("t").getProperty("/FormData");
	  		var formData2 = _View.getModel("t").getProperty("/FormData2");
	  		var tableData = _View.getModel("t").getProperty("/TableData");
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

	  	openValueHelp2: function(oEvent){
	  		var viewModel = _View.getModel("t");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				viewModel.setProperty("/FormData2/ValueHF", _Dialog.data("code"));
				viewModel.setProperty("/FormData2/ValueHFDesc", _Dialog.data("desc"));
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

		openValueHelpForTable: function(oEvent){
			var oValueHelp = oEvent.getSource();
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var oBindingInfo = oTable.getBindingInfo("rows");
			var tableModel = oBindingInfo.binding.getModel(oBindingInfo.model);
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				tableModel.setProperty(oBindingInfo.path+"/" + oTable.getSelectedRowIndex() + "/"+oValueHelp.getBindingInfo("value").binding.sPath, _Dialog.data("code"));
			});
			
			_Dialog.open();
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