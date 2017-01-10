jQuery.sap.declare("sapui6.ui.commons.TimePicker"),jQuery.sap.require("sap.ui.core.Control"),sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.TimePicker",{metadata:{library:"sapui6.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100px"},hhmm:{type:"string",defaultValue:null},interval:{type:"int",defaultValue:30},visible:{type:"boolean",defaultValue:!0}}},timePopup:null,renderer:{},onBeforeRendering:function(){this.setIconURL("sap-icon://customer-history"),this.setWidth(this.getWidth()),this.attachValueHelpRequest(this.open)}}),sapui6.ui.commons.TimePicker.prototype.bindValue=function(e){this.bindProperty("value",{parts:[{path:e}],formatter:function(e){if(void 0==e||null==e||1==e)return e;var t=parseInt(e.split(":")[0]),i=e.split(":")[1],o="AM";return t>12&&(t-=12,o="PM"),t+":"+i+" "+o}})},sapui6.ui.commons.TimePicker.prototype.getParseValue=function(){return this.getBindingInfo("value").binding.oValue},sapui6.ui.commons.TimePicker.prototype.open=function(){var e=[1,5,10,15,20,30,60],t=this.getInterval(),i=!1;if(e.forEach(function(e){e==t&&(i=!0)}),i){var o=this;if(null==this.timePopup){var s=new sap.ui.commons.ListBox(this.getId()+"-listbox",{visibleItems:10,select:function(){o.setValue(this.getSelectedItem().getText()),o.timePopup.close()}});s.setWidth(this.getWidth());for(var u=12,p=12,n=0,r="AM",a="";36>p;){var l=10>n?"0"+n:n;13==u&&(u=1),24==p&&(r="PM"),a=u+":"+l+" "+r,s.addItem(new sap.ui.core.Item({text:a})),n+=this.getInterval(),60==n&&(u++,p++,n=0)}jQuery.sap.require("sap.ui.core.Popup"),this.timePopup=new sap.ui.core.Popup,this.timePopup.setContent(s),this.timePopup.setShadow(!0),this.timePopup.setAutoClose(!0),this.timePopup.setAutoCloseAreas([this.getDomRef()]),this.timePopup.setDurations(0,0),this.timePopup.setInitialFocusId(this.getId()+"-input")}var m=sap.ui.core.Popup.Dock;this.timePopup.open(10,m.BeginTop,m.BeginBottom,this.getDomRef(),null,null,!0)}},sapui6.ui.commons.YearPicker.prototype.exit=function(){null!=this.timePopup&&this.timePopup.exit()};