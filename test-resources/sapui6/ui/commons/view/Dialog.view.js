sap.ui.jsview("view.Dialog", {
	oDialog : null,
	oDialog2 : null,
	oDialog3 : null,

	createContent : function (oController) {
		var layout = new sap.ui.layout.VerticalLayout();
        layout.addContent(this.createDialog(oController));
        layout.addContent(this.createDialog2(oController));
        layout.addContent(this.createDialog3(oController));
        
        return layout;
	},

	createDialog : function(oController){
		var oButton = new sap.ui.commons.Button({text:"Open Dialog", style:sap.ui.commons.ButtonStyle.Emph, press:function(){
			jQuery.sap.require("sapui6.ui.commons.Dialog");
			
			if(this.oDialog == null){
				this.oDialog = new sapui6.ui.commons.Dialog({
					title:"Custom Dialog Test",
					width:"90%",
					height:"400px",
					minimize:function(data){
						var bMinimize = data.getParameter("bMinimize");
						if(bMinimize) alert("Minimize"); 
					},
					maximize:function(data){
						var bMaximize = data.getParameter("bMaximize");
						if(bMaximize) alert("Maximize"); 
					}
				});

			    this.oDialog.addContent(new sap.ui.commons.TextView({text:"This is a custom dialog text view."}));
			    this.oDialog.addContent(new sap.ui.commons.TextField({}));
			    
			    this.oDialog.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));
				this.oDialog.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));	
			}
			
			if(this.oDialog.isOpen()){
				if(this.oDialog.isMinimize()) this.oDialog.reOpen();
			}else{
				this.oDialog.open();
			}

		}});

		return oButton;
	},

	createDialog2 : function(oController){
		var oButton2 = new sap.ui.commons.Button({text:"Open Dialog2", style:sap.ui.commons.ButtonStyle.Emph, press:function(){
			jQuery.sap.require("sapui6.ui.commons.Dialog");
			
			if(this.oDialog2 == null){
				this.oDialog2 = new sapui6.ui.commons.Dialog({
					title:"Custom Dialog Test2",
					width:"500px",
					height:"400px",
					minimize:function(data){
						var bMinimize = data.getParameter("bMinimize");
						if(bMinimize) alert("Minimize"); 
					},
					maximize:function(data){
						var bMaximize = data.getParameter("bMaximize");
						if(bMaximize) alert("Maximize"); 
					}
				});

			    this.oDialog2.addContent(new sap.ui.commons.TextView({text:"This is a custom dialog text view."}));
			    this.oDialog2.addContent(new sap.ui.commons.Button({text:"Button", press:function(){alert("Press Button!!");}}));
			    
			    this.oDialog2.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));
				this.oDialog2.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));	
			}
			
			if(this.oDialog2.isOpen()){
				if(this.oDialog2.isMinimize()) this.oDialog2.reOpen();
			}else{
				this.oDialog2.open();
			}

		}});

		return oButton2;
	},

	createDialog3 : function(oController){
		var oButton3 = new sap.ui.commons.Button({text:"Open Dialog3", style:sap.ui.commons.ButtonStyle.Emph, press:function(){
			jQuery.sap.require("sapui6.ui.commons.Dialog");
			
			if(this.oDialog3 == null){
				this.oDialog3 = new sapui6.ui.commons.Dialog({
					title:"Custom Dialog Test3 Long Title",
					width:"400px",
					height:"300px",
					minimize:function(data){
						var bMinimize = data.getParameter("bMinimize");
						if(bMinimize) alert("Minimize"); 
					},
					maximize:function(data){
						var bMaximize = data.getParameter("bMaximize");
						if(bMaximize) alert("Maximize"); 
					}
				});

			    this.oDialog3.addContent(new sap.ui.commons.TextView({text:"This is a custom dialog text view."}));
			    
			    this.oDialog3.addButton(new sap.ui.commons.Button({text: "Edit", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));
				this.oDialog3.addButton(new sap.ui.commons.Button({text: "Print", style:sap.ui.commons.ButtonStyle.Emph, press:function(){}}));	
			}
			
			if(this.oDialog3.isOpen()){
				if(this.oDialog3.isMinimize()) this.oDialog3.reOpen();
			}else{
				this.oDialog3.open();
			}

		}});

		return oButton3;
	}
});