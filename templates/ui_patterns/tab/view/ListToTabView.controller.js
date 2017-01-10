jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.ListToTabView", {
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

	  	openValueHelp: function(oEvent){
			var viewModel = _View.getModel("t");
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
					viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
				});
			}
			
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
				"model/SearchResultTable.model.json", 	
				params,							
				false,						
				function(){					
					
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
		}
	});

}());