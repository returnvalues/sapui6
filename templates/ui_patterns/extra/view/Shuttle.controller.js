jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.Shuttle", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {

	  	},

	 	onAfterRendering: function() {
	 		var oTable = sap.ui.getCore().byId(_View.getId()+"-right-table");

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(
				{
					"RightTableData" : []
				}
			);

			oTable.setModel(oModel, "t");
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},
		
		doSearchLeft: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-left-table");
			var oTextField = sap.ui.getCore().byId(_View.getId()+"-textfield1");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var params = "condition1=" + oTextField.getValue();

			var dl = new DataLoader(oTable, "t");
			dl.setBusyControl(oTable);	
			dl.load(
				"model/Shuttle.model.json", 	// url
				params,							// parameter
				false,						// sync, async 
				function(){					// call function after attachedRequestCompleted
				
				}
			);
		},

		doSearchRight: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-right-table");
			var oTextField = sap.ui.getCore().byId(_View.getId()+"-textfield2");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var params = "condition1=" + oTextField.getValue();

			var dl = new DataLoader(oTable, "t");
			dl.setBusyControl(oTable);	
			dl.load(
				"model/Shuttle.model.json", 	// url
				params,							// parameter
				false,						// sync, async 
				function(){					// call function after attachedRequestCompleted
				
				}
			);
		},

		doAdd: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-left-table");

			var selectedIndex = oTable.getSelectedIndex();
            var length = selectedIndex.length;

            if(length == 0) {
            	sap.ui.commons.MessageBox.alert("Please select the line to add.");
            	return;
            }

            var oTableRight = sap.ui.getCore().byId(_View.getId()+"-right-table");

            var appendRows = [];
            for(var i=length-1 ; i>=0 ; i--){
                appendRows.push(oTable.getRowData(selectedIndex[i]));
            }

            var oBindingInfo = oTableRight.getBindingInfo("rows");
 			var assignedData = oBindingInfo.binding.oList
 			if(assignedData.length == 0) {
 				oTableRight.appendRows(appendRows);
 			}else{
 				var uniqueData = [];
 				appendRows.forEach(function(a){
 					var bExist = false;
 					assignedData.forEach(function(b){
 						if(a["column1"] == b["column1"]) bExist = true;
 					});

 					if(!bExist) uniqueData.push(a);
 				});

 				oTableRight.appendRows(uniqueData);
 			}

 			oTableRight.sortASC(0,"column1");
		},

		doDelete: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-right-table");

			var selectedIndex = oTable.getSelectedIndex();
            var length = selectedIndex.length;

            if(length == 0) {
            	sap.ui.commons.MessageBox.alert("Please select the line to remove.");
            	return;
            }

			sap.ui.commons.MessageBox.confirm("Are you sure you want to remove?", function(bResult){
				if(bResult) {
					for(var i=length-1 ; i>=0 ; i--){
		                oTable.deleteRow(selectedIndex[i]);
		            }

		            sap.ui.commons.MessageBox.alert("Has been successfully completed.");
				}
			}, "Confirm Messages");
		}

	});

}());