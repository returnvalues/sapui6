sap.ui.jsview("view.Tree", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.Tree");

                var oTree = new sapui6.ui.commons.Tree("tree");
                oTree.setTitle("Explorer");
                oTree.setWidth("100%");
                oTree.setHeight("auto");
                oTree.setShowHeaderIcons(true);
                oTree.setShowHorizontalScrollbar(false);

                var oNode1 = new sapui6.ui.commons.TreeNode({text:"Computer", key:"computer", expanded: true});
                var oNode2 = new sapui6.ui.commons.TreeNode({text:"OSDisk (C:)", key:"disk", expanded: true});
                var oNode3 = new sapui6.ui.commons.TreeNode({text:"Program Files", key:"program_files", showCheckBox:true, checked:true});
                var oNode4 = new sapui6.ui.commons.TreeNode({text:"Windows", key:"windows", showCheckBox:true});
                var oNode5 = new sapui6.ui.commons.TreeNode({text:"Data", key:"data", showCheckBox:true});
                var oNode6 = new sapui6.ui.commons.TreeNode({text:"Util", key:"util", showCheckBox:true});
                var oNode7 = new sapui6.ui.commons.TreeNode({text:"Mass Storage (USB)", key:"usb"});
                var oNode8 = new sapui6.ui.commons.TreeNode({text:"Network", key:"network"});

                oNode1.addNode(oNode2);
                oNode1.addNode(oNode7);

                oNode2.addNode(oNode3);
                oNode2.addNode(oNode4);
                oNode2.addNode(oNode5);
                oNode2.addNode(oNode6);

                oTree.addNode(oNode1);
                oTree.addNode(oNode8);

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oTree);
                oLayout.addContent(
                        new sap.ui.commons.Button({
                                text:"CheckedNodes Count", 
                                press:function(){
                                        alert("CheckedNodes Count : " + oTree.getCheckedNodes().length);
                                }
                        })
                );

                return oLayout;
	}
});