sap.ui.jsview("view.Table3", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var oLink = new sap.ui.commons.Link();
        oLink.bindProperty("text","t>company");

        var oChk = new sap.ui.commons.CheckBox();
        oChk.bindProperty("text","company");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                headerGroup:"Sales",
                headerGroupParent:"Sales Total1",
                path:"t>company", 
                width:"250px", 
                align:"left", 
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true,
                showInsertColumnMenuEntry:true,
                showBackgroundColorMenuEntry:true, 
                groupSummary:"none",
                template:oLink,
                customMenuItem : [
                    new sap.ui.commons.MenuItem({
                        text:"Test Menu",
                        icon:"sap-icon://sys-cancel-2",
                        select:function(){alert("test")}
                    })
                ]
            }),
            new sapui6.ui.table.Column({
                title:"Price", 
                headerGroup:"Sales",
                headerGroupParent:"Sales Total1",
                path:"t>price", 
                width:"100px", 
                align:"right", 
                filterType:"int",
                format:"#,###.##", 
                calculable : true,
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showVisibilityMenuEntry:true,
                showFreezePaneMenuEntry:true, 
                groupSummary:"sum"
                // editable : true
            }),
            new sapui6.ui.table.Column({
                title:"Qty", 
                headerGroup:"Sales2",
                headerGroupParent:"Sales Total1",
                path:"t>quantity", 
                width:"80px", 
                align:"right", 
                filterType:"int",
                format:"#,###", 
                calculable : true,
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showFreezePaneMenuEntry:true, 
                groupSummary:"sum"
            }),
            new sapui6.ui.table.Column({
                title:"Price*Qty", 
                headerGroup:"Sales Information1",
                headerGroupParent:"Sales Total2",
                path:"t>total",
                width:"120px", 
                align:"right", 
                filterType:"int",
                format:"#,###.##", 
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                groupSummary:"sum",
                formular:"price*quantity"
            }),
            new sapui6.ui.table.Column({
                title:"Change", 
                headerGroup:"Sales Information1",
                headerGroupParent:"Sales Total2",
                path:"t>change", 
                width:"100px", 
                align:"right", 
                filterType:"int",
                format:"#,###.##", 
                calculable : true,
                showSortMenuEntry:true,
                showFilterMenuEntry:true, 
                groupSummary:"max",
                styleExpression:"parseFloat(this.getText())<0.1?'color:red;':'';"
            }),
            new sapui6.ui.table.Column({
                title:"% Change", 
                headerGroup:"Sales Information2",
                headerGroupParent:"Sales Total2",
                path:"t>change2", 
                width:"100px", 
                align:"right", 
                filterType:"int",
                format:"%", 
                // visible :false,
                showSortMenuEntry:true,
                showFilterMenuEntry:true, 
                groupSummary:"average"
            }),
            new sapui6.ui.table.Column({
                title:"Last updated", 
                headerGroup:"Sales Information2",
                headerGroupParent:"Sales Total2",
                path:"t>update", 
                width:"150px", 
                align:"center", 
                format:"MM-dd-yyyy", 
                showSortMenuEntry:true,
                showFilterMenuEntry:true, 
                groupSummary:"none"
            }),
            new sapui6.ui.table.Column({
                title:"Product", 
                path:"t>product", 
                width:"180px", 
                align:"center", 
                filterType:"select",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showGroupMenuEntry:true, 
                groupSummary:"none"
            })
        ];

        var fn = function(data){
            alert(data.getParameter("rowIndex"));
        };

        var appendData = [
            {"company":'Accenture',"price":4325.20,"quantity":50,"change":0.04,"change2":0.07,"update":'20111120', "product":'Manufacturing'},
            {"company":'SuccessFactors',"price":5558.21,"quantity":87,"change":0.16,"change2":0.11,"update":'20120711', "product":'Computer'}
        ];
        
        var table = new sapui6.ui.table.Table({
            width:"974px", 
            height:"500px",
            showTotalSummary : true,
            // mergeColumnIndex : 0,
            // mergeTotalText : "Sub Total",
            // treeColumnIndex : 0,
            // fixedColumnIndex : 1,
            // horizontalLayout: true,
            // pivot : true,
            // selectionMode : "Multiple", //Multiple, Single
            selectionModeStyleExpression : 'product=="Computer"?"disabled":""', 
            columns:columns,
            margin: "10px",
            resize: true,
            title: "Table Title",
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                    var oModel = new sap.ui.model.json.JSONModel();
                    
                    oModel.attachRequestCompleted(function(){
                        table.setModel(oModel,"t");
                    });

                    oModel.loadData("view/Table3.model.json", "", false);
                }})
                // new sap.ui.commons.Button({text:"Selected Index", style: sap.ui.commons.ButtonStyle.Accept, press:function(){alert(table.getSelectedIndex());}}),
                // new sap.ui.commons.Button({text:"Append Rows", style: sap.ui.commons.ButtonStyle.Accept, press:function(){table.appendRows(appendData)}}),
                // new sap.ui.commons.Button({text:"Insert Rows", style: sap.ui.commons.ButtonStyle.Accept, press:function(){table.insertRows(appendData,1)}}),
                // new sap.ui.commons.Button({text:"Delete Row - Second Line", style: sap.ui.commons.ButtonStyle.Reject, press:function(){table.deleteRow(1)}}),
                // new sap.ui.commons.Button({text:"Change Cell", style: sap.ui.commons.ButtonStyle.Reject, press:function(){table.getModel().setProperty("/data/0/company","ABC")}})
            ]
            // toolbar : this.createToolbar()
            // rowSelectionChange : fn
        });
        table.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	},

    createToolbar : function(){
        var oToolbar = new sap.ui.commons.Toolbar("tb1");
        oToolbar.setDesign(sap.ui.commons.ToolbarDesign.Standard);

        oToolbar.addItem(new sap.ui.commons.TextView({text:"Table Title"}));
        oToolbar.addRightItem(new sap.ui.commons.Button({text:"Search"}));

        return oToolbar;
    }
});