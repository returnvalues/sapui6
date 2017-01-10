sap.ui.jsview("view.ContentToMap", {

    createContent : function(oController){
      jQuery.sap.require("sapui6.ui.map.World");
      var world = new sapui6.ui.map.World({
        width:"1200px", 
        height:"650px", 
        fill:"#525263", 
        overColor:"#525263",
        backgroundColor:"#3c3c48", 
        homeColor:"#000000",
        selectable:false
      });

      this.addMapContent(world);

      var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
      oLayout.addContent(world);

      return oLayout;
    },

    addMapContent : function(world){
      var oTextView = new sap.ui.commons.TextView({text:"Add World Text", semanticColor:sap.ui.commons.TextViewColor.Critical, design:sap.ui.commons.TextViewDesign.H3}); 
      world.addContent("", oTextView, "30px", "30px");

      var oTextView2 = new sap.ui.commons.TextView({text:"Add US Text", semanticColor:sap.ui.commons.TextViewColor.Critical, design:sap.ui.commons.TextViewDesign.H3}); 
      world.addContent("US", oTextView2);

      var oLink = new sap.ui.commons.Link({text:"Link", href:"http://www.sapui6.com"});
      world.addContent("", oLink, "1100px", "30px");

      var oButton = new sap.ui.commons.Button({text:"Button", style:sap.ui.commons.ButtonStyle.Emph});
      world.addContent("", oButton, "1000px", "300px");

      var oComboBox1 = new sap.ui.commons.ComboBox("ComboBox1");
      oComboBox1.setTooltip("Country");
      oComboBox1.setEditable(true);
      oComboBox1.setValue("Deutschland");
      oComboBox1.setWidth("200px");
      var oItem = new sap.ui.core.ListItem("Country1");
      oItem.setText("Canada");
      oComboBox1.addItem(oItem);
      oItem = new sap.ui.core.ListItem("Country2");
      oItem.setText("Deutschland");
      oComboBox1.addItem(oItem);
      oItem = new sap.ui.core.ListItem("Country3");
      oItem.setText("England");
      oComboBox1.addItem(oItem);
      world.addContent("CN", oComboBox1);

      var oDatePicker = new sap.ui.commons.DatePicker();
      world.addContent("", oDatePicker, "800px", "500px");

      var oListBox = new sap.ui.commons.ListBox({
          items : [
              new sap.ui.core.ListItem({text : 'Spring'}),
              new sap.ui.core.ListItem({text : 'Summer'}),
              new sap.ui.core.ListItem({text : 'Autumn'}),
              new sap.ui.core.ListItem({text : 'Winter'})
          ]
      });
      world.addContent("", oListBox, "800px", "200px");
    }
});