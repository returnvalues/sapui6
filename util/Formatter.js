jQuery.sap.declare("util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

util.Formatter = {

	priceType : new sap.ui.model.type.Float({
		minFractionDigits: 2
	}),

	navIcon : function (type) {
		return ("DIR" === type) ? "sap-icon://folder-full" : "sap-icon://paper-plane";
	},

	navListItemType : function (type) {
		return ("DIR" === type) ? "Active" : ((jQuery.device.is.phone) ? "Active" : "Inactive");
	},

	weightState :  function (fValue) {
		try {
			fValue = parseFloat(fValue);
			if (fValue < 0) {
				return "None";
			} else if (fValue < 1000) {
				return "Success";
			} else if (fValue < 2000) {
				return "Warning";
			} else {
				return "Error";
			}
		} catch (err) {
			return "None";
		}
	},

	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	},

	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},

	DateString : function (value) {
		if (value) {
			var date_format = "yyyy-MM-dd";
			date_format = date_format.replace("yyyy",value.substring(0,4));
			date_format = date_format.replace("MM",value.substring(4,6));
			date_format = date_format.replace("dd",value.substring(6));

			return date_format; 
		} else {
			return value;
		}
	},

	USD : function(value){
		if(value){
			var prefix = "";
			var d = "";
			v = String(value);

			if(v.indexOf("-") > -1) {
				prefix = "-";
				v = v.substring(1);
			}

			if(v.indexOf(".") > -1) {
				d = v.substring(v.indexOf("."));
				v = v.substring(0,v.indexOf("."));
			}
			var regExp=/\D/g;
			v = v.replace(regExp,"");
			var r = /(\d+)(\d{3})/;
			while (r.test(v)) {
				v = v.replace(r, '$1' + ',' + '$2');
			}
			
			return prefix+v+d;
		}else {
			return value;
		}
	},

	KRW : function(value){
		if(value){
			var prefix = "";
			var d = "";
			v = String(value);

			if(v.indexOf("-") > -1) {
				prefix = "-";
				v = v.substring(1);
			}

			if(v.indexOf(".") > -1) {
				d = v.substring(v.indexOf("."));
				v = v.substring(0,v.indexOf("."));
			}
			var regExp=/\D/g;
			v = v.replace(regExp,"");
			var r = /(\d+)(\d{3})/;
			while (r.test(v)) {
				v = v.replace(r, '$1' + ',' + '$2');
			}
			
			return prefix+v;
		}else {
			return value;
		}
	},

	randomBoolean : function () {
		return (Math.random() < 0.5);
	},

	randomNumber100 : function () {
		return Math.floor(Math.random() * 100);
	},

	categoryIcon : function (sValue) {
		var sIcon;
		switch (sValue) {
		case "Projector":
			sIcon = "sap-icon://projector";
			break;
		case "Graphics Card":
			sIcon = "sap-icon://measure";
			break;
		case "Accessory":
			sIcon = "sap-icon://widgets";
			break;
		case "Printer":
			sIcon = "sap-icon://print";
			break;
		case "Monitor":
			sIcon = "sap-icon://sys-monitor";
			break;
		case "Laptop":
			sIcon = "sap-icon://laptop";
			break;
		case "Keyboard":
			sIcon = "sap-icon://collections-management";
			break;
		default:
			sIcon = "sap-icon://product";
		}
		return sIcon;
	}
};