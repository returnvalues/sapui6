jQuery.sap.declare("sapui6.ui.layout.Layout1C"),sap.ui.core.Control.extend("sapui6.ui.layout.Layout1C",{metadata:{library:"sapui6.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},animation:{type:"string",defaultValue:""},visible:{type:"boolean",group:"Appearance",defaultValue:!0}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:!0,singularName:"content"}}},renderer:function(e,t){if(t.getVisible()){e.write("<div"),e.writeControlData(t),e.addStyle("margin","0px 0px 0px 0px"),e.addStyle("padding","0px 0px 0px 0px"),e.addStyle("border-spacing","0px"),e.addStyle("width",t.getWidth()),""!=t.getMinWidth()&&e.addStyle("min-width",t.getMinWidth()),e.writeStyles(),e.write(">");for(var i=t.getContent(),a=i.length,n=0;a>n;n++)e.write("<div"),""!=t.getAnimation()&&(e.addClass("sapui6_"+t.getAnimation()),e.writeClasses()),e.write(">"),e.renderControl(i[n]),e.write("</div>");e.write("</div>")}}});