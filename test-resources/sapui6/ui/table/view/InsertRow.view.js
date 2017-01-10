sap.ui.jsview("view.InsertRow", {
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
                template:oLink
            }),
            new sapui6.ui.table.Column({
                title:"Price", 
                path:"t>price", 
                width:"100px", 
                align:"right", 
                format:"#,###.##"
            }),
            new sapui6.ui.table.Column({
                title:"Qty", 
                path:"t>quantity", 
                width:"80px", 
                align:"right", 
                format:"#,###", 
            }),
            new sapui6.ui.table.Column({
                title:"Price*Qty", 
                path:"t>total",
                width:"120px", 
                align:"right", 
                format:"#,###.##", 
                formular:"price*quantity"
            }),
            new sapui6.ui.table.Column({
                title:"Change", 
                path:"t>change", 
                width:"100px", 
                align:"right", 
                format:"#,###.##"
            }),
            new sapui6.ui.table.Column({
                title:"% Change", 
                path:"t>change2", 
                width:"100px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"Last updated", 
                path:"t>update", 
                width:"150px", 
                align:"center", 
                format:"MM-dd-yyyy"
            }),
            new sapui6.ui.table.Column({
                title:"Product", 
                path:"t>product", 
                width:"180px", 
                align:"center"
            })
        ];

        var appendData = [
            {"company":'Accenture',"price":4325.20,"quantity":50,"change":0.04,"change2":0.07,"update":'20111120', "product":'Manufacturing'},
            {"company":'SuccessFactors',"price":5558.21,"quantity":87,"change":0.16,"change2":0.11,"update":'20120711', "product":'Computer'}
        ];
        
        var table = new sapui6.ui.table.Table({
            width:"100%", 
            height:"500px",
            columns:columns,
            margin: "10px",
            resize: true,
            title: "Table - Insert Rows",
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/Table3.model.json", "", false);
                }}),
                new sap.ui.commons.Button({text:"Insert Rows", style: sap.ui.commons.ButtonStyle.Accept, press:function(){table.insertRows(appendData,1)}}),
            ]
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});