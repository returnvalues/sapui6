sap.ui.jsview("view.RowCellControl", {
    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Company", 
                path:"t>company", 
                width:"300px", 
                align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Country", 
                path:"t>country", 
                width:"90px", 
                align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Region", 
                path:"t>region", 
                width:"80px", 
                align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Sector", 
                path:"t>sector", 
                width:"80px", 
                align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Output", 
                path:"t>output", 
                width:"90px", 
                align:"right",
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"IC(%)", 
                path:"t>ic", 
                width:"80px", 
                align:"right"
            }),
            new sapui6.ui.table.Column({
                title:"NI", 
                path:"t>ni", 
                width:"80px", 
                align:"right", 
                format:"#,###.#"
            }),
            new sapui6.ui.table.Column({
                title:"Q1", 
                path:"t>q1", 
                width:"80px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"Spec", 
                path:"t>spec", 
                width:"80px", 
                align:"right", 
                format:"#,###.#"
            }),
            new sapui6.ui.table.Column({
                title:"Exc", 
                path:"t>exc", 
                width:"90px", 
                align:"right", 
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Exc(%)", 
                path:"t>exc2", 
                width:"80px", 
                align:"right", 
                format:"%"
            }),
            new sapui6.ui.table.Column({
                title:"Lead", 
                path:"t>ic", 
                width:"90px", 
                align:"right", 
                format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Lead(%)", 
                path:"t>lead2", 
                width:"80px", 
                align:"right", 
                format:"%"
            })
        ];

        var table = new sapui6.ui.table.Table({
            title: "Table - Row/Column/Cell Control",
            width:"100%", 
            height:"600px",
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

        var oHLayout = new sap.ui.layout.HorizontalLayout();
        oHLayout.addStyleClass("buttonArea");

        oHLayout.addContent(new sap.ui.commons.Button({text:"Set Cell Readonly (0,2)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.setCellReadonly(0,2);
        }}));

        oHLayout.addContent(new sap.ui.commons.Button({text:"Off Cell Readonly (0,2)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.setCellReadonly(0,2,false);
        }}));

        oHLayout.addContent(new sap.ui.commons.Button({text:"Set Row Readonly (1)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.setRowReadonly(1);
        }}));

        oHLayout.addContent(new sap.ui.commons.Button({text:"Off Row Readonly (1)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.setRowReadonly(1,false);
        }}));

        oHLayout.addContent(new sap.ui.commons.Button({text:"Set Column Readonly (4)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.setColumnReadonly(4);
        }}));

        oHLayout.addContent(new sap.ui.commons.Button({text:"Off Column Readonly (4)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.setColumnReadonly(4,false);
        }}));
        

        var oHLayout2 = new sap.ui.layout.HorizontalLayout();
        oHLayout2.addStyleClass("buttonArea");

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Add Cell Class (4,1)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.addCellClass(4,1,"bgRed");
        }}));

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Remove Cell Class (4,1)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.removeCellClass(4,1,"bgRed");
        }}));

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Add Row Class (3)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.addRowClass(3,"bgBlue");
        }}));

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Remove Row Class (3)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.removeRowClass(3,"bgBlue");
        }}));

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Add Column Class (2)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.addColumnClass(2,"bgBlackFontWhite");
        }}));

        oHLayout2.addContent(new sap.ui.commons.Button({text:"Remove Column Class (2)", style: sap.ui.commons.ButtonStyle.Reject, height:"30px", press:function(){
            table.removeColumnClass(2,"bgBlackFontWhite");
        }}));

        var oHLayout3 = new sap.ui.layout.HorizontalLayout();
        oHLayout3.addStyleClass("buttonArea");

        oHLayout3.addContent(new sap.ui.commons.Button({text:"Set Cell Focus (4,0)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.setFocusCell(4,0);
        }}));

        oHLayout3.addContent(new sap.ui.commons.Button({text:"Set Cell Data (4,4)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            table.addCellClass(4,4,"bgRed");
            table.setCellData(4,4, 8540);
        }}));

        oHLayout3.addContent(new sap.ui.commons.Button({text:"Get Cell Data (4,4)", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            // alert(table.getCellData(4,4));
            sap.ui.commons.MessageBox.alert("Cell Data : " + table.getCellData(4,4));
        }}));

        oHLayout3.addContent(new sap.ui.commons.Button({text:"Get Data Rows Count", style: sap.ui.commons.ButtonStyle.Accept, height:"30px", press:function(){
            // alert(table.getRowCount());
            sap.ui.commons.MessageBox.alert("Row Count : " + table.getRowCount());
        }}));


        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);
        oLayout.addContent(oHLayout);
        oLayout.addContent(oHLayout2);
        oLayout.addContent(oHLayout3);

        return oLayout;
    }
});