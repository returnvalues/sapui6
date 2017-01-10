/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.commons.library");
jQuery.sap.require("sap.ui.core.Core");

jQuery.sap.require("sap.ui.core.library");
jQuery.sap.require("sapui6.ui.commons.library");

sap.ui.getCore().initLibrary({
  name : "sapui6.ui.commons",
  dependencies : ["sap.ui.core"],
  controls: [
    "sapui6.ui.commons.Accordion",
    "sapui6.ui.commons.AppendTextView",
    "sapui6.ui.commons.BasicRoadMap",
    "sapui6.ui.commons.Breadcrumb",
    "sapui6.ui.commons.ColumnedCheckBoxGroup",
    "sapui6.ui.commons.ContentPortlet",
    "sapui6.ui.commons.DateFormatView",
    "sapui6.ui.commons.FloatField",
    "sapui6.ui.commons.FuelRoadMap",
    "sapui6.ui.commons.InlineCheckBoxGroup",
    "sapui6.ui.commons.LowercaseField",
    "sapui6.ui.commons.MonthPicker",
    "sapui6.ui.commons.MonthBox",
    "sapui6.ui.commons.NumberField",
    "sapui6.ui.commons.NumberFormatField",
    "sapui6.ui.commons.NumberFormatView",
    "sapui6.ui.commons.Panel",
    "sapui6.ui.commons.ReadMore",
    "sapui6.ui.commons.RegExpField",
    "sapui6.ui.commons.TabStrip",
    "sapui6.ui.commons.TextFieldWithClear",
    "sapui6.ui.commons.TimePicker",
    "sapui6.ui.commons.UppercaseField",
    "sapui6.ui.commons.URLPortlet",
    "sapui6.ui.commons.Video",
    "sapui6.ui.commons.YearPicker"
  ],
  elements: [
    "sapui6.ui.commons.AccordionSection",
    "sapui6.ui.commons.BasicRoadMapStep",
    "sapui6.ui.commons.FuelRoadMapStep",
    "sapui6.ui.commons.Tab",
    "sapui6.ui.commons.YearBox"
  ],
  version: "1.01.1"});