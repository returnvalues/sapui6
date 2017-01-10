sap.ui.jsview("view.Toplist", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.ux3.TopList");

                var oTopList = new sapui6.ui.ux3.TopList({
                        // showOrderNumber : false,
                        // backgroundColor : "#ff0000",
                        // showBorder : false,
                        // borderRadius : "0px",
                        // line : false,
                        // iconDownColor : "#ff0000",
                        // iconUpColor : "#0000ff",
                        // iconSameColor : "#00ff00",
                        visibleCount : 10,
                        width : "400px",
                        height : "310px",
                        orderNumberColor : "#ff3333",
                        orderNumberBold : false,
                        titleColor : "#666666",
                        titleBold : true,
                        numberColor : "#666666",
                        numberBold : true
                });

                oTopList.attachPress(function(data){
                        alert(data.getParameter("orderNumber"));
                        alert(data.getParameter("title"));
                        alert(data.getParameter("number"));
                });

                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", numberColor:"#ff0000", iconDirection:""}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Porshe",number:"23,000",iconDirection:"down"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"GM-Other",number:"23,000", iconDirection:"up"}));
                oTopList.addItem(new sapui6.ui.ux3.TopListItem({title:"Bank of America",number:"23,000",iconDirection:"same"}));

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(oTopList);

                return oLayout;
	}
});