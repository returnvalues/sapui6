sap.ui.jsview("view.ShowLoadingBar", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var oLink = new sap.ui.commons.Link();
        oLink.bindProperty("text", "t>company");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"300px", 
                align:"left", 
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true,
                template:oLink
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                path:"t>country", 
                width:"90px", 
                align:"center", 
                filterType:"select",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showGroupMenuEntry:true, 
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Region", 
                path:"t>region", 
                width:"80px", 
                align:"center", 
                filterType:"select",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showGroupMenuEntry:true, 
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                path:"t>sector", 
                width:"80px", 
                align:"center", 
                filterType:"select",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showGroupMenuEntry:true, 
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                path:"t>output", 
                width:"90px", 
                align:"right", 
                filterType:"int",
                format:"#,###",
                groupSummary:"sum",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"IC(%)", 
                path:"t>ic", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"%",
                groupSummary:"average",
                styleExpression:"parseFloat(this.getText())>30?'color:blue;':parseFloat(this.getText())<10?'color:red;':'';",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"NI", 
                path:"t>ni", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"#,###.#",
                groupSummary:"average",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Q1", 
                path:"t>q1", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"%",
                groupSummary:"max",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Spec", 
                path:"t>spec", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"#,###.#",
                groupSummary:"max",
                // styleExpression:"parseFloat(this.getText())==1?'background-color:red;':''",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Exc", 
                path:"t>exc", 
                width:"90px", 
                align:"right", 
                filterType:"int",
                format:"#,###",
                groupSummary:"sum",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Exc(%)", 
                path:"t>exc2", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"%",
                groupSummary:"average",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Lead", 
                path:"t>ic", 
                width:"90px", 
                align:"right", 
                filterType:"int",
                format:"#,###",
                groupSummary:"max",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Lead(%)", 
                path:"t>lead2", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"%",
                groupSummary:"max",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showBackgroundColorMenuEntry:true
            })
        ];

        var that = this;

        var table = new sapui6.ui.table.Table({
            title: "Powerful Table Control for SAPUI5",
            width:"1000px", 
            height:"730px",
            columns:columns,
            noDataText:"No Data.",
            resize: true,
            margin: "10px",
            fixedColumnIndex : 1,
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    table.showLoading();
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                        table.hideLoading();
                    });

                    jQuery.sap.delayedCall(1000, oModel, function() {
                        oModel.loadData("view/ShowLoadingBar.model.json", "", false);
                    });

                }})
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);
        return oLayout;

      //   var oHLayout = new sap.ui.layout.HorizontalLayout();
      // var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
      // oLayout.addContent(new sap.ui.core.HTML({content:"<div style='height:300px;'></div>"}));
      // oLayout.addContent(table);

      // oHLayout.addContent(new sap.ui.core.HTML({content:"<div style='width:300px;'></div>"}));
      // oHLayout.addContent(oLayout);
      // return oHLayout;
	}
});