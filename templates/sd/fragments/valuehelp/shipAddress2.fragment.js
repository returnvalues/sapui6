(function(){
    var _Table;

    sap.ui.jsfragment("fragments.valuehelp.ShipAddress", {
        createContent : function(oController) {
            var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
            oLayout.addContent(this.createToolbar(oController));
            oLayout.addContent(this.createSearchField(oController));  
            oLayout.addContent(this.createItemField(oController));  

            var oDialog = new sap.ui.commons.Dialog({title:"Ship Address",width:"830px",height:"540px"});
            oDialog.addContent(oLayout);

            oDialog.setModal(true);
            oDialog.addButton(new sap.ui.commons.Button({
                text: "확인", 
                press:function(){
                    if(_Table.getSelectedIndex() == undefined || _Table.getSelectedIndex() < 0){
                        sap.ui.commons.MessageBox.alert(messageBundle.getText("msg004"),null,messageBundle.getText("title003"));
                        return;
                    }

                    var selectedRow = _Table.getSelectedIndex();
                    var tableData = _Table.getModel().getData()["shipAddress"];


                    var selectedShipAddress = "(" + tableData[selectedRow]["businessName"] + ")";
                    selectedShipAddress += " " + tableData[selectedRow]["address"];
                    selectedShipAddress += " " + tableData[selectedRow]["city"];
                    selectedShipAddress += " " + tableData[selectedRow]["state"];
                    selectedShipAddress += " " + tableData[selectedRow]["country"];
                    selectedShipAddress += " " + tableData[selectedRow]["zip"];
                    oDialog.data("shipAddress",selectedShipAddress);
                    oDialog.close();
                }
            }));
            oDialog.addButton(new sap.ui.commons.Button({
                text: "취소", 
                press:function(){
                    oDialog.data("shipAddress","");
                    oDialog.close();
                }
            }));

            return oDialog;
        },

        createToolbar : function(oController){
            var oToolbar = new sap.ui.commons.Toolbar();
            oToolbar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
            oToolbar.addStyleClass("transparent1");

            var _Fragment = this;

            var oButton1 = ui.createButton("",buttonBundle.getText("search"),"sap-icon://search",function(){
                if(_Table.isBusy()) {
                    sap.ui.commons.MessageBox.alert(messageBundle.getText("msg003"),null,messageBundle.getText("title002"));
                    return;
                }

                var businessName = sap.ui.getCore().byId(_Fragment.getId()+"bsname").getLiveValue();
                var city = sap.ui.getCore().byId(_Fragment.getId()+"city").getLiveValue();

                var params = "businessName=" + businessName + "&city=" + city;

                _Table.setBusy(true);

                var oModel = ui.JSONModel();
                
                oModel.attachRequestCompleted("",
                    function(){
                        _Table.setModel(oModel);
                        _Table.setBusy(false);
                    }
                );

                oModel.loadData("fragments/sap/sd/valuehelp/shipAddress.model.json",params,false);
            });
            oToolbar.addRightItem(oButton1);

            return oToolbar;
        },

        createSearchField : function(oController){
            var mForms = [
                  {type:"label", text:labelBundle.getText("businessName"), className:"labelArea"},
                  {type:"textfield", id:this.getId()+"bsname", text:""},
                  {type:"label", text:labelBundle.getText("city"), className:"labelArea"},
                  {type:"textfield", id:this.getId()+"city", text:""}
            ];
              
            var mSettings = {
                  width: ["100px","250px"] 
            };
              
            var oMatrixLayout = ui.createFormView(mForms, 2, mSettings);
            oMatrixLayout.addStyleClass("border1 marginBottom");

            return oMatrixLayout;
          },

        createItemField : function(oController){
            var mSettings = {
              visibleRowCount: 10,
              selectionMode: sap.ui.table.SelectionMode.Single,
              showNoData: true
            };

            var mHeaders = [
              {title:labelBundle.getText("businessName"), key:"businessName", width:"200px"},
              {title:labelBundle.getText("address"), key:"address", width:"250px"},
              {title:labelBundle.getText("city"), key:"city", width:"100px"},
              {title:labelBundle.getText("state"), key:"state", width:"60px", align:"Center"},
              {title:labelBundle.getText("country"), key:"country", width:"100px"},
              {title:labelBundle.getText("zip"), key:"zip", width:"60px", align:"Center"},
              {title:labelBundle.getText("phone"), key:"phone", width:"120px", align:"Center"},
              {title:labelBundle.getText("fax"), key:"fax", width:"120px", align:"Center"}
            ];

            _Table = ui.createTable("", mHeaders, [], mSettings);
            _Table.bindRows("/shipAddress");

            return _Table;
        }
    });

}());