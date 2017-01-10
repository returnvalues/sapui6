(function(){
var continentPopup = null; 

sap.ui.jsview("view.ContinentMap", {

    createContent : function(oController){
        jQuery.sap.require("sapui6.ui.map.World");
        var world = new sapui6.ui.map.World({
          title:"Continent Map",
          titleColor:"#ffffff",
          width:"1200px", 
          height:"650px",  
          backgroundColor:"#3c3c48", 
          homeColor:"#ffffff",
          visibleContinent:true
        });

        world.setContinentColor("AF", "#669933", "red", "red");
        world.setContinentColor("AS", "#ff9900", "red", "red");
        world.setContinentColor("EU", "#e800e8", "red", "red");
        world.setContinentColor("NA", "#ff5959", "red", "red");
        world.setContinentColor("SA", "#5959ff", "red", "red");
        world.setContinentColor("OC", "#ffff00", "red", "red");
        world.setContinentColor("AN", "#a2a2b3", "red", "red");

        var that = this;
        world.attachSelect(function(data){
          var continentCode = data.getParameter("code");
          var continentName = data.getParameter("name");

          that.selectContinent(world, continentCode, continentName);
        });

        var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
        oLayout.addContent(world);

        return oLayout;
    },

    selectContinent : function(world, continentCode, continentName){
      if(continentPopup != null){
        continentPopup.close();
      }

      var content = null;
      if(sap.ui.Device.browser.msie) content = this.createContinentContent2(continentCode, continentName);
      else content = this.createContinentContent(continentCode, continentName);

      continentPopup = new sap.ui.core.Popup();
      continentPopup.setContent(content);
      continentPopup.setShadow(true);
      continentPopup.setAutoClose(false);
      continentPopup.setDurations(0, 0); 

      var eDock = sap.ui.core.Popup.Dock;
      continentPopup.open(1000, eDock.CenterCenter, eDock.CenterCenter, world, null, null, true);
    },

    createContinentContent : function(continentCode, continentName){
      var oToolbar = new sap.ui.commons.Toolbar();
      oToolbar.addRightItem(new sap.ui.core.Icon({src:"sap-icon://decline", press:function(){continentPopup.close();}}));
      
      var oLayout = new sap.ui.layout.VerticalLayout({width:"800px", height:"600px"});
      oLayout.addStyleClass("contentPopup");
      oLayout.addContent(oToolbar);
      oLayout.addContent(this.createVizChart(continentCode, continentName));

      return oLayout;
    },

    createContinentContent2 : function(continentCode, continentName){
      var oToolbar = new sap.ui.commons.Toolbar();
      oToolbar.addRightItem(new sap.ui.core.Icon({src:"sap-icon://decline", press:function(){continentPopup.close();}}));
      
      var oLayout = new sap.ui.layout.VerticalLayout({width:"600px", height:"540px"});
      oLayout.addStyleClass("contentPopup");
      oLayout.addContent(oToolbar);
      oLayout.addContent(new sap.ui.core.HTML({content:"<iframe src='http://www.sapui6.com' width='600px' height='500px' frameborder='0'></iframe>"}));

      return oLayout;
    },

    createVizChart : function(continentCode, continentName){
      var oModel = new sap.ui.model.json.JSONModel({
        businessData : [ 
          {Country : "Country1",profit : -141.25}, 
          {Country : "Country2",profit : 133.82}, 
          {Country : "Country3",profit : 348.76}, 
          {Country : "Country4",profit : 217.29}, 
          {Country : "Country5",profit : 117.00}, 
          {Country : "Country6",profit : 609.16} 
        ]
      });
  
      var oDataset = new sap.viz.ui5.data.FlattenedDataset({
          dimensions : [ {
              axis : 1, 
              name : 'Country',
              value : "{Country}"
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
          'vizProperties' : {title:{text:continentName}}
      });
  
      oVizContainer.setVizData(oDataset)
      oVizContainer.setModel(oModel);
  
      var aobjCountry = new sap.viz.ui5.controls.common.feeds.AnalysisObject({
      uid : "Country_id",
          name : "Country",
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
                  name : 'Country',
                  value : "{Country}"
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