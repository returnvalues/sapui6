jQuery.sap.declare("sapui6.ui.ux3.CoachMarks");
jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.require("sap.ui.ux3.ToolPopup");

sap.ui.core.Control.extend("sapui6.ui.ux3.CoachMarks", { 
    metadata : {     
    	library : "sapui6.ui.ux3",                        
        properties : {
			"interval" : {type : "int", defaultValue : 2000}
		}
    },

    coachmarks : [],
    coachmarksControl : [],
    coachmarksDirection : [],
    cnt : 0,
    idx : -1,
    fnInterval : null,

  	renderer : function(oRm, oControl){}
});

sapui6.ui.ux3.CoachMarks.prototype.init = function(){
	this.oIntervalTrigger = new sap.ui.core.IntervalTrigger();
};

sapui6.ui.ux3.CoachMarks.prototype.add = function(oControl, sMessage, sDirection){
	var direction = "";
	if(sDirection != undefined) direction = sDirection;

	this.coachmarks.push(sMessage);
	this.coachmarksControl.push(oControl);
	this.coachmarksDirection.push(direction);

	this.cnt++;
};

sapui6.ui.ux3.CoachMarks.prototype.onGuideNumber = function(){
	var length = this.coachmarksControl.length;

	for(var i=0 ; i<length ; i++){
		var obj = $("#"+this.coachmarksControl[i].getId());
		var left = obj.offset().left;
		var top = obj.offset().top-5;

		var noH = this.getGuideHtml("coachmarks-guide-no-"+i, (i+1), "sapui6_guideNumber", "left:"+left+"px;top:"+top+"px;");

		$("#sapui6-coachmarks-div").append(noH);
	}
};


sapui6.ui.ux3.CoachMarks.prototype.getGuideHtml = function(id, txt, className, position, direction){
	var arrowClass = "";
	var arrowStyle = "";

	if(direction == undefined)  {
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowUp";
		arrowStyle = "left:-28px;";
	}else if(direction == "above") {
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowDown";
		arrowStyle = "left:10px;";
	}else if(direction == "left") {
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowRight";
		arrowStyle = "left:-10px;";
	}else if(direction == "right") {
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowLeft";
		arrowStyle = "top:5px;";
	}else if(direction == "below") {
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowUp";
		arrowStyle = "left:-28px;";
	}else{
		arrowClass = "sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrowUp";
		arrowStyle = "left:15px;";
	}

	var h = [];
	h.push('<div id="' + id + '" class="' + className + ' sapUiInverted-CTX sapUiTPInverted sapUiUx3TP sapUiUx3TPNoButtons sapUiUx3TPNoTitle sapUiShd" aria-labelledby="__popup0-title __popup0-acc" role="dialog" tabindex="-1" data-sap-ui-popup="id-1449079278956-7" style="position: absolute; visibility: visible; z-index: 999; display: block; ' + position+ '">');
	h.push('	<div id="' + id + '-arrow" class="' + arrowClass + '" style="' + arrowStyle + '">');
	h.push('		<div class="sapUiUx3TPArrowBorder"></div>');
	h.push('	</div>');
	h.push('	<div class="sapUiUx3TPContent">');
	h.push(txt);
	h.push('	</div>');
	h.push('</div>');

	return h.join("");
};

sapui6.ui.ux3.CoachMarks.prototype.removeGuide = function(){
	$("#sapui6-coachmarks-div").remove();
};

sapui6.ui.ux3.CoachMarks.prototype.start = function(){
	if(this.coachmarks.length < 1) return false;

	if($("#sapui6-coachmarks-div").length == 0){
		$(document.body).append('<div id="sapui6-coachmarks-div" style="position:absolute;left:0px;top:0px;opacity:0.6;display:block;z-index:900;background-color:#000000;width:' + $(document).width() + 'px;height:' + $(document).height() + 'px;"></div>');
	}

	this.onGuideNumber();

	var timeInterval = this.getInterval();
	var that = this;
	var pre_msgId = "";

	this.fnInterval = function(){
		if(that.idx > -1){
			$("#"+pre_msgId).remove();
		}

		if(that.idx == that.coachmarks.length-1) {
			that.removeGuide();
			that.oIntervalTrigger.removeListener(that.fnInterval);
			that.idx = -1;
			return false;
		}

		that.idx++;

		var obj = $("#"+"coachmarks-guide-no-"+that.idx);
		var left = obj.offset().left;
		var top = obj.offset().top;

		var message = that.coachmarks[that.idx];
		var direction = that.coachmarksDirection[that.idx];
		var position = "left:" + left + "px;top:" + top + "px;";
		if(direction == ""){
			position = "left:" + left + "px;top:" + (top + obj.height() + 20) + "px;";
		}else if(direction == "above"){
			position = "left:" + left + "px;top:" + (top - 40) + "px;";
		}else if(direction == "right"){
			position = "left:" + (left + obj.width()) + "px;top:" + top + "px;";
		}else if(direction == "left"){
			position = "right:" + left + "px;top:" + top + "px;";
		}else{
			position = "left:" + left + "px;top:" + (top + obj.height()) + "px;";
		}

		var msgId = "coachmarks-guide-message-"+that.idx;

		var msgH = that.getGuideHtml(msgId, message, "sapui6_coachmarks", position, direction);
		$("#sapui6-coachmarks-div").append(msgH);

		if(direction == "left"){
			var w = $("#"+msgId).width();
			left = left - w;
			$("#"+msgId).css("left",left+"px");
			$("#"+msgId+"-arrow").css("left",(w+6)+"px");
			$("#"+msgId).css("width",(w+5)+"px");
		}else if(direction == "above"){
			var w = $("#"+msgId).width();
			var h = $("#"+msgId).height();
			top = top - h;
			if(top < 0) top = 0;
			$("#"+msgId).css("top",h+"px");
			$("#"+msgId).css("width",(w+5)+"px");
		}

		pre_msgId = msgId;
		
	};

	this.oIntervalTrigger.setInterval(timeInterval);
	this.oIntervalTrigger.addListener(this.fnInterval);
};

sapui6.ui.ux3.CoachMarks.prototype.end = function(){
	this.oIntervalTrigger.removeListener(this.fnInterval);
};

