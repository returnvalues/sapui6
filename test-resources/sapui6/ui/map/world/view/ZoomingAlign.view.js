(function(){
var countryPopup = null;

sap.ui.jsview("view.ZoomingAlign", {

    createContent : function(oController){
      jQuery.sap.require("sapui6.ui.map.World");
      var world = new sapui6.ui.map.World({
        title:"Zooming to Countries Map",
        titleColor:"#ffffff",
        width:"1200px", 
        height:"650px", 
        fill:"#525263", 
        overColor:"#ff9900",
        backgroundColor:"#3c3c48", 
        homeColor:"#ffffff",
        zoomAlign:"left" // left, center, right
      });

      this.changeRegionColor(world);
      this.setRegionFlag(world);

      var that = this;
      world.attachSelect(function(data){
          var countryCode = data.getParameter("code");
          var countryName = data.getParameter("name");

          that.selectCountry(world, countryCode, countryName);
      });

      world.attachSelectHome(function(){
        if(countryPopup != null) countryPopup.close();
      });

      var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
      oLayout.addContent(world);

      return oLayout;
    },

    changeRegionColor : function(world){
      world.setRegionProperty("US",{fill:"#a2a2b3"});
      world.setRegionProperty("GB",{fill:"#a2a2b3"});
      world.setRegionProperty("DE",{fill:"#a2a2b3"});
      world.setRegionProperty("CN",{fill:"#a2a2b3"});
      world.setRegionProperty("KR",{fill:"#a2a2b3"});

      world.setRegionProperty("FR",{fill:"#87879e"});
      world.setRegionProperty("JP",{fill:"#87879e"});
      world.setRegionProperty("RU",{fill:"#87879e"});

      world.setRegionProperty("BR",{fill:"#72728d"});
      world.setRegionProperty("IN",{fill:"#72728d"});
      world.setRegionProperty("FI",{fill:"#72728d"});
    },

    setRegionFlag : function(world){
      world.addContent("US", new sap.ui.commons.Image({src:"../../../../../img/country/flag/us.png"}));
      world.addContent("GB", new sap.ui.commons.Image({src:"../../../../../img/country/flag/gb.png"}));
      world.addContent("DE", new sap.ui.commons.Image({src:"../../../../../img/country/flag/de.png"}));
      world.addContent("CN", new sap.ui.commons.Image({src:"../../../../../img/country/flag/cn.png"}));
      world.addContent("KR", new sap.ui.commons.Image({src:"../../../../../img/country/flag/kr.png",press:function(){world.moveTo("KR")}}));
      world.addContent("FR", new sap.ui.commons.Image({src:"../../../../../img/country/flag/fr.png"}));
      world.addContent("JP", new sap.ui.commons.Image({src:"../../../../../img/country/flag/jp.png"}));
      world.addContent("RU", new sap.ui.commons.Image({src:"../../../../../img/country/flag/ru.png"}));
      world.addContent("BR", new sap.ui.commons.Image({src:"../../../../../img/country/flag/br.png"}));
      world.addContent("IN", new sap.ui.commons.Image({src:"../../../../../img/country/flag/in.png"}));
      world.addContent("FI", new sap.ui.commons.Image({src:"../../../../../img/country/flag/fi.png"}));
    },

    selectCountry : function(world, countryCode, countryName){
      if(countryPopup != null){
        countryPopup.close();
      }
      var content = this.createCountryContent(countryCode, countryName);

      countryPopup = new sap.ui.core.Popup();
      countryPopup.setContent(content);
      countryPopup.setShadow(true);
      countryPopup.setAutoClose(false);
      countryPopup.setDurations(0, 0); 

      var eDock = sap.ui.core.Popup.Dock;
      countryPopup.open(1000, eDock.CenterCenter, eDock.CenterCenter, world, null, null, true);
    },

    createCountryContent : function(countryCode, countryName){
      var oToolbar = new sap.ui.commons.Toolbar();
      oToolbar.addRightItem(new sap.ui.core.Icon({src:"sap-icon://decline", press:function(){countryPopup.close();}}));
      
      var oLayout = new sap.ui.layout.VerticalLayout({width:"800px", height:"600px"});
      oLayout.addStyleClass("contentPopup");
      oLayout.addContent(oToolbar);
      oLayout.addContent(this.createVizChart(countryCode, countryName));

      return oLayout;
    },

    createVizChart : function(countryCode, countryName){
      var oModel = new sap.ui.model.json.JSONModel({
        businessData : [ 
          {Region : "Region1",profit : -141.25}, 
          {Region : "Region2",profit : 133.82}, 
          {Region : "Region3",profit : 348.76}, 
          {Region : "Region4",profit : 217.29}, 
          {Region : "Region5",profit : 117.00}, 
          {Region : "Region6",profit : 609.16} 
        ]
      });
  
      var oDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions : [ {
              axis : 1, 
              name : 'Region',
              value : "{Region}"
          } ],
          measures : [
          {
              name : 'Profit', 
              value : '{profit}'   
          } ],
          data : {
              path : "/businessData"
          }
      });
  
      var oVizContainer = new sap.viz.ui5.VizContainer({
          'uiConfig' : {
              'layout' : 'vertical',
              'enableMorphing' : true
          },
          'width': '800px',
          'height': '570px',
          'vizProperties' : {title:{text:countryName}}
      });
  
      oVizContainer.setVizData(oDataset)
      oVizContainer.setModel(oModel);
  
      var aobjCountry = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
      uid : "Region_id",
          name : "Region",
          type : "Dimension"
      }), aobjProfit = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
      uid : "Profit_id",
          name : "Profit",
          type : "Measure"
      });
      var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
      uid : "primaryValues",
          type : "Measure",
          values : [ aobjProfit ]
      }), feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
      uid : "axisLabels",
          type : "Dimension",
          values : [ aobjCountry ]
      });

      oVizContainer.addFeed(feedPrimaryValues);
      oVizContainer.addFeed(feedAxisLabels);
  
      oVizContainer.attachEvent('feedsChanged', function(e) {
          oVizContainer.setVizData(new sap.viz.ui5.data.FlattenedDataset({
              dimensions : [ {
                  axis : 1,
                  name : 'Region',
                  value : "{Region}"
              } ], measures : [ {
                  name : 'Profit', 
                  value : '{profit}'
              } ], data : {
                  path : "/businessData"
              }
          }));
          oVizContainer.setModel(oModel);
      });

      return oVizContainer;
    }

    
});

}());