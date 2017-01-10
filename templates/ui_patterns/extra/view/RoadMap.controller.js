jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.RoadMap", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View,"t");
			dl.load("model/RoadMap.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	 		
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	  	},

	  	selectRoadMap : function(data){
	  		var activeStep = data.getParameter("step");
            if(activeStep == "1"){
                sap.ui.getCore().byId(_View.getId()+"-btn-create").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-cancel").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-basic-form").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-table").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-roadmap").setProperty("activeStep", 1);
            }else if(activeStep == "2"){
                sap.ui.getCore().byId(_View.getId()+"-btn-create").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-cancel").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-addLine").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-btn-deleteLine").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-basic-form").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-table").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-roadmap").setProperty("activeStep", 2);
            }else if(activeStep == "3"){
                sap.ui.getCore().byId(_View.getId()+"-btn-create").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-cancel").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-addLine").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-deleteLine").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-basic-form").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-table").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-roadmap").setProperty("activeStep", 3);
            }else if(activeStep == "4"){
                sap.ui.getCore().byId(_View.getId()+"-btn-create").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-btn-cancel").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-btn-addLine").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-btn-deleteLine").setProperty("visible",false);
                sap.ui.getCore().byId(_View.getId()+"-basic-form").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-table").setProperty("visible",true);
                sap.ui.getCore().byId(_View.getId()+"-roadmap").setProperty("activeStep", 4);
            }
	  	},

	  	doCreate: function(oEvent){
	  		var oModel = _View.getModel("t");
	  		var formData = oModel.getProperty("/FormData");

	  		var comboBoxData = oModel.getProperty("/FormData/ComboBox");
	  		var dateData = oModel.getProperty("/FormData/Date");
	  		var valueHFData = oModel.getProperty("/FormData/ValueHF");
	  		var chk1Data = oModel.getProperty("/FormData/Chk1");
	  		var chk2Data = oModel.getProperty("/FormData/Chk2");
	  		var chk3Data = oModel.getProperty("/FormData/Chk3");
	  		var chk4Data = oModel.getProperty("/FormData/Chk4");
	  		var radioData = oModel.getProperty("/FormData/Radio");
	  		var codeData = oModel.getProperty("/FormData/Code");
	  		var currencyData = oModel.getProperty("/FormData/Currency");
	  		var qtyData = oModel.getProperty("/FormData/Qty");
	  		var percentData = oModel.getProperty("/FormData/Percent");
	  		var uppercaseData = oModel.getProperty("/FormData/Uppercase");
	  		var lowercaseData = oModel.getProperty("/FormData/Lowercase");
	  		var yearData = oModel.getProperty("/FormData/Year");
	  		var monthData = oModel.getProperty("/FormData/Month");
	  		var timeData = oModel.getProperty("/FormData/Time");
	  		var userIdData = oModel.getProperty("/FormData/UserId");
	  		var emailData = oModel.getProperty("/FormData/Email");
	  		var urlData = oModel.getProperty("/FormData/URL");
	  		var textfieldData = oModel.getProperty("/FormData/TextField");
	  		var sliderData = oModel.getProperty("/FormData/Slider");
	  		var textareaData = oModel.getProperty("/FormData/TextArea");

	  		var tableData = oModel.getProperty("/TableData");
	  	},

	  	doCancel: function(oEvent){

	  	},

	  	selectRadio: function(oEvent){
			var oRadio = oEvent.getSource();
			oRadio.setProperty("/FormData/Radio", oRadio.getSelectedItem().getKey());
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