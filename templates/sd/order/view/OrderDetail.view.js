sap.ui.jsview("view.OrderDetail", {

    getControllerName : function() {
        return "view.OrderDetail";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createForm(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createForm : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oSalesDocumentNo = new sap.ui.commons.TextField({value:"{t>SalesOrder/VBELN}",editable:false});

        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        var oNetValue = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",editable:false});
        oNetValue.bindValue("t>/SalesOrder/NETWR");

        var oSoldto = new sap.ui.commons.TextField({value:"{t>SalesOrder/KUNNR}",editable:false});
        var oSoldtoDesc = new sap.ui.commons.TextView({text:"{t>SalesOrder/KUNNR}"});

        // var oComboBox = new sap.ui.commons.ComboBox({editable:false});
        // oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        // oComboBox.bindProperty("selectedKey","t>/FormData/ComboBox");

        // jQuery.sap.require("sapui6.ui.commons.AppendTextView");
        // var oAppendTextView = new sapui6.ui.commons.AppendTextView({before:"(", after:")", text:"{t>/FormData/ValueHF}"});
        // var oAppendTextViewDesc = new sap.ui.commons.TextView({text:"{t>/FormData/ValueHFDesc}"});

        // var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
        //     columns : 2,
        //     items:[
        //         new sap.ui.core.Item({text:"Yes",key:"Yes"}),
        //         new sap.ui.core.Item({text:"No",key:"No"})
        //     ],
        //     editable: false
        // });

        

       
        // jQuery.sap.require("sapui6.ui.commons.NumberField");
        // var oNumberField = new sapui6.ui.commons.NumberField({value:"{t>/FormData/Code}", editable:false});

        

        // var oQtyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0",editable:false});
        // oQtyField.bindValue("t>/FormData/Qty");

        // var oPercentField = new sapui6.ui.commons.AppendTextView({after:"%", text:"{t>/FormData/Percent}"});

    

        // jQuery.sap.require("sapui6.ui.commons.UppercaseField");
        // var oUppercaseField = new sapui6.ui.commons.UppercaseField({value:"{t>/FormData/Uppercase}", editable:false});

        // jQuery.sap.require("sapui6.ui.commons.LowercaseField");
        // var oLowercaseField = new sapui6.ui.commons.LowercaseField({value:"{t>/FormData/Lowercase}", editable:false});

        

        // var oTextField = new sap.ui.commons.TextField({value:"{t>/FormData/TextField}",editable:false});

        // var oLink = new sap.ui.commons.Link({text:"2014 Sales Report"});


        // var oTextArea = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/FormData/TextArea}",editable:false});

        var settings = [
                {label:"Sales order number", element:[oSalesDocumentNo]},
                {label:"Net value", element:[oNetValue]},
                {label:"Sold-to party", element:[oSoldto]}
                // {label:"NumberField", element:[oNumberField]},
                // {label:"Currency", element:[oCurrencyField]},
                // {label:"Qty", element:[oQtyField]},
                // {label:"Percent", element:[oPercentField], marginLeft:"6px"},
                // {label:"DatePicker", element:[oDatePicker]},
                // {label:"Uppercase", element:[oUppercaseField]},
                // {label:"Lowercase", element:[oLowercaseField]},
                // {label:"TextField", element:[oTextField]},
                // {label:"TextArea", element:[oTextArea]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                margin : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Item", path:"t>POSNR", width:"60px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Material", path:"t>MATNR", width:"100px", align:"left", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Description", path:"t>ARKTX", width:"200px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Order Qty", path:"t>KWMENG", width:"120px", align:"right", format:"#,###", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Confirmed Qty", path:"t>BMENG", width:"120px", align:"right", format:"#,###", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Net Price", path:"t>NETWR", width:"100px", align:"right", format:"#,###.00", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Currency", path:"t>WAERK", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Delivery Date", path:"t>EDATU", width:"120px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Good Issue Date", path:"t>WADAT", width:"120px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Schedule Line No.", path:"t>ETENR", width:"140px", align:"right", format:"#,###"
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"300px",
            columns:columns,
            margin:"10px",
            marginTop:"0px",
            marginBottom:"0px",
            fixedColumnIndex: 2
        });
        table.bindRows("t>/SalesOrder/Items");

        return table;
    }
});