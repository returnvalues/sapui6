jQuery.sap.declare("sapui6.ui.layout.InlineForm"),jQuery.sap.require("sap.ui.core.Control"),sap.ui.core.Control.extend("sapui6.ui.layout.InlineForm",{metadata:{library:"sapui6.ui.layout",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:!0},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minusWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"0px"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},margin:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginLeft:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginRight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginTop:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginBottom:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},border:{type:"boolean",group:"Appearance",defaultValue:!0},borderColor:{type:"string",group:"Appearance",defaultValue:null},strongColor:{type:"string",group:"Appearance",defaultValue:null},labelBold:{type:"boolean",group:"Appearance",defaultValue:!1},fontSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textColor:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",defaultValue:null},titleColor:{type:"string",group:"Appearance",defaultValue:null},titleFontSize:{type:"string",group:"Dimension",defaultValue:null},resize:{type:"boolean",defaultValue:!0}},defaultAggregation:"button",aggregations:{button:{type:"sap.ui.commons.Button",multiple:!0,singularName:"button"},toolbar:{type:"sap.ui.commons.Toolbar",multiple:!1},item:{type:"sap.ui.core.Control",multiple:!0,singularName:"item"}}},settings:null,onBeforeRendering:function(){jQuery.sap.require("sap.ui.core.theming.Parameters"),this.getTitleColor()||this.setProperty("titleColor",sap.ui.core.theming.Parameters.get("sapTitleColor"),!0),this.getBorderColor()||this.setProperty("borderColor",sap.ui.core.theming.Parameters.get("sapUiBaseBorder"),!0),this.getStrongColor()||this.setProperty("strongColor",sap.ui.core.theming.Parameters.get("sapActiveColor"),!0),this.getFontSize()||this.setProperty("fontSize",sap.ui.core.theming.Parameters.get("sapUiDesktopFontSize"),!0),this.getTitleFontSize()||this.setProperty("titleFontSize",sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"),!0),this.getBackgroundColor()||this.setProperty("backgroundColor",sap.ui.core.theming.Parameters.get("sapUiTableRowBG"),!0),this.getTextColor()||this.setProperty("textColor",sap.ui.core.theming.Parameters.get("sapTextColor"),!0)},renderer:function(t,e){if(e.getVisible()&&e.settings){t.write("<div"),t.writeControlData(e),t.addClass("sapui6_formLayout"),t.writeClasses(),e.getWidth()&&t.addStyle("width",e.getWidth()),e.getMargin()&&t.addStyle("margin",e.getMargin()),e.getMarginLeft()&&t.addStyle("margin-left",e.getMarginLeft()),e.getMarginRight()&&t.addStyle("margin-right",e.getMarginRight()),e.getMarginTop()&&t.addStyle("margin-top",e.getMarginTop()),e.getMarginBottom()&&t.addStyle("margin-bottom",e.getMarginBottom()),t.writeStyles(),t.write(">"),e.getToolbar()?(t.write("<div>"),t.renderControl(e.getToolbar()),t.write("</div>")):(e.getButton().length>0||e.getTitle())&&(t.write("<div"),0==e.getButton().length&&(t.addStyle("margin-bottom","5px"),t.writeStyles()),t.write(">"),e.getButton().length>0&&(t.write("<span"),t.addClass("btn-right"),t.writeClasses(),t.write(">"),e.getButton().forEach(function(e,i){t.write("<span style='margin-left:5px;'>"),t.renderControl(e),t.write("</span>")})),t.write("</span>"),e.getTitle()&&(t.write("<span"),t.addClass("title"),t.writeClasses(),t.addStyle("color",e.getTitleColor()),t.addStyle("font-size",e.getTitleFontSize()),e.getStrongColor()&&t.addStyle("border-left-color",e.getStrongColor()),t.writeStyles(),t.write(">"),t.write(e.getTitle()),t.write("</span>")),t.write("</div>")),t.write("<div"),t.writeAttribute("id",e.getId()+"-inline-form"),t.addClass("inlineForm"),t.writeClasses(),t.addStyle("background-color",e.getBackgroundColor()),t.addStyle("border-top-color",e.getStrongColor()),t.addStyle("border-left-color",e.getBorderColor()),t.addStyle("border-right-color",e.getBorderColor()),t.addStyle("border-bottom-color",e.getBorderColor()),t.writeStyles(),t.write(">");var i=e.settings.length;t.write("<span"),t.addClass("btn-right"),t.writeClasses(),t.write(">");for(var r=0;i>r;r++){var a=e.settings[r];void 0!=a.side&&"right"==a.side&&(void 0!=a.label&&(t.write("<span"),t.addStyle("color",e.getTextColor()),t.addStyle("font-size",e.getFontSize()),t.addStyle("margin-left","10px"),t.addStyle("margin-right","10px"),e.getLabelBold()&&t.addStyle("font-weight","bold"),t.writeStyles(),t.write(">"),void 0!=a.label&&t.write(a.label),t.write("</span>")),void 0!=a.element&&a.element.forEach(function(e,i){t.write("<span style='margin-left:5px;'>"),t.renderControl(e),t.write("</span>")}))}t.write("</span>");for(var o=e.getItem(),n=0,r=0;i>r;r++){var a=e.settings[r];if(void 0==a.side||"left"==a.side){if(void 0!=a.label){t.write("<span"),t.addStyle("color",e.getTextColor()),t.addStyle("font-size",e.getFontSize()),r>0&&t.addStyle("margin-left","10px"),t.addStyle("margin-right","10px"),e.getLabelBold()&&t.addStyle("font-weight","bold"),t.writeStyles(),t.write(">");var l=new sap.ui.commons.Label({text:a.label});a.required&&l.setRequired(a.required),a.requiredAtBegin&&l.setRequiredAtBegin(a.requiredAtBegin),t.renderControl(l),t.write("</span>")}void 0!=a.element&&a.element.forEach(function(e,i){t.write("<span"),t.addStyle("margin-right","5px"),t.writeStyles(),t.write(">"),t.renderControl(o[n]),t.write("</span>"),n++})}}t.write("</div>"),t.write("</div>")}},onAfterRendering:function(){var t=$("#"+this.getId()),e=t.parent().width();if(0==e&&this.getWidth().indexOf("%")>-1)var i=window.setInterval(function(){if(e=t.parent().width(),e>0){window.clearInterval(i),objWidth=e*(parseFloat(n.getWidth().split("%")[0])/100);var r=0;n.getMarginLeft()||n.getMarginRight()?(n.getMarginLeft()&&(r+=parseInt(n.getMarginLeft().split("px")[0])),n.getMarginRight()&&(r+=parseInt(n.getMarginRight().split("px")[0]))):n.getMargin()&&(r=2*parseInt(n.getMargin().split("px")[0])),$("#"+n.getId()).css("width",String(objWidth-r-parseInt(n.getMinusWidth().split("px")[0]))+"px")}},100);else if(this.getWidth().indexOf("px")>-1){var r=this.getWidth().split("px")[0];$("#"+this.getId()).css("width",String(r-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}else if(t.outerWidth()>=e){var a=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(a+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(a+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(a=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(e-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}if(this.getResize()){var o=parseFloat($("#"+this.getId()).outerWidth()/$(window).width()),n=this;jQuery.sap.delayedCall(50,n,function(){n.resizeLayout(o)}),$(window).resize(function(){jQuery.sap.delayedCall(50,n,function(){n.resizeLayout(o)})})}}}),sapui6.ui.layout.InlineForm.prototype.resizeLayout=function(t){$("#"+this.getId()).css("width",String(parseInt($(window).width()*t))+"px");var e=$("#"+this.getId()),i=e.parent().width();if(e.outerWidth()>=i){var r=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(r+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(r+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(r=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(i-r-parseInt(this.getMinusWidth().split("px")[0]))+"px")}},sapui6.ui.layout.InlineForm.prototype.set=function(t){this.settings=t;var e=this;this.settings.forEach(function(t){t.element.forEach(function(t){e.addAggregation("item",t)})})};