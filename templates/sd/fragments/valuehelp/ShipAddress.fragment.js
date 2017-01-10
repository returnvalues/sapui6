(function(){
    var _Table;

    sap.ui.jsfragment("fragments.valuehelp.ShipAddress", {
        createContent : function(oController) {
            var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});

            var oDialog = new sap.ui.commons.Dialog({title:"Ship Address",width:"830px",height:"540px"});
            oDialog.addContent(this.createSearchField(oController));
            oDialog.addContent(this.createItemField(oController));

            oDialog.setModal(true);
            oDialog.addButton(new sap.ui.commons.Button({
                text: "Ok", 
                press:function(){
                    if(_Table.getSelectedRowIndex() < 0){
                        sap.ui.commons.MessageBox.alert("Please select row!");
                        return;
                    }

                    var selectedShipAddress = "(" + _Table.getSelectedRowData()["businessName"] + ")";
                    selectedShipAddress += " " + _Table.getSelectedRowData()["address"];
                    selectedShipAddress += " " + _Table.getSelectedRowData()["city"];
                    selectedShipAddress += " " + _Table.getSelectedRowData()["state"];
                    selectedShipAddress += " " + _Table.getSelectedRowData()["country"];
                    selectedShipAddress += " " + _Table.getSelectedRowData()["zip"];

                    oDialog.data("shipAddress",selectedShipAddress);
                    oDialog.close();
                }
            }));
            oDialog.addButton(new sap.ui.commons.Button({
                text: "Cancel", 
                press:function(){
                    oDialog.data("shipAddress","");
                    oDialog.close();
                }
            }));

            return oDialog;
        },

        createSearchField : function(oController){
            jQuery.sap.require("sapui6.ui.layout.InlineForm");
            var oBusinessName = new sap.ui.commons.TextField({width:"200px"});
            var oCity = new sap.ui.commons.TextField({width:"200px"});
            var oSearch = new sap.ui.commons.Button({text:"Search", height:"28px", style:sap.ui.commons.ButtonStyle.Emph, press:function(){
                if(_Table.isLoading()) {
                    sap.ui.commons.MessageBox.alert("",null,"");
                    return;
                }

                _Table.showLoading();

                var businessName = oBusinessName.getLiveValue();
                var city = oCity.getLiveValue();

                var params = "businessName=" + businessName + "&city=" + city;

                var oModel = new sap.ui.model.json.JSONModel();
                
                oModel.attachRequestCompleted(function(){
                        _Table.setModel(oModel,"t");
                        _Table.hideLoading();
                    }
                );

                oModel.loadData("../fragments/valuehelp/ShipAddress.model.json",params,false);
            }});

            var settings = [
                    {label:"Business Name", element:[oBusinessName]},
                    {label:"City", element:[oCity]},
                    {element:[oSearch], side:"right"}
            ];

            var oInlineForm = new sapui6.ui.layout.InlineForm({
                    width : "810px",
                    margin : "10px",
                    labelBold : true
            });

            oInlineForm.set(settings);

            return oInlineForm;
          },

        createItemField : function(oController){
            jQuery.sap.require("sapui6.ui.table.Table");

            var columns = [
                new sapui6.ui.table.Column({
                    title:"Name", path:"t>businessName", width:"200px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Address", path:"t>address", width:"250px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"City", path:"t>city", width:"100px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"State", path:"t>state", width:"60px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Country", path:"t>country", width:"100px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Zip", path:"t>zip", width:"60px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Phone", path:"t>phone", width:"120px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Fax", path:"t>fax", width:"120px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
                })
            ]

            _Table = new sapui6.ui.table.Table({
                width:"100%", 
                height:"330px",
                columns:columns,
                resize: false
                // selectionMode: "Single"
            });
            _Table.bindRows("t>/ShipAddress");

            jQuery.sap.require("sapui6.ui.layout.MarginVBox");
            var oMarginHBox = new sapui6.ui.layout.MarginVBox({
                    width : "810px",
                    marginLeft : "10px",
                    marginRight : "10px",
                    resize : false
            });

            oMarginHBox.addContent(_Table);

            return oMarginHBox;
        }
    });

}());