jQuery.sap.declare("sapui6.ui.ux3.TeamCalendar");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.ui.ux3.TeamCalendar", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100%"},
			"bodyHeight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"memberWidth" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "200px"},
			"groupWidth" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "200px"},
			"itemWidth" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "50px"},
			"itemHeight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "48px"},
			"marginLeft" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginRight" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginTop" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"marginBottom" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
			"yyyymm" : {type: "string", defaultValue : null},
			"memberTitle" : {type: "string", defaultValue : ""},
			"groupTitle" : {type: "string", defaultValue : ""},
			"weekLabel" : {type: "string", defaultValue:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"},
			"monthLabel" : {type: "string", defaultValue:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"},
			"dateFormat" : {type: "string", defaultValue:"dd.MM.yyyy"},
			"group" : {type:"boolean", defaultValue:false},
			"visible" : {type:"boolean", defaultValue:true}
		},
		defaultAggregation : "item",
		aggregations : {
	    	"items" : {type : "sapui6.ui.ux3.TeamCalendarItem", multiple : true, singularName: "item", bindable : "bindable"},
	    	"category" : {type : "sapui6.ui.ux3.TeamCalendarCategory", multiple : true, singularName: "category", bindable : "bindable"},
	    	"holiday" : {type : "sapui6.ui.ux3.TeamCalendarHoliday", multiple : true, singularName: "holiday", bindable : "bindable"}
		},
		events : {
            "previous" : {},
            "next" : {},
            "selectMember" : {},
            "selectGroup" : {},
            "selectDay" : {}
        }
    },

    _itemWidth : 40,
    _itemHeight : 38,
    _memberCnt : 0,
    _end_of_month : 30,
    _groupSize : {},
    _holiday : null,

    onBeforeRendering : function(){
    	jQuery.sap.require("sap.ui.core.theming.Parameters");
    	//if(!this.getBorderColor()) this.setProperty("borderColor", sap.ui.core.theming.Parameters.get("sapUiMediumBorder"), true);
    },

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
  		
  		if(!oControl.getYyyymm()) {
  			var d = new Date();
			oControl.setYyyymm(String(d.getFullYear()) + String(((d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1))));
		}

		oControl._holiday = null;

		oControl._itemWidth = parseInt(oControl.getItemWidth().split("px")[0]);
		oControl._itemHeight = parseInt(oControl.getItemHeight().split("px")[0]);

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());

		if(oControl.getMarginLeft()) oRm.addStyle("margin-left", oControl.getMarginLeft());
		if(oControl.getMarginRight()) oRm.addStyle("margin-right", oControl.getMarginRight());
		if(oControl.getMarginTop()) oRm.addStyle("margin-top", oControl.getMarginTop());
		if(oControl.getMarginBottom()) oRm.addStyle("margin-bottom", oControl.getMarginBottom());
	
		oRm.writeStyles();
		oRm.addClass("sapui6-Calendar");
		oRm.writeClasses();
		oRm.write(">");

		oControl.renderHeader(oRm, oControl);
		oControl.renderBody(oRm, oControl);
		oControl.renderLegend(oRm, oControl);
		
		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	var that = this;

    	var items = this.getItems();
    	if(items && items.length > 0){
    		var rectArr = {};

    		var length = items.length;

    		for(var i=0 ; i<length ; i++){
    			if(items[i].getDate().substring(0,6) == this.getYyyymm()){
    				var rectArrKey = items[i].getKey()+"-"+parseInt(items[i].getDate().substring(6));
    				if(rectArr[rectArrKey] == undefined){
    					var itemArr = [];
    					itemArr.push(items[i]);
    					rectArr[rectArrKey] = itemArr;
    				}else{
    					rectArr[rectArrKey].push(items[i]);
    				}
    			}
    		}

    		for(key in rectArr){
    			$("#"+this.getId()+"-"+key).html(this.renderTaskSVG(rectArr[key]));
    		}
    	}

    	jQuery.sap.delayedCall(50, that, function() {
	    	that._handleResize();
	    });

    	$(window).resize(function(){
            jQuery.sap.delayedCall(50, that, function() {
                that._handleResize();
            });
        });
    }
});

sapui6.ui.ux3.TeamCalendar.M_EVENTS = {'previous':'previous','next':'next','selectMember':'selectMember','selectGroup':'selectGroup','selectDay':'selectDay'};


sapui6.ui.ux3.TeamCalendar.prototype.renderHeader = function(oRm, oControl){
	var name_of_month = oControl.getMonthLabel().split(",");
	if(name_of_month.length != 12) name_of_month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var year = oControl.getYyyymm().substring(0,4);
	var month = parseInt(oControl.getYyyymm().substring(4));
	var previousMonth = month - 1;
	if(previousMonth < 10) previousMonth = String("0" + previousMonth);
	var nextMonth = month + 1;
	if(nextMonth < 10) nextMonth = String("0" + nextMonth);
	else if(nextMonth > 12) {
		nextMonth = "01";
		year = year + 1;
	}

	oRm.write("<div");
	oRm.addClass("sapui6-CalHead");
	oRm.writeClasses();
	oRm.writeAttribute("id", oControl.getId()+"-head");
	oRm.write(">");

	var oPreviousButton = new sap.ui.commons.Button({
		icon: "sap-icon://media-reverse", 
		press: function(){
				oControl.firePrevious({
				yyyymm : year + previousMonth
			});
		}
	});
	oRm.renderControl(oPreviousButton);

	oRm.write("<span");
	oRm.addClass("sapui6-CalDate");
	oRm.writeClasses();
	oRm.addStyle("padding-left","20px");
	oRm.addStyle("padding-right","20px");
	oRm.addStyle("padding-top","5px");
	oRm.writeStyles();
	oRm.write(">");
	oRm.write(name_of_month[month-1] + " " + year);
	oRm.write("</span>");

	var oNextButton = new sap.ui.commons.Button({
		icon:"sap-icon://media-play", 
		press: function(){
			oControl.fireNext({
				yyyymm : year + nextMonth
			});
		}
	});
	oRm.renderControl(oNextButton);

	oRm.write("</div>");
};


sapui6.ui.ux3.TeamCalendar.prototype.renderBody = function(oRm, oControl){
	var lastday_of_month = [31,28,31,30,31,30,31,31,30,31,30,31];
	var day_of_week = oControl.getWeekLabel().split(",");
	if(day_of_week.length != 7) day_of_week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var day_arr = new Array();
	var year = oControl.getYyyymm().substring(0,4);
	var month = oControl.getYyyymm().substring(4);

	if(year%4==0 && year%100!=0 || year%400==0) lastday_of_month[1] = 29;
	var end_of_month = lastday_of_month[parseInt(month)-1];
	oControl._end_of_month = end_of_month;
	var day_of_week_cnt = new Date(year + "-" + month + "-01").getDay();

	var leftWidth = parseInt(oControl.getMemberWidth().split("px")[0]);
	if(oControl.getGroup()) leftWidth = leftWidth + parseInt(oControl.getGroupWidth().split("px")[0]);
	leftWidth = String(leftWidth) + "px";

	oRm.write("<div>");
	
	oRm.write("	<div");
	oRm.writeAttribute("id", oControl.getId()+"-left");
	oRm.addStyle("float", "left");
	oRm.addStyle("width", leftWidth);
	oRm.writeStyles();
	oRm.write(">");

	oRm.write("<div");
	oRm.writeAttribute("id", oControl.getId()+"-head-left");
	oRm.write(">");

	if(oControl.getGroup()){
		oRm.write("<div");
		oRm.addClass("sapui6-CalMemberH");
		oRm.writeClasses();
		oRm.write(">");

		oRm.write("<div");
		oRm.addClass("sapui6-CalTeam");
		oRm.writeClasses();
		oRm.addStyle("width", oControl.getGroupWidth());
		oRm.addStyle("height", (oControl._itemHeight*2)+"px");
		oRm.addStyle("line-height", (oControl._itemHeight*2-2)+"px");
		oRm.writeStyles();
		oRm.write(">");
		oRm.write("<span");
		oRm.addClass("sapui6-CalMemberName");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write(oControl.getGroupTitle());
		oRm.write("</span>");
		oRm.write("</div>");
		oRm.write("</div>");
	}

	oRm.write("<div");
	oRm.addClass("sapui6-CalMemberH");
	oRm.writeClasses();
	oRm.write(">");

	oRm.write("<div");
	oRm.addClass("sapui6-CalTeam");
	oRm.writeClasses();
	oRm.addStyle("width", oControl.getMemberWidth());
	oRm.addStyle("height", (oControl._itemHeight*2)+"px");
	oRm.addStyle("line-height", (oControl._itemHeight*2-2)+"px");
	oRm.writeStyles();
	oRm.write(">");
	oRm.write("<span");
	oRm.addClass("sapui6-CalMemberName");
	oRm.writeClasses();
	oRm.write(">");
	oRm.write(oControl.getMemberTitle());
	oRm.write("</span>");
	oRm.write("</div>");
	oRm.write("</div>");

	oRm.write("</div>");

	oRm.write("<div");
	oRm.writeAttribute("id", oControl.getId()+"-body-left");
	oRm.addStyle("float", "left");
	oRm.addStyle("width", leftWidth);
	if(oControl.getBodyHeight()) {
		oRm.addStyle("height", oControl.getBodyHeight());
		oRm.addStyle("overflow-x", "hidden");
		oRm.addStyle("overflow-y", "hidden");
	}
	oRm.writeStyles();
	oRm.write(">");

	var uniques = {};
	oControl._memberCnt = 0;
	var groupKey = "";
	if(oControl.getGroup()) oControl._calculateGroupSize();
	var items = oControl.getItems();
	if(items && items.length > 0){
		var length = items.length;
		for(var i=0 ; i<length ; i++){
			if(uniques[items[i].getKey()] == undefined){
				if(oControl.getGroup() && groupKey != items[i].getGroupKey()){
					oRm.write("<div");
					oRm.addClass("sapui6-CalMemberH");
					oRm.writeClasses();
					oRm.write(">");
					oRm.write("<div");
					oRm.addClass("sapui6-CalMember");
					oRm.writeClasses();
					oRm.addStyle("width", oControl.getGroupWidth());
					oRm.addStyle("height", (oControl._itemHeight*oControl._groupSize[items[i].getGroupKey()]) + "px");
					oRm.addStyle("line-height", (oControl._itemHeight*oControl._groupSize[items[i].getGroupKey()]-2) + "px");
					oRm.writeStyles();
					oRm.write(">");
					oRm.write("<span");
					oRm.addClass("sapui6-CalMemberName");
					oRm.writeClasses();
					oRm.write(" onclick=\"javascript:sap.ui.getCore().byId('" + oControl.getId() + "').fireSelectGroup({groupKey:'" + items[i].getGroupKey()  + "'});\"");
					oRm.write(">");
					oRm.write(items[i].getGroupTitle());
					oRm.write("</span>");
					oRm.write("</div>");
					oRm.write("</div>");

					groupKey = items[i].getGroupKey();
				}

				oRm.write("<div");
				oRm.addClass("sapui6-CalMemberH");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write("<div");
				oRm.addClass("sapui6-CalMember");
				oRm.writeClasses();
				oRm.addStyle("width", oControl.getMemberWidth());
				oRm.addStyle("height", oControl._itemHeight + "px");
				oRm.addStyle("line-height", (oControl._itemHeight-2) + "px");
				oRm.writeStyles();
				oRm.write(">");
				oRm.write("<span");
				oRm.addClass("sapui6-CalMemberName");
				oRm.writeClasses();
				oRm.write(" onclick=\"javascript:sap.ui.getCore().byId('" + oControl.getId() + "').fireSelectMember({key:'" + items[i].getKey()  + "'});\"");
				oRm.write(">");
				oRm.write(items[i].getTitle());
				oRm.write("</span>");
				oRm.write("</div>");
				oRm.write("</div>");

				uniques[items[i].getKey()] = true;
				oControl._memberCnt++;
			}
			
		}
	}

	oRm.write("</div>");

	oRm.write("</div>");

	oRm.write("<div");
	oRm.writeAttribute("id", oControl.getId()+"-right");
	oRm.addStyle("float", "left");
	// oRm.addStyle("width", "700px");
	// oRm.addStyle("overflow-x", "auto");
	oRm.writeStyles();
	oRm.write(">");



	oRm.write("<div");
	oRm.writeAttribute("id", oControl.getId()+"-header-right");
	oRm.addStyle("overflow-x","hidden");
	oRm.addStyle("overflow-y","hidden");
	oRm.writeStyles();
	oRm.write(">");


	oRm.write("<div");
	oRm.addClass("sapui6-CalDays");
	oRm.writeClasses();
	oRm.addStyle("width", (oControl._itemWidth*end_of_month)+"px");
	oRm.writeStyles();
	oRm.write(">");

	var day_of_week_cnt2 = day_of_week_cnt;
	// render day of week
	for(var i=0 ; i<end_of_month ; i++){
		oRm.write("<div");
		oRm.addClass("sapui6-CalDay");
		oRm.writeClasses();
		oRm.addStyle("width",oControl._itemWidth+"px");
		oRm.addStyle("height",oControl._itemHeight+"px");
		oRm.addStyle("line-height",(oControl._itemHeight-2)+"px");

		var yyyymmdd = oControl.getYyyymm() + ((i<9)?"0":"") + String(i+1);
		var holiday = oControl._getHoliday(yyyymmdd);
		if(holiday) oRm.addStyle("background-color",holiday.getColor());

		oRm.writeStyles();
		oRm.write(">");
		oRm.write("<span");
		oRm.addClass("sapui6-CalDayNum");
		if(day_of_week_cnt2 == 0 || day_of_week_cnt2 == 6) oRm.addClass("sapui6-CalDayWeekEnd");
		oRm.writeClasses();
		oRm.write(">");
		oRm.write(day_of_week[day_of_week_cnt2]);

		if(day_of_week_cnt2 == 6) day_of_week_cnt2 = 0;
		else day_of_week_cnt2++;

		oRm.write("</span>");
		oRm.write("</div>");
	}
	oRm.write("</div>");

	// render day of month
	oRm.write("<div");
	oRm.addClass("sapui6-CalDays");
	oRm.writeClasses();
	oRm.addStyle("width", (oControl._itemWidth*end_of_month)+"px");
	oRm.writeStyles();
	oRm.write(">");

	day_of_week_cnt2 = day_of_week_cnt;
	for(var i=0 ; i<end_of_month ; i++){
		oRm.write("<div");
		oRm.addClass("sapui6-CalDay");
		oRm.writeClasses();
		oRm.addStyle("width",oControl._itemWidth+"px");
		oRm.addStyle("height",oControl._itemHeight+"px");
		oRm.addStyle("line-height",(oControl._itemHeight-2)+"px");

		var yyyymmdd = oControl.getYyyymm() + ((i<9)?"0":"") + String(i+1);
		var holiday = oControl._getHoliday(yyyymmdd);
		if(holiday) oRm.addStyle("background-color",holiday.getColor());

		oRm.writeStyles();
		oRm.write(">");
		oRm.write("<span");
		oRm.addClass("sapui6-CalDayNum");
		if(day_of_week_cnt2 == 0 || day_of_week_cnt2 == 6) oRm.addClass("sapui6-CalDayWeekEnd");

		if(day_of_week_cnt2 == 6) day_of_week_cnt2 = 0;
		else day_of_week_cnt2++;

		oRm.writeClasses();
		oRm.write(">");
		oRm.write(i+1);
		oRm.write("</span>");
		oRm.write("</div>");
	}
	oRm.write("</div>");

	oRm.write("</div>");
	oRm.write("<div");
	oRm.addStyle("overflow-x","auto");
	oRm.addStyle("overflow-y","auto");

	if(oControl.getBodyHeight()) {
		oRm.addStyle("height", oControl.getBodyHeight());
	}

	oRm.writeStyles();
	oRm.writeAttribute("id", oControl.getId()+"-body-right");
	oRm.writeAttribute("onscroll","javascript:sap.ui.getCore().byId('" + oControl.getId() + "').doScroll();");
	oRm.write(">");

	uniques = {};
	if(items && items.length > 0){
		var length = items.length;
		for(var i=0 ; i<length ; i++){
			if(uniques[items[i].getKey()] == undefined){
				oRm.write("<div");
				oRm.addClass("sapui6-CalDays");
				oRm.writeClasses();
				oRm.addStyle("width", (oControl._itemWidth*end_of_month)+"px");
				oRm.writeStyles();
				oRm.write(">");

				var day_of_week_cnt2 = day_of_week_cnt;

				for(var j=0 ; j<end_of_month ; j++){
					oRm.write("<div");
					oRm.addClass("sapui6-CalDay");
					oRm.writeClasses();
					oRm.addStyle("width",oControl._itemWidth+"px");
					oRm.addStyle("height",oControl._itemHeight+"px");
					oRm.addStyle("line-height",(oControl._itemHeight-2)+"px");

					var yyyymmdd = oControl.getYyyymm() + ((j<9)?"0":"") + String(j+1);
					var holiday = oControl._getHoliday(yyyymmdd);
					if(holiday) oRm.addStyle("background-color",holiday.getColor());

					oRm.writeStyles();
					oRm.write(">");
					oRm.write("<span");
					oRm.writeAttribute("id", oControl.getId()+"-"+items[i].getKey()+"-"+(j+1));
					var day = (j<9)?("0"+(j+1)):String(j+1);
					oRm.write(" onclick=\"javascript:sap.ui.getCore().byId('" + oControl.getId() + "').fireSelectDay({key:'" + items[i].getKey() + "', yyyymmdd:'" + (oControl.getYyyymm()+day)  + "'});\"");
					oRm.addClass("sapui6-CalDayNum");

					if(day_of_week_cnt2 == 0 || day_of_week_cnt2 == 6) oRm.addClass("sapui6-CalDayWeekEnd");

					if(day_of_week_cnt2 == 6) day_of_week_cnt2 = 0;
					else day_of_week_cnt2++;

					oRm.writeClasses();
					oRm.write(">");
					// oRm.write(this.renderTaskSVG(items[i]));
					oRm.write("</span>");
					oRm.write("</div>");
				}
				oRm.write("</div>");

				uniques[items[i].getKey()] = true;
			}
		}
	}

	oRm.write("</div>");


	oRm.write("</div>");
	oRm.write("</div>");
	oRm.write("</div>");
};

sapui6.ui.ux3.TeamCalendar.prototype.renderLegend = function(oRm, oControl){
	var categories = oControl.getCategory();
	if(categories && categories.length > 0){
		oRm.write("<div");
		oRm.addStyle("text-align","center");
		oRm.addStyle("padding","10px");
		oRm.writeStyles();
		oRm.addClass("sapui6-Legend");
		oRm.writeClasses();
		oRm.write(">");

		var length = categories.length;
		for(var i=0 ; i<length ; i++){
			var bgColor = categories[i].getColor();
			var title = categories[i].getTitle();

			oRm.write("<span");
			oRm.addStyle("padding-right","30px");
			// oRm.addStyle("white-space","nowrap");
			oRm.writeStyles();
			oRm.write(">");
			oRm.renderControl(new sap.ui.core.Icon({src:"sap-icon://color-fill",color:bgColor}));
			oRm.write(" "+title);
			oRm.write("</span>");
		}

		var holiday = oControl.getHoliday();
		length = holiday.length;
		for(var i=0 ; i<length ; i++){
			var bgColor = holiday[i].getColor();
			var title = holiday[i].getTitle();
			var date = holiday[i].getDate();

			oRm.write("<span");
			oRm.addStyle("padding-right","30px");
			oRm.addStyle("white-space","nowrap");
			oRm.writeStyles();
			oRm.write(">");
			oRm.renderControl(new sap.ui.core.Icon({src:"sap-icon://color-fill",color:bgColor}));
			oRm.write(" "+title);
			oRm.write(" ("+oControl._convertDateFormat(date)+")");
			oRm.write("</span>");
		}

		oRm.write("</div>");
	}
};

sapui6.ui.ux3.TeamCalendar.prototype.renderTaskSVG = function(item){
	var svg = [];
	var length = item.length;
	var height = Math.floor((this._itemHeight-2)/length);
	svg.push("<svg width='" + (this._itemWidth-2) + "' height='" + (this._itemHeight-2) + "'>");

	for(var i=0 ; i<length ; i++){
		var bgColor = this.getCategoryColor(item[i].getValue());
		svg.push("<rect x='0' y='" + (i*height) + "' width='" + (this._itemWidth-2) + "' height='" + height + "' fill='" + bgColor + "'></rect>");
		// <animate attributeName='width' from='0' to='" + (this._itemWidth-2) + "' dur='1s' fill='freeze' />
	}

	svg.push("</svg>");
	
	return svg.join("");
};

sapui6.ui.ux3.TeamCalendar.prototype._convertDateFormat = function(date){
	var format = this.getDateFormat();
	var formatValue = format;
	if(format && date.length == 8){
		formatValue = formatValue.replace("yyyy", date.substring(0,4));
		formatValue = formatValue.replace("MM", date.substring(4,6));
		formatValue = formatValue.replace("dd", date.substring(6,8));
	}

	return formatValue;
};

sapui6.ui.ux3.TeamCalendar.prototype.getCategoryColor = function(value){
	var categories = this.getCategory();
	if(categories && categories.length > 0){
		var length = categories.length;
		for(var i=0 ; i<length ; i++){
			if(categories[i].getValue() == value) return categories[i].getColor();
		}
	}

	return "";
};

sapui6.ui.ux3.TeamCalendar.prototype.doScroll = function(){
	$("#" + this.getId() + "-header-right").scrollLeft($("#" + this.getId() + "-body-right").scrollLeft());
	$("#" + this.getId() + "-body-left").scrollTop($("#" + this.getId() + "-body-right").scrollTop());
};

sapui6.ui.ux3.TeamCalendar.prototype.getScrollBarWidth = function() {  
   var inner = document.createElement('p');  
   inner.style.width = "100%";  
   inner.style.height = "100%";  

   var outer = document.createElement('div');  
   outer.style.position = "absolute";  
   outer.style.top = "0px";  
   outer.style.left = "0px";  
   outer.style.visibility = "hidden";  
   outer.style.width = "100px";  
   outer.style.height = "100px";  
   outer.style.overflow = "hidden";  
   outer.appendChild (inner);  

   document.body.appendChild (outer);  

   var w1 = inner.offsetWidth;  
   var h1 = inner.offsetHeight;
   outer.style.overflow = 'scroll';  
   var w2 = inner.offsetWidth;  
   var h2 = inner.offsetHeight;
   if (w1 == w2) w2 = outer.clientWidth;
   if (h1 == h2) h2 = outer.clientHeight;   

   document.body.removeChild (outer);  

   return (w1 - w2);  
};

sapui6.ui.ux3.TeamCalendar.prototype._calculateGroupSize = function(){
	this._groupSize = {};
	var uniques = {};
	var items = this.getItems();
	var length = items.length;
	for(var i=0 ; i<length ; i++){
		if(uniques[items[i].getKey()] == undefined){
			if(this._groupSize[items[i].getGroupKey()] == undefined){
				this._groupSize[items[i].getGroupKey()] = 1;
			}else{
				this._groupSize[items[i].getGroupKey()] = this._groupSize[items[i].getGroupKey()] + 1;
			}

			uniques[items[i].getKey()] = true;
		}
	}
};

sapui6.ui.ux3.TeamCalendar.prototype._getHoliday = function(date){
	if(this._holiday == null){
		this._holiday = {};
		var items = this.getHoliday();
		var length = items.length;
		for(var i=0 ; i<length ; i++){
			this._holiday[items[i].getDate()] = items[i];
		}
	}

	return this._holiday[date];
};

sapui6.ui.ux3.TeamCalendar.prototype._handleResize = function(){
	$("#"+this.getId()+"-right").css("width", $("#"+this.getId()).width()-$("#"+this.getId()+"-left").width() + "px");

	if(this.getBodyHeight()) {
		var scrollWidth = this.getScrollBarWidth();
		var bodyHeight = parseInt(this.getBodyHeight().split("px")[0]);
		var contentHeight = this._memberCnt * this._itemHeight;
		var contentWidth = this._end_of_month * this._itemWidth;

		if(contentHeight > bodyHeight) {
			$("#"+this.getId()+"-body-right").css("height", (bodyHeight+scrollWidth) + "px");
		}

		if(contentWidth > $("#"+this.getId()+"-body-right").width()){
			$("#"+this.getId()+"-header-right").css("width", ($("#"+this.getId()+"-body-right").width()-scrollWidth) + "px");
		}
	}
};


sap.ui.core.Element.extend("sapui6.ui.ux3.TeamCalendarItem", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
        	"key" : {type : "string", defaultValue : null},
			"title" : {type : "string", defaultValue : null},
			"date" : {type : "string", defaultValue : null},
			// "categoryKey" : {type : "string", defaultValue : null},
			"value" : {type : "string", defaultValue : null},
			"groupKey" : {type : "string", defaultValue : null},
			"groupTitle" : {type : "string", defaultValue : null}
		}
    }
});

sap.ui.core.Element.extend("sapui6.ui.ux3.TeamCalendarCategory", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
        	// "key" : {type : "string", defaultValue : null},
			"title" : {type : "string", defaultValue : null},
			"color" : {type : "string", defaultValue : null},
			"value" : {type : "string", defaultValue : null}
		}
    }
});

sap.ui.core.Element.extend("sapui6.ui.ux3.TeamCalendarHoliday", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
        	"title" : {type : "string", defaultValue : null},
			"date" : {type : "string", defaultValue : null},
			"color" : {type : "string", defaultValue : "#cecece"}
		}
    }
});