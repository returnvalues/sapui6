jQuery.sap.declare("sapui6.ui.commons.Tree");
jQuery.sap.require("sap.ui.commons.Tree");

sap.ui.commons.Tree.extend("sapui6.ui.commons.Tree", { 
    metadata : {     
    	library : "sapui6.ui.commons"
    },

    bFirstNodeRendered : false,
    _checkedNodes : [],

  	renderer : function(oRenderManager, oTree){

  		var rm = oRenderManager;

		//First node get is focusable.
		oTree.bFirstNodeRendered = false;

		rm.write("<div");
		rm.writeControlData(oTree);
		rm.addClass("sapUiTree");

		if(oTree.getHeight() != "" && oTree.getHeight() != "auto"){
			rm.addClass("sapUiTreeFixedHeight");
		}
		if(!oTree.getShowHeader()){
			rm.addClass("sapUiTreeTransparent");
		}
		rm.writeClasses();

		rm.addStyle("width", oTree.getWidth() || "auto");
		rm.addStyle("height", oTree.getHeight());
		rm.addStyle("min-width", oTree.getMinWidth());

		rm.writeStyles();

		//ARIA
		rm.writeAttribute('role', 'tree');
		rm.write(">");

		if(oTree.getShowHeader()){

			rm.write("<div id=\""+ oTree.getId() +"-Header\" class=\"sapUiTreeHeader\""); //Header
			rm.writeAttribute('role', 'heading');
			rm.write(">");

			//Title
			rm.write("<div class='sapUiTreeTitle'");

			if(oTree.getTooltip_AsString()){
				rm.writeAttributeEscaped( "title", oTree.getTooltip_AsString());//Tree tooltip
			}
			rm.write(">");
			rm.writeEscaped(oTree.getTitle());
			rm.write("</div>");


			if(oTree.getShowHeaderIcons()){
				rm.write("<div id='"+oTree.getId()+"-TBCont' class='sapUiTreeTbCont'"); //ToolbarContainer
				rm.writeAttribute('role', 'toolbar');
				rm.write(">");
				rm.renderControl(oTree.oCollapseAllButton);
				rm.renderControl(oTree.oExpandAllButton );

				rm.write("</div>");
			}


			rm.write("</div>");//End of Header
		}

		rm.write("<div id=\""+ oTree.getId() +"-TreeCont\""); //tree container


		rm.addClass("sapUiTreeCont");
		var showScroll = oTree.getShowHorizontalScrollbar();
		if(showScroll){
			rm.addClass("sapUiTreeContScroll");
		}else{
			rm.addClass("sapUiTreeContNoScroll");
		}
		rm.writeClasses();

		rm.write(">");

		// write the HTML into the render manager
		rm.write("<ul class=\"sapUiTreeList\">");

		var aNodes = oTree.getNodes();
		 for(var i=0;i<aNodes.length;i++){
		   oTree.renderNode(rm, aNodes[i], 1, aNodes.length, i + 1);
		}

		rm.write("</ul>");
		rm.write("</div>");//Tree Container
		rm.write("</div>");//Tree
  	}
});

sapui6.ui.commons.Tree.prototype.renderNode = function(oRenderManager, oNode, iLevel, iSize, iPos){
	// convenience variable
	var rm = oRenderManager;
	var bExpanded;

	// write the HTML into the render manager
	rm.write("<li");
	rm.writeElementData(oNode);
	rm.addClass("sapUiTreeNode");

	if(oNode.getExpanded() && (oNode.getHasExpander() || oNode.hasChildren() )){
		rm.addClass("sapUiTreeNodeExpanded");
		bExpanded = true;
	}
	else if(!oNode.getExpanded() && (oNode.getHasExpander() || oNode.hasChildren() )){

		rm.addClass("sapUiTreeNodeCollapsed");
		bExpanded = false;
	}

	if(oNode.getSelectable() && oNode.getIsSelected()){
		rm.addClass("sapUiTreeNodeSelected");
		rm.writeAttribute('aria-selected', 'true');
	}

	if(! bExpanded && oNode.hasSelectedHiddenChild()){
		rm.addClass("sapUiTreeNodeSelectedParent");
		rm.writeAttribute('aria-selected', 'true');
	}

	rm.writeClasses(oNode);

	//ARIA
	var mProps = {role: 'treeitem', level: iLevel, setsize: iSize, posinset: iPos,};

	if(bExpanded){
		mProps["expanded"] = true;
	}
	else{
		// don't write aria expanded attribute if a node has no children
		// if a node has an expander we assume that it also has children
		if (oNode.getHasExpander()) {
			mProps["expanded"] = false;
		}
	}

	rm.writeAccessibilityState(oNode, mProps);

	//Tooltip
	rm.writeAttributeEscaped( "title", oNode.getTooltip_AsString());
	
	if(!this.bFirstNodeRendered){
		rm.write("tabindex='0'");
		this.bFirstNodeRendered = true;
	}
	rm.write(">");

	rm.write("<span");  //Node Content

	rm.addClass("sapUiTreeNodeContent");
	if(!oNode.getSelectable()){
		rm.addClass("sapUiTreeNodeNotSelectable");
	}
	rm.writeClasses();

	rm.write(">");  //Node Content

	if(oNode.getShowCheckBox()){
		if(oNode.getChecked()) rm.write('<input type="checkbox" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\')._checkNode(this,\'' + oNode.getId() + '\')" checked>');
		else rm.write('<input type="checkbox" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\')._checkNode(this,\'' + oNode.getId() + '\')">');
	}

	if(oNode.getIcon()){
		rm.writeIcon(oNode.getIcon(), "sapUiTreeIcon");
	}

	rm.writeEscaped( oNode.getText());


	rm.write("</span>"); //Node Content

	rm.write("</li>");

	if(oNode.getNodes()){
		var aSubNodes = oNode.getNodes();
		rm.write("<ul");

		rm.writeAttribute("id", oNode.getId() + "-children");

		rm.addClass("sapUiTreeChildrenNodes");
		if(!bExpanded){
			rm.addClass("sapUiTreeHiddenChildrenNodes");
		}
		else{
			rm.writeAttribute("style", "display: block;");//For animation sake
		}
		rm.writeClasses();
	
		rm.write(">");
		iLevel ++;
		for(var i=0;i<aSubNodes.length;i++){
			this.renderNode(rm, aSubNodes[i], iLevel, aSubNodes.length, i + 1);
		}
		rm.write("</ul>");
	}
};

sapui6.ui.commons.Tree.prototype._checkNode = function(obj, nodeId){
	if(obj.checked){
		sap.ui.getCore().byId(nodeId).setChecked(true);
	}else{
		sap.ui.getCore().byId(nodeId).setChecked(false);
	}
};

sapui6.ui.commons.Tree.prototype.getCheckedNodes = function(){
	this._checkedNodes = [];
	var that = this;
	this.getNodes().forEach(function(node){
		if(node.getChecked()) that._checkedNodes.push(node);
		that._getCheckedSubNodes(node);
	});

	return this._checkedNodes;
};

sapui6.ui.commons.Tree.prototype._getCheckedSubNodes = function(node){
	var that = this;
	node.getNodes().forEach(function(subNode){
		if(subNode.getChecked()) that._checkedNodes.push(subNode);
		that._getCheckedSubNodes(subNode); 
	});
};

sap.ui.commons.TreeNode.extend("sapui6.ui.commons.TreeNode", { metadata : {
	library : "sapui6.ui.commons",
	properties : {
		"key" : {type : "string", defaultValue : null},
		"showCheckBox" : {type : "boolean", defaultValue : false},
		"checked" : {type : "boolean", defaultValue : false}
	}
}});