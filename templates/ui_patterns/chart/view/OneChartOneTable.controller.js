jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;
 	var _Dialog;

	sap.ui.controller("view.OneChartOneTable", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View);
			dl.load("model/OneChartOneTable.model.json","",false);
	  	},

	 	onAfterRendering: function() {

	  	},

	 	onExit: function() {
	 		_View.destroyContent();
	      	_View.destroyAggregation();
	      	if(_Dialog != undefined) _Dialog.destroyContent();
	      	//view에 종속되지 않은 Control (Dialog 같은)에 대해서는 직접 sap.ui.getCore().byId("").destroy() 메소드를 통해 삭제
	  	},
		
		doSearch: function(oEvent) {
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");

			if(oTable.isBusy()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			var viewModel = _View.getModel();
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
			// var visibleRowCount = parseInt(tableHeight/28)-2;

			var dl = new DataLoader(oTable, "t");
			dl.setBusyControl(oTable);	// 데이터 호출 전 후에 busy(progress bar)를 선언할 control
			dl.load(
				"model/OneChartOneTable.model.json", 	// 호출 url
				params,							// parameter
				false,						// 데이터 호출 시 sync, async 여부
				function(){					// attachedRequestCompleted 메소드에서 데이터를 control에 setModel 한 후 실행하는 function
					// oTable.bindRows("t>/TableData");
				}
			);
		},

		doCreate: function(oEvent){

		},

		doDelete: function(oEvent){

		},

		openDetail: function(data){
			var key = data.getParameter("rowData")["column3"];
			var detailView = sap.ui.view({viewName:"view.Detail", type:sap.ui.core.mvc.ViewType.JS});
			detailView.data("key",key);
			detailView.setWidth("100%");
			detailView.setHeight("100%");

			var oDialog = new sap.ui.commons.Dialog({title:"Detail",width:"870px",height:"400px"});
	    	oDialog.addContent(detailView);
	    	oDialog.setModal(true);
	    	oDialog.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doEdit}));
			oDialog.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doPrint}));
			oDialog.addButton(new sap.ui.commons.Button({text: "Close", style:sap.ui.commons.ButtonStyle.Emph, press:function(){oDialog.close();}}));
	    	
	    	oDialog.open();
		},

		openValueHelp: function(oEvent){
			var viewModel = _View.getModel();
			if(_Dialog == undefined){
				_Dialog = sap.ui.jsfragment("fragments.valuehelp.code");
				_Dialog.attachClosed(function(){
					viewModel.setProperty("/SearchCondition/ValueHF", _Dialog.data("code"));
					viewModel.setProperty("/SearchCondition/ValueHFDesc", _Dialog.data("desc"));
				});
			}
			
			_Dialog.open();
		}

	});

}());