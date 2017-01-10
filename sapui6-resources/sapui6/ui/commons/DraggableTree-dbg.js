jQuery.sap.declare("sapui6.ui.commons.DraggableTree");
jQuery.sap.require("sap.ui.commons.Tree");

sap.ui.commons.Tree.extend("sapui6.ui.commons.DraggableTree", { 
	library : "sapui6.ui.commons",
    metadata : {     
    	 properties : {
    	 	draggable : {type:"boolean", defaultValue:true},
    	 	showContextmenu :{type:"boolean", defaultValue:true}
    	 }
    },

    bFirstNodeRendered : false,
    _checkedNodes : [],
    _dropContextMenu : null,
    _contextMenu : null,
    _dragId : "",
    _dropId : "",
    _dropNode : null,
    _selectNode : null,
    _copyNode : null,
    _copyTreeNode : null,

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

sapui6.ui.commons.DraggableTree.prototype.renderNode = function(oRenderManager, oNode, iLevel, iSize, iPos){
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

	if(this.getDraggable() && this.isSupportDraggable()){
		rm.addStyle("width","initial !important");
		rm.addStyle("display","inline");
		rm.writeStyles();
		rm.writeAttribute("draggable", "true");
		rm.writeAttribute("ondragstart", "sap.ui.getCore().byId('" + this.getId() + "').drag(event);");
		rm.writeAttribute("ondrop", "sap.ui.getCore().byId('" + this.getId() + "').drop(event);");
		rm.writeAttribute("ondragover", "sap.ui.getCore().byId('" + this.getId() + "').allowDrop(event);");
	}

	if(this.getShowContextmenu()) {
		rm.writeAttribute("oncontextmenu", "sap.ui.getCore().byId('" + this.getId() + "')._showContextMenu(event);return false;");
	}

	rm.write(">");  

	if(oNode.getShowCheckBox()){
		if(oNode.getChecked()) rm.write('<input type="checkbox" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\')._checkNode(this,\'' + oNode.getId() + '\')" checked>');
		else rm.write('<input type="checkbox" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\')._checkNode(this,\'' + oNode.getId() + '\')">');
	}


	if(oNode.getIcon()){
		rm.writeIcon(oNode.getIcon(), "sapUiTreeIcon");
	}

	rm.writeEscaped( oNode.getText());


	rm.write("</span>"); 

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

sapui6.ui.commons.DraggableTree.prototype._createDropContextMenu = function(){
	var that = this;
	jQuery.sap.require("sap.ui.unified.Menu");
	this._dropContextMenu = new sap.ui.unified.Menu();
	this._dropContextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Move to above of current node",
        icon:"sap-icon://arrow-top",
        select:function(oEvent) {
            that._changeTree(that._dragId, that._dropId, "top");
            $(that._dropNode).css("border","");
            that._dropNode = null;
        }
    }));

    this._dropContextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Move to below of current node",
        icon:"sap-icon://arrow-bottom",
        select:function(oEvent) {
           that._changeTree(that._dragId, that._dropId, "bottom");
           $(that._dropNode).css("border","");
            that._dropNode = null;
        }
    }));

    this._dropContextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Move to sub of current node",
        icon:"sap-icon://open-command-field",
        select:function(oEvent) {
            that._changeTree(that._dragId, that._dropId, "child");
            $(that._dropNode).css("border","");
            that._dropNode = null;
        }
    }));
};

sapui6.ui.commons.DraggableTree.prototype._createContextMenu = function(){
	var that = this;
	jQuery.sap.require("sap.ui.unified.Menu");
	this._contextMenu = new sap.ui.unified.Menu();
	this._contextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Copy",
        icon:"sap-icon://value-help",
        select:function(oEvent) {
        	that._copyTreeNode = sap.ui.getCore().byId($(that._selectNode).attr("id")).clone();
            that._copyNode = that._selectNode;
            that._selectNode = null;
        }
    }));

    this._contextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Cut",
        icon:"sap-icon://value-help",
        select:function(oEvent) {
            that._copyNode = that._selectNode;
            that._selectNode = null;
        }
    }));

    var bPaste = true;
    if(that._copyTreeNode == null && that._copyNode == null) bPaste = false;

	this._contextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Paste",
        icon:"sap-icon://duplicate",
        select:function(oEvent) {
        	if(that._copyTreeNode != null){
        		that._resetTreeNode2(that._copyTreeNode, $(that._selectNode).attr("id"), "child");
        	}else{
        		that._resetTreeNode($(that._copyNode).attr("id"), $(that._selectNode).attr("id"), "child");
        	}
            
            that._copyNode = null;
            that._selectNode = null;
            that._copyTreeNode = null;
        },
        enabled : bPaste
    }));

    this._contextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Delete current node",
        icon:"sap-icon://delete",
        select:function(oEvent) {
			that._removeTreeNode($(that._selectNode).attr("id"));
			that._selectNode = null;
        }
    }));

    var bChkDel = true;
    if(that.getCheckedNodes().length == 0) bChkDel = false;

    this._contextMenu.addItem(new sap.ui.unified.MenuItem({
        text:"Delete checked nodes",
        icon:"sap-icon://delete",
        select:function(oEvent) {
        	var checkedNodes = that.getCheckedNodes();
        	var length = checkedNodes.length;
        	for(var i=0 ; i<length ; i++) that._removeTreeNode(checkedNodes[i].getId());
        },
        enabled : bChkDel
    }));
	
};

sapui6.ui.commons.DraggableTree.prototype._showContextMenu = function(e){
	// if(this._contextMenu == null) this._createContextMenu();
	this._createContextMenu();
	var obj = e.target;
	var li = obj
	while(li.tagName != "LI"){
		li = li.parentNode;
	}

	this._selectNode = li;

	var eDock = sap.ui.core.Popup.Dock;
    this._contextMenu.open(false, obj, eDock.BeginTop, eDock.EndCenter, obj, "2px -10px");
};

sapui6.ui.commons.DraggableTree.prototype._showDropPosition = function(e){
	if(this._dragId == this._dropId) return;
	if(this._dropContextMenu == null) this._createDropContextMenu();
	
	var obj = e.target;
	if(this._dropNode != null) $(this._dropNode).css("border","");
	this._dropNode = obj;

	$(obj).css("border","1px solid red");

    var eDock = sap.ui.core.Popup.Dock;
    this._dropContextMenu.open(false, obj, eDock.BeginTop, eDock.EndCenter, obj, "2px -10px");
};


sapui6.ui.commons.DraggableTree.prototype._hideDropPosition = function(e){
	this._dropContextMenu.close();
};

sapui6.ui.commons.DraggableTree.prototype.drag = function(e){
	var obj = e.target;
	while(obj.tagName != "LI"){
		obj = obj.parentNode;
	}

	e.dataTransfer.setData("text",obj.getAttribute("id"));
};

sapui6.ui.commons.DraggableTree.prototype.drop = function(e){
	var obj = e.target;
	while(obj.tagName != "LI"){
		obj = obj.parentNode;
	}

    e.preventDefault();
    
    this._dragId = e.dataTransfer.getData("text");
    this._dropId = obj.getAttribute("id");

	this._showDropPosition(e);
};


sapui6.ui.commons.DraggableTree.prototype.allowDrop = function(e){
	e.preventDefault();
};

sapui6.ui.commons.DraggableTree.prototype.isSupportDraggable = function(){
    if('draggable' in document.createElement('span')) {
        return true;
    }
    return false;
};

sapui6.ui.commons.DraggableTree.prototype._changeTree = function(dragId, dropId, loc){
	this._resetTreeNode(dragId, dropId, loc);
};

sapui6.ui.commons.DraggableTree.prototype._resetTreeNode = function(dragId, dropId, location){
	var dragNode = sap.ui.getCore().byId(dragId);

	this._changeTreeNode(dragNode, dropId, location);
};

sapui6.ui.commons.DraggableTree.prototype._resetTreeNode2 = function(copyNode, dropId, location){
	this._changeTreeNode(copyNode, dropId, location);
};

sapui6.ui.commons.DraggableTree.prototype._changeTreeNode = function(cNode, dropId, location){
	var dragNode = cNode;

	//this.removeNode(sap.ui.getCore().byId(dragId));

	var replaceNode = function(node){
		var nodes = node.getNodes();
		var length = nodes.length;
		for(var i=0 ; i<length ; i++){
			if(nodes[i].getId() == dropId){
				if(location == "top"){
					node.insertNode(dragNode, i);
				}else if(location == "bottom"){
					node.insertNode(dragNode, i+1);
				}else if(location == "child"){
					nodes[i].addNode(dragNode);
				}
				break;
			}else{
				replaceNode(nodes[i]);
			}
		}
	};

	var length = this.getNodes().length;

	for(var i=0 ; i<length ; i++) {
		var node = this.getNodes()[i];

		if(node.getId() == dropId){
			if(location == "top"){
				this.insertNode(dragNode, i);
			}else if(location == "bottom"){
				this.insertNode(dragNode, i+1);
			}else if(location == "child"){
				node.addNode(dragNode);
			}
			break;
		}else{
			replaceNode(node);
		}
	}
};

sapui6.ui.commons.DraggableTree.prototype._removeTreeNode = function(sId){
	var removeNodeById = function(node){
		var nodes = node.getNodes();
		var length = nodes.length;
		for(var i=0 ; i<length ; i++){
			if(nodes[i].getId() == sId){
				node.removeNode(nodes[i]);
				break;
			}else{
				removeNodeById(nodes[i]);
			}
		}
	};

	var length = this.getNodes().length;

	for(var i=0 ; i<length ; i++) {
		var node = this.getNodes()[i];

		if(node.getId() == sId){
			this.removeNode(node);
		}else{
			removeNodeById(node);
			break;
		}
	}
};

sapui6.ui.commons.DraggableTree.prototype._checkNode = function(obj, nodeId){
	if(obj.checked){
		sap.ui.getCore().byId(nodeId).setChecked(true);
	}else{
		sap.ui.getCore().byId(nodeId).setChecked(false);
	}
};

sapui6.ui.commons.DraggableTree.prototype.getCheckedNodes = function(){
	this._checkedNodes = [];
	var that = this;
	this.getNodes().forEach(function(node){
		if(node.getChecked()) that._checkedNodes.push(node);
		that._getCheckedSubNodes(node);
	});

	return this._checkedNodes;
};

sapui6.ui.commons.DraggableTree.prototype._getCheckedSubNodes = function(node){
	var that = this;
	node.getNodes().forEach(function(subNode){
		if(subNode.getChecked()) that._checkedNodes.push(subNode);
		that._getCheckedSubNodes(subNode); 
	});
};

sap.ui.commons.TreeNode.extend("sapui6.ui.commons.DraggableTreeNode", { metadata : {
	library : "sapui6.ui.commons",
	properties : {
		"key" : {type : "string", defaultValue : null},
		"showCheckBox" : {type : "boolean", defaultValue : false},
		"checked" : {type : "boolean", defaultValue : false}
	}
}});