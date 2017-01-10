sap.ui.jsview("view.NewColumn", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var oLink = new sap.ui.commons.Link();
        oLink.bindProperty("text","t>company");

        var oChk = new sap.ui.commons.CheckBox();
        oChk.bindProperty("text","company");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"250px", 
                align:"left", 
                groupSummary:"none",
                template:oLink
            }),
            new sapui6.ui.table.Column({
                title:"Price", 
                path:"t>price", 
                width:"100px", 
                align:"right", 
                format:"#,###.##", 
                groupSummary:"sum"
            }),
            new sapui6.ui.table.Column({
                title:"Qty", 
                path:"t>quantity", 
                width:"80px", 
                align:"right", 
                format:"#,###", 
                groupSummary:"sum"
            }),
            new sapui6.ui.table.Column({    // New Column
                title:"Price*Qty", 
                path:"t>total",
                width:"120px", 
                align:"right", 
                filterType:"int",
                format:"#,###.##", 
                groupSummary:"sum",
                formular:"price*quantity"
            }),
            new sapui6.ui.table.Column({
                title:"Change", 
                path:"t>change", 
                width:"100px", 
                align:"right", 
                format:"#,###.##", 
                groupSummary:"max"
            }),
            new sapui6.ui.table.Column({
                title:"% Change", 
                path:"t>change2", 
                width:"100px", 
                align:"right", 
                format:"%", 
                groupSummary:"average"
            }),
            new sapui6.ui.table.Column({
                title:"Last updated", 
                path:"t>update", 
                width:"150px", 
                align:"center", 
                format:"MM-dd-yyyy", 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Product", 
                path:"t>product", 
                width:"180px", 
                align:"center", 
                groupSummary:"none"
            })
        ];
        
        var table = new sapui6.ui.table.Table({
            width:"100%", 
            height:"500px",
            showTotalSummary : true,
            columns:columns,
            margin: "10px",
            resize: true,
            title: "Table - New Column",
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/Table3.model.json", "", false);
                }})
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});