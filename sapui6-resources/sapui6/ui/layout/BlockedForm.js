jQuery.sap.declare("sapui6.ui.layout.BlockedForm"),jQuery.sap.require("sap.ui.core.Control"),sap.ui.core.Control.extend("sapui6.ui.layout.BlockedForm",{metadata:{library:"sapui6.ui.layout",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:!0},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minusWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"0px"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},margin:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginLeft:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginRight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginTop:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},marginBottom:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},columns:{type:"int",group:"Appearance",defaultValue:1},widths:{type:"sap.ui.core.CSSSize[]",group:"Appearance",defaultValue:null},borderColor:{type:"string",group:"Appearance",defaultValue:null},strongColor:{type:"string",group:"Appearance",defaultValue:null},labelBackgroundColor:{type:"string",group:"Appearance",defaultValue:null},labelBold:{type:"boolean",group:"Appearance",defaultValue:!1},labelAlign:{type:"string",group:"Appearance",defaultValue:null},fontSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textColor:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",defaultValue:null},titleColor:{type:"string",group:"Appearance",defaultValue:null},titleFontSize:{type:"string",group:"Dimension",defaultValue:null},resize:{type:"boolean",defaultValue:!0}},defaultAggregation:"button",aggregations:{button:{type:"sap.ui.commons.Button",multiple:!0,singularName:"button"},toolbar:{type:"sap.ui.commons.Toolbar",multiple:!1},item:{type:"sap.ui.core.Control",multiple:!0,singularName:"item"}}},settings:null,onBeforeRendering:function(){jQuery.sap.require("sap.ui.core.theming.Parameters"),this.getTitleColor()||this.setProperty("titleColor",sap.ui.core.theming.Parameters.get("sapTitleColor"),!0),this.getBorderColor()||this.setProperty("borderColor",sap.ui.core.theming.Parameters.get("sapUiBaseBorder"),!0),this.getStrongColor()||this.setProperty("strongColor",sap.ui.core.theming.Parameters.get("sapActiveColor"),!0),this.getLabelBackgroundColor()||this.setProperty("labelBackgroundColor",sap.ui.core.theming.Parameters.get("sapUiListHeaderBackground"),!0),this.getFontSize()||this.setProperty("fontSize",sap.ui.core.theming.Parameters.get("sapUiDesktopFontSize"),!0),this.getTitleFontSize()||this.setProperty("titleFontSize",sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"),!0),this.getBackgroundColor()||this.setProperty("backgroundColor",sap.ui.core.theming.Parameters.get("sapUiTableRowBG"),!0),this.getTextColor()||this.setProperty("textColor",sap.ui.core.theming.Parameters.get("sapTextColor"),!0)},renderer:function(t,e){if(e.getVisible()&&e.settings){if(t.write("<div"),t.writeControlData(e),t.addClass("sapui6_formLayout"),t.writeClasses(),e.getWidth()&&t.addStyle("width",e.getWidth()),e.getMargin()&&t.addStyle("margin",e.getMargin()),e.getMarginLeft()&&t.addStyle("margin-left",e.getMarginLeft()),e.getMarginRight()&&t.addStyle("margin-right",e.getMarginRight()),e.getMarginTop()&&t.addStyle("margin-top",e.getMarginTop()),e.getMarginBottom()&&t.addStyle("margin-bottom",e.getMarginBottom()),t.writeStyles(),t.write(">"),e.getToolbar()?(t.write("<div>"),t.renderControl(e.getToolbar()),t.write("</div>")):(e.getButton().length>0||e.getTitle())&&(t.write("<div"),0==e.getButton().length&&(t.addStyle("margin-bottom","5px"),t.writeStyles()),t.write(">"),e.getButton().length>0&&(t.write("<span"),t.addClass("btn-right"),t.writeClasses(),t.write(">"),e.getButton().forEach(function(e,i){t.write("<span style='margin-left:5px;'>"),t.renderControl(e),t.write("</span>")})),t.write("</span>"),e.getTitle()&&(t.write("<span"),t.addClass("title"),t.writeClasses(),t.addStyle("color",e.getTitleColor()),t.addStyle("font-size",e.getTitleFontSize()),e.getStrongColor()&&t.addStyle("border-left-color",e.getStrongColor()),t.writeStyles(),t.write(">"),t.write(e.getTitle()),t.write("</span>")),t.write("</div>")),t.write("<table"),t.addStyle("border-top-color",e.getStrongColor()),t.addStyle("border-left-color",e.getBorderColor()),t.addStyle("border-right-color",e.getBorderColor()),t.addStyle("border-bottom-color",e.getBorderColor()),t.addStyle("font-size",e.getFontSize()),t.addStyle("background-color",e.getBackgroundColor()),t.addStyle("color",e.getTextColor()),t.writeStyles(),t.write(">"),e.getWidths()){t.write("<colgroup>");var i=e.getWidths().length;i>e.getColumns()&&(i=e.getColumns());for(var r=0;i>r;r++)t.write("<col"),t.addStyle("width",e.getWidths()[r]),t.writeStyles(),t.write("/>");t.write("</colgroup>")}t.write("<tbody>");for(var a=[],r=0;s>r;r++)a.push(1);for(var o=e.getItem(),n=0,l=0,s=e.getColumns(),g=e.settings.length,r=0;g>r;r++){var p=e.settings[r],u=l;if(void 0!=p.rowspan&&(a[u]=p.rowspan),void 0==p.colspan?l++:l+=parseInt(p.colspan),l%s==1&&t.write("<tr>"),t.write("<td"),void 0!=p.rowspan&&t.writeAttribute("rowspan",p.rowspan),void 0!=p.colspan?t.writeAttribute("colspan",parseInt(p.colspan)):r==g-1&&t.writeAttribute("colspan",s-(l-1)),void 0!=p.align&&(t.addStyle("text-align",p.align),t.writeStyles()),t.write(">"),t.write("<span"),void 0!=p.label){e.getLabelBold()&&(t.addStyle("font-weight","bold"),t.writeStyles()),t.write(">");var d=new sap.ui.commons.Label({text:p.label});p.required&&d.setRequired(p.required),p.requiredAtBegin&&d.setRequiredAtBegin(p.requiredAtBegin),t.renderControl(d),t.write("</span>"),t.write("<br>")}void 0!=p.element&&(t.write("<span>"),p.element.forEach(function(e){t.write("<span style='margin-right:5px;'>"),t.renderControl(o[n]),t.write("</span>"),n++}),t.write("</span>")),t.write("</td>"),a[u]>1&&void 0==p.rowspan&&(l++,a[u]-=1),(l==s||r==g-1)&&(t.write("</tr>"),l=0)}t.write("</tbody>"),t.write("</table>"),t.write("</div>")}},onAfterRendering:function(){var t=$("#"+this.getId()),e=t.parent().width();if(0==e&&this.getWidth().indexOf("%")>-1)var i=window.setInterval(function(){if(e=t.parent().width(),e>0){window.clearInterval(i),objWidth=e*(parseFloat(n.getWidth().split("%")[0])/100);var r=0;n.getMarginLeft()||n.getMarginRight()?(n.getMarginLeft()&&(r+=parseInt(n.getMarginLeft().split("px")[0])),n.getMarginRight()&&(r+=parseInt(n.getMarginRight().split("px")[0]))):n.getMargin()&&(r=2*parseInt(n.getMargin().split("px")[0])),$("#"+n.getId()).css("width",String(objWidth-r-parseInt(n.getMinusWidth().split("px")[0]))+"px")}},100);else if(this.getWidth().indexOf("px")>-1){var r=this.getWidth().split("px")[0];$("#"+this.getId()).css("width",String(r-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}else if(t.outerWidth()>=e){var a=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(a+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(a+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(a=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(e-a-parseInt(this.getMinusWidth().split("px")[0]))+"px")}if(this.getResize()){var o=parseFloat($("#"+this.getId()).outerWidth()/$(window).width()),n=this;jQuery.sap.delayedCall(50,n,function(){n.resizeLayout(o)}),$(window).resize(function(){jQuery.sap.delayedCall(50,n,function(){n.resizeLayout(o)})})}}}),sapui6.ui.layout.BlockedForm.prototype.resizeLayout=function(t){$("#"+this.getId()).css("width",String(parseInt($(window).width()*t))+"px");var e=$("#"+this.getId()),i=e.parent().width();if(e.outerWidth()>=i){var r=0;this.getMarginLeft()||this.getMarginRight()?(this.getMarginLeft()&&(r+=parseInt(this.getMarginLeft().split("px")[0])),this.getMarginRight()&&(r+=parseInt(this.getMarginRight().split("px")[0]))):this.getMargin()&&(r=2*parseInt(this.getMargin().split("px")[0])),$("#"+this.getId()).css("width",String(i-r-parseInt(this.getMinusWidth().split("px")[0]))+"px")}},sapui6.ui.layout.BlockedForm.prototype.set=function(t){this.settings=t;var e=this;this.settings.forEach(function(t){t.element.forEach(function(t){e.addAggregation("item",t)})})};