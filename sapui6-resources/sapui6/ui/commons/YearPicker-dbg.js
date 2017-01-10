jQuery.sap.declare("sapui6.ui.commons.YearPicker");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.YearPicker", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

    yearPopup : null,
    yearBox : null,

  	renderer : {},

  	onBeforeRendering : function(){
  		this.setIconURL("sap-icon://calendar");
  		this.setWidth(this.getWidth());
  		this.attachValueHelpRequest(this.open);
  	},

  	onAfterRendering : function(){
  		this.attachBrowserEvent("keypress",function(e){
            if(window.event) event.preventDefault();
            else e.preventDefault();
        });

        this.attachBrowserEvent("contextmenu",function(e){
            if(window.event) event.returnValue = false; 
            else e.preventDefault();
        });
  	}
});

sapui6.ui.commons.YearPicker.prototype.open = function(oEvent){
	var date = new Date();
	var year = date.getFullYear();

	if(this.getValue() != "") year = this.getValue();

	if(this.monthPopup == null){
		var that = this;
		this.yearBox = new sapui6.ui.commons.YearBox({
			year : year,
			select : function(){
				that.setValue(that.yearBox.getYear());
				that.monthPopup.close();
			}
		});

		jQuery.sap.require("sap.ui.core.Popup");
		this.yearPopup = new sap.ui.core.Popup();
		this.yearPopup.setContent(this.yearBox);
		this.yearPopup.setShadow(true);
		this.yearPopup.setAutoClose(true);
		this.yearPopup.setAutoCloseAreas([this.getDomRef()]);
		this.yearPopup.setDurations(0, 0); // no animations
		this.yearPopup.setInitialFocusId(this.getId()+"-input");
	}

	$("#"+this.getId()+"-input").blur((function(){
		this.yearPopup.close();
	}).bind(this));

	this.yearBox.setYear(year);

	var eDock = sap.ui.core.Popup.Dock;
	this.yearPopup.open(10, eDock.BeginTop, eDock.BeginBottom, this.getDomRef(), null, null, true);
};

sapui6.ui.commons.YearPicker.prototype.exit = function(){
	if(this.yearBox != null) this.yearBox.destroy();
	if(this.yearPopup != null) this.yearPopup.exit();
};

jQuery.sap.declare("sapui6.ui.commons.YearBox");

sap.ui.core.Control.extend("sapui6.ui.commons.YearBox", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
        	"year" : {type : "string", defaultValue : ""}
		},

		events : {
			"select" : {}
		}
    },

  	renderer : function(oRm, oControl){
  		var year = parseInt(oControl.getYear());
  		oRm.write('<div');
  		oRm.writeControlData(oControl);
  		oRm.addClass("sapui6_mypicker");
		oRm.writeClasses();
		oRm.write('>');
		oRm.write('	<div class="head">');
		oRm.write('		<div class="prev" onmousedown="javascript:sap.ui.getCore().byId(\''+ oControl.getId() + '\').prev(event);"></div>');
		oRm.write('		<div class="title"');
		oRm.writeAttribute("id", oControl.getId() + '-year');
		oRm.write('		>');
		oRm.writeEscaped(oControl.getYear());
		oRm.write('		</div>');
		oRm.write('		<div class="next" onmousedown="javascript:sap.ui.getCore().byId(\''+ oControl.getId() + '\').next(event);"></div>');
		oRm.write('	</div>');
		oRm.write('	<table class="body" onmousedown="javascript:sap.ui.getCore().byId(\''+ oControl.getId() + '\').select(event);">');
		oRm.write('		<tbody">');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-year="' + String(year-4) + '">' + String(year-4) + '</td>');
		oRm.write('				<td data-year="' + String(year-3) + '">' + String(year-3) + '</td>');
		oRm.write('				<td data-year="' + String(year-2) + '">' + String(year-2) + '</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-year="' + String(year-1) + '">' + String(year-1) + '</td>');
		oRm.write('				<td data-year="' + String(year) + '" class="active">' + String(year) + '</td>');
		oRm.write('				<td data-year="' + String(year+1) + '">' + String(year+1) + '</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-year="' + String(year+2) + '">' + String(year+2) + '</td>');
		oRm.write('				<td data-year="' + String(year+3) + '">' + String(year+3) + '</td>');
		oRm.write('				<td data-year="' + String(year+4) + '">' + String(year+4) + '</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-year="' + String(year+5) + '">' + String(year+5) + '</td>');
		oRm.write('				<td data-year="' + String(year+6) + '">' + String(year+6) + '</td>');
		oRm.write('				<td data-year="' + String(year+7) + '">' + String(year+7) + '</td>');
		oRm.write('			</tr>');
		oRm.write('		</tbody">');
		oRm.write('	<table">');
		oRm.write('</div">');
    }
});

sapui6.ui.commons.YearBox.M_EVENTS = {'select':'select'};

sapui6.ui.commons.YearBox.prototype.init = function () {
	this.allowTextSelection(false);
};

sapui6.ui.commons.YearBox.prototype.select = function(oEvent){
	var obj = oEvent.target;
	if(obj.tagName == "TD") {
		var year = $(obj).attr("data-year");
		this.setProperty("year", year, true);
		this.fireSelect();
		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
};

sapui6.ui.commons.YearBox.prototype.prev = function(oEvent){
	var year = parseInt(this.getYear());
	$("#"+this.getId() +" table td").each(function(){
		$(this).text(parseInt($(this).text())-6);
		$(this).attr("data-year",parseInt($(this).attr("data-year"))-6);
		if(year == parseInt($(this).attr("data-year"))) $(this).addClass("active");
		else $(this).removeClass("active");
	});

	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sapui6.ui.commons.YearBox.prototype.next = function(oEvent){
	var year = parseInt(this.getYear());
	$("#"+this.getId() +" table td").each(function(){
		$(this).text(parseInt($(this).text())+6);
		$(this).attr("data-year",parseInt($(this).attr("data-year"))+6);
		if(year == parseInt($(this).attr("data-year"))) $(this).addClass("active");
		else $(this).removeClass("active");
	});

	oEvent.preventDefault();
	oEvent.stopPropagation();
};