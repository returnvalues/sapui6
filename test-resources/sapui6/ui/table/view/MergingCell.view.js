sap.ui.jsview("view.MergingCell", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Region", 
                path:"t>region", 
                width:"130px", 
                align:"center", 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                path:"t>country", 
                width:"130px", 
                align:"center", 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"300px", 
                align:"left", 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                path:"t>sector", 
                width:"80px", 
                align:"center", 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                path:"t>output", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                groupSummary:"sum"
            }),
            new sapui6.ui.table.Column({
                title:"IC(%)", 
                path:"t>ic", 
                width:"80px", 
                align:"right", 
                format:"%",
                groupSummary:"average"
            }),
            new sapui6.ui.table.Column({
                title:"NI", 
                path:"t>ni", 
                width:"80px", 
                align:"right", 
                format:"#,###.#",
                groupSummary:"average"
            }),
            new sapui6.ui.table.Column({
                title:"Q1", 
                path:"t>q1", 
                width:"80px", 
                align:"right", 
                format:"%",
                groupSummary:"max"
            }),
            new sapui6.ui.table.Column({
                title:"Spec", 
                path:"t>spec", 
                width:"80px", 
                align:"right", 
                format:"#,###.#",
                groupSummary:"max"
            }),
            new sapui6.ui.table.Column({
                title:"Exc", 
                path:"t>exc", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                groupSummary:"sum"
            }),
            new sapui6.ui.table.Column({
                title:"Exc(%)", 
                path:"t>exc2", 
                width:"80px", 
                align:"right", 
                format:"%",
                groupSummary:"average"
            }),
            new sapui6.ui.table.Column({
                title:"Lead", 
                path:"t>ic", 
                width:"90px", 
                align:"right", 
                format:"#,###",
                groupSummary:"max"
            }),
            new sapui6.ui.table.Column({
                title:"Lead(%)", 
                path:"t>lead2", 
                width:"80px", 
                align:"right", 
                format:"%",
                groupSummary:"max"
            })
        ];

        var table = new sapui6.ui.table.Table({
            title: "Table - MergingCell",
            width:"100%", 
            height:"730px",
            columns:columns,
            margin: "10px",
            resize: true,
            showTotalSummary: true,
            showGroupSummary: true,
            mergeColumnIndex : 1,
            fixedColumnIndex : 1,
            groupSummaryText : "Sub Total",
            totalSummaryLocation: "Top", 
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/Table2.model.json", "", false);
                }})
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});