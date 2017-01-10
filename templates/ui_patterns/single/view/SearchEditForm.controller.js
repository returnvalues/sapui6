jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.SearchEditForm", {
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

	  	selectRadio: function(oEvent){
			var oRadio = oEvent.getSource();
			oRadio.setProperty("/FormData/Radio", oRadio.getSelectedItem().getKey());
		},
		
		doSearch: function(oEvent) {
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
			
			var oForm = sap.ui.getCore().byId(_View.getId()+"-form-edit");
			var dl = new DataLoader(oForm, "t");
			dl.setBusyControl(oForm);	
			dl.load(
				"model/SearchEditForm.model.json", 	// url
				params,							// parameter
				false						// sync, async
			);
		},

		openValueHelp: function(oEvent){
			var viewModel = _View.getModel("f");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
				viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
		},

		openValueHelp2: function(oEvent){
			var oForm = sap.ui.getCore().byId(_View.getId()+"-form-edit");
			var formModel = oForm.getModel("t");
			var _Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
			_Dialog.attachClosed(function(){
				formModel.setProperty("/FormData/ValueHF", _Dialog.data("code"));
				formModel.setProperty("/FormData/ValueHFDesc", _Dialog.data("desc"));
			});
			
			_Dialog.open();
		},

		doSave: function(oEvent){
			var oForm = sap.ui.getCore().byId(_View.getId()+"-form-edit");
	  		var formData = oForm.getModel("t").getProperty("/FormData");

	  		var comboBoxData = oForm.getModel("t").getProperty("/FormData/ComboBox");
	  		var dateData = oForm.getModel("t").getProperty("/FormData/Date");
	  		var valueHFData = oForm.getModel("t").getProperty("/FormData/ValueHF");
	  		var chk1Data = oForm.getModel("t").getProperty("/FormData/Chk1");
	  		var chk2Data = oForm.getModel("t").getProperty("/FormData/Chk2");
	  		var chk3Data = oForm.getModel("t").getProperty("/FormData/Chk3");
	  		var chk4Data = oForm.getModel("t").getProperty("/FormData/Chk4");
	  		var radioData = oForm.getModel("t").getProperty("/FormData/Radio");
	  		var codeData = oForm.getModel("t").getProperty("/FormData/Code");
	  		var currencyData = oForm.getModel("t").getProperty("/FormData/Currency");
	  		var qtyData = oForm.getModel("t").getProperty("/FormData/Qty");
	  		var percentData = oForm.getModel("t").getProperty("/FormData/Percent");
	  		var uppercaseData = oForm.getModel("t").getProperty("/FormData/Uppercase");
	  		var lowercaseData = oForm.getModel("t").getProperty("/FormData/Lowercase");
	  		var yearData = oForm.getModel("t").getProperty("/FormData/Year");
	  		var monthData = oForm.getModel("t").getProperty("/FormData/Month");
	  		var timeData = oForm.getModel("t").getProperty("/FormData/Time");
	  		var userIdData = oForm.getModel("t").getProperty("/FormData/UserId");
	  		var emailData = oForm.getModel("t").getProperty("/FormData/Email");
	  		var urlData = oForm.getModel("t").getProperty("/FormData/URL");
	  		var textfieldData = oForm.getModel("t").getProperty("/FormData/TextField");
	  		var sliderData = oForm.getModel("t").getProperty("/FormData/Slider");
	  		var textareaData = oForm.getModel("t").getProperty("/FormData/TextArea");
	  	}

	});

}());