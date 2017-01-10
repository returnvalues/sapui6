jQuery.sap.declare("sapui6.ui.commons.MonthPicker");
jQuery.sap.require("sap.ui.commons.ValueHelpField");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.MonthPicker", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"yyyymm" : {type : "string", defaultValue : ""},
			"format" : {type : "string", defaultValue : "MM.yyyy"},
			"janText" : {type : "string", defaultValue : "Jan"},
			"febText" : {type : "string", defaultValue : "Feb"},
			"marText" : {type : "string", defaultValue : "Mar"},
			"aprText" : {type : "string", defaultValue : "Apr"},
			"mayText" : {type : "string", defaultValue : "May"},
			"junText" : {type : "string", defaultValue : "Jun"},
			"julText" : {type : "string", defaultValue : "Jul"},
			"augText" : {type : "string", defaultValue : "Aug"},
			"sepText" : {type : "string", defaultValue : "Sep"},
			"octText" : {type : "string", defaultValue : "Oct"},
			"novText" : {type : "string", defaultValue : "Nov"},
			"decText" : {type : "string", defaultValue : "Dec"},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

    monthPopup : null,
    monthBox : null,

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

sapui6.ui.commons.MonthPicker.prototype.setYyyymm = function(sValue){
	var fv = "";
	var v = sValue;

	if(v && v.length == 6){
		fv = this.getFormat().replace("yyyy",v.substring(0,4));
		fv = fv.replace("MM",v.substring(4));
	}

	var oInput = this.getInputDomRef();
	if(oInput) oInput.value = fv;

	this.setProperty("value",fv, true);
	this.setProperty("yyyymm", sValue, true);
};

sapui6.ui.commons.MonthPicker.prototype.setValue = function(sValue){
	var fv = "";
	var v = sValue;

	if(v && v.length == 7){
		var yyyy = sValue.substring(this.getFormat().indexOf("yyyy"),this.getFormat().indexOf("yyyy")+4);
		var mm = sValue.substring(this.getFormat().indexOf("mm"),this.getFormat().indexOf("mm")+2);
		fv = String(yyyy) + String(mm);
	}

	this.setProperty("value",sValue, true);
	this.setProperty("yyyymm", fv, true);
};

sapui6.ui.commons.MonthPicker.prototype.open = function(oEvent){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;

	if(this.getValue() != ""){
		year = this.getValue().substr(this.getFormat().indexOf("yyyy"),4);
		month = this.getValue().substr(this.getFormat().indexOf("MM"),2);
	}

	if(this.monthPopup == null){
		var that = this;
		this.monthBox = new sapui6.ui.commons.MonthBox({
			year : year,
			month : month,
			janText : this.getJanText(),
			febText : this.getFebText(),
			marText : this.getMarText(),
			aprText : this.getAprText(),
			mayText : this.getMayText(),
			junText : this.getJunText(),
			julText : this.getJulText(),
			augText : this.getAugText(),
			sepText : this.getSepText(),
			octText : this.getOctText(),
			novText : this.getNovText(),
			decText : this.getDecText(),
			select : function(){
				that.setYyyymm(that.monthBox.getYyyymm());
				that.monthPopup.close();
			}
		});

		jQuery.sap.require("sap.ui.core.Popup");
		this.monthPopup = new sap.ui.core.Popup();
		this.monthPopup.setContent(this.monthBox);
		this.monthPopup.setShadow(true);
		this.monthPopup.setAutoClose(true);
		this.monthPopup.setAutoCloseAreas([this.getDomRef()]);
		this.monthPopup.setDurations(0, 0); // no animations
		this.monthPopup.setInitialFocusId(this.getId()+"-input");
	}

	$("#"+this.getId()+"-input").blur((function(){
		this.monthPopup.close();
	}).bind(this));

	this.monthBox.setYear(year);
	this.monthBox.setMonth(month);

	var eDock = sap.ui.core.Popup.Dock;
	this.monthPopup.open(10, eDock.BeginTop, eDock.BeginBottom, this.getDomRef(), null, null, true);
};

sapui6.ui.commons.MonthPicker.prototype.exit = function(){
	if(this.monthBox != null) this.monthBox.destroy();
	if(this.monthPopup != null) this.monthPopup.exit();
};

jQuery.sap.declare("sapui6.ui.commons.MonthBox");

sap.ui.core.Control.extend("sapui6.ui.commons.MonthBox", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
        	"year" : {type : "string", defaultValue : ""},
        	"month" : {type : "string", defaultValue : ""},
        	"format" : {type : "string", defaultValue : "MM.yyyy"},
        	"value" : {type : "string", defaultValue : ""},
        	"yyyymm" : {type : "string", defaultValue : ""},
			"janText" : {type : "string", defaultValue : "Jan"},
			"febText" : {type : "string", defaultValue : "Feb"},
			"marText" : {type : "string", defaultValue : "Mar"},
			"aprText" : {type : "string", defaultValue : "Apr"},
			"mayText" : {type : "string", defaultValue : "May"},
			"junText" : {type : "string", defaultValue : "Jun"},
			"julText" : {type : "string", defaultValue : "Jul"},
			"augText" : {type : "string", defaultValue : "Aug"},
			"sepText" : {type : "string", defaultValue : "Sep"},
			"octText" : {type : "string", defaultValue : "Oct"},
			"novText" : {type : "string", defaultValue : "Nov"},
			"decText" : {type : "string", defaultValue : "Dec"}
		},

		events : {
			"select" : {}
		}
    },

  	renderer : function(oRm, oControl){
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
		oRm.write('				<td data-month="01">');
		oRm.writeEscaped(oControl.getJanText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="02">');
		oRm.writeEscaped(oControl.getFebText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="03">');
		oRm.writeEscaped(oControl.getMarText());
		oRm.write('				</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-month="04">');
		oRm.writeEscaped(oControl.getAprText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="05">');
		oRm.writeEscaped(oControl.getMayText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="06">');
		oRm.writeEscaped(oControl.getJunText());
		oRm.write('				</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-month="07">');
		oRm.writeEscaped(oControl.getJulText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="08">');
		oRm.writeEscaped(oControl.getAugText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="09">');
		oRm.writeEscaped(oControl.getSepText());
		oRm.write('				</td>');
		oRm.write('			</tr>');
		oRm.write('			<tr>'); 
		oRm.write('				<td data-month="10">');
		oRm.writeEscaped(oControl.getOctText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="11">');
		oRm.writeEscaped(oControl.getNovText());
		oRm.write('				</td>');
		oRm.write('				<td data-month="12">');
		oRm.writeEscaped(oControl.getDecText());
		oRm.write('				</td>');
		oRm.write('			</tr>');
		oRm.write('		</tbody">');
		oRm.write('	<table">');
		oRm.write('</div">');
    },

    onAfterRendering : function(){
    	$($("#"+this.getId() +" table td")[parseInt(this.getMonth())-1]).addClass("active");
    }
});

sapui6.ui.commons.MonthBox.M_EVENTS = {'select':'select'};

sapui6.ui.commons.MonthBox.prototype.init = function () {
	this.allowTextSelection(false);
};

sapui6.ui.commons.MonthBox.prototype.select = function(oEvent){
	var obj = oEvent.target;
	if(obj.tagName == "TD") {
		var month = $(obj).attr("data-month");
		var year = parseInt($("#"+this.getId()+"-year").text());
		var f = this.getFormat().replace("yyyy",year);
		var v = f.replace("MM",month);
		this.setProperty("yyyymm", year+month, true);
		this.fireSelect();
		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
};

sapui6.ui.commons.MonthBox.prototype.prev = function(oEvent){
	var year = $("#"+this.getId()+"-year").text();
	$("#"+this.getId()+"-year").text(parseInt(year)-1);

	if(parseInt(this.getYear()) == parseInt(year)-1){
		$($("#"+this.getId() +" table td")[parseInt(this.getMonth())-1]).addClass("active");
	}else{
		$("#"+this.getId() +" table td").each(function(){
			$(this).removeClass("active");
		});
	}

	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sapui6.ui.commons.MonthBox.prototype.next = function(oEvent){
	var year = $("#"+this.getId()+"-year").text();
	$("#"+this.getId()+"-year").text(parseInt(year)+1);

	if(parseInt(this.getYear()) == parseInt(year)+1){
		$($("#"+this.getId() +" table td")[parseInt(this.getMonth())-1]).addClass("active");
	}else{
		$("#"+this.getId() +" table td").each(function(){
			$(this).removeClass("active");
		});
	}

	oEvent.preventDefault();
	oEvent.stopPropagation();
};