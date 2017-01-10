sap.ui.jsview("view.OrderList", {

    getControllerName : function() {
        return "view.OrderList";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createSearchField(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.BorderedForm");

        var oStatus = new sap.ui.commons.ComboBox();
        oStatus.bindItems("t>/Status", new sap.ui.core.ListItem({key:"{t>key}",text:"{t>text}"}));
        oStatus.bindProperty("selectedKey","t>/SearchCondition/Status");

        var oFromDate = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/SearchCondition/FromDate}"});
        var oBetween = new sap.ui.commons.TextView({text:"~"});
        var oToDate = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{t>/SearchCondition/ToDate}"});

        var oSoldTo = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openSoldtoVH
        });
        oSoldTo.bindValue("t>/SearchCondition/Soldto");

        var oSoldToDesc = new sap.ui.commons.TextView({text:"{t>/SearchCondition/SoldtoDesc}"});

        var oPurchaseOrderNo = sap.ui.jsfragment("fragments.input.PurchaseOrderNumber");
        oPurchaseOrderNo.bindValue("t>/SearchCondition/PurchaseOrderNo");

        var oSalesDocumentNo = sap.ui.jsfragment("fragments.input.SalesDocumentNumber");
        oSalesDocumentNo.bindValue("t>/SearchCondition/SalesOrderNo");

        var oMaterial = new sap.ui.commons.ValueHelpField({
            width:"160px",
            valueHelpRequest : oController.openMaterilVH
        });
        oMaterial.bindValue("t>/SearchCondition/Material");

        var oMaterialDesc = new sap.ui.commons.TextView({text:"{t>/SearchCondition/MaterialDesc}"});
        
        var settings = [
                {label:"Status", element:[oStatus], required:true},
                {label:"Document Date", element:[oFromDate,oBetween,oToDate], required:true},
                {label:"Sold-to party", element:[oSoldTo,oSoldToDesc]},
                {label:"Purchase order no", element:[oPurchaseOrderNo]},
                {label:"Sales order no", element:[oSalesDocumentNo]},
                {label:"Material", element:[oMaterial,oMaterialDesc]}
        ];

        var oBorderedForm = new sapui6.ui.layout.BorderedForm({
                columns : 6,
                width : "100%",
                margin : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                widths : ["100px","200px","100px","200px","100px","200px"],
                title : "Order List",
                button : [
                        new sap.ui.commons.Button({text:"Search", icon:"sap-icon://search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearch}),
                        new sap.ui.commons.Button({text:"Export", icon:"sap-icon://excel-attachment", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doExport})
                ]
        });

        oBorderedForm.set(settings);

        return oBorderedForm;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Status", path:"t>STATU", width:"100px", align:"center", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"PO No", path:"t>BSTKD", width:"100px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"SO No", path:"t>VBELN", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
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
                title:"Document Date", path:"t>AUDAT", width:"120px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sold-to party", path:"t>KUNNR", width:"120px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Delivery Date", path:"t>EDATU", width:"120px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Good Issue Date", path:"t>WADAT", width:"120px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Schedule Line No.", path:"t>ETENR", width:"140px", align:"right", format:"#,###"
            }),
            new sapui6.ui.table.Column({
                title:"Plant", path:"t>WERKS", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Shipping Point", path:"t>VSTEL", width:"130px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sales Group", path:"t>VKGRP", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Sales Org.", path:"t>VKORG", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Channel", path:"t>VTWEG", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Divistion", path:"t>SPART", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Created by", path:"t>ERNAM", width:"140px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Created on", path:"t>ERDAT", width:"100px", align:"center", format:"MM.dd.yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            })
        ]

        var table = new sapui6.ui.table.Table(this.getId()+"-table",{
            width:"100%", 
            height:"500px",
            columns:columns,
            margin:"10px",
            marginTop:"0px",
            noDataText:"No Data.",
            resize: true,
            fixedColumnIndex: 2,
            // selectionMode: "Single",
            rowSelectionChange: oController.openDetail
        });
        table.bindRows("t>/OrderList");

        return table;
    }
});