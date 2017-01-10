sap.ui.jsview("view.CreateOrder", {

    getControllerName : function() {
        return "view.CreateOrder";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createForm(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createForm : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oPurchaseOrderNo = sap.ui.jsfragment("fragments.input.PurchaseOrderNumber");
        oPurchaseOrderNo.bindValue("t>/Header/BSTKD");

        var oSalesOrderNo = new sap.ui.commons.TextField({text:"{t>/Header/VBELN}",enabled:false});

        var oSoldTo = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openSoldtoVH
        });
        oSoldTo.bindValue("t>/Header/KUNNR");

        var oSoldToDesc = new sap.ui.commons.TextView({text:"{t>/Header/SoldtoDesc}"});

        var oShipAddress = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openShipAddressVH
        });

        oShipAddress.setWidth("99%");
        oShipAddress.bindValue("{t>/Header/ShipAddress}");

        var oOrderType = sap.ui.jsfragment("fragments.select.OrderType");
        oOrderType.bindProperty("selectedKey","t>/Header/AUART"); 

        var oReqDate = new sap.ui.commons.DatePicker();
        oReqDate.bindProperty("yyyymmdd","t>Header/VDATU");

        var oPaymentTerms = sap.ui.jsfragment("fragments.select.PaymentTerms");
        oPaymentTerms.setWidth("300px");
        oPaymentTerms.bindProperty("selectedKey","t>/Header/ZTERM"); 

        var oSalesOrg = new sap.ui.commons.TextView({text:"{t>/Header/VKORG}"});
        jQuery.sap.require("sapui6.ui.commons.AppendTextView");
        var oDistributionChannel = new sapui6.ui.commons.AppendTextView({before:" / ", after:" / ", text:"{t>/Header/VTWEG}"});
        var oDivision = new sap.ui.commons.TextView({text:"{t>/Header/SPART}"});

        var oRemarks = new sap.ui.commons.TextArea({rows:4, width:"100%", value:"{t>/Header/FormHeader}"});
        
        var settings = [
                {label:"Purchase order no.", element:[oPurchaseOrderNo], required:true},
                {label:"Sales order no.", element:[oSalesOrderNo]},
                {label:"Sold-to party", element:[oSoldTo, oSoldToDesc], required:true},
                {label:"Ship address", element:[oShipAddress], required:true},
                {label:"Order type", element:[oOrderType], required:true},
                {label:"Request delivery date", element:[oReqDate]},
                {label:"Payment terms", element:[oPaymentTerms]},
                {label:"Sales area", element:[oSalesOrg, oDistributionChannel, oDivision]},
                {label:"Remarks", element:[oRemarks], colspan:4}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 4,
                width : "100%",
                margin : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["140px","380px","140px","380px"],
                title : "Create Order",
                button : [
                        new sap.ui.commons.Button({text:"Save", icon:"sap-icon://save", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSave})
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var oMaterial = new sap.ui.commons.ValueHelpField({
            value:"{t>MATNR}",
            width:"100px",
            valueHelpRequest : oController.openMaterialVH
        });

        jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        var oQty = new sapui6.ui.commons.NumberFormatField({format:"#,##0",textAlign:sap.ui.core.TextAlign.Right});
        oQty.bindValue("t>KWMENG");

        jQuery.sap.require("sapui6.ui.commons.NumberFormatView");
        var oNetPrice = new sapui6.ui.commons.NumberFormatView({format:"#,##0.00",width:"100%"});
        oNetPrice.bindText("t>NETWR");

        // var oComboBox = new sap.ui.commons.ComboBox({selectedKey:"{t>column1}"});
        // oComboBox.bindItems("t>/ComboBoxData", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));

        // var oTextField = new sap.ui.commons.TextField({value:"{t>column2}"});

        

        // var oCheckBox = new sap.ui.commons.CheckBox({text:"CheckBox",checked:"{t>column4}"});

        // jQuery.sap.require("sapui6.ui.commons.NumberFormatField");
        // var oCurrencyField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.00",textAlign:sap.ui.core.TextAlign.Right});
        // oCurrencyField.bindValue("t>column5");

        // var oDatePicker = new sap.ui.commons.DatePicker({yyyymmdd:"{t>column6}", width:"100px"});

        

        // var oPercentField = new sapui6.ui.commons.NumberFormatField({format:"#,##0.##",after:"%",width:"100px",textAlign:sap.ui.core.TextAlign.Right});
        // oPercentField.bindValue("t>column8");

        // var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup({
        //     columns : 2,
        //     items:[
        //         new sap.ui.core.Item({text:"Yes",key:"Yes"}),
        //         new sap.ui.core.Item({text:"No",key:"No"})
        //     ],
        //     select: oController.selectRadioForTable
        // });

        // oRadioButtonGroup.bindProperty("selectedIndex",{
        //     parts: [
        //         {path: "t>column9"},
        //     ],
        //     formatter: function(key){ 
        //       if(key == "Yes") return 0;
        //       else if(key == "No") return 1;
        //     }
        // }); 

        var columns = [
            new sapui6.ui.table.Column({
                title:"Material", path:"t>MATNR", width:"120px", align:"center", template:oMaterial
            }),
            new sapui6.ui.table.Column({
                title:"Description", path:"t>ARKTX", width:"250px", align:"left"
            }),
            new sapui6.ui.table.Column({
                title:"Qty", path:"t>KWMENG", width:"50px", align:"center", template:oQty
            }),
            // new sapui6.ui.table.Column({
            //     title:"Stock", path:"t>stock", width:"50px", align:"center"
            // }),
            new sapui6.ui.table.Column({
                title:"Unit", path:"t>VRKME", width:"80px", align:"center"
            }),
            new sapui6.ui.table.Column({
                title:"Net price", path:"t>VRKME", width:"110px", align:"right", template:oNetPrice
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"300px",
            columns:columns,
            margin:"10px",
            marginTop:"0px",
            marginBottom:"0px",
            noDataText:"No Data.",
            resize: true,
            selectionMode: "Multiple",
            button: [
                new sap.ui.commons.Button({text:"addLine", style:sap.ui.commons.ButtonStyle.Emph, press:oController.addRows}),
                new sap.ui.commons.Button({text:"deleteLine", style:sap.ui.commons.ButtonStyle.Emph, press:oController.deleteRows}),
            ]
        });
        table.bindRows("t>/Items");

        return table;
    }
});