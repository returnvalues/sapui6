jQuery.sap.declare("sapui6.m.Signature");
jQuery.sap.require("sap.ui.core.Control");

sap.ui.core.Control.extend("sapui6.m.Signature", { 
    metadata : {     
    	library : "sapui6.m",                        
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
			"width" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "400px"},
			"height" : {type: "sap.ui.core.CSSSize", group : "Misc", defaultValue : "100px"},
			"backgroundColor" : {type: "string", defaultValue: "#fff"},
			"borderStyle" : {type : "string" , defaultValue : "1px solid #000"},
			"strokeColor" : {type: "string", defaultValue:"#000"},
			"lineWidth" : {type:"int", defaultValue:2},
            "dataURL" : {type:"string", defaultValue:null}
		}
    },

    _canvas : null,
    _ctx : null,
    _prevPosition : null,
    _start : null,
    _end : null,

  	renderer : function(oRm, oControl){
  		if(!oControl.getVisible()) return;
    	oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addStyle("width", oControl.getWidth());
		oRm.addStyle("height", oControl.getHeight());
        oRm.addStyle("border", oControl.getBorderStyle());
        oRm.addStyle("background-color", oControl.getBackgroundColor());
        oRm.writeStyles();
		oRm.write(">");
		oRm.write("<canvas");
		oRm.writeAttribute("id", oControl.getId()+"-canvas");
		oRm.writeAttribute("width", oControl.getWidth());
		oRm.writeAttribute("height", oControl.getHeight());
        if(oControl.getDataURL()){
            oRm.addStyle("display", "none");
            oRm.writeStyles();
        }
		oRm.write("></canvas>");
        oRm.write("<img");
        if(oControl.getDataURL()){
            oRm.writeAttribute("src", oControl.getDataURL());
        }else{
            oRm.addStyle("display", "none");
            oRm.writeStyles();
        }
        oRm.writeAttribute("id", oControl.getId()+"-canvas-img");
        oRm.write(">");
		oRm.write("</div>");
    },

    onAfterRendering : function(){
    	this._canvas = document.getElementById(this.getId()+"-canvas");

	  	this._prevPosition = new Array();

	  	if (this._canvas.getContext) {
		    this._ctx = this._canvas.getContext('2d');
		    this._ctx.lineWidth = this.getLineWidth();
		    this._ctx.strokeStyle = this.getStrokeColor();

            this._canvas.onmousedown = this._startDraw.bind(this);
            this._canvas.onmouseup = this._stopDraw.bind(this);
            this._canvas.ontouchstart = this._startDraw.bind(this);
            this._canvas.ontouchend = this._stopDraw.bind(this);
            this._canvas.ontouchmove = this._draw.bind(this);
	  	}
    }
});

sapui6.m.Signature.prototype._startDraw = function(e){
	if (e.touches) {
    	for (var i = 1; i <= e.touches.length; i++) {
        	this._prevPosition[i] = this._getCoords(e.touches[i - 1]);
        }
        this._start = this._getCoords(e.touches[0]);
    }else {
        this._prevPosition[0] = this._getCoords(e);
        this._canvas.onmousemove = (this._draw).bind(this);
        this._start = this._getCoords(e);
    }
      
    return false;
};

sapui6.m.Signature.prototype._stopDraw = function(e){
    this._end = e.touches?this._prevPosition[1]:this._getCoords(e);

    if(this._start.x == this._end.x && this._start.y == this._end.y){
        this._ctx.arc(this._end.x, this._end.y, this.getLineWidth(), 0, 2 * Math.PI, false);
        this._ctx.fillStyle = this.getStrokeColor();
        this._ctx.fill();
    }

    this._ctx.closePath();
	e.preventDefault();
    this._canvas.onmousemove = null;
    this.setProperty("dataURL", this._canvas.toDataURL(), true);
};

sapui6.m.Signature.prototype._draw = function(e){
    this._ctx.beginPath();
	if (e.touches) {
        for (var i = 1; i <= e.touches.length; i++) {
          var p = this._getCoords(e.touches[i - 1]); 
          this._prevPosition[i] = this._drawLine(this._prevPosition[i].x, this._prevPosition[i].y, p.x, p.y);
        }
    } else {
        var p = this._getCoords(e);
        this._prevPosition[0] = this._drawLine(this._prevPosition[0].x, this._prevPosition[0].y, p.x, p.y);
    }
      
    this._ctx.stroke();

    return false;
};

sapui6.m.Signature.prototype._drawLine = function(sX, sY, eX, eY){
    this._ctx.moveTo(sX, sY);
    this._ctx.lineTo(eX, eY);

    return { x: eX, y: eY };
};

sapui6.m.Signature.prototype._getCoords = function(e){
	if(e.offsetX) {
        return { x: e.offsetX, y: e.offsetY };
    }else {
        return { x: e.pageX - this._canvas.offsetLeft, y: e.pageY - this._canvas.offsetTop };
    }
};

sapui6.m.Signature.prototype.clear = function(){
    this.setProperty("dataURL", null, true);
    this.invalidate();
};