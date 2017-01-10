jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.ListToEditTab", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/SearchCondition.model.json","",false);
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
				viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
				viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
	  	},

	  	openValueHelp2: function(oEvent){
	  		var oTab = sap.ui.getCore().byId(_View.getId()+"-tab");
	  		var tabModel = oTab.getModel("t");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				tabModel.setProperty("/FormData/ValueHF", _Dialog.data("code"));
				tabModel.setProperty("/FormData/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
	  	},

	  	openValueHelp3: function(oEvent){
	  		var oTab = sap.ui.getCore().byId(_View.getId()+"-tab");
	  		var tabModel = oTab.getModel("t");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				tabModel.setProperty("/FormData2/ValueHF", _Dialog.data("code"));
				tabModel.setProperty("/FormData2/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
	  	},

	  	doSearch: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-resultTable");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var viewModel = _View.getModel("t");
			var comboBox = viewModel.getProperty("/SearchCondition/ComboBox");
			var fromDate = viewModel.getProperty("/SearchCondition/FromDate");
			var toDate = viewModel.getProperty("/SearchCondition/ToDate");
			var valueHF = viewModel.getProperty("/SearchCondition/ValueHF");
			var chk1 = viewModel.getProperty("/SearchCondition/Chk1");
			var chk2 = viewModel.getProperty("/SearchCondition/Chk2");
			var chk3 = viewModel.getProperty("/SearchCondition/Chk3");
			var chk4 = viewModel.getProperty("/SearchCondition/Chk4");

			var params = "comboBox=" + comboBox + "&fromDate=" + fromDate + "&toDate=" + toDate + "&valueHF=" + valueHF+ "&chk1=" + chk1+ "&chk2=" + chk2+ "&chk3=" + chk3+ "&chk4=" + chk4;

			if(comboBox == "" && fromDate == "" && toDate == "") {
				sap.ui.commons.MessageBox.alert("Input the essential field!");
				return;
			}
			
			var dl = new DataLoader(oTable, "t");
			dl.setBusyControl(oTable);	
			dl.load(
				"model/SearchResultTable.model.json", 	// url
				params,							// parameter
				false,						// sync, async 
				function(){					// function after attachedRequestCompleted 
				
				}
			);
		},

		selectRow : function(data){
			var oTab = sap.ui.getCore().byId(_View.getId()+"-tab");

			var selectRowData = data.getParameter("rowData");
			var key = selectRowData["column3"];
			var params = "code=" + key;

			var dl = new DataLoader(oTab, "t");
			dl.setBusyControl(oTab);	
			dl.load(
				"model/TabData.model.json", 	
				params,							
				false,						
				function(){					
					oTab.setVisible(true);
				}
			);
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