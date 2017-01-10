sap.ui.jsview("view.Scheduler", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.Scheduler");
		var oScheduler = new sapui6.ui.ux3.Scheduler({
			// width : "1000px",
			category : [
				new sapui6.ui.ux3.SchedulerCategory({title:"Personal", value:"A", color:"#0066cc"}),
				new sapui6.ui.ux3.SchedulerCategory({title:"Team", value:"B", color:"#66ff00"}),
				new sapui6.ui.ux3.SchedulerCategory({title:"Company", value:"C", color:"#ffff66"})
			],
			previous : function(data){
				alert(data.getParameter("yyyymm"));
			},
			next : function(data){
				alert(data.getParameter("yyyymm"));
			},
			selectItem : function(data){
				alert(data.getParameter("groupKey"));
			},
			selectDay : function(data){
				alert(data.getParameter("key") + " : " + data.getParameter("yyyymmdd"));
			}
		});
		
		oScheduler.bindItems("item>/data",
			new sapui6.ui.ux3.SchedulerItem({
				key:"{item>id}", 
				title:"{item>title}", 
				date:"{item>date}", 
				categoryValue:"{item>category}"
			})
		);

		oScheduler.bindHoliday("item>/holiday",new sapui6.ui.ux3.SchedulerHoliday({title:"{item>desc}",date:"{item>date}"}));

		var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            oScheduler.setModel(oModel,"item");
        });

        oModel.loadData("view/Scheduler.model.json", "", false);

		return oScheduler;
	}
});