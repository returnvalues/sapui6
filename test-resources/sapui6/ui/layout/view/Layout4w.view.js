sap.ui.jsview("view.Layout4w", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.layout.Layout4W");
        var oLayout = new sapui6.ui.layout.Layout4W({
            width : "100%",
            leftWidth : "25%",
            leftMiddleWidth : "25%",
            rightMiddleWidth : "25%",
            rightWidth : "25%"
            // animation : "slide", //animation effect - slide, fadeout, rotate, flip, scale
            // visible : true
        });

        var a = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:yellow;">A</div>'});
        var b = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:green;">B</div>'});
        var c = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:blue;">C</div>'});
        var d = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:red;">D</div>'});

        oLayout.addContent(a.data("position","A")); // .data("position","A") is left side.
        oLayout.addContent(b.data("position","B")); // .data("position","B") is left-middle side.
        oLayout.addContent(c.data("position","C")); // .data("position","C") is right-middle side.
        oLayout.addContent(d.data("position","D")); // .data("position","D") is right side.

        return oLayout;
	}
});