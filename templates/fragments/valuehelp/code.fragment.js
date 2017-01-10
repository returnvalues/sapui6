(function(){
    var _Table;
    var _selectedCode = "";
    var _selectedDesc = "";

    sap.ui.jsfragment("fragments.valuehelp.code", {
        createContent : function(oController) {
            var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
            oLayout.addContent(this.createSearchField(oController));  
            oLayout.addContent(this.createItemField(oController));  

            var oDialog = new sap.ui.commons.Dialog({title:"Code",width:"540px",height:"520px"});
            oDialog.addContent(oLayout);
            oDialog.setModal(true);
            oDialog.addButton(new sap.ui.commons.Button({
                text: "Ok", 
                press:function(){
                    if(_Table.getSelectedIndex() < 0){
                        sap.ui.commons.MessageBox.alert("Please select row!");
                        return;
                    }

                    oDialog.data("code",_selectedCode);
                    oDialog.data("desc",_selectedDesc);
                    oDialog.close();
                }
            }));
            oDialog.addButton(new sap.ui.commons.Button({
                text: "Cancel", 
                press:function(){
                    oDialog.data("code","");
                    oDialog.data("desc","");
                    oDialog.close();
                }
            }));

            return oDialog;
        },

        createSearchField : function(oController){
            jQuery.sap.require("sapui6.ui.layout.InlineForm");
            var oCode = new sap.ui.commons.TextField({width:"100px"});
            var oDesc = new sap.ui.commons.TextField({width:"100px"});
            var oSearch = new sap.ui.commons.Button({text:"Search", height:"28px", style:sap.ui.commons.ButtonStyle.Emph, press:function(){
                if(_Table.isBusy()) {
                    sap.ui.commons.MessageBox.alert(messageBundle.getText("msg003"),null,messageBundle.getText("title002"));
                    return;
                }

                var code = oCode.getLiveValue();
                var desc = oDesc.getLiveValue();

                var params = "code=" + code + "&desc=" + desc;

                _Table.setBusy(true);

                var oModel = new sap.ui.model.json.JSONModel();
                
                oModel.attachRequestCompleted("",
                    function(){
                        _Table.setModel(oModel,"t");
                        _Table.setBusy(false);
                    }
                );

                oModel.loadData("../../fragments/valuehelp/code.model.json",params,false);
            }});

            var settings = [
                    {label:"Code", element:[oCode]},
                    {label:"Description", element:[oDesc]},
                    {element:[oSearch], side:"right"}
            ];

            var oInlineForm = new sapui6.ui.layout.InlineForm({
                    width : "518px",
                    // margin : "10px",
                    labelBold : true,
                    resize : false
            });

            oInlineForm.set(settings);

            return oInlineForm;
          },

        createItemField : function(oController){
            var columns = [
                new sap.ui.table.Column({
                    label:new sap.ui.commons.Label({text:"Code"}),
                    template:new sap.ui.commons.TextView().bindProperty("text","t>code"),
                    width:"100px", 
                    sortProperty:"code"
                }),
                new sap.ui.table.Column({
                    label:new sap.ui.commons.Label({text:"Description"}),
                    template:new sap.ui.commons.TextView().bindProperty("text","t>desc"),
                    width:"250px", 
                    sortProperty:"desc"
                })
            ]

            _Table = new sap.ui.table.Table({
                width:"518px", 
                visibleRowCount:10,
                columns:columns,
                selectionMode: sap.ui.table.SelectionMode.Single,
                // navigationMode: sap.ui.table.NavigationMode.Paginator,
                rowSelectionChange:function(oEvent){
                    _selectedCode = oEvent.getParameters()["rowContext"].getProperty("code");
                    _selectedDesc = oEvent.getParameters()["rowContext"].getProperty("desc");
                }
            });
            _Table.bindRows("t>/data");


            return _Table;
        }
    });

}());