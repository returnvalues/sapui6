jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.EditForm", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/EditForm.model.json","",false);
	  	},

	 	onAfterRendering: function() {
	 		
	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	      	if(_Dialog != undefined) _Dialog.destroyContent();
	  	},

	  	doSave: function(oEvent){
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
	  	},

	  	openValueHelp: function(oEvent){
	  		var viewModel = _View.getModel("t");
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					viewModel.setProperty("/FormData/ValueHF", _Dialog.data("code"));
					viewModel.setProperty("/FormData/ValueHFDesc", _Dialog.data("desc"));
				});
			}
			
			_Dialog.open();
	  	},

		selectRadio: function(oEvent){
			var oRadio = oEvent.getSource();
			oRadio.setProperty("/FormData/Radio", oRadio.getSelectedItem().getKey());
		}
	});

}());