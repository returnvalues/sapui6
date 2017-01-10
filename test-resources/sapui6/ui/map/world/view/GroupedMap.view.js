sap.ui.jsview("view.GroupedMap", {

    createContent : function(oController){
        jQuery.sap.require("sapui6.ui.map.World");
        var world = new sapui6.ui.map.World({
          title:"Grouped countries map",
          titleColor:"#ffffff",
          width:"1200px", 
          height:"650px", 
          fill:"#525263", 
          overColor:"#ff9900",
          backgroundColor:"#3c3c48", 
          homeColor:"#ffffff",
          selectable:false
        });

        world.setRegionProperty("US",{fill:"#ff9900",overColor:"red"});
        world.setRegionProperty("CN",{fill:"#ff9900",overColor:"red"});
        world.setRegionProperty("BR",{fill:"#33ccff",overColor:"red"});
        world.setRegionProperty("DE",{fill:"#33ccff",overColor:"red"});
        world.setRegionProperty("IN",{fill:"#33ccff",overColor:"red"});
        world.setRegionProperty("JP",{fill:"#33ccff",overColor:"red"});

        world.setGroup("US","g2","G2"); //parameter : country code, group id, group name
        world.setGroup("CN","g2","G2");
        world.setGroup("BR","g4","G4");
        world.setGroup("DE","g4","G4");
        world.setGroup("IN","g4","G4");
        world.setGroup("JP","g4","G4");


        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(world);

        return oLayout;
    }
});