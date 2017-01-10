sap.ui.jsview("view.OneChartOneTable", {

    getControllerName : function() {
        return "view.OneChartOneTable";
    },

	createContent : function (oController) {
        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

        oLayout.addContent(this.createSearchField(oController));
        oLayout.addContent(this.createDualCombinationChart(oController));
        oLayout.addContent(this.createTable(oController));

        return oLayout;
	},

    createSearchField : function(oController){
        jQuery.sap.require("sapui6.ui.layout.InlineForm");

        var oComboBox = new sap.ui.commons.ComboBox();
        oComboBox.bindItems("/ComboBoxData", new sap.ui.core.ListItem({key:"{key}",text:"{text}"}));
        oComboBox.bindProperty("selectedKey","/SearchCondition/ComboBox");

        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{/SearchCondition/FromDate}"});
        var oTextView = new sap.ui.commons.TextView({text:"~"});
        var oDatePicker2 = new sap.ui.commons.DatePicker({width:"100px", yyyymmdd:"{/SearchCondition/ToDate}"});

        var oValueHelpField = new sap.ui.commons.ValueHelpField({
            width:"100px",
            valueHelpRequest : oController.openValueHelp
        });
        oValueHelpField.bindValue("/SearchCondition/ValueHF");

        var oValueHelpDesc = new sap.ui.commons.TextView({text:"{/SearchCondition/ValueHFDesc}"});

        var oSearchButton = new sap.ui.commons.Button({text:"Search", icon:"sap-icon://search", style:sap.ui.commons.ButtonStyle.Emph, press:oController.doSearch});

        var settings = [
                {label:"Label1", element:[oComboBox], required:true},
                {label:"Label2", element:[oDatePicker,oTextView,oDatePicker2], required:true},
                {label:"Label3", element:[oValueHelpField,oValueHelpDesc]},
                {element:[oSearchButton]}
        ];

        var oInlineForm = new sapui6.ui.layout.InlineForm({
                width : "100%",
                margin : "10px",
                labelBackgroundColor : "#eef7ff",
                labelBold : true,
                title : "One Chart & One Table"
        });

        oInlineForm.set(settings);

        return oInlineForm;
    },

    createDualCombinationChart : function(oController){
        var chartModel = {
          data : [
            {country:'China',year:'2001',product:'Car',profit:25,revenue:50},
            {country:'China',year:'2002',product:'Car',profit:136,revenue:272},
            {country:'USA',year:'2001',product:'Car',profit:58,revenue:116},
            {country:'USA',year:'2002',product:'Car',profit:128,revenue:256},
            {country:'Canada',year:'2001',product:'Car',profit:58,revenue:116},
            {country:'Canada',year:'2002',product:'Car',profit:24,revenue:48},
            {country:'China',year:'2001',product:'Truck',profit:159,revenue:300},
            {country:'China',year:'2002',product:'Truck',profit:147,revenue:247},
            {country:'USA',year:'2001',product:'Truck',profit:149,revenue:249},
            {country:'USA',year:'2002',product:'Truck',profit:269,revenue:369},
            {country:'Canada',year:'2001',product:'Truck',profit:38,revenue:68},
            {country:'Canada',year:'2002',product:'Truck',profit:97,revenue:197},
            {country:'China',year:'2001',product:'Motorcycle',profit:129,revenue:229},
            {country:'China',year:'2002',product:'Motorcycle',profit:47,revenue:147},
            {country:'USA',year:'2001',product:'Motorcycle',profit:49,revenue:149},
            {country:'USA',year:'2002',product:'Motorcycle',profit:69,revenue:169},
            {country:'Canada',year:'2001',product:'Motorcycle',profit:33,revenue:133},
            {country:'Canada',year:'2002',product:'Motorcycle',profit:47,revenue:147}
          ]
        };

        var chartData = {
          dimensions : [
            {axis : 1, name : 'Country', value: "{country}"},
            {axis : 1, name : 'Year', value: "{year}"},
            {axis : 2, name : 'Product', value: "{product}"}
          ],
          measures : [
            {group:1, name : "Profit", value : "{profit}"},
            {group:2, name : "Revenue", value : "{revenue}"}
          ],
          data : {
            path : "/data"
          }
        };

        var oDataset = new sap.viz.ui5.data.FlattenedDataset(chartData);
        var oModel = new sap.ui.model.json.JSONModel(chartModel);
        oDataset.setModel(oModel);
        
        var oChart = new sap.viz.ui5.DualCombination({
          width : "100%",
          height : "400px",
          plotArea : {
            marker : {
              shape : sap.viz.ui5.types.Line_marker_shape.circle,  //circle, cross, diamond, intersection, triangleDown, triangleLeft, triangleRight, triangleUp
              visible : true
            }
          },
          title : {
            visible : true,
            text : 'Dual Combination Chart'
          },
          legendGroup : {
            layout : {
              position : sap.viz.ui5.types.Legend_layout_position.right
            }
          },
          xAxis : {
            // color : "#9CC677",
            // title : {
            //   visible : true,
            //   applyAxislineColor : true
            // },
            lineSize : 2
          },
          yAxis : {
            // title : {
            //   visible : true
            // },
            // gridline : {
            //   color : "#748CB2",
            //   type : sap.viz.ui5.types.Axis_gridline_type.dotted
            // },
            lineSize : 2
          },
          yAxis2 : {
            // title : {
            //   visible : true
            // },
            lineSize : 2
          },
          dataset: oDataset
        });

        return oChart;
    },

    createTable : function(oController){
        jQuery.sap.require("sapui6.ui.table.Table");

        var columns = [
            new sapui6.ui.table.Column({
                title:"Column1", path:"t>column1", width:"100px", align:"left", filterType:"select", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column2", path:"t>column2", width:"100px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column3", path:"t>column3", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column4", path:"t>column4", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column5", path:"t>column5", width:"100px", align:"right", format:"#,###", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column6", path:"t>column6", width:"100px", align:"center", format:"MM-dd-yyyy", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column7", path:"t>column7", width:"100px", align:"right", format:"%", showSortMenuEntry:true, showFilterMenuEntry:true
            }),
            new sapui6.ui.table.Column({
                title:"Column8", path:"t>column8", width:"100px", align:"right", format:"#,###.##", showSortMenuEntry:true, showFilterMenuEntry:true
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
            // selectionMode: "Single",
            rowSelectionChange: oController.openDetail
        });
        table.bindRows("t>/TableData");

        return table;
    }
});