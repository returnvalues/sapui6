sap.ui.jsview("view.Layout4t", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.layout.Layout4T");
        var oLayout = new sapui6.ui.layout.Layout4T({
            width : "100%",
            leftWidth : "33%",
            middleWidth : "34%",
            rightWidth : "33%",
            topHeight : "300px"
            // animation : "slide", //animation effect - slide, fadeout, rotate, flip, scale
            // visible : true
        });

        var a = new sap.ui.core.HTML({content:'<div style="width:100%;height:300px;font-weight:bold;font-size:100px;text-align:center;background-color:yellow;">A</div>'});
        var b = new sap.ui.core.HTML({content:'<div style="width:100%;height:300px;font-weight:bold;font-size:100px;text-align:center;background-color:green;">B</div>'});
        var c = new sap.ui.core.HTML({content:'<div style="width:100%;height:300px;font-weight:bold;font-size:100px;text-align:center;background-color:blue;">C</div>'});
        var d = new sap.ui.core.HTML({content:'<div style="width:100%;height:300px;font-weight:bold;font-size:100px;text-align:center;background-color:red;">D</div>'});

        oLayout.addContent(a.data("position","A")); // .data("position","A") is top side.
        oLayout.addContent(b.data("position","B")); // .data("position","B") is bottom-left side.
        oLayout.addContent(c.data("position","C")); // .data("position","C") is bottom-middle side.
        oLayout.addContent(d.data("position","D")); // .data("position","D") is bottom-right side.

        return oLayout;
	}
});