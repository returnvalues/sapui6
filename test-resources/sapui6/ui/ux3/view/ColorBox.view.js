sap.ui.jsview("view.ColorBox", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.ColorBox");

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(this.createColorBox("ColorConentBox - Default",null,null));
                oLayout.addContent(this.createColorBox("ColorConentBox - Orange","#f27020","#f27020"));
                // oLayout.addContent(this.createColorBox("ColorConentBox - Green","#008a3b","#008a3b"));
                // oLayout.addContent(this.createColorBox("ColorConentBox - Yellow","#f0ab00","#f0ab00"));
                // oLayout.addContent(this.createColorBox("ColorConentBox - Red","#e52929","#e52929"));

                return oLayout;
	},

        createColorBox : function(title, titleColor, statusColor){
                var oColorBox = new sapui6.ui.ux3.ColorBox({
                        width:"400px",
                        height:"150px",
                        title:title,
                        titleColor: titleColor,
                        statusColor: statusColor
                });

                oColorBox.setContent(new sap.ui.core.HTML({content:"<div>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.<br><br>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</div>"}));
           
                return oColorBox;
        }
});