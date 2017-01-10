sap.ui.jsview("view.TwoHeader", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Region", 
                headerGroup:"Location",
                path:"t>region", 
                width:"130px", 
                align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                headerGroup:"Location",
                path:"t>country", 
                width:"130px", 
                align:"center", 
                filterType:"select",
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Company", 
                headerGroup:"Company Information",
                path:"t>company", 
                width:"300px", 
                align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                headerGroup:"Company Information",
                path:"t>sector", 
                width:"80px", 
                align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                headerGroup:"Company Information",
                path:"t>output", 
                width:"90px", 
                align:"right", 
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"IC(%)", 
                headerGroup:"Evaluation",
                path:"t>ic", 
                width:"80px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"NI", 
                headerGroup:"Evaluation",
                path:"t>ni", 
                width:"80px", 
                align:"right", 
                format:"#,###.#"
            }),
            new sapui6.ui.table.Column({
                title:"Q1", 
                headerGroup:"Evaluation",
                path:"t>q1", 
                width:"80px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"Spec", 
                headerGroup:"Evaluation",
                path:"t>spec", 
                width:"80px", 
                align:"right", 
                format:"#,###.#"
            }),
            new sapui6.ui.table.Column({
                title:"Exc", 
                headerGroup:"Evaluation",
                path:"t>exc", 
                width:"90px", 
                align:"right", 
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Exc(%)", 
                headerGroup:"Evaluation",
                path:"t>exc2", 
                width:"80px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"Lead", 
                headerGroup:"Evaluation",
                path:"t>ic", 
                width:"90px", 
                align:"right", 
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Lead(%)", 
                headerGroup:"Evaluation",
                path:"t>lead2", 
                width:"80px", 
                align:"right", 
                format:"%"
            })
        ];

        var table = new sapui6.ui.table.Table({
            title: "Table - Two Header",
            width:"100%", 
            height:"730px",
            margin: "10px",
            columns:columns,
            resize: true,
            // fixedColumnIndex: 1,
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