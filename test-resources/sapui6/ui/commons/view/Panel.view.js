sap.ui.jsview("view.Panel", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.Panel");

                var oLayout = new sap.ui.layout.HorizontalLayout({width:"100%"});
                oLayout.addContent(this.createPanel("Panel Title - Default",null,null,null));
                // oLayout.addContent(this.createPanel("Panel Title - Orange","#f27020","#fff","#220000"));
                // oLayout.addContent(this.createPanel("Panel Title - Green","#008a3b","#fff","#220000"));
                oLayout.addContent(this.createPanel("Panel Title - Yellow","#f0ab00","#fff","#220000"));
                oLayout.addContent(this.createPanel("Panel Title - Blue","#007cc0","#fff","#220000"));
                // oLayout.addContent(this.createPanel("Panel Title - Red","#e52929","#fff","#220000"));
                // oLayout.addContent(this.createPanel("Panel Title - Purple","#ab218e","#fff","#220000"));

                return oLayout;
	},

        createPanel : function (title, headerBackgroundColor, titleColor, iconHoverColor){
                var oPanel = new sapui6.ui.commons.Panel({
                        width: "484px",
                        height: "320px",
                        title: title,
                        headerBackgroundColor : headerBackgroundColor,
                        titleColor : titleColor,
                        iconHoverColor : iconHoverColor
                });

                oPanel.addContent(new sap.ui.core.HTML({content:"<div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div><br><div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div><br><div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div><br><div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div><br><div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div><br><div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div>"}));
                oPanel.addIcon(new sap.ui.core.Icon({src:"sap-icon://action",press:function(){alert("Click Action");}}));
                oPanel.addIcon(new sap.ui.core.Icon({src:"sap-icon://save",press:function(){alert("Click Save");}}));
                oPanel.addIcon(new sap.ui.core.Icon({src:"sap-icon://refresh",press:function(){alert("Click Refresh");}}));

                return oPanel;
        }
});