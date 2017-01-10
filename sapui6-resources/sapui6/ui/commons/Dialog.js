jQuery.sap.declare("sapui6.ui.commons.Dialog");
jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.require("sap.ui.commons.Dialog");

sap.ui.commons.Dialog.extend("sapui6.ui.commons.Dialog", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			showMaximizeButton: { type: "boolean", group: "Behavior", defaultValue: true},
			showMinimizeButton: { type: "boolean", group: "Behavior", defaultValue: true},
			minimizeWidth: {type:"int", defaultValue: 300}
		},
		events : {
            "minimize" : {parameters:{bMinimize:{type:"boolean"}}},
            "maximize" : {parameters:{bMaximize:{type:"boolean"}}}
        }
    },

    _bWidth:"90%",
    _bHeight:"90%",
    _minimize:false,
    _maximize:false,
    _left:1,
    _bottom:1,
    _minimize_order:0,

  	renderer : function(rm, oControl){
  		var heightSet = oControl._isSizeSet(oControl.getHeight());
		var widthSet = oControl._isSizeSet(oControl.getWidth());

		if(oControl.getHeight() == "100%" && oControl.getWidth() == "100%") oControl._maximize = true;

		var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");

		oControl.getScrollTop();  // Update the scroll position properties
		oControl.getScrollLeft();

		var aButtons = oControl.getButtons();
		var iButtonCount = aButtons.length;


		// Root element and classes/styles
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("sapUiDlg");
		if (oControl.getModal()) {
			rm.addClass("sapUiDlgModal");
		}
		rm.addClass("sapUiDlgContentBorderDesign" + oControl.getContentBorderDesign());

		rm.addStyle("width", oControl.getWidth());
		rm.addStyle("height", oControl.getHeight());
		rm.addStyle("min-width", oControl.getMinWidth());
		rm.addStyle("min-height", oControl.getMinHeight());
		rm.addStyle("max-width", oControl.getMaxWidth());
		rm.addStyle("max-height", oControl.getMaxHeight());
		// Do not display the dialog content directly after rerendering, since it might just be
		// rendered inside the static area, whithout being in a popup
		rm.addStyle("display", "none");


		if(oControl._minimize){
			rm.addStyle("bottom",oControl._bottom+"px !important");
			rm.addStyle("left",oControl._left+"px !important");
		}

		if(oControl._maximize){
			rm.addStyle("top","0px !important");
			rm.addStyle("left","0px !important");
		}

		if (!heightSet) {
			rm.addClass("sapUiDlgFlexHeight");
		}
		if (!widthSet) {
			rm.addClass("sapUiDlgFlexWidth");
		}
		if (iButtonCount == 0) {
			rm.addClass("sapUiDlgNoButtons");
		}
		if (!oControl.getApplyContentPadding()) {
			rm.addClass("sapUiDlgNoPad");
		}
		rm.writeClasses();
		rm.writeStyles();

		rm.writeAttribute("is-neptune-dlg","true");
		rm.writeAttribute("neptune-minimize-order",oControl._minimize_order);
		rm.writeAttribute("aria-labelledby", oControl.getId() + "-lbl " + oControl.getId() + "-acc");
		rm.writeAttribute("role", oControl.getAccessibleRole().toLowerCase());
		rm.writeAttribute("tabindex", "-1");
		rm.write("><span style='display:none;' id='", oControl.getId(), "-acc'>", rb.getText("DIALOG_CLOSE_HELP"), "</span>");

		// Header
		rm.write("<span id='" + oControl.getId() + "-fhfe' tabIndex='0'></span><div id='" + oControl.getId() + "-hdr' class='sapUiDlgHdr'>");
		rm.write("<span class='sapUiDlgHdrLeft' id='" + oControl.getId() + "-hdrL'");

		if(oControl._minimize) {
			rm.addStyle("padding-right","60px !important");
			rm.writeStyles();
		}

		rm.write(">");

		// Header label
		var title = oControl.getTitle();
		rm.write("<span id='" + oControl.getId() + "-lbl' class='sapUiDlgLabel'");

		rm.writeAttribute("role", "heading");
		rm.writeAttribute("aria-level", "1");
		if (title) {
			rm.writeAttributeEscaped("title", title);
		}

		rm.write(">");

		if (!title) {
			rm.write("&nbsp;");
		} else {
			rm.writeEscaped(title);
		}
		rm.write("</span></span>");
		rm.write("<span id='", oControl.getId(), "-hdrR' class='sapUiDlgHdrBtns'>");
		// Example for an additional button:   rm.write("<a class='sapUiDlgOptBtn'></a>");

		
		if (oControl.getShowMinimizeButton()){
			if(oControl._minimize){
				rm.write("<a id='", oControl.getId(), "-prevsize' class='sapUiDlgCloseBtn sapUiDlgPrevsizeBtn' href='javascript:void(0)'");
				rm.write(" tabIndex='-1'"); 
				rm.writeAttribute("role","button");
				rm.writeAttributeEscaped("aria-label", "Previous Size");
				rm.writeAttributeEscaped("title", "Previous Size");
				rm.write("></a>");
			}else{
				rm.write("<a id='", oControl.getId(), "-minimize' class='sapUiDlgCloseBtn sapUiDlgMinimizeBtn' href='javascript:void(0)'");
				rm.write(" tabIndex='-1'"); 
				rm.writeAttribute("role","button");
				rm.writeAttributeEscaped("aria-label", "Minimize");
				rm.writeAttributeEscaped("title", "Minimize");
				rm.write("></a>");
			}
			
		}

		if (oControl.getShowMaximizeButton()){
			if(oControl._maximize){
				rm.write("<a id='", oControl.getId(), "-prevsize' class='sapUiDlgCloseBtn sapUiDlgPrevsizeBtn' href='javascript:void(0)'");
				rm.write(" tabIndex='-1'"); 
				rm.writeAttribute("role","button");
				rm.writeAttributeEscaped("aria-label", "Previous Size");
				rm.writeAttributeEscaped("title", "Previous Size");
				rm.write("></a>");
			}else{
				rm.write("<a id='", oControl.getId(), "-maximize' class='sapUiDlgCloseBtn sapUiDlgMaximizeBtn' href='javascript:void(0)'");
				rm.write(" tabIndex='-1'"); 
				rm.writeAttribute("role","button");
				rm.writeAttributeEscaped("aria-label", "Maximize");
				rm.writeAttributeEscaped("title", "Maximize");
				rm.write("></a>");
			}
			
		}

		if (oControl.getShowCloseButton()) {
			rm.write("<a id='", oControl.getId(), "-close' class='sapUiDlgCloseBtn' href='javascript:void(0)'");
			rm.write(" tabIndex='-1'"); // according to accessibility experts (O.K. and M.J.), the 'x' should not be tab-able
			rm.writeAttribute("role","button");
			rm.writeAttributeEscaped("aria-label", rb.getText("DIALOG_CLOSE_HELP"));
			rm.writeAttributeEscaped("title", rb.getText("DIALOG_CLOSE_TEXT"));
			rm.write("></a>");
		}

		rm.write("</span></div>");

		// 	Header separator
		rm.write('<div class="sapUiDlgHdrSep"></div>');

		// Content area
		rm.write("<div class='sapUiDlgCont' id='", oControl.getId(), "-cont' tabindex=\"-1\"");
		if(oControl._minimize){
			rm.addStyle("display","none");
			rm.writeStyles();
		}

		rm.write(">");




		// Content
		var aChildren = oControl.getContent();
		for (var i = 0; i < aChildren.length; i++) {
			rm.renderControl(aChildren[i]);
		}
		rm.write("</div>");

		// Footer separator
		if (iButtonCount > 0) {
			rm.write('<div class="sapUiDlgFooterSep"></div>');
		}

		// Footer
		rm.write("<div id='");
		rm.write(oControl.getId());
		rm.write("-footer' class='sapUiDlgFooter'");
		if(oControl._minimize){
			rm.addStyle("display","none");
			rm.writeStyles();
		}
		rm.write(">");

		// Wave and Buttons
		rm.write("<div class='sapUiDlgBtns'>");
		for (var i = 0; i < iButtonCount; i++) {
			rm.renderControl(aButtons[i]);
		}
		rm.write("</div><div class='sapUiDlgWave'></div></div>");

		// Grip
		if (oControl.getResizable()) {
			rm.write("<span id='");
			rm.write(oControl.getId());
			rm.write("-grip' class='sapUiDlgGrip'>&#916;</span>");
		}

		// End of Dialog
		rm.write("<span id='" + oControl.getId() + "-fhee' tabIndex='0'></span></div>");

		var that = oControl;
		$(window).resize(function(){
            jQuery.sap.delayedCall(300, that, function() {
                that._resizeMinimizeDialog();
            });
        });

        sap.ui.Device.orientation.attachHandler(function(){
        	jQuery.sap.delayedCall(300, that, function() {
                that._resizeMinimizeDialog();
            });
        });
    }
});

sapui6.ui.commons.Dialog.prototype.onclick = function (oEvent) {
	var sCloseBtnId = this.getId() + "-close";
	if (oEvent.target.id === sCloseBtnId) {
		this.close();
		this.executePreviousSize();
		oEvent.preventDefault(); // avoid onbeforeunload event which happens at least in IE9 because of the javascript:void(0); link target
	}

	var sMinimizeBtnId = this.getId() + "-minimize";
	if (oEvent.target.id === sMinimizeBtnId) {
		this.executeMinimize();			

		oEvent.preventDefault(); // avoid onbeforeunload event which happens at least in IE9 because of the javascript:void(0); link target
	}	

	var sMaximizeBtnId = this.getId() + "-maximize";
	if (oEvent.target.id === sMaximizeBtnId) {
		this.executeMaximize();

		oEvent.preventDefault(); // avoid onbeforeunload event which happens at least in IE9 because of the javascript:void(0); link target
	}

	var sPrevsizeBtnId = this.getId() + "-prevsize";
	if (oEvent.target.id === sPrevsizeBtnId) {
		this.executePreviousSize();

		oEvent.preventDefault(); // avoid onbeforeunload event which happens at least in IE9 because of the javascript:void(0); link target
	}	

	return false;
};

sapui6.ui.commons.Dialog.prototype.reOpen = function(){
	if(this._minimize) this.executePreviousSize();
};

sapui6.ui.commons.Dialog.prototype.isMinimize = function(){
	return this._minimize;
};

sapui6.ui.commons.Dialog.prototype.isMaximize = function(){
	return this._maximize;
};

sapui6.ui.commons.Dialog.prototype.executeMinimize = function(){
	var elem = document.getElementById(this.getId()).getBoundingClientRect();
		
	if(!this._minimize){
		if(!this._maximize){
			this._bHeight = elem.height + "px";
			this._bWidth = elem.width + "px";	
		}
		
		this._minimize = true;
		this._maximize = false;

		this.fireMinimize({bMinimize:true});

		var w = document.documentElement.clientWidth || document.body.clientWidth;
		var dlg = document.querySelectorAll('.sapUiDlg[is-neptune-dlg="true"]');
		var cnt = 0;
		var col = parseInt((w-1)/this.getMinimizeWidth(),10);

		if(dlg != undefined){
			for(var i=0 ; i<dlg.length ; i++){
				var oDlg = sap.ui.getCore().byId(dlg[i].getAttribute("id"));
				if(oDlg.isMinimize()) cnt++;
			}	
		}

		var left = ((cnt-1)*this.getMinimizeWidth()) + 1;
		var row = parseInt((cnt-1)/col,10);

		if(row > 0){
			var h = document.getElementById(this.getId()+"-hdr").getBoundingClientRect().height;
			var l = (left+this.getMinimizeWidth()) - (w*row);
			l = parseInt((l/this.getMinimizeWidth()),10);

			this._bottom = (h*row)+1;
			this._left =  ((l*this.getMinimizeWidth())+1);
		}else{
			this._bottom = 1;
			this._left = ((cnt-1)*this.getMinimizeWidth()) + 1;
		}
		
		this._minimize_order = cnt;

		this.setHeight(document.getElementById(this.getId()+"-hdr").getBoundingClientRect().height +"px");
		this.setWidth(this.getMinimizeWidth()+"px");
	}
};

sapui6.ui.commons.Dialog.prototype.executeMaximize = function(){
	var elem = document.getElementById(this.getId()).getBoundingClientRect();

	if(!this._minimize){
		this._bHeight = elem.height + "px";
		this._bWidth = elem.width + "px";		
	}

	this._maximize = true;
	this._minimize = false;

	this._reorderMinimizeDialog();
	
	this._minimize_order = 0;

	this.fireMaximize({bMaximize:true});

	this.setHeight("100%");
	this.setWidth("100%");	
};

sapui6.ui.commons.Dialog.prototype.executePreviousSize = function(){
	var elem = document.getElementById(this.getId()).getBoundingClientRect();

	this._maximize = false;
	this._minimize = false;

	this._reorderMinimizeDialog();

	this._minimize_order = 0;

	// this.fireMaximize({bMaximize:false});
	this.setHeight(this._bHeight);
	this.setWidth(this._bWidth);
};

sapui6.ui.commons.Dialog.prototype._reorderMinimizeDialog = function(){
	if(this._minimize_order > 0){
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		var col = parseInt((w-1)/this.getMinimizeWidth(),10);
		var dlg = document.querySelectorAll('.sapUiDlg[is-neptune-dlg="true"]');
		if(dlg != undefined){
			for(var i=0 ; i<dlg.length ; i++){
				var oDlg = sap.ui.getCore().byId(dlg[i].getAttribute("id"));
				var order = parseInt(dlg[i].getAttribute("neptune-minimize-order"));
				if(oDlg.isMinimize()) {
					if(order > 0 && order > this._minimize_order){
						var left = (((order-2)*this.getMinimizeWidth())+1);
						var row = parseInt((order-2)/col,10);

						if(row > 0){
							var h = document.getElementById(this.getId()+"-hdr").getBoundingClientRect().height;
							var l = (left+this.getMinimizeWidth()) - (w*row);
							l = parseInt((l/this.getMinimizeWidth()),10);

							dlg[i].style.bottom = ((h*row)+1) + "px";
							dlg[i].style.left = ((l*this.getMinimizeWidth())+1) + "px";

						}else{
							dlg[i].style.bottom = "1px";
							dlg[i].style.left = left + "px";
						}
						
						dlg[i].setAttribute("neptune-minimize-order", (order-1));
						oDlg._minimize_order = (order-1);
					}
				}
			}
		}
	}
};

sapui6.ui.commons.Dialog.prototype._resizeMinimizeDialog = function(){
	var w = document.documentElement.clientWidth || document.body.clientWidth;
	var col = parseInt((w-1)/this.getMinimizeWidth(),10);
	var dlg = document.getElementById(this.getId());
	if(this.isMinimize()){
		var left = (((this._minimize_order-1)*this.getMinimizeWidth())+1);
		var row = parseInt((this._minimize_order-1)/col,10);

		if(row > 0){
			var h = document.getElementById(this.getId()+"-hdr").getBoundingClientRect().height;
			var l = (left+this.getMinimizeWidth()) - (w*row);
			l = parseInt((l/this.getMinimizeWidth()),10);

			dlg.style.bottom = ((h*row)+1) + "px";
			dlg.style.left = ((l*this.getMinimizeWidth())+1) + "px";

		}else{
			dlg.style.bottom = "1px";
			dlg.style.left = left + "px";
		}
	}
};

