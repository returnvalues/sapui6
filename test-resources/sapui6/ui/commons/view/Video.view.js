sap.ui.jsview("view.Video", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.Video");

                var oVideo = new sapui6.ui.commons.Video({
                	width:"500px",
                	height:"300px",
                	url:"http://www.w3schools.com/html/movie.mp4"
                });

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oVideo);

                return oLayout;
	}
});