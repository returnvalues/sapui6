sap.ui.jsview("view.TeamCalendar", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.TeamCalendar");
		var oTeamCalendar = new sapui6.ui.ux3.TeamCalendar({
			// width : "1000px",
			// bodyHeight : "200px",
			category : [
				new sapui6.ui.ux3.TeamCalendarCategory({title:"Absent", value:"A", color:"#0066cc"}),
				new sapui6.ui.ux3.TeamCalendarCategory({title:"Travel", value:"B", color:"#66ff00"}),
				new sapui6.ui.ux3.TeamCalendarCategory({title:"Holiday", value:"C", color:"#ffff66"}),
				new sapui6.ui.ux3.TeamCalendarCategory({title:"BirthDays", value:"D", color:"#ff6600"})
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
			groupWidth : "150px",
			yyyymm : "201505"
		});
		
		oTeamCalendar.bindItems("item>/data",
			new sapui6.ui.ux3.TeamCalendarItem({
				key:"{item>id}", 
				title:"{item>name}", 
				date:"{item>date}", 
				value:"{item>category}",
				groupKey:"{item>dept_code}",
				groupTitle:"{item>dept_desc}"
			})
		);

		oTeamCalendar.bindHoliday("item>/holiday",new sapui6.ui.ux3.TeamCalendarHoliday({title:"{item>desc}",date:"{item>date}"}));

		var oModel = new sap.ui.model.json.JSONModel();
                    
        oModel.attachRequestCompleted(function(){
            oTeamCalendar.setModel(oModel,"item");
        });

        oModel.loadData("view/TeamCalendar.model.json", "", false);

		return oTeamCalendar;
	}
});