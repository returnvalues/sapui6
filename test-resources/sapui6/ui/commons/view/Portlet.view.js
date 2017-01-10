sap.ui.jsview("view.Portlet", {

	createContent : function (oController) {
                var oLayout = new sap.ui.layout.HorizontalLayout({width:"100%"});
                oLayout.addContent(this.createContentPortlet());
                oLayout.addContent(this.createUrlPortlet());
                
                return oLayout;
	},

        createContentPortlet : function(){
                jQuery.sap.require("sapui6.ui.commons.ContentPortlet");

                var oContentPortlet = new sapui6.ui.commons.ContentPortlet({
                        width: "400px",
                        height: "370px",
                        margin: "10px",
                        title: "SAPUI6 - ContentPortlet",
                        dialogTitle: "SAPUI6 Dialog",
                        dialogWidth: "800px",
                        dialogHeight: "500px",
                        iconHoverColor: "#d9534f"
                });

                var innerContent = new sap.ui.core.HTML({content:"<div>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</div>"});
                var outerContent = new sap.ui.core.HTML({content:"<div>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</div><div>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</div>"});
                oContentPortlet.setContent(innerContent);
                oContentPortlet.setFullScreenContent(outerContent);
                oContentPortlet.setForwardUrl("http://sapui6.com");

                return oContentPortlet;
        },

        createUrlPortlet : function(){
                jQuery.sap.require("sapui6.ui.commons.URLPortlet");

                var oURLPortlet = new sapui6.ui.commons.URLPortlet({
                        width: "500px",
                        height: "400px",
                        margin: "10px",
                        title: "SAPUI6 - URLPortlet"
                });

                oURLPortlet.setUrl("http://sapui6.com");
                oURLPortlet.setIconHoverColor("#d9534f");

                return oURLPortlet;
        }
});