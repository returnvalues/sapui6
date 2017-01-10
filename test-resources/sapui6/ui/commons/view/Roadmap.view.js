sap.ui.jsview("view.Roadmap", {

	createContent : function (oController) {
		jQuery.sap.require("sapui6.ui.commons.BasicRoadMap");
                var oBasicRoadMap = new sapui6.ui.commons.BasicRoadMap({
                        width : "800px",
                        activeStep : 1
                        // height : "50px"
                });

                oBasicRoadMap.attachPress(function(data){
                        alert(data.getParameter("step"));
                });
                oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Basic Information"}));
                oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Billing Information"}));
                oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Domain Setup"}));
                oBasicRoadMap.addStep(new sapui6.ui.commons.BasicRoadMapStep({title:"Save Form"}));




                jQuery.sap.require("sapui6.ui.commons.FuelRoadMap");
                var oFuelRoadMap = new sapui6.ui.commons.FuelRoadMap({
                        width : "800px",
                        activeStep : 2
                });

                oFuelRoadMap.attachPress(function(data){
                        alert(data.getParameter("step"));
                });
                
                oFuelRoadMap.addStep(new sapui6.ui.commons.FuelRoadMapStep({title:"Step1"}));
                oFuelRoadMap.addStep(new sapui6.ui.commons.FuelRoadMapStep({title:"Step2"}));
                oFuelRoadMap.addStep(new sapui6.ui.commons.FuelRoadMapStep({title:"Step3"}));
                oFuelRoadMap.addStep(new sapui6.ui.commons.FuelRoadMapStep({title:"Step4"}));

                var oLayout = new sap.ui.layout.VerticalLayout({width:"100%"});
                oLayout.addContent(new sap.ui.core.HTML({content:"<br><span style='font-size:20px;font-weigth:bold;padding-left:20px;'>BasicRoadMap<span><br>"}));
                oLayout.addContent(oBasicRoadMap);
                oLayout.addContent(new sap.ui.core.HTML({content:"<br><br><span style='font-size:20px;font-weigth:bold;padding-left:20px;'>FuelRoadMap<span><br>"}));
                oLayout.addContent(oFuelRoadMap);

                return oLayout;
	}
});