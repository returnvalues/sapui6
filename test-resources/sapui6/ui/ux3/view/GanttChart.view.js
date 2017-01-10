sap.ui.jsview("view.GanttChart", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.GanttChart");
		var oGanttChart = new sapui6.ui.ux3.GanttChart({
			// width : "1000px",
			// bodyHeight : "200px",
			category : [
				new sapui6.ui.ux3.GanttChartCategory({title:"Absent", value:"A", color:"#0066cc"}),
				new sapui6.ui.ux3.GanttChartCategory({title:"Travel", value:"B", color:"#66ff00"}),
				new sapui6.ui.ux3.GanttChartCategory({title:"Holiday", value:"C", color:"#ffff66"}),
				new sapui6.ui.ux3.GanttChartCategory({title:"BirthDays", value:"D", color:"#ff6600"})
			],
			previous : function(data){
				alert(data.getParameter("yyyymm"));
			},
			next : function(data){
				alert(data.getParameter("yyyymm"));
			},
			selectGroup : function(data){
				alert(data.getParameter("groupKey"));
			},
			selectMember : function(data){
				alert(data.getParameter("key"));
			},
			selectDay : function(data){
				alert(data.getParameter("key") + " : " + data.getParameter("yyyymmdd"));
			},
			group : true,
			groupTitle : "Department",
			memberTitle : "Name",
			groupWidth : "150px"
		});
		
		oGanttChart.bindItems("item>/data",
			new sapui6.ui.ux3.GanttChartItem({
				key:"{item>id}", 
				title:"{item>name}", 
				date:"{item>date}", 
				value:"{item>category}",
				groupKey:"{item>dept_code}",
				groupTitle:"{item>dept_desc}"
			})
		);

		var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            oGanttChart.setModel(oModel,"item");
        });

        oModel.loadData("view/GanttChart.model.json", "", false);

		return oGanttChart;
	}
});