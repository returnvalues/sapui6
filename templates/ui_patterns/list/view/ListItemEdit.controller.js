jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.ListItemEdit", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "f");
			dl.load("model/SearchCondition.model.json","",false);
	  	},

	 	onAfterRendering: function() {

	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	      	if(_Dialog != undefined) _Dialog.destroyContent();
	  	},
		
		doSearch: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var viewModel = _View.getModel("f");
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
			
			var tableHeight = parseInt($(document).height()) - parseInt($("#"+oTable.getId()).offset().top) - 20;
			oTable.setHeight(tableHeight+"px");

			var dl = new DataLoader(oTable, "t");
			dl.load(
				"model/ListItemEdit.model.json", 	// url
				params,							// parameter
				false,						// sync, async
				function(){					// function after attachedRequestCompleted
				
				}
			);
		},

		doSave: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var tableData = oTable.getData();
		},

		deleteRows: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			var selectedIndex = oTable.getSelectedIndex();
            var length = selectedIndex.length;

            if(length == 0) {
            	sap.ui.commons.MessageBox.alert("Please select the line to delete.");
            	return;
            }

			sap.ui.commons.MessageBox.confirm("Are you sure you want to delete?", function(bResult){
				if(bResult) {
					for(var i=length-1 ; i>=0 ; i--){
		                oTable.deleteRow(selectedIndex[i]);
		            }

		            sap.ui.commons.MessageBox.alert("Has been successfully completed.");
				}
			}, "Confirm Messages");
		},

		addRows: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var appendData = [
				{"column1":"","column2":"","column3":"","column4":false,"column5":0,"column6":"","column7":0,"column8":0,"column9":"Yes"}
			];
			oTable.appendRows(appendData);
		},

		checkedRadio: function(data){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var btnApprove = sap.ui.getCore().byId(_View.getId()+"-btn-approve");
			var btnReject = sap.ui.getCore().byId(_View.getId()+"-btn-reject");

			var selectedData = oTable.getRowData(oTable.getSelectedIndex());
			var statusCode = selectedData["status"];

			if(statusCode == "IN"){
				btnReject.setEnabled(true);
				btnApprove.setEnabled(true);
			}else if(statusCode == "AP"){
				btnReject.setEnabled(true);
				btnApprove.setEnabled(false);
			}else if(statusCode == "RE"){
				btnReject.setEnabled(false);
				btnApprove.setEnabled(false);
			}
		},

		openValueHelp: function(oEvent){
			var viewModel = _View.getModel("f");
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
					viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
				});
			}
			
			_Dialog.open();
		},

		openValueHelpForTable: function(oEvent){
			var oValueHelp = oEvent.getSource();
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var oBindingInfo = oTable.getBindingInfo("rows");
			// var tableModel = oBindingInfo.binding.getModel(oBindingInfo.model);
			var tableModel = oTable.getModel("t");
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					tableModel.setProperty(oBindingInfo.path+"/" + oTable.getSelectedRowIndex() + "/"+oValueHelp.getBindingInfo("value").binding.sPath, _Dialog.data("code"));
				});
			}
			
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