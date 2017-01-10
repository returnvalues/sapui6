sap.ui.jsview("view.oData", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Last Name", 
                path:"t>Lastname", 
                width:"120px", 
                align:"left",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true,
                showFreezePaneMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"First Name", 
                path:"t>Firstname", 
                width:"120px", 
                align:"left",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Email", 
                path:"t>Email", 
                width:"200px", 
                align:"left",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Age", 
                path:"t>Age", 
                width:"60px", 
                align:"center",
                filterType:"int",
                groupSummary:"average",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Address", 
                path:"t>Address", 
                width:"300px", 
                align:"left",
                groupSummary:"none",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Department", 
                path:"t>Department", 
                width:"140px", 
                align:"left",
                groupSummary:"none",
                filterType:"select",
                showSortMenuEntry:true,
                showFilterMenuEntry:true
            })
        ];
        
        var table = new sapui6.ui.table.Table({
            width:"100%", 
            height:"500px",
            columns:columns,
            margin: "10px",
            resize: true,
            showTotalSummary: true,
            title: "Table - oData",
            // selectionMode: "Single",
            // rowSelectionChange : function(data){
            //     alert(data.getParameter("rowIndex"));
            //     alert(data.getParameter("rowData"));
            // },
            cellSelectionChange : function(data){
                alert(data.getParameter("rowIndex"));
                alert(data.getParameter("cellIndex"));
                alert(data.getParameter("cellData"));
                alert(table.getCellData(data.getParameter("rowIndex"),data.getParameter("cellIndex")));
            },
            button : [
                new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){

                    jQuery.sap.require("sap.ui.core.util.MockServer");  
                    // Create mockserver  
                    var oMockServer = new sap.ui.core.util.MockServer({  
                        rootUri: "http://mymockserver/",  
                    });                 
                    oMockServer.simulate("view/oData.xml", "view/");  
                    oMockServer.start();  
                  
                    // setting up model  
                    var oModel = new sap.ui.model.odata.ODataModel("http://mymockserver/", true);  
                    oModel.setCountSupported(false);  
                    table.setModel(oModel,"t");
                    console.log(oModel);
                }})
            ]
        });
        table.bindRows("t>/UserSet");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});