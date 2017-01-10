sap.ui.jsview("view.WorldFlag", {

    createContent : function(oController){
        jQuery.sap.require("sapui6.ui.map.World");
        var world = new sapui6.ui.map.World({
        title:"Map with country's flag",
        titleColor:"#ffffff",
        width:"1200px", 
        height:"650px", 
        fill:"#525263", 
        overColor:"#525263",
        backgroundColor:"#3c3c48", 
        homeColor:"#000000",
        selectable:false
        });

        this.setRegionFlag(world);

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(world);

        return oLayout;
    },

    setRegionFlag : function(world){
        if(sap.ui.Device.browser.msie){
            world.addContent("US", new sap.ui.commons.Image({src:"../../../../../img/country/flag/us.png"}));
            world.addContent("DE", new sap.ui.commons.Image({src:"../../../../../img/country/flag/de.png"}));
            world.addContent("KR", new sap.ui.commons.Image({src:"../../../../../img/country/flag/kr.png"}));
            world.addContent("CN", new sap.ui.commons.Image({src:"../../../../../img/country/flag/cn.png"}));
            world.addContent("JP", new sap.ui.commons.Image({src:"../../../../../img/country/flag/jp.png"}));
            world.addContent("RU", new sap.ui.commons.Image({src:"../../../../../img/country/flag/ru.png"}));
            world.addContent("GB", new sap.ui.commons.Image({src:"../../../../../img/country/flag/gb.png"}));
        }else{
            world.getCountryCode().forEach(function(countryCode){
                world.addContent(countryCode, new sap.ui.commons.Image({src:"../../../../../img/country/flag/" + countryCode.toLowerCase() + ".png"}));
            });
        }
    }
});