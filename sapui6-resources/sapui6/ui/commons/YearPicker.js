jQuery.sap.declare("sapui6.ui.commons.YearPicker"),jQuery.sap.require("sap.ui.core.Control"),sap.ui.commons.ValueHelpField.extend("sapui6.ui.commons.YearPicker",{metadata:{library:"sapui6.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100px"},visible:{type:"boolean",defaultValue:!0}}},yearPopup:null,yearBox:null,renderer:{},onBeforeRendering:function(){this.setIconURL("sap-icon://calendar"),this.setWidth(this.getWidth()),this.attachValueHelpRequest(this.open)},onAfterRendering:function(){this.attachBrowserEvent("keypress",function(t){window.event?event.preventDefault():t.preventDefault()}),this.attachBrowserEvent("contextmenu",function(t){window.event?event.returnValue=!1:t.preventDefault()})}}),sapui6.ui.commons.YearPicker.prototype.open=function(t){var e=new Date,r=e.getFullYear();if(""!=this.getValue()&&(r=this.getValue()),null==this.monthPopup){var a=this;this.yearBox=new sapui6.ui.commons.YearBox({year:r,select:function(){a.setValue(a.yearBox.getYear()),a.monthPopup.close()}}),jQuery.sap.require("sap.ui.core.Popup"),this.yearPopup=new sap.ui.core.Popup,this.yearPopup.setContent(this.yearBox),this.yearPopup.setShadow(!0),this.yearPopup.setAutoClose(!0),this.yearPopup.setAutoCloseAreas([this.getDomRef()]),this.yearPopup.setDurations(0,0),this.yearPopup.setInitialFocusId(this.getId()+"-input")}$("#"+this.getId()+"-input").blur(function(){this.yearPopup.close()}.bind(this)),this.yearBox.setYear(r);var i=sap.ui.core.Popup.Dock;this.yearPopup.open(10,i.BeginTop,i.BeginBottom,this.getDomRef(),null,null,!0)},sapui6.ui.commons.YearPicker.prototype.exit=function(){null!=this.yearBox&&this.yearBox.destroy(),null!=this.yearPopup&&this.yearPopup.exit()},jQuery.sap.declare("sapui6.ui.commons.YearBox"),sap.ui.core.Control.extend("sapui6.ui.commons.YearBox",{metadata:{library:"sapui6.ui.commons",properties:{year:{type:"string",defaultValue:""}},events:{select:{}}},renderer:function(t,e){var r=parseInt(e.getYear());t.write("<div"),t.writeControlData(e),t.addClass("sapui6_mypicker"),t.writeClasses(),t.write(">"),t.write('	<div class="head">'),t.write('		<div class="prev" onmousedown="javascript:sap.ui.getCore().byId(\''+e.getId()+"').prev(event);\"></div>"),t.write('		<div class="title"'),t.writeAttribute("id",e.getId()+"-year"),t.write("		>"),t.writeEscaped(e.getYear()),t.write("		</div>"),t.write('		<div class="next" onmousedown="javascript:sap.ui.getCore().byId(\''+e.getId()+"').next(event);\"></div>"),t.write("	</div>"),t.write('	<table class="body" onmousedown="javascript:sap.ui.getCore().byId(\''+e.getId()+"').select(event);\">"),t.write('		<tbody">'),t.write("			<tr>"),t.write('				<td data-year="'+String(r-4)+'">'+String(r-4)+"</td>"),t.write('				<td data-year="'+String(r-3)+'">'+String(r-3)+"</td>"),t.write('				<td data-year="'+String(r-2)+'">'+String(r-2)+"</td>"),t.write("			</tr>"),t.write("			<tr>"),t.write('				<td data-year="'+String(r-1)+'">'+String(r-1)+"</td>"),t.write('				<td data-year="'+String(r)+'" class="active">'+String(r)+"</td>"),t.write('				<td data-year="'+String(r+1)+'">'+String(r+1)+"</td>"),t.write("			</tr>"),t.write("			<tr>"),t.write('				<td data-year="'+String(r+2)+'">'+String(r+2)+"</td>"),t.write('				<td data-year="'+String(r+3)+'">'+String(r+3)+"</td>"),t.write('				<td data-year="'+String(r+4)+'">'+String(r+4)+"</td>"),t.write("			</tr>"),t.write("			<tr>"),t.write('				<td data-year="'+String(r+5)+'">'+String(r+5)+"</td>"),t.write('				<td data-year="'+String(r+6)+'">'+String(r+6)+"</td>"),t.write('				<td data-year="'+String(r+7)+'">'+String(r+7)+"</td>"),t.write("			</tr>"),t.write('		</tbody">'),t.write('	<table">'),t.write('</div">')}}),sapui6.ui.commons.YearBox.M_EVENTS={select:"select"},sapui6.ui.commons.YearBox.prototype.init=function(){this.allowTextSelection(!1)},sapui6.ui.commons.YearBox.prototype.select=function(t){var e=t.target;if("TD"==e.tagName){var r=$(e).attr("data-year");this.setProperty("year",r,!0),this.fireSelect(),t.preventDefault(),t.stopPropagation()}},sapui6.ui.commons.YearBox.prototype.prev=function(t){var e=parseInt(this.getYear());$("#"+this.getId()+" table td").each(function(){$(this).text(parseInt($(this).text())-6),$(this).attr("data-year",parseInt($(this).attr("data-year"))-6),e==parseInt($(this).attr("data-year"))?$(this).addClass("active"):$(this).removeClass("active")}),t.preventDefault(),t.stopPropagation()},sapui6.ui.commons.YearBox.prototype.next=function(t){var e=parseInt(this.getYear());$("#"+this.getId()+" table td").each(function(){$(this).text(parseInt($(this).text())+6),$(this).attr("data-year",parseInt($(this).attr("data-year"))+6),e==parseInt($(this).attr("data-year"))?$(this).addClass("active"):$(this).removeClass("active")}),t.preventDefault(),t.stopPropagation()};