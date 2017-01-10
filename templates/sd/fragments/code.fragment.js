(function(){
    var _Table;

    sap.ui.jsfragment("fragments.valuehelp.code", {
        createContent : function(oController) {
            var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
            // oLayout.addContent(this.createSearchField(oController));  
            // oLayout.addContent(this.createItemField(oController));  

            var oDialog = new sap.ui.commons.Dialog({title:"Code",width:"540px",height:"530px"});
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

                    var selectedCode = _Table.getSelectedRowData()["code"];
                    var selectedDesc = _Table.getSelectedRowData()["desc"];

                    oDialog.data("code",selectedCode);
                    oDialog.data("desc",selectedDesc);
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
                    width : "520px",
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
                    title:"Code", path:"t>code", width:"100px", align:"center", showSortMenuEntry:true, showFilterMenuEntry:true
                }),
                new sapui6.ui.table.Column({
                    title:"Description", path:"t>desc", width:"250px", align:"left", showSortMenuEntry:true, showFilterMenuEntry:true
                })
            ]

            _Table = new sapui6.ui.table.Table({
                width:"100%", 
                height:"330px",
                columns:columns,
                resize: false
                // selectionMode: "Single"
            });
            _Table.bindRows("t>/data");

            jQuery.sap.require("sapui6.ui.layout.MarginVBox");
            var oMarginHBox = new sapui6.ui.layout.MarginVBox({
                    width : "520px",
                    marginLeft : "10px",
                    marginRight : "10px",
                    resize : false
            });

            oMarginHBox.addContent(_Table);

            return oMarginHBox;
        }
    });

}());