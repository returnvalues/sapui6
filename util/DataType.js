jQuery.sap.declare("util.DataType");

util.DataType = {
	USD: new sap.ui.model.type.Float({
			minIntegerDigits: 1, 
		  	maxIntegerDigits: 14, 
		  	minFractionDigits: 2, 
		  	maxFractionDigits: 2, 
		  	groupingEnabled: true, 
		  	groupingSeparator: ",", 
		  	decimalSeparator: "." 
		})
};