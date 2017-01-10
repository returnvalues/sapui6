sap.ui.jsview("view.FreezePane", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"300px", 
                align:"left", 
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                path:"t>country", 
                width:"90px", 
                align:"center", 
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Region", 
                path:"t>region", 
                width:"80px", 
                align:"center", 
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                path:"t>sector", 
                width:"80px", 
                align:"center", 
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                path:"t>output", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"IC(%)", 
                path:"t>ic", 
                width:"80px", 
                align:"right", 
                format:"%",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"NI", 
                path:"t>ni", 
                width:"80px", 
                align:"right", 
                format:"#,###.#",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Q1", 
                path:"t>q1", 
                width:"80px", 
                align:"right", 
                format:"%",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Spec", 
                path:"t>spec", 
                width:"80px", 
                align:"right", 
                format:"#,###.#",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Exc", 
                path:"t>exc", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Exc(%)", 
                path:"t>exc2", 
                width:"80px", 
                align:"right", 
                format:"%",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Lead", 
                path:"t>ic", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                groupSummary:"max",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Lead(%)", 
                path:"t>lead2", 
                width:"80px", 
                align:"right", 
                format:"%",
                groupSummary:"max",
                showSortMenuEntry:true,
                showFreezePaneMenuEntry:true
            })
        ];

        var table = new sapui6.ui.table.Table({
            title: "Powerful Table Control for SAPUI5",
            width:"100%", 
            height:"500px",
            columns:columns,
            margin: "10px",
            resize: true,
            fixedColumnIndex : 1,
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/Table.model.json", "", false);
                }})
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"1000px"});
        oLayout.addContent(table);

        return oLayout;
	}
});