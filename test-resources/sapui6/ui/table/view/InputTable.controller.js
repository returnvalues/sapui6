
(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.InputTable", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {

	  	},

	 	onAfterRendering: function() {
	 		var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
	 		
	 		var oModel = new sap.ui.model.json.JSONModel();
	        oModel.attachRequestCompleted(function(){
	            oTable.setModel(oModel,"t");
	        });

	        oModel.loadData("view/InputTable.model.json", "", false);
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},

		addRows: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			var appendData = [
				{"input1":"","input2":"","input3":"2","input4":"","input5":"","input6":"","input7":"","input8":""}
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

		getTableData: function(oEvent){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			alert(oTable.getData());

			return oTable.getData();
		}

	});

}());