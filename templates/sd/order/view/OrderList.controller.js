jQuery.sap.require("util.DataLoader");

(function(){
 	var _Controller;
 	var _View;

	sap.ui.controller("view.OrderList", {
		onInit: function() {
			_Controller = this;
	      	_View = this.getView();
	  	},

	 	onBeforeRendering: function() {
	 		var dl = new DataLoader(_View, "t");
			dl.load("model/OrderSearchCondition.model.json","",false);
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

			if(oTable.isLoading()) {
				sap.ui.commons.MessageBox.alert("In progress.");
				return;
			}

			oTable.showLoading();

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
			
			var tableHeight = parseInt($(document).height()) - parseInt($("#"+oTable.getId()).offset().top) - 20;
			oTable.setHeight(tableHeight+"px");

			var dl = new DataLoader(oTable, "t");
			dl.load(
				"model/OrderList.model.json", 	// url
				params,							// parameter
				false,						// sync, async
				function(){					// function after attachedRequestCompleted
					oTable.hideLoading();
				}
			);
		},

		doExport: function(){
			var oTable = sap.ui.getCore().byId(_View.getId()+"-table");
			if(oTable.getRowCount() > 0) oTable.export();
		},

		openDetail: function(data){
			var orderNo = data.getParameter("rowData")["VBELN"];
			var detailView = sap.ui.view({viewName:"view.OrderDetail", type:sap.ui.core.mvc.ViewType.JS});
			detailView.data("orderNo",orderNo);
			detailView.setWidth("100%");
			detailView.setHeight("100%");

			var oDialog = new sap.ui.commons.Dialog({title:"Sales Document : " + orderNo,width:"1000px",height:"700px"});
	    	oDialog.addContent(detailView);
	    	oDialog.setModal(true);
	  //   	oDialog.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doEdit}));
			// oDialog.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:detailView.getController().doPrint}));
			oDialog.addButton(new sap.ui.commons.Button({text: "Close", style:sap.ui.commons.ButtonStyle.Emph, press:function(){oDialog.close();}}));
	    	
	    	oDialog.open();
		},

		openSoldtoVH: function(oEvent){
			var viewModel = _View.getModel("t");
			var oDialog = sap.ui.jsfragment("fragments.valuehelp.SoldtoParty");
			oDialog.attachClosed(function(){
				viewModel.setProperty("/SearchCondition/Soldto", oDialog.data("KUNNR"));
				viewModel.setProperty("/SearchCondition/SoldtoDesc", oDialog.data("NAME1"));
				oDialog.destroy();
			});
			
			oDialog.open();
		},

		openMaterilVH: function(oEvent){
			var viewModel = _View.getModel("t");
			var oDialog = sap.ui.jsfragment("fragments.valuehelp.Material");
			oDialog.attachClosed(function(){
				viewModel.setProperty("/SearchCondition/Material", oDialog.data("code"));
				viewModel.setProperty("/SearchCondition/MaterialDesc", oDialog.data("description"));
				oDialog.destroy();
			});
			
			oDialog.open();
		}

	});

}());