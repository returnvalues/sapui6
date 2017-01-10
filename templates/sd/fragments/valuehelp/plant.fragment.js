(function(){
    var _Table;

    sap.ui.jsfragment("fragments.sap.sd.valuehelp.plant", {
        createContent : function(oController) {
            var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
            oLayout.addContent(this.createItemField(oController));  

            var oDialog = new sap.ui.commons.Dialog({title:"Plant",width:"430px",height:"540px"});
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
                    var tableData = _Table.getModel().getData()["items"];

                    var code = tableData[selectedRow]["code"];
                    var description = tableData[selectedRow]["description"];

                    oDialog.data("code",code);
                    oDialog.data("description",description);
                    oDialog.close();
                }
            }));
            oDialog.addButton(new sap.ui.commons.Button({
                text: "취소", 
                press:function(){
                   oDialog.data("code","");
                    oDialog.data("description","");
                    oDialog.close();
                }
            }));

            return oDialog;
        },

        createItemField : function(oController){
            var mSettings = {
              visibleRowCount: 10,
              selectionMode: sap.ui.table.SelectionMode.Single,
              showNoData: true
            };

            var mHeaders = [
              {title:labelBundle.getText("code"), key:"code", width:"100px", sortable:true, align:"Center"},
              {title:labelBundle.getText("description"), key:"name", width:"250px", sortable:true}
            ];

            _Table = ui.createTable("", mHeaders, [], mSettings);
            _Table.bindRows("/items");

            _Table.setBusy(true);

            var oModel = ui.JSONModel();
            
            oModel.attachRequestCompleted("",
                function(){
                    _Table.setModel(oModel);
                    _Table.setBusy(false);
                }
            );

            oModel.loadData("fragments/sap/sd/valuehelp/plant.model.json","",false);

            return _Table;
        }
    });

}());