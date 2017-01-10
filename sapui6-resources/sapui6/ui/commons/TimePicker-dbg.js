jQuery.sap.declare("sapui6.ui.commons.TimePicker");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.TimePicker", { 
    metadata : {     
    	library : "sapui6.ui.commons",                        
        properties : {
			"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"hhmm" : {type : "string", defaultValue: null},
			"interval" : {type : "int", defaultValue:30},
			"visible" : {type:"boolean", defaultValue:true}
		}
    },

    timePopup : null,

  	renderer : {},

  	onBeforeRendering : function(){
  		this.setIconURL("sap-icon://customer-history");
  		this.setWidth(this.getWidth());
  		this.attachValueHelpRequest(this.open);
  	}
});

sapui6.ui.commons.TimePicker.prototype.bindValue = function(sPath){
	this.bindProperty("value",
		{
			parts:[
				{path:sPath}
			],
			formatter:function(v){
				if(v == undefined || v == null || v == !"") return v;
				
				var hh = parseInt(v.split(":")[0]);
				var mm = v.split(":")[1];
				var ampm = "AM";
				if(hh > 12){
					hh = hh - 12;
					ampm = "PM" 
				}
				return hh + ":" + mm + " " + ampm;
			}
		}
	);
};

sapui6.ui.commons.TimePicker.prototype.getParseValue = function(){
	return this.getBindingInfo("value").binding.oValue;
};

sapui6.ui.commons.TimePicker.prototype.open = function(){
	var intervalArr = [1,5,10,15,20,30,60];
	var interval = this.getInterval();
	var isAvailableInterval = false;

	intervalArr.forEach(function(element){
		if(element == interval) isAvailableInterval = true;
	});

	if(!isAvailableInterval) return;

	var that = this;
	if(this.timePopup == null){
		var timeList = new sap.ui.commons.ListBox(this.getId()+"-listbox",{
			visibleItems : 10,
			select : function(){
				that.setValue(this.getSelectedItem().getText());
				that.timePopup.close();
			}
		});

		timeList.setWidth(this.getWidth());

		var hour = 12;
		var hour24 = 12;
		var min = 0;
		var f = "AM";
		var time = "";

		while(hour24 < 36){
			var sMin = (min<10)?"0"+min:min;
			if(hour == 13) hour = 1;
			if(hour24 == 24) f = "PM";

			time = hour + ":" + sMin + " " + f;
			timeList.addItem(new sap.ui.core.Item({text:time}));
			min += this.getInterval();
			if(min == 60) {
				hour++;
				hour24++;
				min = 0;
			}
		}

		jQuery.sap.require("sap.ui.core.Popup");
		this.timePopup = new sap.ui.core.Popup();
		this.timePopup.setContent(timeList);
		this.timePopup.setShadow(true);
		this.timePopup.setAutoClose(true);
		this.timePopup.setAutoCloseAreas([this.getDomRef()]);
		this.timePopup.setDurations(0, 0); // no animations
		this.timePopup.setInitialFocusId(this.getId()+'-input');
	}

	var eDock = sap.ui.core.Popup.Dock;
	this.timePopup.open(10, eDock.BeginTop, eDock.BeginBottom, this.getDomRef(), null, null, true);
};

sapui6.ui.commons.YearPicker.prototype.exit = function(){
	if(this.timePopup != null) this.timePopup.exit();
};
