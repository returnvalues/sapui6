sap.ui.jsview("view.Breadcrumb", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.Breadcrumb");

        var oBreadcrumb = new sapui6.ui.commons.Breadcrumb();

        oBreadcrumb.addNav(new sap.ui.commons.Link({text:"Home",href:"http://sapui5js.com/wp"}));
        oBreadcrumb.addNav(new sap.ui.commons.Link({text:"Custom Control",href:""}));
        oBreadcrumb.addNav(new sap.ui.commons.Link({text:"Breadcrumb",href:"http://sapui5js.com/wp"}));


        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(oBreadcrumb);

        return oLayout;
	}
});