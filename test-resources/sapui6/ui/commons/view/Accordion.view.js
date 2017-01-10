sap.ui.jsview("view.Accordion", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.Accordion");

        var oLayout = new sap.ui.layout.HorizontalLayout({width:"100%"});
        oLayout.addContent(this.createAccordion("#000","#ddd"));
        oLayout.addContent(this.createAccordion("#000","#ffc773"));
        oLayout.addContent(this.createAccordion("#000","#008a3b"));

        var oLayout2 = new sap.ui.layout.HorizontalLayout({width:"100%"});
        oLayout2.addContent(this.createAccordion("#fff","#007cc0"));
        oLayout2.addContent(this.createAccordion("#fff","#990033"));
        oLayout2.addContent(this.createAccordion("#fff","#36006c"));

        var layout = new sap.ui.layout.VerticalLayout();
        layout.addContent(oLayout);
        layout.addContent(oLayout2);

        return layout;
	},

	createAccordion : function(titleColor, headerBackgroundColor){
		var oAccordion = new sapui6.ui.commons.Accordion({
        	width:"400px",
        	// height:"694px",
        	headerBackgroundColor : headerBackgroundColor,
            titleColor : titleColor
        });
        
		var oSection1 = new sapui6.ui.commons.AccordionSection();	
		oSection1.setTitle("Section 1");
		oSection1.setHeight("205px");	
		oSection1.addContent(new sap.ui.core.HTML({content:"<div>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>"}));

		var oSection2 = new sapui6.ui.commons.AccordionSection();		
		oSection2.setTitle("Section 2");		
		oSection2.setHeight("200px");	
		oSection2.addContent(new sap.ui.core.HTML({content:"<div>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div><div>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard.</div>"}));

		var oSection3 = new sapui6.ui.commons.AccordionSection();		
		oSection3.setTitle("Section 3");	
		oSection3.setHeight("200px");	
		oSection3.addContent(new sap.ui.core.HTML({content:"<div>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</div>"}));
		
		oAccordion.addSection(oSection1);
		oAccordion.addSection(oSection2);
		oAccordion.addSection(oSection3);
		oAccordion.setOpenedSectionsId(oSection2.getId());

		return oAccordion;
	}
});