sap.ui.jsview("view.MaxRowHeight", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"300px", 
                align:"left", 
                caption:true,
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                path:"t>country", 
                width:"90px", 
                align:"center", 
                filterType:"select",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Region", 
                path:"t>region", 
                width:"80px", 
                align:"center", 
                filterType:"select",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                path:"t>sector", 
                width:"80px", 
                align:"center", 
                filterType:"select",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                path:"t>output", 
                width:"90px", 
                align:"right", 
                filterType:"int",
                format:"#,###",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            })
        ];

        var that = this;

        var table = new sapui6.ui.table.Table({
            title: "Powerful Table Control for SAPUI5",
            width:"100%", 
            height:"730px",
            columns:columns,
            noDataText:"No Data.",
            resize: true,
            margin: "10px",
            maxRowHeight : "60px",
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/MaxRowHeight.model.json", "", false);
                }})
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});