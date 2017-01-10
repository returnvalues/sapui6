sap.ui.jsview("view.Layout2u", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.layout.Layout2U");
        var oLayout = new sapui6.ui.layout.Layout2U({
            leftWidth : "50%",
            rightWidth : "50%"
            // animation : "slide", //animation effect - slide, fadeout, rotate, flip, scale
            // visible : true
        });

        var a1 = new sap.ui.core.HTML({content:'<div style="width:100%;height:350px;font-weight:bold;font-size:100px;text-align:center;background-color:yellow;">A1</div>'});
        var a2 = new sap.ui.core.HTML({content:'<div style="width:100%;height:350px;font-weight:bold;font-size:100px;text-align:center;background-color:gray;">A2</div>'});
        var b = new sap.ui.core.HTML({content:'<div style="width:100%;height:700px;font-weight:bold;font-size:100px;text-align:center;background-color:green;">B</div>'});

        oLayout.addContent(a1.data("position","A"));    //.data("position","A") is left side.
        oLayout.addContent(a2.data("position","A"));
        oLayout.addContent(b.data("position","B"));     //.data("position","B") is right side.

        return oLayout;
	}
});