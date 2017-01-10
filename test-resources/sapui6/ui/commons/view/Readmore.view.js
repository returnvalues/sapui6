sap.ui.jsview("view.Readmore", {

	createContent : function (oController) {
	       jQuery.sap.require("sapui6.ui.commons.ReadMore");

                var oReadMore = new sapui6.ui.commons.ReadMore({
                	height: "500px",
                	text: "READ MORE",
                        scroll: false,
                        // button : new sap.ui.commons.Button({text:"READ MORE", style: sap.ui.commons.ButtonStyle.Emph})
                });
                
                // oReadMore.setHref(function(){
                //         alert("feefefeef");
                // });

                oReadMore.addContent(new sap.ui.core.HTML({content:"<div>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog , retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid..</div>"}));
                var oLayout = new sap.ui.layout.VerticalLayout({width:"500px"});
                oLayout.addContent(new sap.ui.core.HTML({content:"<div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua</div>"}));
                oLayout.addContent(oReadMore);

                return oLayout;
	}
});