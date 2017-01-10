sap.ui.jsview("view.LayoutCombine", {

	createContent : function (oController) {
	jQuery.sap.require("sapui6.ui.layout.Layout2U");
        jQuery.sap.require("sapui6.ui.layout.Layout3U");

        var layout2U = new sapui6.ui.layout.Layout2U({leftWidth:"30%", rightWidth:"70%"});
        var layout3U = new sapui6.ui.layout.Layout3U({width:"100%", leftWidth:"50%", rightWidth:"50%", topHeight:"500px"});
        var layout3U_2 = new sapui6.ui.layout.Layout3U({width:"100%", leftWidth:"50%", rightWidth:"50%", topHeight:"250px"});

        var a = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:yellow;">A</div>'});
        var b = new sap.ui.core.HTML({content:'<div style="width:100%;height:250px;font-weight:bold;font-size:100px;text-align:center;background-color:green;">B</div>'});
        var c = new sap.ui.core.HTML({content:'<div style="width:100%;height:250px;font-weight:bold;font-size:100px;text-align:center;background-color:blue;">C</div>'});
        var d = new sap.ui.core.HTML({content:'<div style="width:100%;height:250px;font-weight:bold;font-size:100px;text-align:center;background-color:red;">D</div>'});
        var e = new sap.ui.core.HTML({content:'<div style="width:100%;height:500px;font-weight:bold;font-size:100px;text-align:center;background-color:gray;">E</div>'});
        var f = new sap.ui.core.HTML({content:'<div style="width:100%;height:200px;font-weight:bold;font-size:100px;text-align:center;background-color:ivory;">F</div>'});

        layout3U_2.addContent(b.data("position","A"));
        layout3U_2.addContent(c.data("position","B"));
        layout3U_2.addContent(d.data("position","C"));

        layout3U.addContent(layout3U_2.data("position","A"));
        layout3U.addContent(e.data("position","B"));
        layout3U.addContent(f.data("position","C"));

        layout2U.addContent(a.data("position","A"));
        layout2U.addContent(layout3U.data("position","B"));

        return layout2U; 
	}
});