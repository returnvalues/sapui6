sap.ui.jsview("view.ChangeCountryTitle", {

    createContent : function(oController){
      jQuery.sap.require("sapui6.ui.map.World");
      var world = new sapui6.ui.map.World({
        title:"Change country title",
        titleColor:"#ffffff",
        width:"1200px", 
        height:"650px", 
        fill:"#525263", 
        overColor:"#525263",
        backgroundColor:"#3c3c48", 
        homeColor:"#000000",
        selectable:false
      });

      this.changeCountryTitle(world);

      var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
      oLayout.addContent(world);

      return oLayout;
    },

    changeCountryTitle : function(world){
        var mCountry = [];

        world.getCountryCode().forEach(function(countryCode){
            mCountry.push({code:countryCode, title:sap.ui.getCore().byId(world.getId()+"-"+countryCode).getTitle()+"-Change"})
        });

        world.setCountryTitle(mCountry);
    }

});