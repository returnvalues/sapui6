jQuery.sap.declare("sapui6.ui.layout.CenterInlineLayout"),jQuery.sap.require("sap.ui.core.Control"),sap.ui.core.Control.extend("sapui6.ui.layout.CenterInlineLayout",{metadata:{library:"sapui6.ui.layout",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:!0},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minusWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"0px"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},margin:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginLeft:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginRight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginTop:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginBottom:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},resize:{type:"boolean",defaultValue:!0}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:!0,singularName:"content"}}},onBeforeRendering:function(){},renderer:function(t,e){if(e.getVisible()){t.write("<div"),t.writeControlData(e),t.addStyle("text-align","center"),e.getWidth()&&t.addStyle("width",e.getWidth()),e.getMargin()&&t.addStyle("margin",e.getMargin()),e.getMarginLeft()&&t.addStyle("margin-left",e.getMarginLeft()),e.getMarginRight()&&t.addStyle("margin-right",e.getMarginRight()),e.getMarginTop()&&t.addStyle("margin-top",e.getMarginTop()),e.getMarginBottom()&&t.addStyle("margin-bottom",e.getMarginBottom()),t.writeStyles(),t.write(">");for(var i=e.getContent(),n=i.length,a=0;n>a;a++)t.write("<span"),n-1>a&&(t.addStyle("margin-right","5px"),t.writeStyles()),t.write(">"),t.renderControl(i[a]),t.write("</span>");t.write("</div>")}},onAfterRendering:function(){var t=$("#"+this.getId()),e=t.parent().width();if(0==e&&this.getWidth().indexOf("%")>-1)var i=window.setInterval(function(){if(e=t.parent().width(),e>0){window.clearInterval(i),objWidth=e*(parseFloat(g.getWidth().split("%")[0])/100);var n=0;g.getMarginLeft()||g.getMarginRight()?(g.getMarginLeft()&&(n+=parseInt(g.getMarginLeft().split("px")[0])),g.getMarginRight()&&(n+=parseInt(g.getMarginRight().split("px")[0]))):g.getMargin()&&(n=2*parseInt(g.getMargin().split("px")[0])),$("#"+g.getId()).css("width",String(objWidth-n-parseInt(g.getMinusWidth().split("px")[0]))+"px")}},100);else if(this.getWidth().indexOf("px")>-1){var n=this.getWidth().split("px")[0];$("#"+this.getId()).css("width",String(n-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}else if(t.outerWidth()>=e){var a=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(a+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(a+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(a=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(e-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}if(this.getResize()){var r=parseFloat($("#"+this.getId()).outerWidth()/$(window).width()),g=this;jQuery.sap.delayedCall(50,g,function(){g.resizeLayout(r)}),$(window).resize(function(){jQuery.sap.delayedCall(50,g,function(){g.resizeLayout(r)})})}}}),sapui6.ui.layout.CenterInlineLayout.prototype.resizeLayout=function(t){$("#"+this.getId()).css("width",String(parseInt($(window).width()*t))+"px");var e=$("#"+this.getId()),i=e.parent().width();if(e.outerWidth()>=i){var n=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(n+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(n+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(n=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(i-n-parseInt(this.getMinusWidth().split("px")[0]))+"px")}};