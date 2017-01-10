sap.ui.jsview("view.ExtendSimpleTable", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.ExtendSimpleTable");

        var columns = [
            {title:"Company", path:"t>company", width:"250px"},
            {title:"Country", path:"t>country", width:"140px", align:"center"},
            {title:"Region", path:"t>region", width:"80px", align:"center"},
            {title:"Sector", path:"t>sector", width:"100px", align:"center"},
            {title:"Output", path:"t>output", width:"100px", align:"right", format:"#,###"},
            {title:"IC", path:"t>ic", width:"100px", align:"right", format:"#,###.##"},
            {title:"NI", path:"t>ni", width:"100px", align:"right", format:"#,##0.0"}
        ];
        var oSimpleTable = new sapui6.ui.table.ExtendSimpleTable({
            width:"100%",
            visibleRowCount:20,
            fixedColumnCount:1
        });
        oSimpleTable.setColumn(columns);

        oSimpleTable.bindRows("t>/data");

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(
            new sap.ui.commons.Button({text:"Search", style: sap.ui.commons.ButtonStyle.Emph, press:function(){
                var oModel = new sap.ui.model.json.JSONModel();
                
                oModel.attachRequestCompleted(function(){
                    table.setModel(oModel,"t");
                });

                oModel.loadData("view/Table.model.json", "", false);
            }})
        );
        oLayout.addContent(oSimpleTable);

        return oLayout;
	}
});