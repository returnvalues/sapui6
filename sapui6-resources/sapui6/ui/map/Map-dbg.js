jQuery.sap.declare("sapui6.ui.map.Map");
jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.require("sap.ui.core.Popup");

sap.ui.core.Control.extend("sapui6.ui.map.Map", { 
	library : "sapui6.ui.map",
	metadata : {                             
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
            "title" : {type:"string", defaultValue:null},
            "titleColor" : {type:"string", defaultValue : "#000000"},
            "width" : {type:"string", defaultValue : null}, 
            "height" : {type:"string", defaultValue : null}, 
            "fill" : {type:"string", defaultValue : null}, 
            "fillOpacity" : {type:"string", defaultValue : "1"},
            "stroke" : {type:"string", defaultValue : "#ffffff"}, 
            "strokeOpacity" : {type:"string", defaultValue : "1"},
            "strokeWidth" : {type:"string", defaultValue : "0.5"},
            "backgroundColor" : {type:"string", defaultValue : "#ffffff"},
            "selectColor" : {type:"string", defaultValue : null},
            "overColor" : {type:"string", defaultValue : null},
            "scale" : {type:"string", defaultValue:"1"},
            "scaleFactor" : {type:"float", defaultValue:0.9},
            "x" : {type:"string", defaultValue: "0"},
            "y" :  {type:"string", defaultValue: "0"},
            "zoomAlign" : {type:"string", defaultValue: "center"},
            "homeColor" : {type:"sap.ui.core.CSSColor", defaultValue: "#000000"},
            "selectable" : {type:"boolean", defaultValue:true},
            "visibleRegionTitle" : {type:"boolean", defaultValue:true},
            "visibleContinent" : {type:"boolean", defaultValue:false}
        },
        defaultAggregation : "region",
        aggregations : {
            "region" : {type : "sapui6.ui.map.Region", multiple : true, singularName : "region"}
        },
        events : {
            "select" : {},
            "selectHome" : {},
            "renderingCompleted" : {}
        }
    },

    _basicRatio : null,
    _wRatio : null,
    _hRatio : null,
    _svgWidth : 1012,
    _svgHeight : 655,
    _originalScale : 0,
    _seletedRegion : null,
    _seletedContinentId : null,
    _seletedContinentColor : null,
    _isZoomIn : true,
    _popup : null,
    _rootPopup : null,
    _label : null,
    _preScale : 1,
    _preX : 0,
    _preY : 0,
    _ppreX : 0,
    _ppreY : 0,
    _content : [],
    _cPopup : [],
    _isFirst : true,
    _interval : 50,
    _positionX : 0,
    _positionY : 0,
    _gWidth : 0,
    _gHeight : 0,
    _isSelect : false,
    // _transform:navigator.userAgent.indexOf('WebKit')>0?'webkitTransform':'transform',

	renderer : function(oRm, oControl) {
		if(!oControl.getVisible()) return;

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
		oRm.addStyle("overflow", "hidden");
		oRm.writeStyles();
		oRm.write(">");
		oRm.write('<svg xmlns="http://www.w3.org/2000/svg" xmlns:sapui6="http://sapui6.com" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ');
		oRm.writeAttribute("width", oControl.getWidth());
		oRm.writeAttribute("height", oControl.getHeight());
		oRm.writeAttribute("id", oControl.getId()+"-svg");
		oRm.addStyle("background-color", oControl.getBackgroundColor());
		oRm.writeStyles();
		oRm.write(">");
		
		if(oControl._isZoomIn){
			if(sap.ui.Device.browser.msie || sap.ui.Device.browser.safari){
				oRm.write('<g id="' + oControl.getId() + '-svg-group" x="' + oControl._preX + '" y="' + oControl._preY + '" transform="scale(' + oControl._preScale + ') translate(' + oControl._preX + ',' + oControl._preY + ')" >');
			}else{
				oRm.write('<g id="' + oControl.getId() + '-svg-group" x="' + oControl._preX + '" y="' + oControl._preY + '" transform="scale(' + oControl._preScale + ') translate(' + oControl._preX + ',' + oControl._preY + ')" >');
				oRm.write('<animateTransform attributeName="transform" attributeType="XML" type="scale" from="' + oControl._preScale + '" to="' + oControl.getScale() + '" begin="0s" dur="1s" fill="freeze" />');
				oRm.write('<animateTransform attributeName="transform" attributeType="XML" type="translate" values="' + oControl._preX + ',' + oControl._preY + '; ' + (parseFloat(oControl.getX())+oControl._positionX) + ', ' + (parseFloat(oControl.getY())+oControl._positionY) + '" additive="sum" begin="0s" dur="1s" fill="freeze" />');
			}
		}else{
			if(sap.ui.Device.browser.msie || sap.ui.Device.browser.safari){
				oRm.write('<g id="' + oControl.getId() + '-svg-group" x="' + oControl._preX + '" y="' + oControl._preY + '" transform="scale(' + oControl._preScale + ') translate(' + oControl._preX + ',' + oControl._preY + ')" >');
			}else{
				oRm.write('<g id="' + oControl.getId() + '-svg-group" x="' + oControl._preX + '" y="' + oControl._preY + '" transform="scale(' + oControl._preScale + ') translate(' + oControl._preX + ',' + oControl._preY + ')" >');
				oRm.write('<animateTransform attributeName="transform" attributeType="XML" type="scale" from="' + oControl._preScale + '" to="' + oControl._originalScale + '" begin="0s" dur="1s" fill="freeze" />');
				oRm.write('<animateTransform attributeName="transform" attributeType="XML" type="translate" values="' + oControl._preX + ',' + oControl._preY + '; ' + oControl._positionX + ',' + oControl._positionY + '" additive="sum" begin="0s" dur="1s" fill="freeze" />');
				oControl._isZoomIn = true;
			}
		}
		
		oRm.write(oControl.renderMap(oRm, oControl));
		oRm.write("</g>");
		oRm.write('<g id="' + oControl.getId() + '-svg-bubble-group"></g>');
		
		if(oControl.getTitle()){
			oRm.write('<text style="font-weight:bold;font-size:18px;font-family:inherit;" x="' + (parseFloat(oControl.getWidth())/2) + '" y="30" text-anchor="middle" fill="' + oControl.getTitleColor() + '">' + oControl.getTitle() + '</text>');
		}

		oRm.write("</svg>");
		oRm.write('<div id="' + oControl.getId() + '-div-label" style="display:none;position:absolute;z-index:9999;font-size:14px;padding:5px 10px 5px 10px;background-color:#fff;border:2px solid #ddd;">Region Label</div>');
		oRm.write("</div>");

		if(!oControl._isFirst && oControl._isZoomIn && (sap.ui.Device.browser.msie || sap.ui.Device.browser.safari)){
			if(oControl.getScale() == oControl._preScale && oControl.getScale() == oControl._originalScale) return;
			var tScale = oControl._preScale;
			var tX = oControl._preX+oControl._positionX;
			var tY = oControl._preY+oControl._positionY;
			var addScale = (parseFloat(oControl.getScale())-tScale)/10;
			var addX = (parseFloat(oControl.getX())-oControl._preX)/10;
			var addY = (parseFloat(oControl.getY())-oControl._preY)/10;
			if(parseFloat(oControl.getScale()) >= tScale){
				var fnTransform = window.setInterval(function(){
					var svgGroup = $("#"+oControl.getId()+"-svg-group");
					if(tScale > parseFloat(oControl.getScale())){
						window.clearInterval(fnTransform);
						svgGroup.attr("transform", "scale("+oControl.getScale()+") " + "translate(" + (parseFloat(oControl.getX())+oControl._positionX) + "," + (parseFloat(oControl.getY())+oControl._positionY) +")");
						jQuery.sap.delayedCall(300, oControl, function() {
							oControl.fireSelect({code:oControl._seletedRegion.getId().substring(oControl._seletedRegion.getId().lastIndexOf("-")+1), name:oControl._seletedRegion.getTitle()});
						});
					}else{
						tScale += addScale;
						tX += addX;
						tY += addY;
						svgGroup.attr("transform", "scale("+tScale+") " + "translate(" + tX + "," + tY +")");
					}
				}, 100);
			}else{
				var fnTransform = window.setInterval(function(){
					var svgGroup = $("#"+oControl.getId()+"-svg-group");
					if(tScale < parseFloat(oControl.getScale())){
						window.clearInterval(fnTransform);
						svgGroup.attr("transform", "scale("+oControl.getScale()+") " + "translate(" + (parseFloat(oControl.getX())+oControl._positionX) + "," + (parseFloat(oControl.getY())+oControl._positionY) +")");
						jQuery.sap.delayedCall(300, oControl, function() {
							oControl.fireSelect({code:oControl._seletedRegion.getId().substring(oControl._seletedRegion.getId().lastIndexOf("-")+1), name:oControl._seletedRegion.getTitle()});
						});
					}else{
						tScale += addScale;
						tX += addX;
						tY += addY;
						svgGroup.attr("transform", "scale("+tScale+") " + "translate(" + tX + "," + tY +")");
					}
				}, 100);
			}
		}else if(!oControl._isZoomIn && (sap.ui.Device.browser.msie || sap.ui.Device.browser.safari)){
			oControl._isZoomIn = true;
			var tScale = oControl._preScale;
			var tX = oControl._preX+oControl._positionX;
			var tY = oControl._preY+oControl._positionY;
			var addScale = (parseFloat(tScale)-oControl._originalScale)/10;
			var addX = oControl._preX/10;
			var addY = oControl._preY/10;

			var fnTransform = window.setInterval(function(){
				var svgGroup = $("#"+oControl.getId()+"-svg-group");
				if(tScale < parseFloat(oControl._originalScale)){
					window.clearInterval(fnTransform);
					svgGroup.attr("transform", "scale("+oControl._originalScale+") " + "translate(" + oControl._positionX + "," + oControl._positionY + ")");	
				}else{
					tScale -= addScale;
					tX -= addX;
					tY -= addY;
					svgGroup.attr("transform", "scale("+tScale+") " + "translate(" + tX + "," + tY +")");
				}
			}, 100);
		}

		if(oControl._isSelect && !sap.ui.Device.browser.msie){
			jQuery.sap.delayedCall(1200, oControl, function() {
				oControl.fireSelect({code:oControl._seletedRegion.getId().substring(oControl._seletedRegion.getId().lastIndexOf("-")+1), name:oControl._seletedRegion.getTitle()});
			});
		}
    },

    onBeforeRendering : function(){
    	if(this._isFirst){
			this._calculateScale();
			this._setRegionColor();
    	}
    },

	onAfterRendering : function(){
		var that = this;

		if(this.getScale() == this._originalScale) {
			jQuery.sap.delayedCall(this._interval, that, function() {
				that.renderContent();
				that.renderBubble();
				that._interval = 50;
			});
		}else{
			this.destroyPopupContent();
			// this.hideBubble();

			if(!this._rootPopup){
				this._rootPopup = new sap.ui.core.Popup();
				this._rootPopup.setContent(new sap.ui.core.Icon({src:"sap-icon://home", color:this.getHomeColor(), press:function(){
					that.goHome();
				}}));

				this._rootPopup.setAutoClose(false);
				this._rootPopup.setDurations(0, 0); // no animations
			}

			var eDock = sap.ui.core.Popup.Dock;
			this._rootPopup.open(10, eDock.BeginTop, eDock.BeginTop, this, "10 10", null, true);
		}

		if(this._isFirst){
			var svgLeft = $("#"+that.getId()).offset().left;
			var svgTop = $("#"+that.getId()).offset().top;
			this._regionCode.forEach(function(regionCode, index){
				if(that.getRegion()[index] && $("#"+that.getId()+"-"+regionCode)){
					that.getRegion()[index].setLeft($("#"+that.getId()+"-"+regionCode).offset().left - svgLeft);
					that.getRegion()[index].setTop($("#"+that.getId()+"-"+regionCode).offset().top - svgTop);
				}
			});

			this._isFirst = false;
		}

		document.getElementById(this.getId() + "-svg-group").onclick = (sap.ui.getCore().byId(that.getId()).mouseclick).bind(this);
		document.getElementById(this.getId() + "-svg-group").onmouseover = (sap.ui.getCore().byId(that.getId()).mouseover).bind(this);
		document.getElementById(this.getId() + "-svg-group").onmouseout = (sap.ui.getCore().byId(that.getId()).mouseout).bind(this);

		document.getElementById(this.getId() + "-svg-bubble-group").onclick = (sap.ui.getCore().byId(that.getId()).clickBubble).bind(this);
		document.getElementById(this.getId() + "-svg-bubble-group").onmouseover = (sap.ui.getCore().byId(that.getId()).mouseoverBubble).bind(this);
		document.getElementById(this.getId() + "-svg-bubble-group").onmouseout = (sap.ui.getCore().byId(that.getId()).mouseoutBubble).bind(this);

		this.fireRenderingCompleted();
	}
});

sapui6.ui.map.Map.M_EVENTS = {'select':'select','selectHome':'selectHome','renderingCompleted':'renderingCompleted'};

sapui6.ui.map.Map.prototype.exit = function(){
	if(this._popup) this._popup.destroy();
	if(this._cPopup.length > 0) {
		this._cPopup.forEach(function(p){
			p.destroy();
		});
	}
};

sapui6.ui.map.Map.prototype._calculateScale = function(){
	var width = 0;
	var height = 0;

	if(!this.getWidth()) this.setWidth(this._svgWidth+"px");

	if(this.getWidth().indexOf("%") > -1)  {
		if($("#"+this.getId()).parent()) width = $("#"+this.getId()).parent().innerWidth()*(parseFloat(this.getWidth().split("%")[0])/100);

		if(width == 0) width = ($(document).innerWidth())*(parseFloat(this.getWidth().split("%")[0])/100);
	}else {
		width = parseInt(this.getWidth().split("px")[0]);
	}

	if(!this.getHeight()) this.setHeight(this._svgHeight+"px");

	if(this.getHeight().indexOf("%") > -1)  {
		if($("#"+this.getId()).parent()) height = $("#"+this.getId()).parent().innerHeight()*(parseFloat(this.getHeight().split("%")[0])/100);

		if(height == 0) height = ($(document).innerHeight())*(parseFloat(this.getHeight().split("%")[0])/100);
	}else {
		height = parseInt(this.getHeight().split("px")[0]);
	}

	this.setWidth(width+"px");
	this.setHeight(height+"px");
	
	this._wRatio = (width/this._svgWidth) * parseFloat(this.getScaleFactor());
	this._hRatio = (height/this._svgHeight) * parseFloat(this.getScaleFactor());

	if(this._wRatio < this._hRatio){
		this._basicRatio = "width";
		this._originalScale = this._wRatio;
		this._gWidth = this._svgWidth * this._wRatio;
		this._gHeight = this._svgHeight * this._wRatio;
		// this._preX = (width - this._gWidth)/2;
		this.setProperty("scale", this._wRatio, true);
	}else{
		this._basicRatio = "height";
		this._originalScale = this._hRatio;
		this._gWidth = this._svgWidth * this._hRatio;
		this._gHeight = this._svgHeight * this._hRatio;
		// this._preX = (width - (this._gWidth/this.getScaleFactor()))/2;
		this.setProperty("scale", this._hRatio, true);
	}
	this._preScale = this._originalScale;
	this._preX = ((width - this._gWidth)/2)/this._originalScale;
	this._preY = ((height - this._gHeight)/2)/this._originalScale;
	this._positionX = this._preX;
	this._positionY = this._preY;
};

sapui6.ui.map.Map.prototype._setRegionColor = function(){
	var fillColor = this.getFill()?this.getFill():"#ccc";
	var selectColor = this.getSelectColor()?this.getSelectColor():"#ff0000";
	var overColor = this.getOverColor()?this.getOverColor():"#00356a";

	this.getRegion().forEach(function(region){
		if(!region.getFill()) {
			region.setFill(fillColor);
			region.setOriginalFill(fillColor);
		}

		if(!region.getSelectColor()) region.setSelectColor(selectColor);
		if(!region.getOverColor()) region.setOverColor(overColor);
	});
};

sapui6.ui.map.Map.prototype.renderMap = function(oRm, oControl){
	var that = this;
	
	this.getRegion().forEach(function(region){
		if(region.getVisible()){
			oRm.write("<path ");
			oRm.writeAttribute("id", region.getId());
			oRm.writeAttribute("title", region.getTitle());
			oRm.writeAttribute("d", region.getD());
			oRm.addStyle("fill", region.getFill());
			oRm.addStyle("fill-opacity", region.getFillOpacity());
			oRm.addStyle("stroke", region.getStroke());
			oRm.addStyle("stroke-opacity", region.getStrokeOpacity());
			oRm.addStyle("stroke-width", region.getStrokeWidth());
			if(that.getSelectable() && region.getSelectable()) oRm.addStyle("cursor", "pointer");
			oRm.writeStyles();
			oRm.write("/>");
		}
	});
};

sapui6.ui.map.Map.prototype.renderBubble = function(){
	var that = this;
	this.getRegion().forEach(function(region){
		if(region.getVisible() && region.getBubble()){
			var regionDom = document.getElementById(region.getId());
			var countryCode = region.getId().substring(region.getId().lastIndexOf("-")+1);
			var width = regionDom.getBoundingClientRect().width;
			var height = regionDom.getBoundingClientRect().height;

			var bubble = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
			bubble.setAttribute("id", that.getId()+"-bubble-"+countryCode);
			bubble.setAttribute("r", region.getBubbleRadius());
			bubble.setAttribute("stroke-width", "0");
			bubble.setAttribute("fill", region.getBubbleColor());
			bubble.setAttribute("fill-opacity", region.getBubbleOpacity());
			if(countryCode == "US"){
				bubble.setAttribute("cx", Math.floor(parseFloat(region.getLeft())+(width/2)+(width/5)-(parseFloat(region.getBubbleRadius())/2)));
				bubble.setAttribute("cy", Math.floor(parseFloat(region.getTop())+(height/2)+(height/4)-(parseFloat(region.getBubbleRadius())/2)));
			}else if(countryCode == "CA"){
				bubble.setAttribute("cx", Math.floor(parseFloat(region.getLeft())+(width/2)-(width/5)-(parseFloat(region.getBubbleRadius())/2)));
				bubble.setAttribute("cy", Math.floor(parseFloat(region.getTop())+(height/2)+(height/4)-(parseFloat(region.getBubbleRadius())/2)));
			}else{
				bubble.setAttribute("cx", Math.floor(parseFloat(region.getLeft())+(width/2)-(parseFloat(region.getBubbleRadius())/2)));
				bubble.setAttribute("cy", Math.floor(parseFloat(region.getTop())+(height/2)-(parseFloat(region.getBubbleRadius())/2)));
			}

			document.getElementById(that.getId()+"-svg-bubble-group").appendChild(bubble);
		}
	});
};

sapui6.ui.map.Map.prototype.clickBubble = function(evt){

};

sapui6.ui.map.Map.prototype.mouseoverBubble = function(evt){
	var obj = evt.target ? evt.target : evt.srcElement;

	var id = $(obj).attr("id");
	var region = sap.ui.getCore().byId(this.getId()+"-"+id.substring(id.lastIndexOf("-")+1));
	if(region.getBubbleTitle()){
		var label = $("#"+this.getId()+"-div-label");

		$(label).html(region.getBubbleTitle());
		$(label).css("left",evt.pageX-50);
		$(label).css("top",evt.pageY-40);
		$(label).css("display","inline-block");
	}
};

sapui6.ui.map.Map.prototype.mouseoutBubble = function(evt){
	$("#"+this.getId()+"-div-label").css("display","none");
};

sapui6.ui.map.Map.prototype.showBubble = function(){
	$("#"+this.getId()+"-svg-bubble-group").css("display","");
};

sapui6.ui.map.Map.prototype.hideBubble = function(){
	$("#"+this.getId()+"-svg-bubble-group").css("display","none");
};

sapui6.ui.map.Map.prototype.setContent = function(mContent){
	var that = this;
	mContent.forEach(function(content){
		that.addContent(content.countryCode, content.content, content.left, content.top);
	});
};

sapui6.ui.map.Map.prototype.addContent = function(sCountryCode, oContent, sLeft, sTop){
	var left = sLeft;
	var top = sTop;

	if(sLeft == undefined || sLeft == "") left = "0";
	else if(sLeft.indexOf("px")) left = sLeft.split("px")[0];

	if(sTop == undefined || sTop == "") top = "0";
	else if(sTop.indexOf("px")) top = sTop.split("px")[0];

	this._content.push({country:sCountryCode, content:oContent, left:left, top:top});
};

sapui6.ui.map.Map.prototype.renderContent = function(){
	this._cPopup = [];
	var length = this._content.length;
	for(var i=0 ; i<length ; i++){
		var content = this._content[i];
		if(content.country == ""){

			var left = parseFloat(content.left);
			var top = parseFloat(content.top);

			var oPopup = new sap.ui.core.Popup();
			oPopup.setContent(content.content);
			oPopup.setShadow(false);
			oPopup.setAutoClose(false);
			oPopup.setDurations(0, 0); // no animations

			var eDock = sap.ui.core.Popup.Dock;
			oPopup.open(10, eDock.BeginTop, eDock.BeginTop, this, left+" "+top, null, true);

		}else if(document.getElementById(this.getId()+"-"+content.country)){
			var obj = document.getElementById(this.getId()+"-"+content.country);
			var width = parseInt(obj.getBoundingClientRect().width);
			var height = parseInt(obj.getBoundingClientRect().height);
			var left = parseFloat(content.left);
			var top = parseFloat(content.top);

			var oPopup = new sap.ui.core.Popup();
			oPopup.setContent(content.content);
			oPopup.setShadow(false);
			oPopup.setAutoClose(false);
			oPopup.setDurations(0, 0); // no animations

			var eDock = sap.ui.core.Popup.Dock;
			if(content.country == "US"){
				oPopup.open(10, eDock.CenterCenter, eDock.RightCenter, obj, ((width/2)+(width/5)+left)+" "+((height/2)+(height/4)+top), null, true);
			}else if(content.country == "CA"){
				oPopup.open(10, eDock.CenterCenter, eDock.RightCenter, obj, ((width/2)-(width/5)+left)+" "+((height/2)+(height/4)+top), null, true);
			}else if(content.country == "IN"){
				oPopup.open(10, eDock.CenterCenter, eDock.RightCenter, obj, ((width/3)+left)+" "+((height/2)+top), null, true);
			}else{
				oPopup.open(10, eDock.BeginCenter, eDock.CenterCenter, obj, ((width/2)+left)+" "+((height/2)+top), null, true);
			}

			this._cPopup.push(oPopup);
		}
	}
};

sapui6.ui.map.Map.prototype.destroyPopupContent = function(){
	this._cPopup.forEach(function(p){
		p.destroy();
	});
};

sapui6.ui.map.Map.prototype.setRegionProperty = function(sCountryCode, mSetting){
	var region = sap.ui.getCore().byId(this.getId()+"-"+sCountryCode);
	if(region) {
		if(mSetting.title) region.setTitle(mSetting.title);
		if(mSetting.fill) {
			region.setFill(mSetting.fill);
			region.setOriginalFill(mSetting.fill);
		}
		if(mSetting.selectColor) region.setSelectColor(mSetting.selectColor);
		if(mSetting.overColor) region.setOverColor(mSetting.overColor);
		if(mSetting.left) region.setLeft(mSetting.left);
		if(mSetting.top) region.setTop(mSetting.top);
		if(mSetting.title) region.setTitle(mSetting.title);
		if(mSetting.visible != undefined) region.setVisible(mSetting.visible);
	}
};

sapui6.ui.map.Map.prototype.setRegionTitle = function(mRegion){
	var that = this;
	mRegion.forEach(function(region){
		var code = region.code;
		var title = region.title;

		var region = sap.ui.getCore().byId(that.getId()+"-"+code);
		if(region) {
			region.setTitle(title);
		}
	});
};

sapui6.ui.map.Map.prototype.setBubble = function(sRegionCode, iRadius, sColor, sOpacity, sTitle){
	var region = sap.ui.getCore().byId(this.getId()+"-"+sRegionCode);
	if(region) {
		region.setBubble(true);
		region.setBubbleRadius(iRadius);
		region.setBubbleColor(sColor);
		region.setBubbleOpacity(sOpacity);
		region.setBubbleTitle(sTitle);
	}
};

sapui6.ui.map.Map.prototype.setContinentColor = function(sContinentCode, sFillColor, sOverColor, sSelectColor){
	this._continentColor[sContinentCode] = {fill:sFillColor,over:sOverColor,select:sSelectColor};
};

sapui6.ui.map.Map.prototype.getContinentColor = function(sContinentCode, region){
	if(!this._continentColor[sContinentCode]){
		this.setContinentColor(sContinentCode, region.getFill(), region.getOverColor(), region.getSelectColor());
	}

	return this._continentColor[sContinentCode];
};

sapui6.ui.map.Map.prototype.getRegionCode = function(){
	return this._regionCode;
};

sapui6.ui.map.Map.prototype.getSelectedRegion = function(){
	return this._seletedRegion;
};

sapui6.ui.map.Map.prototype.getSelectedRegionCode = function(){
	var regionId = this._seletedRegion.getId();

	return regionId.substring(regionId.lastIndexOf("-")+1);
};

sapui6.ui.map.Map.prototype.goHome = function(){
	if(this._rootPopup) this._rootPopup.close();

	this._cPopup.forEach(function(p){
		p.close();
	});

	this._preScale = parseFloat(this.getScale());
	this._preX = parseFloat(this.getX());
	this._preY = parseFloat(this.getY());

	this.setProperty("scale",this._originalScale,true);
	this.setProperty("x","0",true);
	this.setProperty("y","0",true);
	this._isZoomIn = false;
	this._interval = 1500;
	this._msieTransform = "";
	this._isSelect = false;
	this._elementX = 0;
	this._elementY = 0;
	this.invalidate();

	this.fireSelectHome();
};

sapui6.ui.map.Map.prototype.moveTo = function(regionCode){
	var regionId = this.getId() + "-" + regionCode;

	var obj = document.getElementById(regionId);

	var region = sap.ui.getCore().byId(regionId);

	if(this._seletedRegion != null) {
		this._seletedRegion.setProperty("isSelected", false, true);
		this._seletedRegion.setProperty("fill", this._seletedRegion.getOriginalFill(), true);
		$("#"+this._seletedRegion.getId()).css("fill", this._seletedRegion.getFill());
	}
	
	region.setProperty("isSelected", true, true);
	region.setProperty("fill", region.getSelectColor(), true);
	$(obj).css("fill", region.getSelectColor());

	this._seletedRegion = region;

	if(this._popup) this._popup.close();

	var w = obj.getBoundingClientRect().width/parseFloat(this.getScale());
	var h = obj.getBoundingClientRect().height/parseFloat(this.getScale());

	var controlWidth = $("#"+this.getId()).width();
	var controlHeight = $("#"+this.getId()).height();
	var wScale = controlWidth/w; 
	var hScale = controlHeight/h;
	var w1 = w*wScale;
	var h1 = h*wScale;
	var w2 = w*hScale;
	var h2 = h*hScale;
	var basicScale = "w";
	var scale = 1;

	if(w1<=controlWidth && h1<=controlHeight) {
		scale = wScale;
		basicScale = "w";
	}else if(w2<=controlWidth && h2<=controlHeight){
		scale = hScale;
		basicScale = "h";
	}else {
		if(w > h){
			scale = hScale;
			basicScale = "h";
		} 
		else {
			scale = wScale;
			basicScale = "w";
		}
	}

	var x = parseFloat(region.getLeft())/parseFloat(this._originalScale);
	var y = parseFloat(region.getTop())/parseFloat(this._originalScale);

	this._preScale = parseFloat(this.getScale());
	this._preX = parseFloat(this.getX());
	this._preY = parseFloat(this.getY());

	var elementX = 0;
	var elementY = 0;

	if(this.getZoomAlign().toLowerCase() == "center"){
		elementX = ((controlWidth - (w*scale*this.getScaleFactor())))/2/(scale*this.getScaleFactor());
	}else if(this.getZoomAlign().toLowerCase() == "right"){
		if(basicScale == "h") {
			elementX = (controlWidth - (w*scale*this.getScaleFactor()))/(scale*this.getScaleFactor());
		}
	}

	elementY = ((controlHeight - (h*scale*this.getScaleFactor())))/2/(scale*this.getScaleFactor());

	this.setProperty("scale",scale*this.getScaleFactor(),true);
	this.setProperty("x",-(x-elementX),true);
	this.setProperty("y",-(y-elementY),true);
	this._isSelect = true;

	this.invalidate();
};

sapui6.ui.map.Map.prototype.setGroup = function(sRegionCode, sGroupId, sGroupTitle){
	var region = sap.ui.getCore().byId(this.getId()+"-"+sRegionCode);
	region.setGroup(true);
	region.setGroupId(sGroupId);
	region.setGroupTitle(sGroupTitle);
};

sapui6.ui.map.Map.prototype.mouseclick = function(evt){
	var that = this;
	var obj = evt.target ? evt.target : evt.srcElement;
	var region = sap.ui.getCore().byId($(obj).attr("id"));

	if(region.getGroup()){
		this._isSelect = false;
		var groupId = region.getGroupId();
		var selectColor = region.getSelectColor();

		this.getRegion().forEach(function(r){
			if(r.getGroupId() == groupId) {
				$("#"+r.getId()).css("fill", selectColor);
				r.setProperty("isSelected", true, true);
				r.setProperty("fill", selectColor, true);
			}else if(r.getGroupId() == that._seletedContinentId){
				$("#"+r.getId()).css("fill", that._seletedContinentColor);
				r.setProperty("isSelected", false, true);
				r.setProperty("fill", that._seletedContinentColor, true);
			}
		});

		this._seletedContinentId = groupId;
		this._seletedContinentColor = region.getOriginalFill();

		this.fireSelect({code:groupId.substring(groupId.lastIndexOf("-")+1), name:region.getGroupTitle()});
	}else if(this.getSelectable()){
		if(obj.tagName.toLowerCase() == "path"){
			if(!sap.ui.getCore().byId($(obj).attr("id")).getSelectable()) return;
			var regionCode = $(obj).attr("id").substring($(obj).attr("id").lastIndexOf("-")+1);
			this.moveTo(regionCode);
		}
	}else {
		this._isSelect = false;
		var region = sap.ui.getCore().byId($(obj).attr("id"));
		this.fireSelect({code:region.getId().substring(region.getId().lastIndexOf("-")+1), name:region.getTitle()});
	}
};

sapui6.ui.map.Map.prototype.mouseover = function(evt){
	var obj = evt.target ? evt.target : evt.srcElement;

	if(obj.tagName.toLowerCase() == "path"){
		var region = sap.ui.getCore().byId($(obj).attr("id"));
		if(region.getIsSelected()) return;

		var label = $("#"+this.getId()+"-div-label");

		if(region.getGroup()){
			var groupId = region.getGroupId();
			var groupTitle = (region.getGroupTitle()=="")?region.getTitle():region.getGroupTitle();
			var overColor = region.getOverColor();

			this.getRegion().forEach(function(r){
				if(r.getGroupId() == groupId) {
					$("#"+r.getId()).css("fill", overColor);
				}
			});
			$(label).html(groupTitle);
			$(label).css("left",evt.pageX-50);
			$(label).css("top",evt.pageY-40);
			$(label).css("display","inline-block");
		}else{
			$(obj).css("fill", region.getOverColor());
			$(label).html(region.getTitle());
			$(label).css("left",evt.pageX-50);
			$(label).css("top",evt.pageY-40);
			if(this.getVisibleRegionTitle()) $(label).css("display","inline-block");
		}
	}
};

sapui6.ui.map.Map.prototype.mouseout = function(evt){
	$("#"+this.getId()+"-div-label").css("display","none");
	var obj = evt.target ? evt.target : evt.srcElement;

	if(obj.tagName.toLowerCase() == "path"){
		var region = sap.ui.getCore().byId($(obj).attr("id"));
		if(region.getIsSelected()) return;

		var label = $("#"+this.getId()+"-div-label");

		if(region.getGroup()){
			var groupId = region.getGroupId();
			var groupTitle = region.getGroupTitle();
			var originalColor = region.getOriginalFill();

			this.getRegion().forEach(function(r){
				if(r.getGroupId() == groupId) {
					$("#"+r.getId()).css("fill", originalColor);
				}
			});
			$(label).html(groupTitle);
		}else{
			$(obj).css("fill", region.getOriginalFill());
		}
	}
};

jQuery.sap.declare("sapui6.ui.map.Region");
jQuery.sap.require("sap.ui.core.Element");
sap.ui.core.Element.extend("sapui6.ui.map.Region", { 
    metadata : {       
        library : "sapui6.ui.map",                      
        properties : {
        	"visible" : {type : "boolean", defaultValue: true},
            "id" : {type : "string", defaultValue : null},
            "title" : {type : "string", defaultValue : null},
            "continent" : {type : "string", defaultValue : null},
            "continentTitle" : {type : "string", defaultValue : null},
            "d" : {type : "string", defaultValue : null},
            "originalFill" : {type:"string", defaultValue : null},
            "fill" : {type:"string", defaultValue : null}, 
            "fillOpacity" : {type:"string", defaultValue : "1"},
            "stroke" : {type:"string", defaultValue : "#ffffff"}, 
            "strokeOpacity" : {type:"string", defaultValue : "1"},
            "strokeWidth" : {type:"string", defaultValue : "0.5"},
            "selectColor" : {type:"string", defaultValue : null},
            "overColor" : {type:"string", defaultValue : null},
            "isSelected" : {type:"boolean", defaultValue: false},
            "selectable" : {type:"boolean", defaultValue: true},
            "bubble" : {type:"boolean", defaultValue: false},
            "bubbleRadius" : {type:"float", defaultValue: 0},
            "bubbleColor" : {type:"string", defaultValue: "#ff9900"},
            "bubbleOpacity" : {type:"string", defaultValue: "0.8"},
            "bubbleTitle" : {type:"string", defaultValue: null},
            "group" : {type:"boolean", defaultValue: false},
            "groupTitle" : {type:"string", defaultValue: null},
            "groupId" : {type:"string", defaultValue: null},
            "scale" : {type:"string", defaultValue: "1"},
            "x" : {type:"string", defaultValue: "0"},
            "y" :  {type:"string", defaultValue: "0"},
            "left" : {type:"string", defaultValue: "0"},
            "top" :  {type:"string", defaultValue: "0"}
        },
        defaultAggregation : "content",
        aggregations : {
            "content" : {type : "sap.ui.core.Control", multiple : false}
        }
    }
});