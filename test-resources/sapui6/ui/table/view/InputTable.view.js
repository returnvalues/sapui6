sap.ui.jsview("view.InputTable", {

    getControllerName : function() {
     return "view.InputTable";
    },

    createContent : function (oController) {
        jQuery.sap.require("sapui6.ui.table.Table");

        var oTextField1 = new sap.ui.commons.TextField();
        oTextField1.bindProperty("value", "t>input1");

        var oTextField2 = new sap.ui.commons.TextField();
        oTextField2.bindProperty("value", "t>input2");

        var oComboBox3 = new sap.ui.commons.ComboBox({
            items : [
                new sap.ui.core.ListItem({key:"1",text:"1"}),
                new sap.ui.core.ListItem({key:"2",text:"2"}),
                new sap.ui.core.ListItem({key:"3",text:"3"}),
                new sap.ui.core.ListItem({key:"4",text:"4"}),
                new sap.ui.core.ListItem({key:"5",text:"5"})
            ]
        });
        oComboBox3.bindProperty("selectedKey", "t>input3")

        var oTextField4 = new sap.ui.commons.TextField();
        oTextField4.bindProperty("value", "t>input4");

        var oTextField5 = new sap.ui.commons.TextField();
        oTextField5.bindProperty("value", "t>input5");

        var oTextField6 = new sap.ui.commons.TextField();
        oTextField6.bindProperty("value", "t>input6");

        var oTextField7 = new sap.ui.commons.TextField();
        oTextField7.bindProperty("value", "t>input7");

        var oTextField8 = new sap.ui.commons.TextField();
        oTextField8.bindProperty("value", "t>input8");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", 
                path:"t>input1", 
                width:"120px", 
                align:"left", 
                template:oTextField1
            }),
           new sapui6.ui.table.Column({
                title:"Column2", 
                path:"t>input2", 
                width:"120px", 
                align:"left", 
                template:oTextField2
            }),
           new sapui6.ui.table.Column({
                title:"Column3", 
                path:"t>input3", 
                width:"80px", 
                align:"center", 
                template:oComboBox3
            }),
           new sapui6.ui.table.Column({
                title:"Column4", 
                path:"t>input4", 
                width:"120px", 
                align:"left", 
                template:oTextField4
            }),
           new sapui6.ui.table.Column({
                title:"Column5", 
                path:"t>input5", 
                width:"120px", 
                align:"left", 
                template:oTextField5
            }),
           new sapui6.ui.table.Column({
                title:"Column6", 
                path:"t>input6", 
                width:"120px", 
                align:"left", 
                template:oTextField6
            }),
           new sapui6.ui.table.Column({
                title:"Column7", 
                path:"t>input7", 
                width:"120px", 
                align:"left", 
                template:oTextField7
            }),
           new sapui6.ui.table.Column({
                title:"Column8", 
                path:"t>input8", 
                width:"120px", 
                align:"left", 
                template:oTextField8
            })
        ];

        var table = new sapui6.ui.table.Table(this.getId()+"-table", {
            width:"100%", 
            height:"500px",
            columns:columns,
            margin: "10px",
            resize: true,
            title: "Input Table",
            selectionMode : "Multiple",
            button : [
                new sap.ui.commons.Button({text:"Append Rows", style: sap.ui.commons.ButtonStyle.Accept, press:oController.addRows}),
                new sap.ui.commons.Button({text:"Delete Rows", style: sap.ui.commons.ButtonStyle.Reject, press:oController.deleteRows}),
                new sap.ui.commons.Button({text:"Get Table Data", style: sap.ui.commons.ButtonStyle.Emph, press:oController.getTableData})
            ]
        });
        table.bindRows("t>/data");
        
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(table);

        return oLayout;
	}
});