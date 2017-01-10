sap.ui.jsview("view.ZoomingMap", {

    createContent : function(oController){
      jQuery.sap.require("sapui6.ui.map.Netherlands");
      var map = new sapui6.ui.map.Netherlands({
        title:"Zooming to Region Map",
        titleColor:"#ffffff",
        width:"616px", 
        height:"727px", 
        fill:"#525263", 
        overColor:"#ff9900",
        backgroundColor:"#3c3c48", 
        homeColor:"#ffffff"
      });

      var that = this;
      map.attachSelect(function(data){
          var regionCode = data.getParameter("code");
          var regionName = data.getParameter("name");

          alert(regionName);
      });

      var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
      oLayout.addContent(map);

      return oLayout;
    }

});