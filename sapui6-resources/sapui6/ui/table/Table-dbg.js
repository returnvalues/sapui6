jQuery.sap.declare("sapui6.ui.table.Table");
jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.require("sap.ui.model.SelectionModel");

sap.ui.core.Control.extend("sapui6.ui.table.Table", { 
    library : "sapui6.ui.table",
    metadata : {                             
        properties : {
            "visible" : {type:"boolean", defaultValue:true},
            "width" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "100%"}, 
            "minusWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "0px"},
            "height" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "100%"},
            "rowHeight" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
            "maxRowHeight" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
            "columnHeaderHeight" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
            "margin" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : null},
            "marginLeft" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : null},
            "marginRight" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : null},
            "marginTop" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : null},
            "marginBottom" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : null},
            "language" : {type:"string", defaultValue : "en"},
            "editable" : {type:"boolean", defaultValue : true},
            "readonly" : {type:"boolean", defaultValue : false},
            "resize" : {type:"boolean", defaultValue : true},
            "showTotalSummary" : {type:"boolean", defaultValue : false},
            "showGroupSummary" : {type:"boolean", defaultValue : false},
            "groupSummaryText" : {type:"string", defaultValue : ""},
            "totalSummaryText" : {type:"string", defaultValue : "Total"},
            "totalSummaryLocation" : {type:"string", defaultValue : "Bottom"},
            "groupSummaryLocation" : {type:"string", defaultValue : "Bottom"},
            "fixedColumnIndex" : {type:"int", defaultValue : -1},
            "mergeColumnIndex" : {type:"int", defaultValue : -1},
            "treeColumnIndex" : {type:"int", defaultValue : -1},
            "treeStartOpen" : {type:"boolean", defaultValue : true},
            "pivot" : {type:"boolean", defaultValue: false},
            "horizontalLayout" : {type:"boolean", defaultValue: false},
            "enableColumnReordering" : {type:"boolean", defaultValue: true},
            "maxRowsLength" : {type:"int", defaultValue: 10000},
            "selectionMode" : {type:"string", defaultValue: null},
            "selectionModeStyleExpression" : {type:"string", defaultValue: null},
            "noDataText" : {type:"string", defaultValue: ""},
            "title" : {type:"string", defaultValue: null},
            "titleColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
            "titleFontSize" : {type : "string", group : "Dimension", defaultValue : null},
            "strongColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
            "textColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
            "tableRowBackgroundColor" : {type : "sap.ui.core.CSSColor" , group : "Appearance", defaultValue : null},
            "columnBorderStyle" : {type : "string", defaultValue : "solid"},
            "rowBorderStyle" : {type : "string", defaultValue : "solid"},
            "columnsOrder" : {type:"string", defaultValue: null}
        },
        defaultAggregation : "columns",
        aggregations : {
            "columns" : {type : "sapui6.ui.table.Column", multiple : true, singularName : "column", bindable : "bindable"}, 
            "rows" : {type : "sapui6.ui.table.Row", multiple : true, singularName : "row", bindable : "bindable"},
            "footer" : {type : "sap.ui.core.Control", multiple : false},
            "toolbar" : {type : "sap.ui.commons.Toolbar", multiple : false}, 
            "button" : {type : "sap.ui.core.Control", multiple : true, singularName : "button"}
            // "button" : {type : "sap.ui.commons.Button", multiple : true, singularName : "button"}
        },
        events : {
            "rowSelectionChange" : {},
            "cellSelectionChange" : {},
            "checkedSelection" : {},
            "checkedAll" : {}
        }
    },

    gridHtml : "",
    dataHtml : "",
    headerHtml : "",
    mediaQuery : [],
    deviceQuery : [],
    dataArr : [],
    isDeviceQuery : false,
    contextMenu : false,
    isGroup : false,
    isStartOpen : true,
    groupHeaderIdx : -1,
    paging : false,
    pageCnt : -1,
    pageNo : 1,
    scrollPageNo : 1,
    isTree : false,
    treeIdx : -1,
    lastPageNo : -1,
    gridName : "",
    divId : "",
    gridType : 0,
    dataWidth : "100%",
    dataHeight : "100%",
    theadDiv : null,
    theadTb1 : null,
    theadTb2 : null,
    tbodyDiv1 : null,
    tbodyTb1 : null,
    tbodyDiv2 : null,
    tbodyTb2 : null,
    selectRowIdx : -1,
    selectCellIdx : -1,
    selectRowObj : null,
    isMultiHeader : false,
    multiHeaderSpanInfo : [],
    multiHeaderDisplaySpanInfo : [],
    multiHeaderInfo : [],
    headerLevel : 1,
    orientationOption : 1,
    label : null,
    displayRowCount : 0,
    gridDefaultMinValue : 99999999999999999999,
    isFinishedMakingRows : false,
    lastScrollTop : 0,
    selectionRowIndex1 : -1, 
    selectionCellIndex1 : -1, 
    selectionRowIndex2 : -1, 
    selectionCellIndex2 : -1, 

    _RM : null,
    _initColumnConfiguration : false,
    _widthRatio : 1,
    _heightRatio : 1,
    trHtArr : [],
    _oSelection : null,
    _backgroundColor : null,
    _tableRowBGColor : null,
    _headerTextColor: null,
    _headerBGColor: null,
    _totalBG: null,
    _totalAllBG: null,
    _groupBG: null,
    _isOdata: false,
    _oData: [],
    _loading: null,
    _isLoading : false,
    _isFirst : true,
    _uniqueListBox : [],
    _originalColumns : null,
    _totalHtml : "",
    _leftTotalHtml : "",
    _rightTotalHtml : "",
    _groupSummaryData : {},
    _leftGroupSummaryData : {},
    _rightGroupSummaryData : {},
    _aFilters : null,
    _exportHeaderData : [],
    _preParentWidth : 0-1,

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        oControl._totalHtml = "";
        oControl._leftTotalHtml = "";
        oControl._rightTotalHtml = "";

        oControl._makeData();
        oControl._RM = oRm;
        oControl.gridName = oControl.getId();
        oRm.write("<div");
        oRm.writeControlData(oControl);
        if(oControl.getWidth())oRm.addStyle("width", oControl.getWidth());
        if(oControl.getHeight())oRm.addStyle("height", oControl.getHeight());
        if(oControl.getMargin())oRm.addStyle("margin", oControl.getMargin());
        if(oControl.getMarginLeft())oRm.addStyle("margin-left", oControl.getMarginLeft());
        if(oControl.getMarginRight())oRm.addStyle("margin-right", oControl.getMarginRight());
        if(oControl.getMarginTop())oRm.addStyle("margin-top", oControl.getMarginTop());
        if(oControl.getMarginBottom())oRm.addStyle("margin-bottom", oControl.getMarginBottom());
        oRm.writeStyles();
        oRm.write(">");
        
        if(oControl.getToolbar()){
            oRm.write("<div id='" + oControl.getId() + "-title-area'>");
            oRm.renderControl(oControl.getToolbar());
            oRm.write("</div>");
        }else if(oControl.getButton().length > 0 || oControl.getTitle()){
            oRm.write("<div id='" + oControl.getId() + "-title-area'");
            if(oControl.getButton().length == 0) {
                oRm.addStyle("margin-bottom","5px");
                oRm.addStyle("position","relative");
                oRm.writeStyles();
            }
            oRm.write(">");

            if(oControl.getButton().length > 0){
                oRm.write("<span");
                oRm.addClass("sapui6_table_btn_right");
                oRm.writeClasses();
                oRm.write(">");
            
                oControl.getButton().forEach(function(button,index){
                    oRm.write("<span style='margin-left:5px;'>");
                    oRm.renderControl(button);
                    oRm.write("</span>");
                });
            }
            oRm.write("</span>");
            if(oControl.getTitle()) {
                oRm.write("<span");
                oRm.addClass("sapui6_table_title");
                oRm.writeClasses();
                oRm.addStyle("color",oControl.getTitleColor());
                oRm.addStyle("font-size",oControl.getTitleFontSize());
                
                if(oControl.getStrongColor()){
                    oRm.addStyle("border-left-color",oControl.getStrongColor());
                }

                oRm.writeStyles();
                oRm.write(">");
                oRm.write(oControl.getTitle());
                oRm.write("</span>");
            }
            oRm.write("</div>");
            oRm.write("<div style='clear:both;'></div>");
        }

        oRm.write('<div class="sapui6_table"');
        oRm.addStyle("color", oControl.getTextColor());
        oRm.writeStyles();
        oRm.write('>');
        oRm.write('<div class="sapui6_table_wrap" id="' + oControl.gridName + '_gridbg">');
        oRm.write('<div class="sapui6_table_layout sapUiTable" id="' + oControl.gridName + '_outerdiv">');
      
        
        if(oControl.gridType == 0 && oControl.getFixedColumnIndex() > -1){
            oRm.write('<table style="border-spacing:0px;margin:0px;padding:0px;border:0px;"><tr><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');
            oControl.headerHtml = '';
            oControl.headerHtml += '<div id="' + oControl.gridName + '_h1">';
            oControl.headerHtml += oControl.renderLeftTableHeader();
            oControl.headerHtml += '</div>';

            oControl.dataHtml = '<div id="' + oControl.gridName + '_d1" style="background-color:' + oControl._tableRowBGColor + ';">';
            oControl.dataHtml += oControl.renderLeftTableRow();
            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';

            var totalHtml = '';
            if(oControl.getShowTotalSummary() && oControl.getRows().length > 0){
                if(oControl.getTotalSummaryLocation() == 'Top'){
                    totalHtml += '<div id="' + oControl.gridName + '_t1" style="border-bottom:1px solid #ddd;">' + oControl._leftTotalHtml + '</div>';
                }else{
                    totalHtml += '<div id="' + oControl.gridName + '_t1" style="border-top:1px solid #ddd;">' + oControl._leftTotalHtml + '</div>';
                }
            }

            if(oControl.getTotalSummaryLocation() == "Top"){
                oRm.write('<div id="' + oControl.gridName + '_left_div" style="border-collapse:collapse;border-right:1px solid ' + oControl._borderColor + ';">' + oControl.headerHtml + totalHtml + oControl.dataHtml + '</div>');
            }else{
                oRm.write('<div id="' + oControl.gridName + '_left_div" style="border-collapse:collapse;border-right:1px solid ' + oControl._borderColor + ';">' + oControl.headerHtml + oControl.dataHtml + totalHtml + '</div>');
            }

            oRm.write('</td><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');

            oControl.headerHtml = '';
            oControl.headerHtml += '<div id="' + oControl.gridName + '_h2">';
            oControl.headerHtml += oControl.renderRightTableHeader();
            oControl.headerHtml += '</div>';


            oControl.dataHtml = '<div id="' + oControl.gridName + '_d2" style="background-color:' + oControl._tableRowBGColor + ';" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollX();javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollY();' + '">';
            oControl.dataHtml += oControl.renderRightTableRow();
            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';

            totalHtml = '';
            if(oControl.getShowTotalSummary() && oControl.getRows().length > 0){
                if(oControl.getTotalSummaryLocation() == 'Top'){
                    totalHtml += '<div id="' + oControl.gridName + '_t2" style="border-bottom:1px solid #ddd;">' + oControl._rightTotalHtml + '</div>';
                }else{
                    totalHtml += '<div id="' + oControl.gridName + '_t2" style="border-top:1px solid #ddd;" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollX();javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollY();' + '">' + oControl._rightTotalHtml + '</div>';
                }
            }

            if(oControl.getTotalSummaryLocation() == "Top"){
                oRm.write('<div id="' + oControl.gridName + '_right_div" style="border-collapse:collapse;">' + oControl.headerHtml + totalHtml + oControl.dataHtml + '</div>');
            }else{
                oRm.write('<div id="' + oControl.gridName + '_right_div" style="border-collapse:collapse;">' + oControl.headerHtml + oControl.dataHtml + totalHtml + '</div>');
            }
            
            oRm.write('</td></tr></table>');
        }else{
            oControl.headerHtml = '';
            if(oControl.gridType == 0 || oControl.gridType == 2) oControl.headerHtml += '<div id="' + oControl.gridName + '_h">';
            oControl.headerHtml += oControl.renderTableHeader();
            if(oControl.gridType ==0 || oControl.gridType ==2) oControl.headerHtml += '</div>';

            oControl.dataHtml = '<div id="' + oControl.gridName + '_d" style="background-color:' + oControl._tableRowBGColor + ';" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scroll();' + '">';
            oControl.dataHtml += oControl.renderTableRow();
            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';

            var totalHtml = '';
            if(oControl.getShowTotalSummary() && oControl.getRows().length > 0){
                if(oControl.getTotalSummaryLocation() == 'Top'){
                    totalHtml += '<div id="' + oControl.gridName + '_t" style="border-bottom:1px solid #ddd;">' + oControl._totalHtml + '</div>';
                }else{
                    totalHtml += '<div id="' + oControl.gridName + '_t" style="border-top:1px solid #ddd;" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scroll();' + '">' + oControl._totalHtml + '</div>';
                }
            }

            if(oControl.getTotalSummaryLocation() == "Top"){
                oRm.write(oControl.headerHtml + totalHtml + oControl.dataHtml);
            }else{
                oRm.write(oControl.headerHtml + oControl.dataHtml + totalHtml);
            }
        }

        oRm.write('</div>');
        oRm.write('</div>');

        oRm.write('</div>');
        oRm.write('</div>');
    },

    onBeforeRendering : function(){
        if(this.getPivot()) this.gridType = 1;
        if(this.getHorizontalLayout()) this.gridType = 2;
        if(this.getMaxRowHeight() && this.getFixedColumnIndex() > -1) this.setProperty("fixedColumnIndex", -1, true);

        if(this.getSelectionMode().toLowerCase() == "multiple") this._oSelection = new sap.ui.model.SelectionModel(sap.ui.model.SelectionModel.MULTI_SELECTION);
        else this._oSelection = new sap.ui.model.SelectionModel(sap.ui.model.SelectionModel.SINGLE_SELECTION);

        jQuery.sap.require("sap.ui.core.theming.Parameters");
        if(!this.getTitleColor()) this.setProperty("titleColor", sap.ui.core.theming.Parameters.get("sapUiTextTitle"), true);
        if(!this.getTextColor()) this.setProperty("textColor", sap.ui.core.theming.Parameters.get("sapUiBaseText"), true);
        if(!this.getStrongColor()) this.setProperty("strongColor", sap.ui.core.theming.Parameters.get("sapActiveColor"), true);
        if(!this.getTitleFontSize()) this.setProperty("titleFontSize", sap.ui.core.theming.Parameters.get("sapUiFontHeader4Size"), true);
    },

    onAfterRendering : function(){
        var that = this;
        this.renderTreeGroupSummary();

        var obj = $("#"+this.getId());
        var parentWidth = obj.parent().width();
        var scrollWidth = this.getScrollBarWidth();
        if((parentWidth+scrollWidth) == this._preParentWidth) {
            parentWidth = this._preParentWidth;
        }

        if(parentWidth == 0 && this.getWidth().indexOf("%") > -1){
            var fnInterval = window.setInterval(function(){
                parentWidth = obj.parent().width();
                if(parentWidth > 0){
                    window.clearInterval(fnInterval);
                    objWidth = parentWidth * (parseFloat(that.getWidth().split("%")[0])/100);
                    
                    var leftRightMargin = 0;

                    if(that.getMarginLeft() || that.getMarginRight()){
                        if(that.getMarginLeft()) leftRightMargin += parseInt(that.getMarginLeft().split("px")[0]);
                        if(that.getMarginRight()) leftRightMargin += parseInt(that.getMarginRight().split("px")[0]);
                    }else if(that.getMargin()){
                        leftRightMargin = parseInt(that.getMargin().split("px")[0]) * 2;
                    }

                    $("#"+that.getId()).css("width", String(objWidth-leftRightMargin-parseInt(that.getMinusWidth().split("px")[0]))+"px");
                    that._handleResize();
                }
            }, 100);

        }else if(this.getWidth().indexOf("px")>-1){
            var w = this.getWidth().split("px")[0];
            $("#"+this.getId()).css("width", String(w-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
            this._handleResize();
        }else{
            // if(obj.outerWidth() >= parentWidth){
                var leftRightMargin = 0;

                if(this.getMarginLeft() || this.getMarginRight()){
                    if(this.getMarginLeft()) leftRightMargin += parseInt(this.getMarginLeft().split("px")[0]);
                    if(this.getMarginRight()) leftRightMargin += parseInt(this.getMarginRight().split("px")[0]);
                }else if(this.getMargin()){
                    leftRightMargin = parseInt(this.getMargin().split("px")[0]) * 2;
                }

                $("#"+this.getId()).css("width", String(parentWidth-leftRightMargin-parseInt(this.getMinusWidth().split("px")[0]))+"px");
                this._handleResize();
            // }
        }

        if(this.getResize()){
            this._widthRatio = parseFloat($("#"+this.getId()).outerWidth()/$(window).width());
            var that = this;
            
            $(window).resize(function(){
                jQuery.sap.delayedCall(50, that, function() {
                    that._handleResize(true);
                });
            });
        }

        this.getColumns().forEach(function(column){
            var oMenu = column.getMenu();
            if(that._isOdata){
                if(sap.ui.getCore().byId(oMenu.getId()+"-group") != undefined){
                    oMenu.removeItem(sap.ui.getCore().byId(oMenu.getId()+"-group"));
                    oMenu.removeItem(sap.ui.getCore().byId(oMenu.getId()+"-clear_group"));
                }
            }
        })

        // if(this._isFirst && document.getElementById(this.getId() + "-loading") == undefined){
        //     var l = '';
        //     l += '<div id="' + this.getId() + '-loading" style="display:none;position:absolute;z-index:9999;background-color:#424242;opacity:0.7;">';
        //     l += '<div style="position:relative;top:50%;left:50%;">';
        //     l += '<div id="sapui6_circularG" style="position:relative;left:-20px;top:-20px;">';
        //     l += '    <div id="sapui6_circularG_1" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_2" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_3" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_4" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_5" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_6" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_7" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '    <div id="sapui6_circularG_8" class="sapui6_circularG" style="background-color:' + this.getStrongColor() + ';"></div>';
        //     l += '</div>';
        //     l += '</div>';
        //     l += '</div>';

        //     $(document.body).append(l);
        //     this._isFirst = false;
        // }

        this._showNoDataText();

        this._preParentWidth = parentWidth;
    }
});

sapui6.ui.table.Table.M_EVENTS = {'rowSelectionChange':'rowSelectionChange','cellSelectionChange':'cellSelectionChange','checkedSelection':'checkedSelection','checkedAll':'checkedAll'};

sapui6.ui.table.Table.getMetadata().getAllAggregations()["rows"]._doesNotRequireFactory = true;

sapui6.ui.table.Table.prototype.init = function(){
    jQuery.sap.require("sap.ui.core.theming.Parameters");
    this._tableRowBGColor = sap.ui.core.theming.Parameters.get("sapUiTableRowBG");
    this._backgroundColor = sap.ui.core.theming.Parameters.get("sapBackgroundColor");
    this._headerTextColor = sap.ui.core.theming.Parameters.get("sapUiBaseText");
    this._headerBGColor = sap.ui.core.theming.Parameters.get("sapUiTableRowBG");
    this._borderColor = sap.ui.core.theming.Parameters.get("sapBaseColor");
    this._totalBG = sap.ui.core.theming.Parameters.get("sapUiTableRowAlternatingBG");
    this._totalAllBG = sap.ui.core.theming.Parameters.get("sapUiTableRowAlternatingBG");
    this._groupBG = sap.ui.core.theming.Parameters.get("sapUiTableRowSelectionReadOnlyBG");
};

sapui6.ui.table.Table.prototype.bindRows = function(oBindingInfo) {
    if(!this._initColumnConfiguration) {
        this._originalColumns = this.getColumns();
        this._setColumnsConfiguration();
    }

    var templates = [];
    this.getColumns().forEach(function(column){
        templates.push(column.getTemplate().clone());
    });

    var oInfo = {path:oBindingInfo, template: new sapui6.ui.table.Row({cells:templates}), length:this.getMaxRowsLength()};
    return this.bindAggregation("rows", oInfo);
};

sapui6.ui.table.Table.prototype._getOdataJson = function(){
    var oBindingInfo = this.getBindingInfo("rows");

    var jsonData = [];
    var oData = oBindingInfo.binding.getModel().oData;
    for(key in oData){
        jsonData.push(oData[key]);
    }

    this._oData = jsonData;

    return jsonData;
};

sapui6.ui.table.Table.prototype._makeData = function(){
    if(!this._initColumnConfiguration) {
        this._originalColumns = this.getColumns();
        this._setColumnsConfiguration();
    }

    var jsonData = [];

    var oBindingInfo = this.getBindingInfo("rows");
    
    if(oBindingInfo.binding) {
        if(oBindingInfo.binding.getModel().toString().toLowerCase().indexOf("odata") > -1){
            jsonData = this._getOdataJson();
            this._isOdata = true;
        }else {
            jsonData = oBindingInfo.binding.oList;
        }

        if(this.getFormularColumnCount() > 0){
            var paramsStr = "";
            var execParamStr = "";
            this.getColumns().forEach(function(column){
                if(column.getKey() && !column.getFormular()) {
                    paramsStr += "'" + column.getKey() + "',";
                    execParamStr += "row['" + column.getKey() + "'],";
                }
            });
            execParamStr = execParamStr.substring(0,execParamStr.length-1);

            var execFormularFunction = [];
            this.getColumns().forEach(function(column){
                if(column.getFormular()){
                    var fnFormatter = eval("new Function("+ paramsStr + "'return "+ column.getFormular() + ";'"+")");
                    execFormularFunction.push(fnFormatter);
                }else execFormularFunction.push(0);
            });

            var that = this;
            jsonData.forEach(function(row){
                that.getColumns().forEach(function(column,index){
                    if(column.getFormular() && that.getSamePathCount() == 0){
                        var fnFormatter = execFormularFunction[index];
                        row[column.getKey()] = eval("fnFormatter("+execParamStr+")");
                    }
                });
            });
        }

        oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, jsonData, false);

        var that = this;
        this.getColumns().forEach(function(column, index){
            if(column.getMenu()) {
                if(column.getShowFilterMenuEntry() && column.getFilterType().toLowerCase() == "select") {
                    var filterMenuItem = sap.ui.getCore().byId(column.getMenu().getId()+"-filter");
                    if(!filterMenuItem.getListBox()) {
                        filterMenuItem.setListBox(that._getUniqueValuesListBox(index));
                    }
                }
            }
        });
    }

    this.dataArr = jsonData;
};

sapui6.ui.table.Table.prototype._getDeviceType = function(){
    if(sap.ui.Device.system.phone) return "smartphone";
    else if(sap.ui.Device.system.tablet) return "tablet";
    else return "desktop";
};

sapui6.ui.table.Table.prototype._getOrientationType = function(){
    var w = window.innerWidth;
    var h = window.innerHeight;

    if(h>w) return "portrait";
    else return "landscape";
};

sapui6.ui.table.Table.prototype._setColumnsMenuEntry = function(){
    this.label = sap.ui.getCore().getLibraryResourceBundle("sapui6.ui.table", this.getLanguage());
    var that = this;
    this.getColumns().forEach(function(column,index){
        var menuCnt = 0;
        var oCustomMenu = new sap.ui.unified.Menu();

        if(column.getShowSortMenuEntry() && that.getTreeColumnIndex() < 0){
            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-asc",{
                text:that.label.getText("sort_ascending"),
                icon:"sap-icon://arrow-top",
                select:function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).sortASC(index, column.getKey());
                }
            }));

            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-desc",{
                text:that.label.getText("sort_descending"),
                icon:"sap-icon://arrow-bottom",
                select:function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).sortDES(index, column.getKey());
                }
            }));

            menuCnt++;
        }

        if(column.getShowFilterMenuEntry()){
            oCustomMenu.addItem(new sapui6.ui.table.MenuFilterItem(oCustomMenu.getId() + "-filter", {
                label: that.label.getText("filter"),
                icon: "sap-icon://add-filter",
                // icon: that._getThemedIcon("ico12_filter.gif"),
                value: "",
                type: column.getFilterType(),
                select: function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).filter(index,oEvent.getSource().getOperator(),oEvent.getSource().getValue());
                    that._resetTableContextMenu(that, index, "filter");
                }
            }));

            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-clear_filter",{
                text:that.label.getText("clear_filter"),
                icon:"sap-icon://clear-filter",
                select:function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).clearFilter();
                    that._resetTableContextMenu(that, index, "clear_filter");

                }
            }).setEnabled(false));

            menuCnt++;
        }

        if(column.getShowFreezePaneMenuEntry()){
            if(that.getFixedColumnIndex() > -1 && that.getFixedColumnIndex() == index){
                oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-freeze",{
                    text:that.label.getText("freeze_panes"),
                    icon:"sap-icon://screen-split-one",
                    select:function(oEvent) {
                        sap.ui.getCore().byId(that.getId()).freezePane(index);
                        that._resetTableContextMenu(that, index, "freeze");
                    }
                }).setEnabled(false));

                oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-clear_freeze",{
                    text:that.label.getText("clear_freeze"),
                    icon:"sap-icon://decline",
                    select:function(oEvent) {
                        sap.ui.getCore().byId(that.getId()).clearFreezePane();
                        that._resetTableContextMenu(that, index, "clear_freeze");
                    }
                }));
            }else{
                oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-freeze",{
                    text:that.label.getText("freeze_panes"),
                    icon:"sap-icon://screen-split-one",
                    select:function(oEvent) {
                        sap.ui.getCore().byId(that.getId()).freezePane(index);
                        that._resetTableContextMenu(that, index, "freeze");
                    }
                }));

                oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-clear_freeze",{
                    text:that.label.getText("clear_freeze"),
                    icon:"sap-icon://decline",
                    select:function(oEvent) {
                        sap.ui.getCore().byId(that.getId()).clearFreezePane();
                        that._resetTableContextMenu(that, index, "clear_freeze");
                    }
                }).setEnabled(false));
            }

            menuCnt++;
        }

        if(that.getMergeColumnIndex() < 0 && that.getTreeColumnIndex() < 0 && column.getShowGroupMenuEntry()){
            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-group",{
                text:that.label.getText("group"),
                icon:"sap-icon://group-2",
                select:function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).doGroup(index);
                    that._resetTableContextMenu(that, index, "group");
                }
            }));

            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-clear_group",{
                text:that.label.getText("ungroup"),
                icon:"sap-icon://decline",
                select:function(oEvent) {
                    sap.ui.getCore().byId(that.getId()).unGroup();
                    that._resetTableContextMenu(that, index, "clear_group");
                }
            }).setEnabled(false));

            menuCnt++;
        }

        if(column.getShowBackgroundColorMenuEntry()){
            var oColumnBGMenuItem = that._createMenuItem(oCustomMenu, "column-bg", "important_columns", "sap-icon://multi-select");
            oCustomMenu.addItem(oColumnBGMenuItem);

            var oColumnBGMenu = new sap.ui.unified.Menu(oColumnBGMenuItem.getId() + "-color");
            oColumnBGMenu.addStyleClass("sapUiTableColumnVisibilityMenu"); 
            oColumnBGMenuItem.setSubmenu(oColumnBGMenu);
            
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"None",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Red",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#ffd1d1");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Orange",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#ffdcb9");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Yellow",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#fff4bb");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Green",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#e1f7cb");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"SkyBlue",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#dff5ff");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Blue",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#d3dcf7");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Purple",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#f8dcff");}}));
            oColumnBGMenu.addItem(new sap.ui.unified.MenuItem({text:"Gray",select:function(){sap.ui.getCore().byId(that.getId()).setBgColorColumn(index,"#e9e9e9");}}));
            
            menuCnt++;
        }

        if(column.getShowInsertColumnMenuEntry()){
            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-insert",{
                text:that.label.getText("insert_columns"),
                icon:"sap-icon://add",
                select:(that._showInsertColumnDialog).bind(that)
            }));

            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-delete",{
                text:that.label.getText("delete_columns"),
                icon:"sap-icon://less",
                select:function(oEvent) {
                    
                }
            }));

            menuCnt++;
        }

        if(column.getAggregation("customMenuItem")){
            column.getAggregation("customMenuItem").forEach(function(customMenuItem){
                oCustomMenu.addItem(customMenuItem);
                menuCnt++;
            });
        }

        if(menuCnt > 0) {
            column.setMenu(oCustomMenu);
            if(column.getShowVisibilityMenuEntry()){
                that._addColumnVisibilityMenuItem(that, column.getMenu(), index);
            }
        }
        
    });
};

sapui6.ui.table.Table.prototype._showInsertColumnDialog = function(oEvent){
    var oTextArea = new sap.ui.commons.TextArea(this.getId()+"-calculatorBox",{width:"400px", rows:3});

    var pushCalculatorBox = function(oEvent){
        oTextArea.setValue(oTextArea.getValue()+oEvent.getSource().getText());
    };

    var hLayout = new sap.ui.layout.HorizontalLayout({
        content : [
            new sap.ui.commons.Button({text:"C", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:"%", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:"*", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:"Del", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox})
        ]
    });

    var f = [];
    this.getColumns().forEach(function(column){
        if(column.getCalculable())f.push(new sap.ui.commons.Button({text:column.getTitle(),width:"300px",height:"50px", style:sap.ui.commons.ButtonStyle.Accept, press:pushCalculatorBox}));
    });

    var vLayout = new sap.ui.layout.VerticalLayout({
        width:"300px",
        height:"500px",
        content:f
    });

    var vLayout2 = new sap.ui.layout.VerticalLayout({
        width:"100px",
        height:"500px",
        content : [
            new sap.ui.commons.Button({text:"-", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:"+", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:"(", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
            new sap.ui.commons.Button({text:")", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox}),
             new sap.ui.commons.Button({text:"=", width:"100px", height:"50px", style:sap.ui.commons.ButtonStyle.Emph, press:pushCalculatorBox})
        ]
    });

    var hLayout2 = new sap.ui.layout.HorizontalLayout({
        content : [
            vLayout,
            vLayout2
        ]
    });

    jQuery.sap.require("sap.ui.commons.Dialog");
    var insertDialog = new sap.ui.commons.Dialog();
    insertDialog.addContent(oTextArea);
    insertDialog.addContent(hLayout);
    insertDialog.addContent(hLayout2);
    insertDialog.setModal(true);
    insertDialog.setWidth("420px");
    insertDialog.setHeight("600px");
    insertDialog.setTitle(this.label.getText("insert_columns"));
    insertDialog.addButton(new sap.ui.commons.Button({text:"Ok", width:"100px", height:"30px", style:sap.ui.commons.ButtonStyle.Accept}));
    insertDialog.addButton(new sap.ui.commons.Button({text:"Cancel", width:"100px", height:"30px", style:sap.ui.commons.ButtonStyle.Reject, press:function(){insertDialog.close();}}));
    insertDialog.attachClosed(function(){insertDialog.destroy()});
    insertDialog.open();
};

sapui6.ui.table.Table.prototype._getFormatType = function(sFormat){
    if(sFormat.indexOf("#") > -1){
        return this._getFloatType(sFormat);
    }else{
        return new sap.ui.model.type.Date({pattern:sFormat});
    }
};

sapui6.ui.table.Table.prototype._getFloatType = function(format){
    var groupingEnabled = false;
    var groupingSeparator = ",";
    var decimalSeparator = ".";
    var minIntegerDigits = 0;
    var maxIntegerDigits = 0;
    var minFractionDigits = 0;
    var maxFractionDigits = 0;

    if(format.indexOf(",") > -1){
        groupingEnabled = true;

        if(format.indexOf(".") > -1){
            if(format.indexOf(",") < format.indexOf(".")){
                groupingSeparator = ",";
                decimalSeparator = ".";
                var sInteger = format.split(".")[0];
                var sFraction = format.split(".")[1];
                minIntegerDigits = this._countChar(sInteger,"0");
                maxIntegerDigits = sInteger.length;
                minFractionDigits = this._countChar(sFraction,"0");
                maxFractionDigits = sFraction.length;
            }else{
                groupingSeparator = ".";
                decimalSeparator = ",";
                var sInteger = format.split(",")[0];
                var sFraction = format.split(",")[1];
                minIntegerDigits = this._countChar(sInteger,"0");
                maxIntegerDigits = sInteger.length;
                minFractionDigits = this._countChar(sFraction,"0");
                maxFractionDigits = sFraction.length;
            }
        }else{
            groupingSeparator = ",";
            minIntegerDigits = this._countChar(format,"0");
            maxIntegerDigits = format.length;
        }
    }else if(format.indexOf(".") > -1){
        groupingEnabled = false;
        var sInteger = format.split(".")[0];
        var sFraction = format.split(".")[1];
        minIntegerDigits = this._countChar(sInteger,"0");
        maxIntegerDigits = sInteger.length;
        minFractionDigits = this._countChar(sFraction,"0");
        maxFractionDigits = sFraction.length;
    }else{
        groupingEnabled = false;
        minIntegerDigits = this._countChar(format,"0");
        maxIntegerDigits = format.length;
    }

    var type = new sap.ui.model.type.Float({
        minIntegerDigits: minIntegerDigits, 
        // maxIntegerDigits: maxIntegerDigits, 
        minFractionDigits: minFractionDigits, 
        maxFractionDigits: maxFractionDigits, 
        groupingEnabled: groupingEnabled, 
        groupingSeparator: groupingSeparator,
        decimalSeparator: decimalSeparator
    });

    return type;
};

sapui6.ui.table.Table.prototype._countChar = function(sStr, sChar){
    var cnt = 0;
    var length = sStr.length;
    for(var i=0 ; i<length ; i++){
        if(sStr.charAt(i) == sChar) cnt++;
    }

    return cnt;
};

sapui6.ui.table.Table.prototype._dateFormat = "MM.dd.yyyy";

sapui6.ui.table.Table.prototype._toDateFormat = function(value) {
    if (value) {
        if(value instanceof Date){
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: this._dateFormat}); 
            return oDateFormat.format(new Date(value));
        }else{
            return this._toDateFormat2(value);
        }
        
    } else {
        return value;
    }
};

sapui6.ui.table.Table.prototype._toDateFormat2 = function(value) {
    if (value) {
        var date_format = this._dateFormat;
        date_format = date_format.replace("yyyy",value.substring(0,4));
        date_format = date_format.replace("MM",value.substring(4,6));
        date_format = date_format.replace("dd",value.substring(6));

        return date_format; 
    } else {
        return value;
    }
};

sapui6.ui.table.Table.prototype._toPercent = function(value){
    if(value){
        return String(value) + "%";
    }else{
        return value;
    }
};

sapui6.ui.table.Table.prototype._setColumnTemplate = function(template, path, format){
    if(path == undefined || path == null || path == ""){
        return template;
    }else if(format != undefined && format != null && format != ""){
        if(format.indexOf("#") > -1){
            template.bindText({
                path: path,
                type: this._getFormatType(format)
            });
        }else if(format.indexOf("yy") > -1){
            this._dateFormat = format;
            template.bindText({
                path: path,
                formatter: (this._toDateFormat).bind(this)
            });
        }else if(format == "%"){
            template.bindText({
                path: path,
                formatter: this._toPercent
            });
        }
    }else{
        template.bindText(path);
    }

    return template;
};

sapui6.ui.table.Table.prototype._setColumnsConfiguration = function(){
    var that = this;
    var partsArr = [];
    var paramsStr = "";
    var newColumns = [];

    if(this.getColumnsOrder()){
        var cols = this.getColumnsOrder().split(",");
        if(cols.length == this._originalColumns.length){
            cols.forEach(function(index){
                newColumns.push(that._originalColumns[parseInt(index)]);
            });

            this.removeAllAggregation("columns");
            newColumns.forEach((function(column){
                this.addColumn(column);
            }).bind(this));

            newColumns = [];
        }
    }

    this.getColumns().forEach(function(column){
        if(sap.ui.Device.system.phone) {
            if(column.getShowSmartphone()) newColumns.push(column);
        }else if(sap.ui.Device.system.tablet){
            if(column.getShowTablet()) newColumns.push(column);
        }else{
            if(column.getShowDesktop()) newColumns.push(column);
        }
    });

    this.removeAllAggregation("columns");
    newColumns.forEach((function(column){
        this.addColumn(column);
    }).bind(this));

    this.getColumns().forEach(function(column){
        if(column.getPath() && column.getPath().indexOf(">") > -1){
            column.setKey(column.getPath().substring(column.getPath().indexOf(">")+1));
        }else if(column.getPath() && column.getPath().indexOf(">") == -1){
            column.setKey(column.getPath());
        }else {
            jQuery.sap.log.error("Table Control Messages : property 'path' is the essential value for Column.", "", "sapui6.ui.table.Table");
        }

        if(column.getKey()) {
            partsArr.push({path:column.getKey()});
            paramsStr += "'" + column.getKey() + "',";
        }
    });

    this.getColumns().forEach(function(column, index){

        if(column.getTemplate()){
            if(column.getFormat() && column.getTemplate().toString().indexOf("TextView") > -1){
                if(column.getTemplate().getBindingInfo("text")["formatter"] == undefined){
                    column.setTemplate(that._setColumnTemplate(column.getTemplate(), column.getPath(), column.getFormat()));
                }
            }
        }else{
            var oTemplate = null;           
            if(column.getEditable()){
                oTemplate = new sap.ui.commons.TextField();
                oTemplate.bindValue(column.getPath());
            }else{
                oTemplate = new sap.ui.commons.TextView();
                oTemplate = that._setColumnTemplate(oTemplate, column.getPath(), column.getFormat());
            }

            if(column.getAlign()) {
                if(column.getAlign().toLowerCase() == "right") oTemplate.setTextAlign(sap.ui.core.TextAlign.Right);
                else if(column.getAlign().toLowerCase() == "center") oTemplate.setTextAlign(sap.ui.core.TextAlign.Center);
                else oTemplate.setTextAlign(sap.ui.core.TextAlign.Left);
            }

            if(column.getEditable()) {
                var oIPE = new sap.ui.commons.InPlaceEdit({content:oTemplate});
                column.setTemplate(oIPE);
            }else column.setTemplate(oTemplate);
        }

        if(that.getReadonly() || !that.getEditable()) {
            var otmp = column.getTemplate();
            if(otmp.getMetadata().hasProperty("editable")){
                otmp.setProperty("editable", false);
            }else if(otmp.getMetadata().hasProperty("enabled")){
                otmp.setProperty("enabled", false);
            }

            column.setTemplate(otmp);
        }
    });

    this._setColumnsMenuEntry();
    this._initColumnConfiguration = true;
    this._setMultipleHeaderInfo();
};

sapui6.ui.table.Table.prototype._setMultipleHeaderInfo = function(){
    var preParent = "";
    var parentCnt = 1;
    var spanCnt = 0;
    var length = this.getColumns().length;
    this.multiHeaderInfo = [];
    
    this.getColumns().forEach((function(column,index){
        if(column.getHeaderGroup()) {
            this.isMultiHeader = true;
            this.headerLevel = 2;
            if(column.getHeaderGroupParent()){
                this.headerLevel = 3;
                return;
            }
        }
    }).bind(this));

    if(this.isMultiHeader){

        if(this.headerLevel == 2){
            var h1 = [];
            var h2 = [];
            var preHeaderGroup = "";

            for(var i=0 ; i<length ; i++){
                if(this.getColumns()[i].getHeaderGroup()){
                    if(this.getColumns()[i].getHeaderGroup() != preHeaderGroup){
                        h1.push({rowspan:1,colspan:this._getHeaderGroupCount(this.getColumns()[i].getHeaderGroup(), i),idx:i,title:this.getColumns()[i].getHeaderGroup()});
                        h1True = true;
                    }
                    h2.push({rowspan:1,colspan:1,idx:i,title:this.getColumns()[i].getTitle()});
                    h2True = true;
                    preHeaderGroup = this.getColumns()[i].getHeaderGroup();
                }else{
                    h1.push({rowspan:2,colspan:1,idx:i,title:this.getColumns()[i].getTitle()});
                    h1True = true;
                }

                if(!h1True) h1.push({colspan:0});
                h1True = false;
                
                if(!h2True) h2.push({colspan:0});
                h2True = false;
            }

            this.multiHeaderInfo.push(h1);
            this.multiHeaderInfo.push(h2);
        }else if(this.headerLevel == 3){
            var h1 = [];
            var h2 = [];
            var h3 = [];
            var h1True = false;
            var h2True = false;
            var h3True = false;
            var preHeaderGroupParent = "";
            var preHeaderGroup = "";

            for(var i=0 ; i<length ; i++){
                if(this.getColumns()[i].getHeaderGroupParent()){
                    if(this.getColumns()[i].getHeaderGroupParent() != preHeaderGroupParent){
                        h1.push({rowspan:1,colspan:this._getHeaderGroupParentCount(this.getColumns()[i].getHeaderGroupParent(), i),idx:i,title:this.getColumns()[i].getHeaderGroupParent()});
                        h1True = true;
                    }
                    preHeaderGroupParent = this.getColumns()[i].getHeaderGroupParent();
                }

                if(this.getColumns()[i].getHeaderGroupParent() && this.getColumns()[i].getHeaderGroup()){

                    if(this.getColumns()[i].getHeaderGroup() != preHeaderGroup){
                        h2.push({rowspan:1,colspan:this._getHeaderGroupCount(this.getColumns()[i].getHeaderGroup(), i),idx:i,title:this.getColumns()[i].getHeaderGroup()});
                        h2True = true;
                    }
                    h3.push({rowspan:1,colspan:1,idx:i,title:this.getColumns()[i].getTitle()});
                    h3True = true;
                    preHeaderGroup = this.getColumns()[i].getHeaderGroup();
                }

                if(!this.getColumns()[i].getHeaderGroupParent()){
                    h1.push({rowspan:3,colspan:1,idx:i,title:this.getColumns()[i].getTitle()});
                    h1True = true;
                }

                if(!h1True) h1.push({colspan:0});
                h1True = false;
                
                if(!h2True) h2.push({colspan:0});
                h2True = false;

                if(!h3True) h3.push({colspan:0});
                h3True = false;
            }

            this.multiHeaderInfo.push(h1);
            this.multiHeaderInfo.push(h2);
            this.multiHeaderInfo.push(h3);
        }
        
    }
};

sapui6.ui.table.Table.prototype._getHeaderGroupParentCount = function(title, startIdx){
    var cnt = 0;
    var length = this.getColumns().length;

    for(var i=startIdx ; i<length ; i++){
        if(this.getColumns()[i].getHeaderGroupParent() && this.getColumns()[i].getHeaderGroupParent() == title) {
            cnt++;
        }else break;
    }

    return cnt;
};

sapui6.ui.table.Table.prototype._getHeaderGroupCount = function(title, startIdx){
    var cnt = 0;
    var length = this.getColumns().length;

    for(var i=startIdx ; i<length ; i++){
        if(this.getColumns()[i].getHeaderGroup() && this.getColumns()[i].getHeaderGroup() == title) {
            cnt++;
        }else break;
    }

    return cnt;
};

sapui6.ui.table.Table.prototype._getHeaderGroupDisplayCount = function(title){
    var cnt = 0;

    this.getColumns().forEach(function(column){
        if(column.getHeaderGroup() && column.getHeaderGroup() == title && column.getVisible()) cnt++;
    });

    return cnt;
};

sapui6.ui.table.Table.prototype.setFocusCell = function(rowIdx, colIdx){
    this.getRows()[rowIdx].getCells()[colIdx].getFocusDomRef().focus();
};

sapui6.ui.table.Table.prototype.setCellReadonly = function(rowIdx, colIdx, bReadonly){
    var isReadOnly = false;
    if(bReadonly != undefined) isReadOnly = !bReadonly;

    var cell = this.getRows()[rowIdx].getCells()[colIdx];
    if(cell.getMetadata().hasProperty("editable")){
        cell.setProperty("editable", isReadOnly);
    }else if(cell.getMetadata().hasProperty("enabled")){
        cell.setProperty("enabled", isReadOnly);
    }
};

sapui6.ui.table.Table.prototype.setRowReadonly = function(rowIdx, bReadonly){
    var isReadOnly = false;
    if(bReadonly != undefined) isReadOnly = !bReadonly;

    var row = this.getRows()[rowIdx];

    row.getCells().forEach(function(cell){
        if(cell.getMetadata().hasProperty("editable")){
            cell.setProperty("editable", isReadOnly);
        }else if(cell.getMetadata().hasProperty("enabled")){
            cell.setProperty("enabled", isReadOnly);
        }
    });
};

sapui6.ui.table.Table.prototype.setColumnReadonly = function(colIdx, bReadonly){
    var isReadOnly = false;
    if(bReadonly != undefined) isReadOnly = !bReadonly;

    this.getRows().forEach(function(row){
        var cell = row.getCells()[colIdx];
        if(cell.getMetadata().hasProperty("editable")){
            cell.setProperty("editable", isReadOnly);
        }else if(cell.getMetadata().hasProperty("enabled")){
            cell.setProperty("enabled", isReadOnly);
        }
    });
};

sapui6.ui.table.Table.prototype.addCellClass = function(rowIdx, colIdx, sClass){
    var cell = this.getRows()[rowIdx].getCells()[colIdx];
    var dom = $(cell.getDomRef());
    while(dom.prop("tagName") != "TD"){
        dom = dom.parent();
    }

    dom.addClass(sClass);
};

sapui6.ui.table.Table.prototype.removeCellClass = function(rowIdx, colIdx, sClass){
    var cell = this.getRows()[rowIdx].getCells()[colIdx];
    var dom = $(cell.getDomRef());
    while(dom.prop("tagName") != "TD"){
        dom = dom.parent();
    }

    dom.removeClass(sClass);
};

sapui6.ui.table.Table.prototype.addRowClass = function(rowIdx, sClass){
    var cell = this.getRows()[rowIdx].getCells()[0];
    var dom = $(cell.getDomRef());
    while(dom.prop("tagName") != "TR"){
        dom = dom.parent();
    }

    if(this.getFixedColumnIndex() > -1){
        $($("#"+this.getId()+'_dt1 tr')[dom.index()]).addClass(sClass);
        $($("#"+this.getId()+'_dt2 tr')[dom.index()]).addClass(sClass);
    }else{
        dom.addClass(sClass);
    }
};

sapui6.ui.table.Table.prototype.removeRowClass = function(rowIdx, sClass){
    var cell = this.getRows()[rowIdx].getCells()[0];
    var dom = $(cell.getDomRef());
    while(dom.prop("tagName") != "TR"){
        dom = dom.parent();
    }

    if(this.getFixedColumnIndex() > -1){
        $($("#"+this.getId()+'_dt1 tr')[dom.index()]).removeClass(sClass);
        $($("#"+this.getId()+'_dt2 tr')[dom.index()]).removeClass(sClass);
    }else{
        dom.removeClass(sClass);
    }
};

sapui6.ui.table.Table.prototype.addColumnClass = function(colIdx, sClass){
    this.getRows().forEach(function(row){
        var cell = row.getCells()[colIdx];
        var dom = $(cell.getDomRef());
        while(dom.prop("tagName") != "TD"){
            dom = dom.parent();
        }

        dom.addClass(sClass);
    });
};

sapui6.ui.table.Table.prototype.removeColumnClass = function(colIdx, sClass){
    this.getRows().forEach(function(row){
        var cell = row.getCells()[colIdx];
        var dom = $(cell.getDomRef());
        while(dom.prop("tagName") != "TD"){
            dom = dom.parent();
        }

        dom.removeClass(sClass);
    });
};

sapui6.ui.table.Table.prototype.setCellData = function(rowIdx, colIdx, data){
    if(this._isOdata) {
        jQuery.sap.log.error("This method not support Odata type!.","","sapui6.ui.table.Table");
        return;
    }

    var column = this.getColumns()[colIdx];
    var oBindingInfo = this.getBindingInfo("rows");

    oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path+"/"+rowIdx+"/"+column.getKey(), data);
};

sapui6.ui.table.Table.prototype.setSelectionArea = function(rowIndex1, cellIndex1, rowIndex2, cellIndex2){
    if(arguments.length < 4) return;

    if(rowIndex1 > rowIndex2 || cellIndex1 > cellIndex2) return;
    
    this.selectionRowIndex1 = rowIndex1;
    this.selectionCellIndex1 = cellIndex1;
    this.selectionRowIndex2 = rowIndex2;
    this.selectionCellIndex2 = cellIndex2;

    if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        for(var i=rowIndex1 ; i<=rowIndex2 ; i++){
            for(var j=cellIndex1 ; j<=cellIndex2 ; j++){
                if(this.getFixedColumnIndex() >= j){
                    document.getElementById(this.gridName + '_dt1').tBodies[0].rows.item(i).cells.item(j).style.backgroundColor = "#ffdfff";
                }else{
                    document.getElementById(this.gridName + '_dt2').tBodies[0].rows.item(i).cells.item(j-this.getFixedColumnIndex()-1).style.backgroundColor = "#ffdfff";
                }
            }
        }
    }else{
        var tbody = document.getElementById(this.gridName + '_dt').tBodies[0];
        for(var i=rowIndex1 ; i<=rowIndex2 ; i++){
            for(var j=cellIndex1 ; j<=cellIndex2 ; j++){
                tbody.rows.item(i).cells.item(j).style.backgroundColor = "#ffdfff";
            }
        }
    }
};

sapui6.ui.table.Table.prototype.clearSelectionArea = function(){
    if(this.selectionRowIndex1 == -1 || this.selectionCellIndex1 == -1 || this.selectionRowIndex2 == -1 || this.selectionCellIndex2 == -1) return;

    var rowIndex1 = this.selectionRowIndex1;
    var cellIndex1 = this.selectionCellIndex1;
    var rowIndex2 = this.selectionRowIndex2;
    var cellIndex2 = this.selectionCellIndex2;

    if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        for(var i=rowIndex1 ; i<=rowIndex2 ; i++){
            for(var j=cellIndex1 ; j<=cellIndex2 ; j++){
                if(this.getFixedColumnIndex() >= j){
                    document.getElementById(this.gridName + '_dt1').tBodies[0].rows.item(i).cells.item(j).style.backgroundColor = "";
                }else{
                    document.getElementById(this.gridName + '_dt2').tBodies[0].rows.item(i).cells.item(j-this.getFixedColumnIndex()-1).style.backgroundColor = "";
                }
            }
        }
    }else{
        var tbody = document.getElementById(this.gridName + '_dt').tBodies[0];
        for(var i=rowIndex1 ; i<=rowIndex2 ; i++){
            for(var j=cellIndex1 ; j<=cellIndex2 ; j++){
                tbody.rows.item(i).cells.item(j).style.backgroundColor = "";
            }
        }
    }

    this.selectionRowIndex1 = -1;
    this.selectionCellIndex1 = -1;
    this.selectionRowIndex2 = -1;
    this.selectionCellIndex2 = -1;
};

sapui6.ui.table.Table.prototype.getRowCount = function(){
    if(this._isOdata) return this._oData.length;

    var oBindingInfo = this.getBindingInfo("rows");
    if(oBindingInfo.binding) {
        return oBindingInfo.binding.oList.length;
    }

    return 0;
};

sapui6.ui.table.Table.prototype.insertRows = function(mRows, rowIndex){
    if(this._isOdata) {
        jQuery.sap.log.error("This method not support Odata type!.","","sapui6.ui.table.Table");
        return;
    }

    var oBindingInfo = this.getBindingInfo("rows");
    if(oBindingInfo.binding) {
        if(mRows) {
            var list = oBindingInfo.binding.oList;
            var newList = list.slice(0,rowIndex);
            newList = newList.concat(mRows);
            newList = newList.concat(list.slice(rowIndex));
            oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, newList);

            return true;
        }
    }

    return false;
};

sapui6.ui.table.Table.prototype.appendRows = function(mRows){
    if(this._isOdata) {
        jQuery.sap.log.error("This method not support Odata type!.","","sapui6.ui.table.Table");
        return;
    }

    var oBindingInfo = this.getBindingInfo("rows");
    if(oBindingInfo.binding) {
        var newData = [];
        if(mRows) {
            oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, oBindingInfo.binding.oList.concat(mRows));

            return true;
        }
    }

    return false;
};

sapui6.ui.table.Table.prototype.deleteRow = function(rowIndex){
    if(this._isOdata) {
        jQuery.sap.log.error("This method not support Odata type!.","","sapui6.ui.table.Table");
        return;
    }

    var oBindingInfo = this.getBindingInfo("rows");
    if(oBindingInfo.binding) {
        var list = oBindingInfo.binding.oList;
        if(list.length > rowIndex){
            var newList = list.slice(0,rowIndex);
            newList = newList.concat(list.slice(rowIndex+1));
            oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, newList);

            return true;
        }
    }

    return false;
};

sapui6.ui.table.Table.prototype.getRowData = function(rowIndex){
    var oBindingInfo = this.getBindingInfo("rows");

    if(this._isOdata) {
        return oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(this.getRows()[rowIndex].getBindingContext(oBindingInfo.model).sPath);
    }
    
    if(oBindingInfo.binding) {
        var list = oBindingInfo.binding.oList;
        if(list.length > parseInt(rowIndex)){
            return list[parseInt(rowIndex)];
        }
    }

    return [];
};

sapui6.ui.table.Table.prototype.getCellData = function(rowIndex, cellIndex){
    var oBindingInfo = this.getBindingInfo("rows");

    if(this._isOdata) {
        return oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(this.getRows()[rowIndex].getBindingContext(oBindingInfo.model).sPath)[this.getColumns()[cellIndex].getKey()];
    }
    
    if(oBindingInfo.binding) {
        var list = oBindingInfo.binding.oList;
        if(list.length > rowIndex && this.getColumns().length > cellIndex){
            return list[rowIndex][this.getColumns()[cellIndex].getKey()];
        }
    }

    return null;
};

sapui6.ui.table.Table.prototype.getData = function(){
    if(this._isOdata) {
        return this._oData;
    }

    var oBindingInfo = this.getBindingInfo("rows");
    if(oBindingInfo.binding) {
        return oBindingInfo.binding.oList;
    }

    return [];
};

sapui6.ui.table.Table.prototype.mouseover = function(e, rowIdx){
    if(rowIdx == this.selectRowIdx) return;

    var obj = (window.event)?event.srcElement:e.currentTarget;

    while(obj.tagName != "TR"){
        obj = obj.parentNode;
    }

    var originClass = obj.getAttribute("origin_class");
    var trClassName = originClass + " sapUiTableRowHvr";    //sapUiTableTr

    obj.className = trClassName;
    var trIndex = obj.rowIndex;

    if(this.gridType == 1){
        $("#"+this.gridName + '_tbodyTb1 tr')[trIndex].className = trClassName;
    }else if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        if($("#"+this.gridName + '_dt1 tr')[trIndex]) $("#"+this.gridName + '_dt1 tr')[trIndex].className = trClassName;
        if($("#"+this.gridName + '_dt2 tr')[trIndex]) $("#"+this.gridName + '_dt2 tr')[trIndex].className = trClassName;
    }
};

sapui6.ui.table.Table.prototype.mouseout = function(e, rowIdx){
    if(rowIdx == this.selectRowIdx) return;

    var obj = (window.event)?event.srcElement:e.currentTarget;
    while(obj.tagName != "TR"){
        obj = obj.parentNode;
    }
    
    var originClass = obj.getAttribute("origin_class");
    var trIndex = obj.rowIndex;

    obj.className = originClass;

    if(this.gridType == 1){
        $("#"+this.gridName + '_tbodyTb1 tr')[trIndex].className = originClass;
    }else if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        if($("#"+this.gridName + '_dt1 tr')[trIndex]) $("#"+this.gridName + '_dt1 tr')[trIndex].className = originClass;
        if($("#"+this.gridName + '_dt2 tr')[trIndex]) $("#"+this.gridName + '_dt2 tr')[trIndex].className = originClass;
    }
};

sapui6.ui.table.Table.prototype.mouseclick = function(e, rowIdx){
    if(this.selectRowObj != null){
        this.selectRowObj.className = this.selectRowObj.getAttribute("origin_class");

        if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
            $("#"+this.gridName + '_dt1 tr')[this.selectRowObj.rowIndex].className = this.selectRowObj.getAttribute("origin_class");
            $("#"+this.gridName + '_dt2 tr')[this.selectRowObj.rowIndex].className = this.selectRowObj.getAttribute("origin_class");
        }
    }

    var o = (window.event)?event.srcElement:e.currentTarget;
    var obj = o;

    while(obj.tagName != "TD"){
        obj = obj.parentNode;
    }

    if(obj.tagName == "TD" && obj.getAttribute("data-sapui5js-table-rowIndex") != undefined){
        this.selectRowIdx = parseInt(obj.getAttribute("data-sapui5js-table-rowIndex"));
    }

    if(obj.tagName == "TD" && obj.getAttribute("data-sapui5js-table-cellIndex") != undefined){
        this.selectCellIdx = parseInt(obj.getAttribute("data-sapui5js-table-cellIndex"));
    }

    while(obj.tagName != "TR"){
        obj = obj.parentNode;
    }
    
    this.selectRowObj = obj;

    var originClass = this.selectRowObj.getAttribute("origin_class");
    var trClassName = originClass + " sapUiTableRowSel";
    
    this.selectRowObj.className = trClassName;

    var trIndex = this.selectRowIdx;
    var tdIndex = this.selectCellIdx;

    if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        $("#"+this.gridName + '_dt1 tr')[this.selectRowObj.rowIndex].className = trClassName;
        $("#"+this.gridName + '_dt2 tr')[this.selectRowObj.rowIndex].className = trClassName;
    }

    var that = this;

    if(!(o.tagName == "IMG" && o.className.indexOf("t-") > -1)) {
        var rowData = [];
        var oBindingInfo = this.getBindingInfo("rows");

        if(this._isOdata){
            rowData = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(this.getRows()[trIndex].getBindingContext(oBindingInfo.model).sPath);
        }else{
            var path = this.getRows()[trIndex].getBindingContext(oBindingInfo.model);
            rowData = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
        }

        if(trIndex > -1){
            if(this._isOdata){
                this.fireRowSelectionChange({
                    rowIndex : trIndex,
                    rowData : rowData
                });
            }else{
                this.fireRowSelectionChange({
                    rowIndex : trIndex,
                    rowData : rowData
                });
            }
        }
        
        if(trIndex > -1 && tdIndex > -1){
            if(this._isOdata){
                this.fireCellSelectionChange({
                    rowIndex : trIndex,
                    cellIndex : tdIndex,
                    rowData : rowData,
                    cellData : rowData[that.getColumns()[tdIndex].getKey()]
                });
            }else{
                this.fireCellSelectionChange({
                    rowIndex : trIndex,
                    cellIndex : tdIndex,
                    rowData : rowData,
                    cellData : rowData[that.getColumns()[tdIndex].getKey()]
                });
            }
        }
    }
};

sapui6.ui.table.Table.prototype.setRowClass = function(rowIdx,className){
    if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        $("#"+this.gridName + '_dt1 tr')[trIndex].className = className;
        $("#"+this.gridName + '_dt2 tr')[trIndex].className = className;
        $("#"+this.gridName + '_dt1 tr')[trIndex].setAttribute("origin_class", className);
        $("#"+this.gridName + '_dt2 tr')[trIndex].setAttribute("origin_class", className);
    }else{
        $("#"+this.gridName + '_dt tr')[trIndex].className = className;
        $("#"+this.gridName + '_dt tr')[trIndex].setAttribute("origin_class", className);
    }
};

sapui6.ui.table.Table.prototype.getSelectedRowIndex = function(){
    return this.selectRowIdx;
};

sapui6.ui.table.Table.prototype.getSelectedCellIndex = function(){
    return this.selectCellIdx;
};

sapui6.ui.table.Table.prototype.getSelectedCellKey = function(){
    return this.getColumns()[this.selectCellIdx].getKey();
};

sapui6.ui.table.Table.prototype.getSelectedRowData = function(msg){
    return this.getRowData(this.selectRowIdx);
};

sapui6.ui.table.Table.prototype.getSelectedCellData = function(){
    return this.getCellData(this.selectRowIdx, this.selectCellIdx);
};

sapui6.ui.table.Table.prototype.export = function(){
    jQuery.sap.require("sap.ui.core.util.Export");
    jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
    
    var oBindingInfo = this.getBindingInfo("rows");
    var oModel = oBindingInfo.binding.getModel(oBindingInfo.model);
    var columns = [];
    
    this.getColumns().forEach(function(column, index){
        columns.push({
            name:column.getTitle(),
            template:{
                content:{
                    path:column.getKey()
                }
            }
        });
    });

    var oExport = new sap.ui.core.util.Export({
        exportType: new sap.ui.core.util.ExportTypeCSV(
            {separatorChar: ","}
        ),
        models: oModel,
        rows: {
            path: oBindingInfo.path
        },
        columns: columns
    });

    oExport.saveFile().always(function() {
        this.destroy();
    });
};

sapui6.ui.table.Table.prototype.enterFilter = function(colIdx, e){
    var key=(window.event)?event.keyCode:e.which;
    
    if(key == 13){
        this.filter(colIdx);
    }
};

sapui6.ui.table.Table.prototype._getFilter = function(filterProperty, filterValue, filterOperator) {

    var oFilter = undefined,
        sPath = filterProperty,
        sValue = filterValue,
        sOperator = filterOperator,
        sParsedValue,
        oType = new sap.ui.model.type.String(),
        bIsString = oType instanceof sap.ui.model.type.String;

    if (sValue) {
        if (sOperator == "=") {
            sOperator = sap.ui.model.FilterOperator.EQ;
        } else if (sOperator == "!=") {
            sOperator = sap.ui.model.FilterOperator.NE;
        } else if (sOperator == "<=") {
            sOperator = sap.ui.model.FilterOperator.LE;
        } else if (sOperator == "<") {
            sOperator = sap.ui.model.FilterOperator.LT;
        } else if (sOperator == ">=") {
            sOperator = sap.ui.model.FilterOperator.GE;
        } else if (sOperator == ">") {
            sOperator = sap.ui.model.FilterOperator.GT;
        } else if (sOperator == "in"){
            sOperator = sap.ui.model.FilterOperator.Contains;
        }

        sParsedValue = sValue;
        oFilter = new sap.ui.model.Filter(sPath, sOperator, sParsedValue);
    }

    return oFilter;

};

sapui6.ui.table.Table.prototype.filter = function(colIdx, sFilterOption, sFilterValue){
    this.showLoading();
    jQuery.sap.require("sap.ui.model.Filter");
    
    var aFilters = this._getFilter(this.getColumns()[colIdx].getKey(), sFilterValue, sFilterOption);
    this._aFilters = aFilters;
    this.getBinding("rows").filter(aFilters, sap.ui.model.FilterType.Control);

    // this._handleResize();
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.clearFilter = function(){
    this.showLoading();
    this._aFilters = null;
    this.getBinding("rows").filter("");

    if(this.isGroup)this.doGroup(this.groupHeaderIdx);
    // else this._handleResize();

    this.hideLoading();
};

sapui6.ui.table.Table.prototype.setGroup = function(group, header_idx, start_open){
    this.isGroup = group;
    this.groupHeaderIdx = header_idx;
    this.isStartOpen = start_open;
};

sapui6.ui.table.Table.prototype.doGroup = function(header_idx){
    this.showLoading();
    this.isGroup = true;
    this.groupHeaderIdx = header_idx;
    this.isStartOpen = true;
    this.selectRowIdx = -1;
    this.selectRowObj = null;
    this.sortASC(header_idx, this.getColumns()[header_idx].getKey());
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.unGroup = function(){
    this.showLoading();
    this.isGroup = false;
    this.groupHeaderIdx = -1;
    this.isStartOpen = false;
    this.selectRowIdx = -1;
    this.selectRowObj = null;
    this.invalidate();
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.foldGroup = function(childName, rowIdx, e){
    var obj = (window.event)?event.srcElement:e.currentTarget;

    var icon = $("#"+this.getId()+"-group-fold-icon-"+rowIdx);
    // var isPlus = icon.attr("src").indexOf("ico12_closed_plus")>-1?true:false;
    var isPlus = icon.attr('data-rv-open');

    var childs = $("[name='" + childName + "']");

    var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");
    
    if(isPlus == 'true'){
        var group_icon = IconPool.getIconInfo('sap-icon://collapse');

        icon.attr("data-sap-ui-icon-content", group_icon.content);
        icon.attr('data-rv-open', 'false');
        var length = childs.length;
        for(var i=0 ; i<length ; i++){
            childs[i].style.display = "";
        }
    }else{
        var group_icon = IconPool.getIconInfo('sap-icon://expand');

        icon.attr("data-sap-ui-icon-content", group_icon.content);
        icon.attr('data-rv-open', 'true');
        var length = childs.length;
        for(var i=0 ; i<length ; i++){
            childs[i].style.display = "none";
        }
    }

    this._handleResize();
};

sapui6.ui.table.Table.prototype.foldGroup2 = function(name, level, rowIdx, e){
    var obj = (window.event)?event.srcElement:e.currentTarget;
    
    var icon = $("#"+this.getId()+"-tree-fold-icon-"+rowIdx);
    var isPlus = icon.attr('data-rv-open');
    var childs = $("[name='" + name + "']");
    var tr = obj;
    while(tr.tagName != "TR") tr = tr.parentNode;
    
    var parentKey = tr.getAttribute("level" + String(level));

    var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");

    if(isPlus == 'true'){
        var group_icon = IconPool.getIconInfo('sap-icon://collapse');

        icon.attr("data-sap-ui-icon-content", group_icon.content);
        icon.attr('data-rv-open', 'false');

        var preTree = "";
        var length = childs.length;
        var preStatus = "";
        var p_preStatus = "";
        var preLevel = level;
        var levelStatus = ["","","","","","","","",""];
        
        for(var i=0 ; i<length ; i++){
            if(childs[i].getAttribute("level"+String(level)) == parentKey && level < parseInt(childs[i].getAttribute("level"))){
                var currentLevel = parseInt(childs[i].getAttribute("level"));
                levelStatus[currentLevel] = childs[i].getAttribute("tree_status");

                if(level == currentLevel-1) levelStatus[currentLevel] = "open";
                
                if(childs[i].getAttribute("tree_status") == "open") childs[i].style.display  = "";
                
                if(level == parseInt(childs[i].getAttribute("level"))-1) {
                    childs[i].style.display = "";
                    childs[i].setAttribute("tree_status","open");
                }
                
                if(currentLevel - level == 3){
                    if(currentLevel > 0 && levelStatus[currentLevel-1] == "close") childs[i].style.display = "none";
                }else if(currentLevel - level == 4){
                    if(currentLevel > 0 && levelStatus[currentLevel-2] == "close") childs[i].style.display = "none";
                }
            }
        }
    }else{
        var group_icon = IconPool.getIconInfo('sap-icon://expand');

        icon.attr("data-sap-ui-icon-content", group_icon.content);
        icon.attr('data-rv-open', 'true');

        var length = childs.length;
        for(var i=0 ; i<length ; i++){
            if(childs[i].getAttribute("level"+String(level)) == parentKey && level < parseInt(childs[i].getAttribute("level"))){
                childs[i].style.display = "none";
                if(level == parseInt(childs[i].getAttribute("level"))-1) {
                    childs[i].setAttribute("tree_status","close");
                }

                if(childs[i].getAttribute("tree_status") == "close") childs[i].style.display = "none";
            }
        }
    }

    this._handleResize();
};


sapui6.ui.table.Table.prototype.sortGroup = function(colIdx, key){
    var dataIdx = key;

    this.dataArr.sort(function(a1,a2){
        return (a1[dataIdx]<a2[dataIdx]) ? -1 : ((a1[dataIdx]>a2[dataIdx]) ? 1 : 0);
    });
};

sapui6.ui.table.Table.prototype.isGroupSummary = function(groupIdx){
    return true;
};

sapui6.ui.table.Table.prototype.isGroupSummaryIdx = function(groupIdx, idx){
    if(this.getColumns()[idx].getGroupSummary() && this.getColumns()[idx].getGroupSummary() != "none") return true;

    return false;
};

sapui6.ui.table.Table.prototype.isTotalSummaryIdx = function(idx){
    if(this.getShowTotalSummary()){
        if(this.getColumns()[idx].getGroupSummary() && this.getColumns()[idx].getGroupSummary() != "none") return true;
    }

    return false;
};

sapui6.ui.table.Table.prototype.getTotalSummaryFormula = function(idx){
    if(idx > this.getColumns().length-1) return "none";
    if(this.getColumns()[idx].getGroupSummary()) return this.getColumns()[idx].getGroupSummary();

    return "none";
};

sapui6.ui.table.Table.prototype._resetTableContextMenu = function(oTable, iColumnIndex, sFunction){
    var length = oTable.getColumns().length;
    for(var i=0 ; i<length ; i++){
        var oColumn = oTable.getColumns()[i];
        var oMenu = oColumn.getMenu();
        if(oMenu != undefined && oMenu.getItems().length > 0){
            if(sFunction == "freeze" && sap.ui.getCore().byId(oMenu.getId()+"-freeze") != undefined){
                if(i == iColumnIndex) {
                    sap.ui.getCore().byId(oMenu.getId()+"-freeze").setEnabled(false);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_freeze").setEnabled(true);
                }else{
                    sap.ui.getCore().byId(oMenu.getId()+"-freeze").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_freeze").setEnabled(false);
                }
            }else if(sFunction == "clear_freeze" && sap.ui.getCore().byId(oMenu.getId()+"-clear_freeze") != undefined){
                sap.ui.getCore().byId(oMenu.getId()+"-freeze").setEnabled(true);
                sap.ui.getCore().byId(oMenu.getId()+"-clear_freeze").setEnabled(false);
            }else if(sFunction == "group" && sap.ui.getCore().byId(oMenu.getId()+"-group") != undefined){
                if(i == iColumnIndex) {
                    sap.ui.getCore().byId(oMenu.getId()+"-group").setEnabled(false);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_group").setEnabled(true);
                }else{
                    sap.ui.getCore().byId(oMenu.getId()+"-group").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_group").setEnabled(false);
                }
            }else if(sFunction == "clear_group" && sap.ui.getCore().byId(oMenu.getId()+"-clear_group") != undefined){
                sap.ui.getCore().byId(oMenu.getId()+"-group").setEnabled(true);
                sap.ui.getCore().byId(oMenu.getId()+"-clear_group").setEnabled(false);
            }else if(sFunction == "filter" && sap.ui.getCore().byId(oMenu.getId()+"-filter") != undefined){
                if(i == iColumnIndex) {
                    sap.ui.getCore().byId(oMenu.getId()+"-filter").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_filter").setEnabled(true);
                }
            }else if(sFunction == "clear_filter" && sap.ui.getCore().byId(oMenu.getId()+"-clear_filter") != undefined){
                if(i == iColumnIndex) {
                    sap.ui.getCore().byId(oMenu.getId()+"-filter").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_filter").setEnabled(false);
                }
            }

            if(sFunction == "group"){
                if(sap.ui.getCore().byId(oMenu.getId()+"-filter") != undefined) {
                    sap.ui.getCore().byId(oMenu.getId()+"-filter").setEnabled(false);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_filter").setEnabled(false);
                }

                if(sap.ui.getCore().byId(oMenu.getId()+"-asc") != undefined){
                    sap.ui.getCore().byId(oMenu.getId()+"-asc").setEnabled(false);
                    sap.ui.getCore().byId(oMenu.getId()+"-desc").setEnabled(false);
                }
            }else if(sFunction == "clear_group"){
                if(sap.ui.getCore().byId(oMenu.getId()+"-filter") != undefined) {
                    sap.ui.getCore().byId(oMenu.getId()+"-filter").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-clear_filter").setEnabled(false);
                }

                if(sap.ui.getCore().byId(oMenu.getId()+"-asc") != undefined){
                    sap.ui.getCore().byId(oMenu.getId()+"-asc").setEnabled(true);
                    sap.ui.getCore().byId(oMenu.getId()+"-desc").setEnabled(true);
                }
            }
        }
    }
};

sapui6.ui.table.Table.prototype._createMenuItem = function(oColumnMenu, sId, sTextI18nKey, sIcon, fHandler){
    return new sap.ui.unified.MenuItem(oColumnMenu.getId() + "-" + sId, {
        text: this.label.getText(sTextI18nKey),
        icon: sIcon ? sIcon : null,
        select: fHandler || function() {}
    });
};

sapui6.ui.table.Table.prototype._addColumnVisibilityMenuItem = function(oTable, oColumnMenu, iColumnIndex) {
    var oColumnVisibiltyMenuItem = this._createMenuItem(oColumnMenu, "column-visibilty", "show_hide_columns", "sap-icon://multi-select");
    oColumnMenu.addItem(oColumnVisibiltyMenuItem);

    var oColumnVisibiltyMenu = new sap.ui.unified.Menu(oColumnVisibiltyMenuItem.getId() + "-menu");
    oColumnVisibiltyMenu.addStyleClass("sapUiTableColumnVisibilityMenu"); 
    oColumnVisibiltyMenuItem.setSubmenu(oColumnVisibiltyMenu);
    
    var that = this;
    oTable.getColumns().forEach(function(column,index){
        var oMenuItem = that._createColumnVisibilityMenuItem(oTable, oColumnVisibiltyMenu.getId() + "-item-" + index, column);
        if(iColumnIndex == index) oMenuItem.setEnabled(false);
        oColumnVisibiltyMenu.addItem(oMenuItem);
    });
};

sapui6.ui.table.Table.prototype._resetVisibilityMenuItem = function(oTable){
    var length = oTable.getColumns().length;
    for(var i=0 ; i<length ; i++){
        var oMenu = oTable.getColumns()[i].getMenu();
        var oColumnVisibiltyMenu = sap.ui.getCore().byId(oMenu.getId() + "-column-visibilty-menu");
        if(oColumnVisibiltyMenu != undefined){
            oColumnVisibiltyMenu.destroy();
            oColumnVisibiltyMenu = new sap.ui.unified.Menu(oMenu.getId() + "-column-visibilty-menu");
            oColumnVisibiltyMenu.addStyleClass("sapUiTableColumnVisibilityMenu"); 
            sap.ui.getCore().byId(oMenu.getId() + "-column-visibilty").setSubmenu(oColumnVisibiltyMenu);
            for(var j=0 ; j<length ; j++){
                var oMenuItem = this._createColumnVisibilityMenuItem(oTable, oColumnVisibiltyMenu.getId() + "-item-" + j, oTable.getColumns()[j]);
                if(i == j) oMenuItem.setEnabled(false);
                oColumnVisibiltyMenu.addItem(oMenuItem);
            }
        }
    }
};

sapui6.ui.table.Table.prototype._createColumnVisibilityMenuItem = function(oTable, sId, oColumn) {
    var that = this;
    var sText = oColumn.getTitle(); 
    var idx = -1;
    oTable.getColumns().forEach(function(column,index){
        if(column == oColumn) idx = index; 
    });

    return new sap.ui.unified.MenuItem(sId, {
        text: sText,
        icon: oColumn.getVisible()?'sap-icon://accept':null,
        // icon: oColumn.getVisible()?this._getThemedIcon("ico_tick.png"):null,
        select: jQuery.proxy(function(oEvent) {
            that.showLoading();
            var oMenuItem = oEvent.getSource();
            var bVisible = (oColumn.getVisible())?true:false;

            if (bVisible && !that.isLastShowColumn()) {
                oColumn.setVisible(false);
                oMenuItem.setIcon(null);
            }else{
                oColumn.setVisible(true);
                oMenuItem.setIcon('sap-icon://accept');
            }

            that.invalidate();
            that._resetVisibilityMenuItem(oTable);
            that.hideLoading();
        }, this)
    });
};

sapui6.ui.table.Table.prototype._getThemedIcon = function(sIcon) {
    var sCurrentTheme = sap.ui.getCore().getConfiguration().getTheme();
    return sap.ui.resource("sap.ui.table", "themes/" + sCurrentTheme + "/img/" + sIcon);
};

sapui6.ui.table.Table.prototype.openContextMenu = function(idx, e){
    if(this.getRows().length == 0 && this.getBinding("rows") == undefined) return;

    var obj = (window.event)?event.srcElement:e.currentTarget;
    var eDock = sap.ui.core.Popup.Dock;
    if(this.getColumns()[idx].getMenu()) {
        var oMenu = this.getColumns()[idx].getMenu();
        oMenu.open(false, obj, eDock.BeginTop, eDock.BeginBottom, obj, "none none");
    }
};

sapui6.ui.table.Table.prototype._getUniqueValuesListBox = function(idx){
    if(this._uniqueListBox.length == 0){
        var that = this;
        var list = [];
        var unique = [];

        if(this._isOdata) list = this._oData;
        else list = this.getBindingInfo("rows").binding.oList;

        this.getColumns().forEach(function(){
            var oListBox = new sap.ui.commons.ListBox();
            oListBox.addItem(new sap.ui.core.Item({text:"", key:""}));

            that._uniqueListBox.push(oListBox);
            unique.push({});
        });

        list.forEach(function(row){
            that.getColumns().forEach(function(column,index){
                if(column.getFilterType().toLowerCase() == "select"){
                    var path = column.getKey();
                    var v = row[path];
                    if(!unique[index][v]){
                        unique[index][v] = true;
                        that._uniqueListBox[index].addItem(new sap.ui.core.Item({text:v, key:v}));
                    }
                }
            });
        });
    }

    return this._uniqueListBox[idx];
};

sapui6.ui.table.Table.prototype.setPaging = function(isPaging, pageCnt){
    this.paging = isPaging;
    this.pageCnt = pageCnt;
};

sapui6.ui.table.Table.prototype.nextPage = function(currentPageNo){
    if(this.pageNo < this.lastPageNo){
        this.pageNo = parseInt(this.pageNo) + 1;
        document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
        // this.writeRows();
    }
};

sapui6.ui.table.Table.prototype.previousPage = function(currentPageNo){
    if(this.pageNo > 1){
        this.pageNo = parseInt(this.pageNo) - 1;
        document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
        // this.writeRows();
    }
};

sapui6.ui.table.Table.prototype.firstPage = function(){
    if(this.pageNo > 1){
        this.pageNo = 1;
        document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
    }
};

sapui6.ui.table.Table.prototype.lastPage = function(){
    if(this.pageNo < this.lastPageNo){
        this.pageNo = this.lastPageNo;
        document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
    }
};

sapui6.ui.table.Table.prototype.enterChangePage = function(e){
    var key=(window.event)?event.keyCode:e.which;
    
    if(key == 13){
        this.changePage();
    }
};

sapui6.ui.table.Table.prototype.changePage = function(){
    var currentPageNo = document.getElementById(this.gridName + "_pageNo").value;
    if(currentPageNo != this.pageNo){
        if(currentPageNo > this.lastPageNo){
            alert("Typed page does not exist.");
            document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
            return;
        }else if(currentPageNo < 1){
            alert("Typed page does not exist.");
            document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
            return;
        }

        this.pageNo = currentPageNo;
        document.getElementById(this.gridName + "_pageNo").value = this.pageNo;
        // this.writeRows();
    }
};

sapui6.ui.table.Table.prototype.setSortIcon = function(colIdx, iconUrl){
    var length = this.getColumns().length;
    for(var i=0 ; i<length ; i++){
        $("#"+this.getId()+"-sort-icon-"+i).html("");
    }


    var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");
    var sortIcont = IconPool.getIconInfo(iconUrl);
    var iconHtml = '<span role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + sortIcont.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>';

    if(this.gridType == 0 && this.getFixedColumnIndex() < 0){
        $("#"+this.getId()+"-sort-icon-"+colIdx).html(iconHtml);
    }else if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        $("#"+this.getId()+"-sort-icon-"+colIdx).html(iconHtml);
    }
};

sapui6.ui.table.Table.prototype.sortASC = function(colIdx, key){
    if(!this.isGroup) this.showLoading();

    if(this._isOdata){
        var aSorters = [];
        aSorters.push(new sap.ui.model.Sorter(key, false));

        this.getBinding("rows").sort(aSorters);
    }else{
        var dataIdx = colIdx;

        dataIdx = key;

        var dataArr = [];
        if(this.getBindingInfo("rows").binding.getModel().toString().toLowerCase().indexOf("odata") > -1){
            dataArr = this._oData;
        }else {
            dataArr = this.getBindingInfo("rows").binding.oList;
        }

        if(!this.isGroup || colIdx == this.groupHeaderIdx){
            this.setSortIcon(colIdx, 'sap-icon://sort-ascending');
            // this.setSortIcon(colIdx, this._getThemedIcon("ico12_sort_asc.gif"));
            
            if(this.getMergeColumnIndex() > -1){
                var that = this;
                dataArr.sort(
                    function(a1,a2){
                        var c = 0;
                        for(var i=0 ; i<=that.mergeIndex ; i++){
                            if(a1[that.getColumns()[i].getKey()] < a2[that.getColumns()[i].getKey()]) return -1;
                            else if(a1[that.getColumns()[i].getKey()] > a2[that.getColumns()[i].getKey()]) return 1;
                        }

                        if(colIdx > that.mergeIndex){
                            return (a1[dataIdx]<a2[dataIdx]) ? -1 : ((a1[dataIdx]>a2[dataIdx]) ? 1 : 0);
                        } 
                    }
                );
            }else{
                var that = this;
                dataArr.sort(function(a1,a2){
                    return (a1[dataIdx]<a2[dataIdx]) ? -1 : ((a1[dataIdx]>a2[dataIdx]) ? 1 : 0);
                });
            }

            var oBindingInfo = this.getBindingInfo("rows");
            if(oBindingInfo.binding) {
                oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, dataArr);
            }
        }
    }

    if(!this.isGroup) this.hideLoading();
};

sapui6.ui.table.Table.prototype.sortDES = function(colIdx, key){
    this.showLoading();
    if(this._isOdata){
        var aSorters = [];
        aSorters.push(new sap.ui.model.Sorter(key, true));

        this.getBinding("rows").sort(aSorters);
    }else{
        var dataIdx = colIdx;
        dataIdx = key;

        var dataArr = [];
        if(this.getBindingInfo("rows").binding.getModel().toString().toLowerCase().indexOf("odata") > -1){
            dataArr = this._oData;
        }else {
            dataArr = this.getBindingInfo("rows").binding.oList;
        }

        if(!this.isGroup || colIdx == this.groupHeaderIdx){
            this.setSortIcon(colIdx, 'sap-icon://sort-descending');
            // this.setSortIcon(colIdx, this._getThemedIcon("ico12_sort_desc.gif"));

            if(this.getMergeColumnIndex() > -1){
                var that = this;
                dataArr.sort(
                    function(a1,a2){
                        var c = 0;
                        for(var i=0 ; i<=that.mergeIndex ; i++){
                            if(a1[that.getColumns()[i].getKey()] > a2[that.getColumns()[i].getKey()]) return -1;
                            else if(a1[that.getColumns()[i].getKey()] < a2[that.getColumns()[i].getKey()]) return 1;
                        }

                        if(colIdx > that.mergeIndex){
                            return (a1[dataIdx]>a2[dataIdx]) ? -1 : ((a1[dataIdx]<a2[dataIdx]) ? 1 : 0);
                        } 
                    }
                );
            }else{
                var that = this;
                dataArr.sort(function(a1,a2){
                    return (a1[dataIdx]>a2[dataIdx]) ? -1 : ((a1[dataIdx]<a2[dataIdx]) ? 1 : 0);
                });
            }

            var oBindingInfo = this.getBindingInfo("rows");
            if(oBindingInfo.binding) {
                oBindingInfo.binding.getModel(oBindingInfo.model).setProperty(oBindingInfo.path, dataArr);
            }
        }
    }
    
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.getFormularColumnCount = function(){
    var cnt = 0;
    this.getColumns().forEach(function(column){
        if(column.getFormular()) cnt++;
    });

    return cnt;
};

sapui6.ui.table.Table.prototype.getSamePathCount = function(sPath){
    var cnt = 0;
    this.getColumns().forEach(function(column){
        if(column.getKey() == sPath) cnt++;
    });

    return cnt;
};

sapui6.ui.table.Table.prototype.multiSortASC = function(idx1, idx2, idx3){
    
};

sapui6.ui.table.Table.prototype.showColumn = function(idx, e){
    var obj = (window.event)?event.srcElement:e.currentTarget;
    
    if(obj.checked) {
        this.getColumns()[idx].setVisible(true);
    }else {
        if(this.isLastShowColumn()) {
            obj.checked = true;
            alert("Cannot hide last column!!");
        }
        else {
            this.getColumns()[idx].setVisible(false);
        }
    }
    this.invalidate();
};

sapui6.ui.table.Table.prototype.isLastShowColumn = function(){
    var cnt = 0;

    this.getColumns().forEach(function(column){
        if(!column.getVisible()) cnt++;
    });
    if(cnt == length-1) return true;

    return false;
};

sapui6.ui.table.Table.prototype.hideColumns = function(colIdxArr){
    var length = colIdxArr.length;

    for(var i=0 ; i<length ; i++){
        this.getColumns()[parseInt(colIdxArr[i])].setVisible(false);
    }

    this.invalidate();
};

sapui6.ui.table.Table.prototype.showColumns = function(colIdxArr){
    var length = colIdxArr.length;
    
    for(var i=0 ; i<length ; i++){
        this.getColumns()[parseInt(colIdxArr[i])].setVisible(true);
    }
    this.invalidate();
};

sapui6.ui.table.Table.prototype.getShowColumnCount = function(){
    var cnt = 0;

    this.getColumns().forEach(function(column){
        if(column.getVisible()) cnt++;
    });

    return cnt;
};

sapui6.ui.table.Table.prototype.insertColumns = function(colIdx, side){

};

sapui6.ui.table.Table.prototype.deleteColumns = function(colIdx){
    if(this.getColumns().length == 1 || this.isLastShowColumn()){
        alert("Cannot delete last column!!");
        return;
    }
    
    if(this.isGroup && this.groupHeaderIdx == colIdx) return;
    
    if(this.isGroup && this.groupHeaderIdx > colIdx) this.groupHeaderIdx = this.groupHeaderIdx - 1;

    
};

sapui6.ui.table.Table.prototype.setBgColorColumn = function(colIdx, color){
    var orginalHeaderIdx = colIdx;

    if(this.isGroup) {
        if(orginalHeaderIdx == this.groupHeaderIdx) colIdx = 0;
        else colIdx = colIdx+1;
    }
    
    this.getColumns()[orginalHeaderIdx].setBackgroundColor(color);
    if(this.gridType == 0 && this.getFixedColumnIndex() < 0){
        var tbody = document.getElementById(this.gridName + "_dt").tBodies[0];
        var length = tbody.rows.length;
        for(var i=0 ; i<length ; i++){
            tbody.rows.item(i).cells.item(colIdx).style.backgroundColor = color;
        }
    }else if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
        if(colIdx <= this.getFixedColumnIndex()){
            var tbody = document.getElementById(this.gridName + "_dt1").tBodies[0];
            var length = tbody.rows.length;
            for(var i=0 ; i<length ; i++){
                tbody.rows.item(i).cells.item(colIdx).style.backgroundColor = color;
            }
        }else{
            var tbody = document.getElementById(this.gridName + "_dt2").tBodies[0];
            var length = tbody.rows.length;
            var idx = colIdx - this.getFixedColumnIndex() -1;
            for(var i=0 ; i<length ; i++){
                tbody.rows.item(i).cells.item(idx).style.backgroundColor = color;
            }
        }
    }
};

sapui6.ui.table.Table.prototype.clearFreezePane = function(){
    this.showLoading();
    this.gridType = 0;
    this.setProperty("fixedColumnIndex", -1, true);
    this.selectRowIdx = -1;
    this.selectRowObj = null;
    this.invalidate();
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.scrollX = function(div1, div2){
    if(this.gridType != 1){
        if(document.getElementById(this.getId()+"_t2") != undefined){
            if(this.getTotalSummaryLocation() == 'Top'){
                $("#"+this.getId()+"_h2").scrollLeft($("#"+this.getId()+"_d2").scrollLeft());
                $("#"+this.getId()+"_t2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
                $("#"+this.getId()+"_d2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
            }else{
                $("#"+this.getId()+"_h2").scrollLeft($("#"+this.getId()+"_t2").scrollLeft());
                $("#"+this.getId()+"_t2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
                $("#"+this.getId()+"_d2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
            }
        }else{
            $("#"+this.getId()+"_h2").scrollLeft($("#"+this.getId()+"_d2").scrollLeft());
            $("#"+this.getId()+"_d2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
        } 
    }
};

sapui6.ui.table.Table.prototype.scrollY = function(div1, div2){
    if(this.gridType != 1) {
        $("#"+this.getId()+"_d1").scrollTop($("#"+this.getId()+"_d2").scrollTop());
        $("#"+this.getId()+"_d2").scrollTop($("#"+this.getId()+"_d1").scrollTop());
    }
};

sapui6.ui.table.Table.prototype.scroll = function(){
    if(document.getElementById(this.getId()+"_t") != undefined){
        if(this.getTotalSummaryLocation() == 'Top'){
            $("#"+this.getId()+"_h").scrollLeft($("#"+this.getId()+"_d").scrollLeft());
            $("#"+this.getId()+"_t").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
            $("#"+this.getId()+"_d").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
        }else{
            $("#"+this.getId()+"_h").scrollLeft($("#"+this.getId()+"_t").scrollLeft());
            $("#"+this.getId()+"_t").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
            $("#"+this.getId()+"_d").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
        }
    }else{
        $("#"+this.getId()+"_h").scrollLeft($("#"+this.getId()+"_d").scrollLeft());
        $("#"+this.getId()+"_d").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
    }
};

sapui6.ui.table.Table.prototype.freezePane = function(colIdx){
    this.showLoading();
    this.gridType = 0;
    this.setFixedColumnIndex(colIdx);
    this.selectRowIdx = -1;
    this.selectRowObj = null;
    this.invalidate();
    this.hideLoading();
};

sapui6.ui.table.Table.prototype.getScrollBarWidth = function() {  
   var inner = document.createElement('p');  
   inner.style.width = "100%";  
   inner.style.height = "100%";  

   var outer = document.createElement('div');  
   outer.style.position = "absolute";  
   outer.style.top = "0px";  
   outer.style.left = "0px";  
   outer.style.visibility = "hidden";  
   outer.style.width = "100px";  
   outer.style.height = "100px";  
   outer.style.overflow = "hidden";  
   outer.appendChild (inner);  

   document.body.appendChild (outer);  

   var w1 = inner.offsetWidth;  
   var h1 = inner.offsetHeight;
   outer.style.overflow = 'scroll';  
   var w2 = inner.offsetWidth;  
   var h2 = inner.offsetHeight;
   if (w1 == w2) w2 = outer.clientWidth;
   if (h1 == h2) h2 = outer.clientHeight;   

   document.body.removeChild (outer);  

   return (w1 - w2);  
};

sapui6.ui.table.Table.prototype.expression = function(v, exp){
    if(v == undefined) return "";
    if(exp == undefined) return v;

    if(parseFloat(v)){
        return "<span style='display:block;width:100%;height:100%;" + eval(exp.replace(/this/gi,this.offCurrency(v))) + "'>" + v + "</span>";
    }else{
        return "<span style='display:block;width:100%;height:100%;" + eval(exp.replace(/this/gi,"\""+v+"\"")) + "'>" + v + "</span>";
    }
};

sapui6.ui.table.Table.prototype.offCurrency = function( v ){
    if(v == undefined || v == "") return v;

    var regExp=/\D/g;
    var prefix = "";
    var d = "";
    
    if(v.indexOf("-") > -1) {
        prefix = "-";
        v = v.substring(1);
    }

    if(v.indexOf(".") > -1) {
        d = v.substring(v.indexOf("."));
        d = "." + d.substring(1).replace(regExp,"");
        v = v.substring(0,v.indexOf("."));
    }
    var fv=v.replace(regExp,"");
    
    return prefix+fv+d;
};

sapui6.ui.table.Table.prototype.changeFormat = function(value, format){
    if(format){
        if(format.indexOf("#") > -1){
            var groupingSeparator = ",";
            var maxFractionDigits = 0;
            var decimalSeparator = ".";
            if(format.indexOf(".") == -1){
                groupingSeparator = ",";
            }else{
                if(format.indexOf(",") < format.indexOf(".")){
                    groupingSeparator = ",";
                    decimalSeparator = ".";
                    maxFractionDigits = format.length - format.indexOf(".") - 1;
                }else{
                    groupingSeparator = ".";
                    decimalSeparator = ",";
                    maxFractionDigits = format.length - format.indexOf(",") - 1;
                }
            }

            var prefix = "";
            var d = "";
            v = String(parseFloat(value).toFixed(maxFractionDigits));

            if(v.indexOf("-") > -1) {
                prefix = "-";
                v = v.substring(1);
            }

            if(maxFractionDigits > 0) {
                d = v.substring(v.indexOf(decimalSeparator));
                v = v.substring(0,v.indexOf(decimalSeparator));
            }
            var regExp=/\D/g;
            v = v.replace(regExp,"");
            var r = /(\d+)(\d{3})/;
            while (r.test(v)) {
                v = v.replace(r, '$1' + groupingSeparator + '$2');
            }
            
            return prefix+v+d;
        }else if(format.indexOf("yy") > -1){
            if (value) {
                var date_format = format;
                date_format = date_format.replace("yyyy",value.substring(0,4));
                date_format = date_format.replace("MM",value.substring(4,6));
                date_format = date_format.replace("dd",value.substring(6));

                return date_format; 
            } else {
                return value;
            }
        }else if(format.indexOf("%") > -1){
            if(value){
                return String(parseFloat(value).toFixed(2)) + "%";
            }else{
                return value;
            }
        }
    }else{
        return value;
    }
};

sapui6.ui.table.Table.prototype.trim = function( v ){
    return String(v).replace(/^\s+|\s+$/g, "");
};

sapui6.ui.table.Table.prototype._showNoDataText = function(){
    if(this.getRows().length == 0 && this.getNoDataText() != ""){
        var d = $("#" + this.getId() + "-nodatatext");
        d.css("top", ($("#"+this.getId()).height()/2));
        d.css("display","block");
    }
};

sapui6.ui.table.Table.prototype._hideNoDataText = function(){
    $("#" + this.getId() + "-nodatatext").css("display","none");
};  

sapui6.ui.table.Table.prototype.isLoading = function(){
    return this._isLoading;
};

sapui6.ui.table.Table.prototype.showLoading = function(){
    this._isLoading = true;
    this._hideNoDataText();

    // var gridDiv = $("#"+this.getId());

    // var top = 0;
    // var left = 0;
    // var height = 0;
    // var width = 0;

    // if(this.gridType == 0 && this.getFixedColumnIndex() > -1){
    //     top = $("#"+this.getId()+"_h1").offset().top;
    //     left = $("#"+this.getId()+"_h1").offset().left;
    //     height = $("#"+this.getId()+"_d1").height() + $("#"+this.getId()+"_h1").height();
    //     width = $("#"+this.getId()).width();
    // }else if(this.gridType == 1){
    //     top = $("#"+this.getId()+"_d").offset().top;
    //     left = $("#"+this.getId()+"_d").offset().left;
    //     height = $("#"+this.getId()+"_d").height();
    //     width = $("#"+this.getId()+"_d").width();
    // }else if(this.gridType == 2){
    //     top = $("#"+this.getId()+"_d").offset().top;
    //     left = $("#"+this.getId()+"_d").offset().left;
    //     height = $("#"+this.getId()+"_d").height();
    //     width = $("#"+this.getId()+"_d").width();
    // }else{
    //     top = $("#"+this.getId()+"_h").offset().top;
    //     left = $("#"+this.getId()+"_h").offset().left;
    //     height = $("#"+this.getId()+"_d").height() + $("#"+this.getId()+"_h").height();
    //     width = $("#"+this.getId()+"_d").width();
    // }

    // var loadingBar = $("#" + this.getId() + "-loading");
    // loadingBar.css("top", top);
    // loadingBar.css("left", left);
    // loadingBar.css("width", width);
    // loadingBar.css("height", height);
    // loadingBar.css("display","block");


    sap.ui.getCore().byId(this.getId()).setBusy(true);
};

sapui6.ui.table.Table.prototype.hideLoading = function(){
    this._isLoading = false;
    // var that = this;
    // var loadingBar = $("#" + this.getId() + "-loading");

    // if(this.getRows().length == 0) {
    //     loadingBar.css("display","none");
    //     this._showNoDataText();
    // }else{
    //     jQuery.sap.delayedCall(50, that, function() {
    //         loadingBar.css("display","none");
    //         if(that.getRows().length == 0) that._showNoDataText();
    //     });
    // }

    sap.ui.getCore().byId(this.getId()).setBusy(false);
};

sapui6.ui.table.Table.prototype.setOrientationOption = function(option){
    this.orientationOption = option;
};

sapui6.ui.table.Table.prototype.orientationEventHandler = function(){
    if(this.isDeviceQuery){
        this.setDeviceQuery(this.deviceQuery);
        if(this.orientationOption == 1) this.invalidate();
        else if(this.orientationOption == 0) this._handleResize();
    }
};

sapui6.ui.table.Table.prototype.isMobile = function(){
    if(sap.ui.Device.system.phone || sap.ui.Device.system.tablet) return true;

    return false;
};

sapui6.ui.table.Table.prototype._handleResize = function(isResize){
    var gridDiv = document.getElementById(this.getId());
    $(gridDiv).css("height", $(gridDiv).height()+"px");
    $(gridDiv).css("width", $(gridDiv).width()+"px");
    
    var regexp = /px/g;
    var scrollWidth = this.getScrollBarWidth();
    // if(scrollWidth <= 0) scrollWidth = 17;

    if(this.gridType == 0){
        if(this.getFixedColumnIndex() < 0){
            if(isResize){
                $(gridDiv).css("width",String(parseInt($(window).width()*this._widthRatio))+"px");
                $("#"+this.getId()+"_d").css("width", $(gridDiv).width()+"px");
            }


            var dataDiv = document.getElementById(this.gridName + '_d');
            var headerDiv = document.getElementById(this.gridName + '_h');
            var dataTb = document.getElementById(this.gridName + '_dt');
            var headerTb = document.getElementById(this.gridName + '_ht');
            var totalDiv = document.getElementById(this.gridName + '_t');
            var totalTb = document.getElementById(this.gridName + '_tt');

            if(!this.getHeight()) $(gridDiv).css("height", $(dataTb).height()+$(headerTb).height()+"px");

            $(dataDiv).css("width", $(gridDiv).width()+"px");
            $(headerDiv).css("width", $(gridDiv).width()+"px");
            if(totalDiv != undefined) $(totalDiv).css("width", $(gridDiv).width()+"px");
            $(headerDiv).css("overflow", "hidden");
            $(dataDiv).css("overflow", "hidden");
            if(totalDiv != undefined) $(totalDiv).css("overflow", "hidden");

            if(totalDiv != undefined && this.getTotalSummaryLocation() == 'Bottom') {
                $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top) - $(totalDiv).height());
            }else {
                $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top ));
            }

            var yscroll = false;
            var xscroll = false;

            if(this.getRows().length > 0){
                if($(dataTb).outerWidth() > $(dataDiv).width()){
                    xscroll = true;
                    if(totalDiv != undefined && this.getTotalSummaryLocation() != "Top"){
                        $(totalDiv).css("overflow-x", "auto");
                        $(totalDiv).css("-webkit-overflow-scrolling", "touch");
                    }else{
                        $(dataDiv).css("overflow-x", "auto");
                        $(dataDiv).css("-webkit-overflow-scrolling", "touch");
                    }
                }

                var addScrollSize = 0;
                if(xscroll) addScrollSize = scrollWidth;

                if(this.getHeight() == "100%") addScrollSize = addScrollSize*(-1);

                if(totalDiv != undefined && this.getTotalSummaryLocation() == 'Bottom') {
                   $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top) - $(totalDiv).height() - addScrollSize);
                }

                if($(dataTb).outerHeight() > ($(dataDiv).height()-addScrollSize)){
                    yscroll = true;
                    
                    $(dataDiv).css("overflow-y", "auto");
                    $(dataDiv).css("-webkit-overflow-scrolling", "touch");

                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $(headerDiv).css("width", ($(dataDiv).width()-scrollWidth) + "px");
                        if(totalDiv != undefined)  $(totalDiv).css("width", ($(dataDiv).width()-scrollWidth) + "px");
                    });
                }else{
                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $(headerDiv).css("width", $(dataDiv).width() + "px");
                        $(headerTb).css("width", $(dataDiv).width() + "px");
                        $(dataTb).css("width", $(dataDiv).width() + "px");
                        if(totalDiv != undefined)  $(totalTb).css("width", $(dataDiv).width() + "px");
                    });

                    $(dataDiv).css("height", $(dataTb).outerHeight() + "px");
                }

                if(sap.ui.Device.browser.msie){
                    $("#"+this.getId()+"_dt tr:first").addClass("sapUiTableRowHvr");
                    $("#"+this.getId()+"_ht tr:first").addClass("sapUiTableRowHvr");
                    if(totalDiv != undefined) $("#"+this.getId()+"_tt tr:first").addClass("sapUiTableRowHvr");
                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $("#"+that.getId()+"_dt tr:first").removeClass("sapUiTableRowHvr");
                        $("#"+that.getId()+"_ht tr:first").removeClass("sapUiTableRowHvr");
                        if(totalDiv != undefined) $("#"+this.getId()+"_tt tr:first").removeClass("sapUiTableRowHvr");
                    });
                }
            }
        }else if(this.getFixedColumnIndex() > -1){
            if(isResize) $(gridDiv).css("width",String(parseInt($(window).width()*this._widthRatio))+"px");

            var leftTableWidth = 0;

            for(var i=0 ; i<=this.getFixedColumnIndex() ; i++){
                leftTableWidth += parseInt(this.getColumns()[i].getWidth().replace(regexp,""));
            }

            if(this.isGroup) leftTableWidth += parseInt(this.getColumns()[this.groupHeaderIdx].getWidth().replace(regexp,""));
            
            $("#"+this.getId()+"_left_div").css("width", leftTableWidth+"px");

            var dataDiv = document.getElementById(this.gridName + '_d1');
            var headerDiv = document.getElementById(this.gridName + '_h1');
            var totalDiv = document.getElementById(this.gridName + '_t1');
            var dataTb = document.getElementById(this.gridName + '_dt1');
            var headerTb = document.getElementById(this.gridName + '_ht1');
            var totalTb = document.getElementById(this.gridName + '_tt1');

            $(dataDiv).css("overflow", "hidden");
            $(headerDiv).css("overflow", "hidden");
            if(totalDiv != undefined) $(totalDiv).css("overflow", "hidden");

            if(!this.getHeight()) $(gridDiv).css("height", $(dataTb).height()+$(headerTb).height()+"px");

            $(dataDiv).css("width", leftTableWidth+"px");
            $(headerDiv).css("width", leftTableWidth+"px");
            if(totalDiv != undefined) $(totalDiv).css("width", leftTableWidth+"px");

            if(totalDiv != undefined && this.getTotalSummaryLocation() == 'Bottom') {
                $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top) - $(totalDiv).height());
            }else {
                $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top));
            }

            var rightWidth = $(gridDiv).innerWidth()-$(dataDiv).outerWidth();

            $("#"+this.getId()+"_right_div").css("width", rightWidth+"px");

            var dataDiv2 = document.getElementById(this.gridName + '_d2');
            var headerDiv2 = document.getElementById(this.gridName + '_h2');
            var totalDiv2 = document.getElementById(this.gridName + '_t2');
            var dataTb2 = document.getElementById(this.gridName + '_dt2');
            var headerTb2 = document.getElementById(this.gridName + '_ht2');
            var totalTb2 = document.getElementById(this.gridName + '_tt2');

            $(headerDiv2).css("overflow", "hidden");
            $(dataDiv2).css("overflow", "hidden");
            if(totalDiv2 != undefined) $(totalDiv2).css("overflow", "hidden");

            $(dataDiv2).css("height", $(dataDiv).height() + "px");

            var yscroll = false;
            var xscroll = false;

            if(this.getRows().length > 0){
                if($(dataTb2).outerWidth() > $(dataDiv2).width()){
                    xscroll = true;
                    if(totalDiv2 != undefined && this.getTotalSummaryLocation() != "Top"){
                        $(totalDiv2).css("overflow-x", "auto");
                        $(totalDiv2).css("-webkit-overflow-scrolling", "touch");
                    }else{
                        $(dataDiv2).css("overflow-x", "auto");
                        $(dataDiv2).css("-webkit-overflow-scrolling", "touch");
                        $(dataDiv).css("height", $(dataDiv).height()-scrollWidth);
                    }
                }

                var addScrollSize = 0;
                if(xscroll) addScrollSize = scrollWidth;

                if(totalDiv2 != undefined && this.getTotalSummaryLocation() == 'Bottom') {
                    $(dataDiv2).css("height", ($(dataDiv).height() - addScrollSize) + "px");
                    $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top) - $(totalDiv).height() - addScrollSize);
                }

                if($(dataTb2).outerHeight() > ($(dataDiv2).height()-addScrollSize)){
                    yscroll = true;
                    $(dataDiv2).css("overflow-y", "auto");
                    $(dataDiv2).css("-webkit-overflow-scrolling", "touch");

                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $(headerDiv2).css("width", ($(dataDiv2).width()-scrollWidth) + "px");
                        if(totalDiv2 != undefined) $(totalDiv2).css("width", ($(dataDiv2).width()-scrollWidth) + "px");

                        if(this.isGroup){
                            $(dataTb2).css("width", $(headerTb2).outerWidth() + "px");
                            if(totalDiv2 != undefined) $(totalTb2).css("width", $(headerTb2).outerWidth() + "px");
                        }
                    });
                }else{
                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $(headerDiv2).css("width", $(dataDiv2).width() + "px");
                        if(totalDiv2 != undefined) $(totalDiv2).css("width", $(dataDiv2).width() + "px");
                    });

                    $(dataDiv).css("height", $(dataTb2).outerHeight() + addScrollSize + "px");
                    $(dataDiv2).css("height", $(dataTb2).outerHeight() + addScrollSize + "px");
                }

                if(sap.ui.Device.browser.msie){
                    $("#"+this.getId()+"_dt2 tr:first").addClass("sapUiTableRowHvr");
                    if(totalDiv2 != undefined) $("#"+this.getId()+"_tt2 tr:first").addClass("sapUiTableRowHvr");

                    var that = this;
                    jQuery.sap.delayedCall(100, that, function() {
                        $("#"+that.getId()+"_dt2 tr:first").removeClass("sapUiTableRowHvr");
                        if(totalDiv2 != undefined) $("#"+this.getId()+"_tt2 tr:first").removeClass("sapUiTableRowHvr");
                    });
                }
            }
        }
    } else if(this.gridType == 1){
        this.tbodyDiv1 = document.getElementById(this.gridName + "_tbodyDiv1");
        this.tbodyTb1 = document.getElementById(this.gridName + "_tbodyTb1");
        this.tbodyDiv2 = document.getElementById(this.gridName + "_tbodyDiv2");
        this.tbodyTb2 = document.getElementById(this.gridName + "_tbodyTb2");

        if(isResize){
            $(gridDiv).css("width",String(parseInt($(window).width()*this._widthRatio))+"px");
        }
        
        var dataDiv = document.getElementById(this.gridName + '_d');

        $(dataDiv).css("width", $(gridDiv).width()+"px");
        $(dataDiv).css("border-top","2px solid " + this.getStrongColor());

        if(this.getRows().length > 0){
            $(this.tbodyDiv2).css("width", ($(dataDiv).width() - $(this.tbodyTb1).width())+"px");

            if($(this.tbodyTb2).width() > ($(dataDiv).width() - $(this.tbodyTb1).width())){
                $(this.tbodyDiv2).css("overflow-x", "auto");
                $(this.tbodyDiv2).css("-webkit-overflow-scrolling", "touch");
                $(this.tbodyDiv1).css("height", $(this.tbodyDiv2).height()-scrollWidth+"px");
            }
        }

    }else if(this.gridType == 2){
        var dataDiv = document.getElementById(this.gridName + '_d');
        var dataTb = document.getElementById(this.gridName + '_dt');

        $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top));
        $(dataDiv).css("width", $(gridDiv).width()+"px");
        $(dataDiv).css("border-top","2px solid " + this.getStrongColor());
        
        if($(dataTb).outerHeight() > $(dataDiv).height()){
            $(dataDiv).css("overflow-y", "auto");
            $(dataDiv).css("-webkit-overflow-scrolling", "touch");
            document.getElementById(this.gridName + "_gridbg").className = "sapui6_table_wrap";
        }
    }
};

sapui6.ui.table.Table.prototype.changeColumnsOrder = function(sColumnsOrder){
    this.setProperty("columnsOrder", sColumnsOrder, true);
    this._setColumnsConfiguration();
    oBindingInfo = this.getBindingInfo("rows");
    
    if(oBindingInfo.binding) {
        if(oBindingInfo.model) this.bindRows(oBindingInfo.model + ">" + oBindingInfo.path);
        else this.bindRows(oBindingInfo.path);
    }
};

sapui6.ui.table.Table.prototype._changeColumnOrder = function(fromIdx, toIdx){
    var newHeaderArr = [];
    
    if(fromIdx == toIdx) return;

    var newColumns = new Object(this.getColumns());

    newColumns[fromIdx] = this.getColumns()[toIdx];
    newColumns[toIdx] = this.getColumns()[fromIdx];

    this.removeAllAggregation("columns");
    newColumns.forEach((function(column){
        this.addColumn(column);
    }).bind(this));

    oBindingInfo = this.getBindingInfo("rows");
    
    if(oBindingInfo.binding) {
        if(oBindingInfo.model) this.bindRows(oBindingInfo.model + ">" + oBindingInfo.path);
        else this.bindRows(oBindingInfo.path);
    }
};

sapui6.ui.table.Table.prototype.drag = function(e){
    e.dataTransfer.setData("Text",e.target.getAttribute("colidx"));
};

sapui6.ui.table.Table.prototype.drop = function(e){
    e.preventDefault();
    
    var dragIdx = e.dataTransfer.getData("Text");
    var dropIdx = e.target.getAttribute("colidx");
    
    if(this.isGroup){
        if(dragIdx == this.groupHeaderIdx || dropIdx == this.groupHeaderIdx)return;
    }

    if(this.isMultiHeader){
        if(this.getColumns()[parseInt(dragIdx)].getHeaderGroup() != this.getColumns()[parseInt(dropIdx)].getHeaderGroup()) return;
    }

    if(!this.getEnableColumnReordering()) return;

    this._changeColumnOrder(parseInt(dragIdx), parseInt(dropIdx));
};

sapui6.ui.table.Table.prototype.allowDrop = function(e){
    e.preventDefault();
    
};

sapui6.ui.table.Table.prototype.isSupportDraggable = function(){
    if('draggable' in document.createElement('span')) {
        return true;
    }
    return false;
};

sapui6.ui.table.Table.prototype.showContextMenu = function(idx){
    var column = this.getColumns()[idx];
    if(column.getShowSortMenuEntry() || column.getShowVisibilityMenuEntry() || column.getShowGroupMenuEntry() || column.getShowFilterMenuEntry() || column.getShowInsertColumnMenuEntry || column.getShowBackgroundColorMenuEntry() || column.getShowFreezePaneMenuEntry()) return true;
    else return false;
};

sapui6.ui.table.Table.prototype.renderTableHCell = function(idx, isIncludeTHtag, title, colspan){
    var evtIdx = idx;

    var th = "";
    if(isIncludeTHtag) th = '<th class="sapui6_table_th"';
    
    if(title == undefined){
        if(this.showContextMenu(idx)){
            if(this.isMobile()) th += 'onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\').openContextMenu(' + idx + ',event);"';
            else th += 'onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\').openContextMenu(' + idx + ',event);return false;"';
        }
    }

    th += ' style="';
    th += 'border-top-color:'+this.getStrongColor() + ';';
    th += 'border-right-color'+this._borderColor+';';
    th += 'border-bottom-color'+this._borderColor+';';
    th += 'color:' + this._headerTextColor + ';';
    th += 'background-color:' + this._headerBGColor + ';';
    th += 'text-align:center;';

    if(this.getFixedColumnIndex() > -1 && this.headerLevel > 1){
        if(colspan == undefined) colspan = 1;
        if((idx+colspan-1) == this.getFixedColumnIndex()) {
            th += 'border-right-width:0px !important;';
        }
    }

    if(this.headerLevel > 1 && idx == this.getColumns().length-1) th += 'border-right-width:0px !important;';

    if(this.getColumns()[idx].getVisible()) th += 'display:;';
    else th += 'display:none;';

    // if(title == undefined){
        // if(this.getColumns()[idx].getWidth()) th += 'width:' + this.getColumns()[idx].getWidth() + ';';
    // }

    if(!this.isMultiHeader && this.getColumnHeaderHeight()) th += 'height:' + this.getColumnHeaderHeight() + ';';
    
    if(this.showContextMenu(idx))th += 'cursor:pointer;';

    th += '">';
    
   
    if(this.isDraggable(idx) && !this.isMobile()) {
        th += '<div class="sapUiTableColCell" style="position:relative;" colidx="' + idx + '" draggable="true" ondragstart="sap.ui.getCore().byId(\'' + this.getId() + '\').drag(event)" ondrop="sap.ui.getCore().byId(\'' + this.getId() + '\').drop(event)" ondragover="sap.ui.getCore().byId(\'' + this.getId() + '\').allowDrop(event)">';
    }else{
        th += '<div class="sapUiTableColCell" style="position:relative;">';
    }

    th += '<div class="sapUiTableColIcons" id="' + this.getId() + "-sort-icon-" + idx + '" style="float: right !important;"></div>'

    if(title != undefined && title != null) th += title;
    else th += this.getColumns()[idx].getTitle();

    th += '</div>';

    if(isIncludeTHtag) th += "</th>";

    return th;
};

sapui6.ui.table.Table.prototype._getCheckBoxes = function(e){
    if(this.getFixedColumnIndex() > -1){
        return $("#"+this.getId()+"_tbodyTb1"+" tr td:first-child :checkbox");
    }else if(this.getFixedColumnIndex() <0){
        return $("#"+this.getId()+"_dt"+" tr td:first-child :checkbox");
    }
};

sapui6.ui.table.Table.prototype._checkAll = function(e){
    if(this.dataArr.length == 0) return;

    var obj = (window.event)?event.srcElement:e.currentTarget;
    var checks = this._getCheckBoxes();
    var length = checks.length;
    for(var i=0 ; i<length ; i++) if(checks[i].type == "checkbox")checks[i].checked = obj.checked;

    if(obj.checked){
        this._selectAll();
        this.fireCheckedAll({checked:true});
    }else{
        this._clearSelection();
        this.fireCheckedAll({checked:false});
    }
};

sapui6.ui.table.Table.prototype._addSelectionIndex = function(rowIdx,e){
    if(rowIdx != undefined && rowIdx > -1) {
        var obj = (window.event)?event.srcElement:e.currentTarget;
        if(obj.checked) this._oSelection.addSelectionInterval(rowIdx, rowIdx);
        else this._oSelection.removeSelectionInterval(rowIdx, rowIdx);

        this.fireCheckedSelection();
    }
};

sapui6.ui.table.Table.prototype._setSelectionIndex = function(rowIdx,e){
    if(rowIdx != undefined && rowIdx > -1) {
        this._oSelection.setSelectionInterval(rowIdx, rowIdx);
        this.fireCheckedSelection();
    }
};

sapui6.ui.table.Table.prototype.getSelectedIndex = function() {
    return this._oSelection.getSelectedIndices();
};

sapui6.ui.table.Table.prototype._clearSelection = function() {
    this._oSelection.clearSelection();
};

sapui6.ui.table.Table.prototype._selectAll = function() {
    this._oSelection.setSelectionInterval(0, (this.dataArr.length || 0) - 1);
};

sapui6.ui.table.Table.prototype._getCheckBoxControl = function(rowIdx){
    // return this._RM.getHTML(new sap.ui.commons.CheckBox());
    if(rowIdx == undefined){
        return '<input type="checkbox" onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\')._checkAll(event);">';
    }else{
        var exp = "";
        if(this.getSelectionModeStyleExpression()){
            var that = this;
            exp = this.getSelectionModeStyleExpression();
            this.getColumns().forEach(function(column){
                var regexp = new RegExp(column.getKey(),"gi");
                exp = exp.replace(regexp,"'"+that.dataArr[rowIdx][column.getKey()]+"'");
            });

            exp = eval(exp);
        }

        return '<input type="checkbox" onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\')._addSelectionIndex(' + rowIdx + ',event);" ' + exp + '>';
    }
    
};

sapui6.ui.table.Table.prototype._getSelectionFieldDom = function(i){
    var d = '';

    d += '<td style="text-align:center;' + this._getBorderStyle(true,true) + '" data-sapui5js-table-rowIndex="' + i + '">';
    if(sap.ui.Device.browser.msie) d += '<div style="height:initial;margin:0px;padding:0px;">';
    d += '<div class="sapUiTableCell" style="height:initial;">';
    if(this.getSelectionMode().toLowerCase() == "multiple") d += this._getCheckBoxControl(i);
    else if(this.getSelectionMode().toLowerCase() == "single") d += this._getRadioButtonControl(i);
    if(sap.ui.Device.browser.msie) d += '</div>';
    d += '</div></td>';

    return d;
};

sapui6.ui.table.Table.prototype._getRadioButtonControl = function(rowIdx){
    if(rowIdx != undefined){
        var that = this;
        return this._RM.getHTML(new sap.ui.commons.RadioButton({groupName:that.getId()+"-col-radio",select:function(){that._setSelectionIndex(rowIdx);}}));
    }
};

sapui6.ui.table.Table.prototype.renderTableHeader = function(){
    var headerHtml = "";
    var that = this;
    
    if((this.gridType == 0 && this.getFixedColumnIndex() < 0)){
        headerHtml += '<table class="sapui6_table_tb sapUiTableCtrl" id="' + this.gridName + '_ht" style="border-color:' + this._borderColor + ';">';
        headerHtml += '     <colgroup>';
        
        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
            headerHtml += '<col style="width:45px;max-width:45px;min-width:45px;" />';
        }

        if(this.isGroup){
            headerHtml += '         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />';
        }
        
        var hLength = this.getColumns().length;

        for(var i=0 ; i<hLength ; i++){
            var column = this.getColumns()[i];
            if(!this.isGroup || this.groupHeaderIdx != i){
                if(column.getVisible()) headerHtml += '          <col style="width:' + column.getWidth() + ';" />';
                else if(!column.getVisible()) headerHtml += '          <col style="width:' + column.getWidth() + ';display:none;" />';
                else headerHtml += '            <col style="width:' + column.getWidth() + ';" />';
            }
        }
        
        headerHtml += '     </colgroup>';
        headerHtml += '     <thead>';
    
        if(this.isMultiHeader){
            if(this.headerLevel == 2){
                var length = this.multiHeaderInfo.length;

                for(var i=0 ; i<length ; i++){
                    headerHtml += ' <tr>';
                    if(i==0){
                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            headerHtml += '<th class="sapui6_table_th row_2" rowspan="2" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
                            headerHtml += '<div class="sapUiTableColCell">';
                            if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
                            headerHtml += '</div>';
                            headerHtml += '</th>';
                        }

                        if(this.isGroup){
                            headerHtml += ' <th class="sapui6_table_th row_2" rowspan="2" ';
                            headerHtml += this.renderTableHCell(this.groupHeaderIdx, false);
                            headerHtml += ' </th>';
                        }
                    }
                    var className = "sapui6_table_th";
                    if(i > 0) className = "sapui6_table_th2";
                    var h = this.multiHeaderInfo[i];
                    for(var j=0 ; j<h.length ; j++){
                        if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                            if(h[j].rowspan != 0 && h[j].colspan != 0) {
                                headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                                
                                if(i==0 && h[j].rowspan == 2) headerHtml += this.renderTableHCell(h[j].idx, false);
                                else if(i==0 && h[j].rowspan == 1) headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title);
                                else headerHtml += this.renderTableHCell(h[j].idx, false);

                                headerHtml += ' </th>';
                            }
                            
                        }
                    }
                    headerHtml += ' </tr>';
                }
            }else if(this.headerLevel == 3){
                var length = this.multiHeaderInfo.length;

                for(var i=0 ; i<length ; i++){
                    headerHtml += ' <tr>';
                    if(i==0){
                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            headerHtml += '<th class="sapui6_table_th row_3" rowspan="3" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
                            headerHtml += '<div class="sapUiTableColCell">';
                            if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
                            headerHtml += '</div>';
                            headerHtml += '</th>';
                        }

                        if(this.isGroup){
                            headerHtml += ' <th class="sapui6_table_th row_3" rowspan="3" ';
                            headerHtml += this.renderTableHCell(this.groupHeaderIdx, false);
                            headerHtml += ' </th>';
                        }
                    }
                    var className = "sapui6_table_th";
                    if(i > 0) className = "sapui6_table_th2";
                    var h = this.multiHeaderInfo[i];
                    for(var j=0 ; j<h.length ; j++){
                        if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                            if(h[j].rowspan != 0 && h[j].colspan != 0) {
                                headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                                
                                if(i==0 && h[j].rowspan == 3) headerHtml += this.renderTableHCell(h[j].idx, false);
                                else if(i ==2) headerHtml += this.renderTableHCell(h[j].idx, false);
                                else headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title);

                                headerHtml += ' </th>';
                            }
                            
                        }
                    }
                    headerHtml += ' </tr>';
                }
            }

        }else{
            headerHtml += '         <tr>';

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                headerHtml += '<th class="sapui6_table_th" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
                headerHtml += '<div class="sapUiTableColCell" style="padding-top:5px;">';

                if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
                // if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += '<span class="sapUiCb sapUiCbInteractive sapUiCbStd" ><input id="cb" type="checkbox" ><label for="cb" class="sapUiCbNoText" onclick="javascript:alert(\'dsdsf\');"></label></span>';
                headerHtml += '</div>';
                headerHtml += '</th>';
            }
            
            if(this.isGroup){
                headerHtml += this.renderTableHCell(this.groupHeaderIdx, true);
            }
            
            
            for(var i=0 ; i<hLength ; i++){
                if(!this.isGroup || this.groupHeaderIdx != i){
                    headerHtml += this.renderTableHCell(i, true);
                }
            }

            headerHtml += '         </tr>';

        }
        headerHtml += '     </thead>';
        headerHtml += ' </table>';
    }

    return headerHtml;
};

sapui6.ui.table.Table.prototype.renderLeftTableHeader = function(){
    var headerHtml = "";
    var that = this;
    var hLength = this.getColumns().length;
    
    headerHtml += '             <table id="' + this.gridName + '_ht1" class="sapui6_table_tb sapUiTableCtrl"  style="border-color:' + this._borderColor + ';">';
    headerHtml += '                 <colgroup>';

    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
        headerHtml += '<col style="width:45px;max-width:45px;min-width:45px;" />';
    }

    if(this.isGroup){
        headerHtml += '         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />';
    }
    
    for(var i=0 ; i<=this.getFixedColumnIndex() ; i++){
        if(!this.isGroup || this.groupHeaderIdx != i){
            if(this.getColumns()[i].getVisible()) headerHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />';
            else if(!this.getColumns()[i].getVisible()) headerHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />';
            else headerHtml += '            <col style="width:' + this.getColumns()[i].getWidth() + ';" />';
        }
    }

    headerHtml += '                 </colgroup>';
    

    if(this.isMultiHeader){
        headerHtml += '                 <thead>';
        var cnt = 0;
        var multiHeaderSpanInfoIndex = 0;
        if(this.headerLevel == 2){
            var length = this.multiHeaderInfo.length;

            for(var i=0 ; i<length ; i++){
                headerHtml += ' <tr>';
                if(i==0){
                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        headerHtml += '<th class="sapui6_table_th row_2" rowspan="2" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
                        headerHtml += '<div class="sapUiTableColCell">';
                        if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
                        headerHtml += '</div>';
                        headerHtml += '</th>';
                    }

                    if(this.isGroup){
                        headerHtml += ' <th class="sapui6_table_th row_2" rowspan="2" ';
                        headerHtml += this.renderTableHCell(this.groupHeaderIdx, false);
                        headerHtml += ' </th>';
                    }
                }
                var className = "sapui6_table_th";
                if(i > 0) className = "sapui6_table_th2";
                var h = this.multiHeaderInfo[i];
                for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                    if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                        if(h[j].rowspan != 0 && h[j].colspan != 0) {
                            headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                            
                            if(i==0 && h[j].rowspan == 2) headerHtml += this.renderTableHCell(h[j].idx, false, null, h[j].colspan);
                            else if(i==0 && h[j].rowspan == 1) headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title, h[j].colspan);
                            else headerHtml += this.renderTableHCell(h[j].idx, false, null, h[j].colspan);

                            headerHtml += ' </th>';
                        }
                        
                    }
                }
                headerHtml += ' </tr>';
            }
        }else if(this.headerLevel == 3){
            var length = this.multiHeaderInfo.length;

            for(var i=0 ; i<length ; i++){
                headerHtml += ' <tr>';
                if(i==0){
                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        headerHtml += '<th class="sapui6_table_th row_3" rowspan="3" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
                        headerHtml += '<div class="sapUiTableColCell">';
                        if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
                        headerHtml += '</div>';
                        headerHtml += '</th>';
                    }

                    if(this.isGroup){
                        headerHtml += ' <th class="sapui6_table_th row_3" rowspan="3" ';
                        headerHtml += this.renderTableHCell(this.groupHeaderIdx, false);
                        headerHtml += ' </th>';
                    }
                }
                var className = "sapui6_table_th";
                if(i > 0) className = "sapui6_table_th2";
                var h = this.multiHeaderInfo[i];

                for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                    if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                        if(h[j].rowspan != 0 && h[j].colspan != 0) {
                            headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                            
                            if(i==0 && h[j].rowspan == 3) headerHtml += this.renderTableHCell(h[j].idx, false, null, h[j].colspan);
                            else if(i ==2) headerHtml += this.renderTableHCell(h[j].idx, false, null, h[j].colspan);
                            else headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title, h[j].colspan);

                            headerHtml += ' </th>';
                        }
                        
                    }
                }
                headerHtml += ' </tr>';
            }
        }
       
        headerHtml += '                 </thead>';
        
        

    }else{
        headerHtml += '                 <thead>';
        headerHtml += '                     <tr style="">';
        
        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
            headerHtml += '<th class="sapui6_table_th" style="width:44px;border-top-color:' + this.getStrongColor() + ';background-color:' + this._headerBGColor + ';">';
            headerHtml += '<div class="sapUiTableColCell">';
            if(this.getSelectionMode().toLowerCase() == "multiple") headerHtml += this._getCheckBoxControl();
            headerHtml += '</div>';
            headerHtml += '</th>';
        }

        if(this.isGroup){
            headerHtml += this.renderTableHCell(this.groupHeaderIdx, true);
        }
    
        for(var i=0 ; i<=this.getFixedColumnIndex() ; i++){
            if(!this.isGroup || this.groupHeaderIdx != i){
                headerHtml += this.renderTableHCell(i, true);
            }
            
        }

        headerHtml += '                     </tr>';
        headerHtml += '                 </thead>';
    }

    headerHtml += '             </table>';

    return headerHtml;
};

sapui6.ui.table.Table.prototype.renderRightTableHeader = function(){
    var headerHtml = "";
    var that = this;  
    var hLength = this.getColumns().length;

    headerHtml += '                 <table id="' + this.gridName + '_ht2" class="sapui6_table_tb" style="border-color:' + this._borderColor + ';"';
    

    headerHtml += '                     <colgroup>';
    for(var i=this.getFixedColumnIndex()+1 ; i<hLength ; i++){
        if(!(this.isGroup && this.groupHeaderIdx == i)){
            if(this.getColumns()[i].getVisible()) headerHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />';
            else if(!this.getColumns()[i].getVisible()) headerHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />';
            else headerHtml += '            <col style="width:' + this.getColumns()[i].getWidth() + ';" />';
        }
    }
    headerHtml += '                     </colgroup>';

    if(this.isMultiHeader){
        headerHtml += '                     <thead>';
        if(this.headerLevel == 2){
            var length = this.multiHeaderInfo.length;

            for(var i=0 ; i<length ; i++){
                headerHtml += ' <tr>';
                var className = "sapui6_table_th";
                if(i > 0) className = "sapui6_table_th2";
                var h = this.multiHeaderInfo[i];
                for(var j=this.getFixedColumnIndex()+1 ; j<h.length ; j++){
                    if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                        if(h[j].rowspan != 0 && h[j].colspan != 0) {
                            headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                            
                            if(i==0 && h[j].rowspan == 2) headerHtml += this.renderTableHCell(h[j].idx, false);
                            else if(i==0 && h[j].rowspan == 1) headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title);
                            else headerHtml += this.renderTableHCell(h[j].idx, false);

                            headerHtml += ' </th>';
                        }
                        
                    }
                }
                headerHtml += ' </tr>';
            }
        }else if(this.headerLevel == 3){
            var length = this.multiHeaderInfo.length;

            for(var i=0 ; i<length ; i++){
                headerHtml += ' <tr>';
                var className = "sapui6_table_th";
                if(i > 0) className = "sapui6_table_th2";
                var h = this.multiHeaderInfo[i];
                for(var j=this.getFixedColumnIndex()+1 ; j<h.length ; j++){
                    if(!this.isGroup || this.groupHeaderIdx != h[j].idx){
                        if(h[j].rowspan != 0 && h[j].colspan != 0) {
                            headerHtml += ' <th class="' + className + ' row_' + h[j].rowspan + '" rowspan="' + h[j].rowspan + '" colspan="' + h[j].colspan + '"';
                            
                            if(i==0 && h[j].rowspan == 3) headerHtml += this.renderTableHCell(h[j].idx, false);
                            else if(i ==2) headerHtml += this.renderTableHCell(h[j].idx, false);
                            else headerHtml += this.renderTableHCell(h[j].idx, false, h[j].title);

                            headerHtml += ' </th>';
                        }
                        
                    }
                }
                headerHtml += ' </tr>';
            }
        }

        headerHtml += '                     </thead>';
        
    }else{
        headerHtml += '                     <thead>';
        headerHtml += '                        <tr>';
        
        for(var i=this.getFixedColumnIndex()+1 ; i<hLength ; i++){
            if(!this.isGroup || this.groupHeaderIdx != i){
                headerHtml += this.renderTableHCell(i, true);
            }
        }

        headerHtml += '                         </tr>';
        headerHtml += '                     </thead>';
   
    }

    headerHtml += '                 </table>';

    return headerHtml;
};

sapui6.ui.table.Table.prototype.renderTableCell = function(idx, val, isMerge, width, row, rowIndex){
    var v = val;
    if(val == "") v = "&nbsp;";

    var column = this.getColumns()[idx];
    var styleExpression = "";
    var attrExpression = "";

    var indexAttribute = "";
    if(row != undefined) {
        v = row.getCells()[idx];
        indexAttribute = 'data-sapui5js-table-rowIndex="' + rowIndex + '" data-sapui5js-table-cellIndex="' + idx + '" ';

        if(column.getStyleExpression()){
            styleExpression = eval(column.getStyleExpression().replace(/this/gi,"v"));
        }

        if(column.getAttrExpression()){
            attrExpression = eval(column.getAttrExpression().replace(/this/gi,"v"));
        }
    }

    var td = "";

    td += '<td ' + indexAttribute;

    if(sap.ui.Device.browser.firefox) td += ' onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event);" ';
    
    if(column.getCaption()) td += ' title="' + val + '"';
    if(column.getClassName()) td += ' class="' + column.getClassName() + '"';

    td += ' ' + attrExpression;
    td += ' style="border-bottom-width:0px !important;';
    
    if(column.getStyle()) td += column.getStyle() + '"';                  
    else{
        if(width != undefined && width != "") td += 'width:' + width + ';';

        if(this.getRowHeight()) td += 'height:' + this.getRowHeight() + ';';

        if(this.gridType == 1 || this.gridType == 2) {
            td += 'text-align:left;';
            if(row != undefined && v.toString().indexOf("TextView") > -1) v.setTextAlign(sap.ui.core.TextAlign.Left);
        } else if(column.getAlign()) {
            td += 'text-align:' + column.getAlign() + ';';
        }
        
        if(column.getBackgroundColor()) td += 'background-color:' + column.getBackgroundColor() + ';';
        // else td += 'background-color:' + this._tableRowBGColor + ';';

        if(column.getVisible()) td += 'display:;';
        else td += 'display:none;';

        if(isMerge != undefined && isMerge) td += 'border-top-color:transparent !important;';
        else td += 'border-top-color:' + this._borderColor + ';';
    }

    td += 'border-right-color:' + this._borderColor + ';';
    td += 'border-right-style:' + this.getColumnBorderStyle() + ';';
    td += 'border-top-style:' + this.getRowBorderStyle() + ';';
    td += styleExpression;
    td += '">';

    if(row != undefined) {
        if(sap.ui.Device.browser.msie) td += '<div style="height:initial;">';
        td += '<div class="sapUiTableCell" style="height:initial;';
        if(this.getMaxRowHeight()) td += 'max-height:' + this.getMaxRowHeight() + ';';
        td += '">';
        td += this._RM.getHTML(v);
        if(sap.ui.Device.browser.msie) td += '</div>';
    }else{
        td += '<div style="padding: 0 10px;height: initial;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;text-align:right;';
        if(this.getMaxRowHeight()) td += 'max-height:' + this.getMaxRowHeight() + ';';
        td += '">';
        td += v;
    }

    td += '</div>';
    td += '</td>';

    return td;
};

sapui6.ui.table.Table.prototype._getBorderStyle = function(bTop, bRight){
    var s = '';
    if(bTop) s += 'border-top-color:' + this._borderColor + ';border-top-style:' + this.getRowBorderStyle() + ';';
    if(bRight) s += 'border-right-color:' + this._borderColor + ';border-right-style:' + this.getColumnBorderStyle() + ';';

    return s;
};

sapui6.ui.table.Table.prototype.precArithmetic = function (operation, a, b) {
    var cal = {
            '*': a * b,
            '-': a - b,
            '+': a + b,
            '/': a / b
        }[operation];        

    return Math.round(cal * Math.pow(10,2))/Math.pow(10,2);
};

sapui6.ui.table.Table.prototype.makeGroupSummary = function(j,groupCnt,groupSummary){
    var groupHtml = "";

    if(this.isGroupSummaryIdx(this.groupHeaderIdx, j)) {
        if(this.getColumns()[j].getGroupSummary() == "average"){
            groupHtml += this.renderTableCell(j, this.changeFormat((groupSummary[j]/groupCnt), this.getColumns()[j].getFormat()));
        }else{
            groupHtml += this.renderTableCell(j, this.changeFormat(groupSummary[j], this.getColumns()[j].getFormat()));
        }
    }else groupHtml += this.renderTableCell(j, "");

    return groupHtml;
};

sapui6.ui.table.Table.prototype.calculateGroupSummary = function(j,groupSummary,row){
    if(this.isGroupSummaryIdx(this.groupHeaderIdx, j)){
        var v = 0;

        if(!this.getColumns()[j].getKey()) {
            var parts = this.getColumns()[j].getTemplate().getBindingInfo("text")["parts"];
            var formatter = this.getColumns()[j].getTemplate().getBindingInfo("text")["formatter"];
            
            if(parts != undefined && parts != null && typeof(formatter) == "function"){
                var formatterStr = "";
                parts.forEach(function(part,index){
                    formatterStr += "row[parts[" + index + "].path],";
                });

                formatterStr = formatterStr.substring(0,formatterStr.length-1);
                v = eval("formatter(" + formatterStr + ");");
            }
            
            var sV = String(v);

            if(sV.indexOf(",") > -1){
                if(sV.indexOf(".") > -1){
                    if(sV.indexOf(",") < sV.indexOf(".")){
                        v = parseFloat(sV.replace(/,/gi,""));
                    }else{
                        sV = sV.replace(/./gi,"");
                        sv = sV.replace(",",".");
                        v = parseFloat(sV);
                    }
                }else{
                    v = parseFloat(sV.replace(/,/gi,""));
                }
            }else{
                v = parseFloat(sV);
            }
        }else{
            v = row[this.getColumns()[j].getKey()];
        }

        if(this.getColumns()[j].getGroupSummary() == "sum" || this.getColumns()[j].getGroupSummary() == "average") groupSummary[j] = this.precArithmetic("+",parseFloat(groupSummary[j]),parseFloat(v));
        else if(this.getColumns()[j].getGroupSummary() == "max")groupSummary[j] = (parseFloat(groupSummary[j])>parseFloat(v)?parseFloat(groupSummary[j]):parseFloat(v));
        else if(this.getColumns()[j].getGroupSummary() == "min")groupSummary[j] = (parseFloat(groupSummary[j])>parseFloat(v)?parseFloat(v):parseFloat(groupSummary[j]));
        else if(this.getColumns()[j].getGroupSummary() == "count")groupSummary[j] = parseFloat(groupSummary[j]) + 1;
    }

    return groupSummary;
};

sapui6.ui.table.Table.prototype.makeTotalSummary = function(j,totalCnt,totalSummary){
    var totalHtml = "";
    
    if(this.isTotalSummaryIdx(j)) {
        if(this.getColumns()[j].getGroupSummary() == "average"){
            totalHtml += this.renderTableCell(j, this.changeFormat(this.precArithmetic("/",totalSummary[j],totalCnt), this.getColumns()[j].getFormat()));
        }else{
            totalHtml += this.renderTableCell(j, this.changeFormat(totalSummary[j], this.getColumns()[j].getFormat()));
        }
    }else totalHtml += this.renderTableCell(j, "");

    return totalHtml;
};

sapui6.ui.table.Table.prototype.calculateTotalSummary = function(j,totalSummary,row){
    if(this.isTotalSummaryIdx(j)){
        var v = 0;
        
        if(!this.getColumns()[j].getKey()) {
            var parts = this.getColumns()[j].getTemplate().getBindingInfo("text")["parts"];
            var formatter = this.getColumns()[j].getTemplate().getBindingInfo("text")["formatter"];
            
            if(parts != undefined && parts != null && typeof(formatter) == "function"){
                var formatterStr = "";
                parts.forEach(function(part,index){
                    formatterStr += "row[parts[" + index + "].path],";
                });

                formatterStr = formatterStr.substring(0,formatterStr.length-1);
                v = eval("formatter(" + formatterStr + ");");
            }
            
            var sV = String(v);

            if(sV.indexOf(",") > -1){
                if(sV.indexOf(".") > -1){
                    if(sV.indexOf(",") < sV.indexOf(".")){
                        v = parseFloat(sV.replace(/,/gi,""));
                    }else{
                        sV = sV.replace(/./gi,"");
                        sv = sV.replace(",",".");
                        v = parseFloat(sV);
                    }
                }else{
                    v = parseFloat(sV.replace(/,/gi,""));
                }
            }else{
                v = parseFloat(sV);
            }

        }else{
            v = row[this.getColumns()[j].getKey()];
        }

        if(this.getColumns()[j].getGroupSummary() == "sum" || this.getColumns()[j].getGroupSummary() == "average")totalSummary[j] = this.precArithmetic("+",parseFloat(totalSummary[j]),parseFloat(v));
        else if(this.getColumns()[j].getGroupSummary() == "max")totalSummary[j] = (parseFloat(totalSummary[j])>parseFloat(v)?parseFloat(totalSummary[j]):parseFloat(v));
        else if(this.getColumns()[j].getGroupSummary() == "min")totalSummary[j] = (parseFloat(totalSummary[j])>parseFloat(v)?parseFloat(v):parseFloat(totalSummary[j]));
        else if(this.getColumns()[j].getGroupSummary() == "count")totalSummary[j] = parseFloat(totalSummary[j]) + 1;
    }

    return totalSummary;
};

sapui6.ui.table.Table.prototype.isSummaryLine = function(mergePreText,row,mergeIndex){
    for(var i=0 ; i<=mergeIndex ; i++){
        if(mergePreText[i] != row[this.getColumns()[i].getKey()]) {
            return i;
        }
    }

    return -1;
};

sapui6.ui.table.Table.prototype.renderTableRow = function(newDataArr){
    var data;
    var rowsHtml = [];

    if(newDataArr != undefined && newDataArr != null) data = newDataArr;
    else {
        data = this.dataArr;
    }

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var oBindingInfo = this.getBindingInfo("rows");

    var start = 0;
    var end = rLength;

    if(this.paging) {
        start = (this.pageNo - 1) * this.pageCnt;
        end = this.pageNo * this.pageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }else if(this.scrollPaging){
        start = (data.length>this.scrollPageCnt)?0:((this.scrollPageNo - 1) * this.scrollPageCnt);
        end = this.scrollPageNo * this.scrollPageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }

    this.displayRowCount = end - start;

    var preGroupKey = "";
    var totalSummary = [];
    for(var i=0 ; i<50; i++) totalSummary.push(0);

    for(var i=0,len=totalSummary.length; i<len; i++){
        if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
    }

    var summaryData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        summaryData.push(cellData);
    }

    var mergeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        mergeCountData.push(cellData);
    }

    var treeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        treeCountData.push(cellData);
    }

    this._groupSummaryData = {};
    for(var i=0 ; i<colLength ; i++){
        this._groupSummaryData[String(i)] = [];
    }

    this.displayDataArr = [];

    var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");

    if(this.gridType == 0){
        if(this.getFixedColumnIndex() < 0){
            var tbHtml = [];
            var totalTbHtml = [];

            tbHtml.push(' <table class="sapui6_table_tb sapUiTableCtrl" id="' + this.gridName + '_dt" style="border-color:' + this._borderColor + ';">');
            tbHtml.push('     <colgroup>');

            totalTbHtml.push(' <table class="sapui6_table_tb sapUiTableCtrl" id="' + this.gridName + '_tt" style="border-color:' + this._borderColor + ';">');
            totalTbHtml.push('     <colgroup>');

            var hLength = this.getColumns().length;

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                tbHtml.push('<col style="width:45px;max-width:45px;min-width:45px;" />');
                totalTbHtml.push('<col style="width:45px;max-width:45px;min-width:45px;" />');
            }

            if(this.isGroup){
                tbHtml.push('         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />');
                totalTbHtml.push('         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />');
            }
            
            for(var i=0 ; i<hLength ; i++){
                if(!this.isGroup || this.groupHeaderIdx != i){
                    if(this.getColumns()[i].getVisible()) {
                        tbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
                        totalTbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
                    }else if(!this.getColumns()[i].getVisible()) {
                        tbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
                        totalTbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
                    }else {
                        tbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth() + ';" />');
                        totalTbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth() + ';" />');
                    }
                }
            }

            tbHtml.push('     </colgroup>');
            tbHtml.push('     <tbody>');

            totalTbHtml.push('     </colgroup>');
            totalTbHtml.push('     <tbody>');

            


        
            if(this.isGroup){
                var groupCnt = 0;
                var group_icon = IconPool.getIconInfo('sap-icon://expand');
                var bOpen = true;
                if(this.isStartOpen) {
                    group_icon = IconPool.getIconInfo('sap-icon://collapse');
                    bOpen = false;
                }
                
                var groupSummary = [];
                for(var a=0; a<50 ; a++) groupSummary.push(0);

                for(var i=start ; i<end ; i++){
                    // var row = data[i];
                    var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                    var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                    var tRow = this.getRows()[i];

                    this.displayDataArr.push(row);
                    
                    var groupHeaderKey = this.getColumns()[this.groupHeaderIdx].getKey();

                    if(row[groupHeaderKey] != preGroupKey){

                        if(i > 0){
                            if(this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_summary' + '">');
                                
                                if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                    rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                                }

                                rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');
                
                                for(var j=0 ; j<colLength ; j++){
                                    if(this.groupHeaderIdx != j){
                                        rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                                    }
                                }
                                rowsHtml.push('</tr>'); 

                                groupSummary = [];
                                for(var a=0; a<50 ; a++) groupSummary.push(0);
                                groupCnt = 0;
                            }
                        }
                        
                        rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_parent' + '">');

                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                        }

                        rowsHtml.push('<td style="');
                        rowsHtml.push('text-align:left;' + this._getBorderStyle(true,true) + 'cursor:pointer;-webkit-box-sizing: border-box;box-sizing: border-box;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;');
                        rowsHtml.push('" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').foldGroup(\'' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '\',' + i + ',event)' + '">');
                        
                        rowsHtml.push('<span id="' + this.getId() + '-group-fold-icon-' + i + '" data-rv-open="' + bOpen + '" role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + group_icon.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>');
                        rowsHtml.push('&nbsp;' + this.changeFormat(row[groupHeaderKey], this.getColumns()[this.groupHeaderIdx].getFormat()));
                        // rowsHtml.push('<img id="' + this.getId() + '-group-fold-icon-' + i + '" src="' + group_icon + '">' + "&nbsp;" + this.changeFormat(row[groupHeaderKey], this.getColumns()[this.groupHeaderIdx].getFormat()));
                        rowsHtml.push('</td>');

                        
                        for(var j=0 ; j<colLength ; j++){
                            if(this.groupHeaderIdx != j){
                                rowsHtml.push(this.renderTableCell(j, ""));
                            }
                        }

                        rowsHtml.push('</tr>'); 
                        
                        preGroupKey = row[groupHeaderKey];
                    }
                    groupCnt++;
                    
                    var rowStyle = "sapUiTableRowEven sapUiTableTr";
                    if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";
                    
                    if(this.isStartOpen) {
                        rowsHtml.push('<tr class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                    }else {
                        rowsHtml.push('<tr class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                    }

                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        rowsHtml.push(this._getSelectionFieldDom(i));
                    }

                    rowsHtml.push(this.renderTableCell(this.groupHeaderIdx, ""));

                    for(var j=0 ; j<colLength ; j++){
                        if(!this.isGroup || this.groupHeaderIdx != j){
                            rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));
                        }

                        groupSummary = this.calculateGroupSummary(j,groupSummary,row);
                            
                        totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                        
                    }
                    rowsHtml.push('</tr>'); 
                }
                
                if(this.displayRowCount > 0 && this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
                    rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');     

                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                    }       

                    rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true));
                    rowsHtml.push('"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');

                    for(var j=0 ; j<colLength ; j++){
                        if(this.groupHeaderIdx != j){
                            rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                        }
                    }
                    rowsHtml.push('</tr>'); 
                    
                    groupSummary = [];
                    for(var a=0; a<50 ; a++) groupSummary.push(0);
                    groupCnt = 0;
                }
                
                if(this.displayRowCount > 0 && this.getShowTotalSummary()){
                    var totalHtml = [];
                    totalHtml.push('<tr style="background-color:' + this._totalAllBG + ';">');

                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        totalHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                    }

                    totalHtml.push(this.renderTableCell(this.groupHeaderIdx, this.getTotalSummaryText()));

                    for(var j=0 ; j<colLength ; j++){
                        if(this.groupHeaderIdx != j){
                            totalHtml.push(this.makeTotalSummary(j,end-start,totalSummary));
                        }
                    }
                    totalHtml.push('</tr>'); 

                    this._totalHtml = totalHtml.join('');

                    // if(this.getTotalSummaryLocation().toLowerCase() == "top"){
                    //     rowsHtml = totalHtml + rowsHtml;
                    // }else if(this.getTotalSummaryLocation().toLowerCase() == "bottom"){
                    //     rowsHtml += totalHtml;
                    // }
                    
                    totalSummary = [];
                    for(var a=0; a<50 ; a++) totalSummary.push(0);
                    for(var i=0,len=totalSummary.length; i<len; i++){
                        if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
                    }
                }
                
            }else{
                if(this.getMergeColumnIndex() > -1){
                    var mergePreText = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
                    var mergeIndex = this.getMergeColumnIndex();

                    for(var i=start ; i<end ; i++){
                        // var row = data[i];
                        var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                        var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                        var tRow = this.getRows()[i];
                        var rowStyle = "sapUiTableRowOdd sapUiTableTr";

                        this.displayDataArr.push(row);
                    
                        if(i==start){
                            for(var j=0 ; j<=mergeIndex ; j++){
                                for(var k=mergeIndex+1 ; k<colLength ; k++){
                                    if(this.getColumns()[k].getGroupSummary() != "none") summaryData[j][k] = row[this.getColumns()[k].getKey()];
                                    if(this.getColumns()[k].getGroupSummary() == "average") mergeCountData[j][k] = 1;
                                }
                            }   

                        }else{
                            var sumLine = this.isSummaryLine(mergePreText,row,mergeIndex);

                            if(this.getMergeColumnIndex() > -1){
                                if(sumLine > -1 && this.getShowGroupSummary()){
                                    for(var j=mergeIndex ; j>=sumLine ; j--){
                                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';');
                                        if(sumLine > 0) rowsHtml.push('border-bottom-color:transparent !important;');
                                        rowsHtml.push('">');

                                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                            rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                                        } 

                                        for(var k=0 ; k<colLength ; k++){
                                            if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                                            else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                                            else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                            else if(k<=sumLine) rowsHtml.push('<td class="' + rowStyle + '" style="border-top-color:transparent !important;border-bottom-color:transparent !important;background-color:' + this._tableRowBGColor + ';' + this._getBorderStyle(false,true) + '"></td>');
                                            else rowsHtml.push(this.renderTableCell(k,""));
                                        }
                                        rowsHtml.push('</tr>');

                                        summaryData[j] = [];
                                        mergeCountData[j] = [];
                                        for(var a=0; a<50 ; a++) summaryData[j].push(0);
                                        for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                                    }
                                }

                                for(var j=0 ; j<=mergeIndex ; j++){
                                    for(var k=mergeIndex+1 ; k<colLength ; k++){
                                        if(this.getColumns()[k].getGroupSummary() == "min" && j==0){
                                            summaryData[j][k] = this.gridDefaultMinValue;
                                        }

                                        var vValue = row[this.getColumns()[k].getKey()];

                                        if(this.getColumns()[k].getGroupSummary() == "sum")summaryData[j][k] += vValue;
                                        else if(this.getColumns()[k].getGroupSummary() == "max"){
                                            if(summaryData[j][k] < vValue) summaryData[j][k] = vValue;
                                        }else if(this.getColumns()[k].getGroupSummary() == "min"){
                                            if(summaryData[j][k] > vValue) summaryData[j][k] = vValue;
                                        }else if(this.getColumns()[k].getGroupSummary() == "average"){
                                            summaryData[j][k] += vValue;
                                            mergeCountData[j][k] += 1;
                                        }
                                    }
                                }
                            }
                        }

                        rowsHtml.push('<tr rowIndex="' + i + '" class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');

                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            rowsHtml.push(this._getSelectionFieldDom(i));
                        }

                        for(var j=0 ; j<colLength ; j++){
                            if(sumLine == -1 && j<=mergeIndex){
                                rowsHtml.push(this.renderTableCell(j, "", true));
                            }else if(sumLine > 0 && j<sumLine){
                                rowsHtml.push(this.renderTableCell(j, "", true));
                            }else{
                                rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));  
                            }

                            totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                        }
                        rowsHtml.push('</tr>');

                        for(var j=0 ; j<=mergeIndex ; j++) mergePreText[j] = row[this.getColumns()[j].getKey()];
                       
                    }
                    
                    if(this.displayRowCount > 0 && this.getMergeColumnIndex() > -1 && this.getShowGroupSummary()){
                        for(var j=mergeIndex ; j>=0 ; j--){
                            rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');
                            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                            } 

                            for(var k=0 ; k<colLength ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                                else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                                else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                else if(k<j) rowsHtml.push('<td class="' + rowStyle + '" style="border-top-color:transparent !important;background-color:' + this._tableRowBGColor + ';' + this._getBorderStyle(false,true) + '"></td>');
                                else rowsHtml.push(this.renderTableCell(k,""));
                            }
                            rowsHtml.push('</tr>');

                            summaryData[j] = [];
                            mergeCountData[j] = [];
                            for(var a=0; a<50 ; a++) summaryData[j].push(0);
                            for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                        }
                    }
                }else if(this.getTreeColumnIndex() > -1){
                    var groupCnt = 0;

                    var group_icon = IconPool.getIconInfo('sap-icon://expand');
                    var bOpen = true;
                    if(this.getTreeStartOpen()) {
                        group_icon = IconPool.getIconInfo('sap-icon://collapse');
                        bOpen = false;
                    }


                    
                    var groupSummary = [];
                    for(var a=0; a<50 ; a++) groupSummary.push(0);
                    var preGroupKeys = [];

                    var tRowsHtml = [];
                    var changeTreeIdx = -1;
                    
                    for(var i=start ; i<end ; i++){
                        //var row = data[i];
                        var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                        var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                        var tRow = this.getRows()[i];
                        this.displayDataArr.push(row);

                        var currentGroupKeys = row;
                        var row0 = this.getColumns()[0].getKey();
                        if(this.isChangeTree(preGroupKeys,currentGroupKeys)){
                            rowsHtml.push(tRowsHtml.join(''));
                            tRowsHtml = [];

                            changeTreeIdx = parseInt(this.getChangeTreeIdx(preGroupKeys,currentGroupKeys));

                            for(var j=this.getTreeColumnIndex() ; j>=changeTreeIdx ; j--){
                                if(i>start  && this.getShowGroupSummary()){

                                    if(this.getGroupSummaryLocation() == "Bottom"){
                                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                            rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                                        } 

                                        

                                        for(var k=0 ; k<colLength ; k++){
                                            if(this.getColumns()[k].getGroupSummary() == "average") {
                                                rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                                            }else if(k == j) {
                                                rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                                            }else if(this.getColumns()[k].getGroupSummary() != "none") {
                                                rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                            }else {
                                                rowsHtml.push(this.renderTableCell(k,""));
                                            }
                                        }

                                        rowsHtml.push('</tr>');
                                    }

                                    var groupSummaryTdData = {};

                                    for(var k=0 ; k<colLength ; k++){
                                        if(this.getColumns()[k].getGroupSummary() == "average") {
                                            if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                                        }else if(k == j) {
                                            if(k > j) groupSummaryTdData[String(k)] = this.getGroupSummaryText();
                                        }else if(this.getColumns()[k].getGroupSummary() != "none") {
                                            if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                                        }else {
                                           if(k > j) groupSummaryTdData[String(k)] = "";
                                        }
                                    }
                                    
                                    this._groupSummaryData[String(j)].push(groupSummaryTdData);
                                }
                                
                                summaryData[j] = [];
                                treeCountData[j] = [];
                                for(var a=0; a<50 ; a++) summaryData[j].push(0);
                                for(var a=0; a<50 ; a++) treeCountData[j].push(0);
                            }

                            var len = parseInt(this.getTreeColumnIndex()) - changeTreeIdx;
                            for(var k=changeTreeIdx ; k<=this.getTreeColumnIndex() ; k++){
                                
                                var rowK = this.getColumns()[k].getKey();

                                if(k == 0) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                                else if(this.getTreeStartOpen()) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="open" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                                else rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="close" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');

                                for(var j=0 ; j<k ; j++){
                                    rowsHtml.push(this.renderTableCell(j, ""));
                                }

                                if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                    rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                                } 
                                
                                rowsHtml.push('<td style="');
                                rowsHtml.push('text-align:left;' + this._getBorderStyle(true,true) + 'vertical-align:middle;cursor:pointer;');
                                rowsHtml.push('" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').foldGroup2(\'' + this.gridName + '_' + this.trim(row[row0]) + '\',' + k + ',' + i + ',event)' + '">');
                                

                                rowsHtml.push('<span id="' + this.getId() + '-tree-fold-icon-' + i + '" data-rv-open="' + bOpen + '" role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + group_icon.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>');
                                rowsHtml.push('&nbsp;' + this.changeFormat(row[rowK], this.getColumns()[k].getFormat()));
                                // rowsHtml.push('<img id="' + this.getId() + '-tree-fold-icon-' + i + '" src="' + group_icon + '">' + "&nbsp;" + this.changeFormat(row[rowK], this.getColumns()[k].getFormat()));
                                rowsHtml.push('</td>');
                                
                                for(var j=k+1 ; j<colLength ; j++){
                                    rowsHtml.push(this.renderTableCell(j, ""));
                                }
                 
                                rowsHtml.push('</tr>'); 
                            }
                        }
                        preGroupKeys = currentGroupKeys;
                        groupCnt++;
                        
                        var rowStyle = "sapUiTableRowEven sapUiTableTr";
                        if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                        if(this.getTreeStartOpen()) {
                            tRowsHtml.push('<tr tree_status="open" class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                        }else {
                            tRowsHtml.push('<tr tree_status="close" class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                        }

                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            tRowsHtml.push(this._getSelectionFieldDom(i));
                        }

                        for(var j=0 ; j<=this.getTreeColumnIndex() ; j++){   
                            tRowsHtml.push(this.renderTableCell(j, ""));

                            for(var t=this.getTreeColumnIndex()+1 ; t<colLength ; t++){
                                if(this.getColumns()[t].getGroupSummary() == "min" && j==0){
                                    summaryData[j][t] = this.gridDefaultMinValue;
                                }

                                var vValue = row[this.getColumns()[t].getKey()];

                                if(this.getColumns()[t].getGroupSummary() == "sum") {
                                    summaryData[j][t] += vValue;
                                }else if(this.getColumns()[t].getGroupSummary() == "max"){
                                    if(summaryData[j][t] < vValue) summaryData[j][t] = vValue;
                                }else if(this.getColumns()[t].getGroupSummary() == "min"){
                                    if(summaryData[j][t] > vValue) summaryData[j][t] = vValue;
                                }else if(this.getColumns()[t].getGroupSummary() == "average"){
                                    summaryData[j][t] += vValue;
                                    treeCountData[j][t] += 1;
                                }
                            }
                        }

                        for(var j=this.getTreeColumnIndex()+1 ; j<colLength ; j++){  
                            tRowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));

                            totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                        }
                        tRowsHtml.push('</tr>'); 
                    }

                    rowsHtml.push(tRowsHtml.join(''));
                    if(this.getRows().length > 0 && this.getTreeColumnIndex() > -1 && this.getShowGroupSummary()){
                        for(var j=this.getTreeColumnIndex() ; j>=0 ; j--){
                            if(this.getGroupSummaryLocation() == "Bottom"){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                                if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                                    rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                                } 

                                for(var k=0 ; k<colLength ; k++){
                                    if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                                    else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');
                                    else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                    else rowsHtml.push(this.renderTableCell(k,""));
                                }
                                rowsHtml.push('</tr>');
                            }

                            var groupSummaryTdData = {};

                            for(var k=0 ; k<colLength ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "average") {
                                    if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                                }else if(k == j) {
                                    if(k > j) groupSummaryTdData[String(k)] = this.getGroupSummaryText();
                                }else if(this.getColumns()[k].getGroupSummary() != "none") {
                                    if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                                }else {
                                   if(k > j) groupSummaryTdData[String(k)] = "";
                                }
                            }
                            
                            this._groupSummaryData[String(j)].push(groupSummaryTdData);
                        }
                    }
                }else{
                    for(var i=start ; i<end ; i++){
                        // var row = data[i];
                        var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                        var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                        var tRow = this.getRows()[i];
                        var trHtml = "";
                        this.displayDataArr.push(row);
                        
                        var rowStyle = "sapUiTableRowEven sapUiTableTr";
                        if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                        rowsHtml.push('<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                        
                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            rowsHtml.push(this._getSelectionFieldDom(i));
                        }



                        for(var j=0 ; j<colLength ; j++){
                            rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));

                            totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                        }
                        rowsHtml.push('</tr>'); 
                    }
                }

                if(this.displayRowCount > 0 && this.getShowTotalSummary()){
                    var totalHtml = '';
                    totalHtml += '<tr style="background-color:' + this._totalAllBG + ';">';

                    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                        totalHtml += '<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>';
                    } 

                    var j = 0;
                    if(this.getTotalSummaryFormula(0) == "none"){
                        if(!this.getColumns()[0].getVisible()){
                            totalHtml += '<td style="text-align:right;display:none;' + this._getBorderStyle(true,true) + '">' + this.getTotalSummaryText() + '</td>';
                        }else{
                            totalHtml += '<td style="text-align:right;' + this._getBorderStyle(true,true) + '">' + this.getTotalSummaryText() + '</td>';
                        }
                        
                        j = 1;
                    }

                    for(j ; j<this.getColumns().length ; j++){
                        totalHtml += this.makeTotalSummary(j,end-start,totalSummary);
                    }
                    totalHtml += '</tr>'; 

                    this._totalHtml = totalHtml;

                    // if(this.getTotalSummaryLocation().toLowerCase() == "top"){
                    //     rowsHtml = totalHtml + rowsHtml;
                    // }else if(this.getTotalSummaryLocation().toLowerCase() == "bottom"){
                    //     rowsHtml += totalHtml;
                    // }

                    totalSummary = [];
                    for(var a=0; a<50 ; a++) totalSummary.push(0);
                    for(var i=0,len=totalSummary.length; i<len; i++){
                        if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
                    }
                }
            }
            rowsHtml = [tbHtml.join('') + rowsHtml.join('') + '</tbody></table>'];

            this._totalHtml = totalTbHtml.join('') + this._totalHtml + '</tbody></table>';
        }
        
    }else if(this.gridType == 1){
        var headerLength = this.getColumns().length;
        var maxWidth = 100;
        var titleMaxLength = 0;
        var rowStyle = "sapUiTableRowOdd sapUiTableTr";
        var borderRight = "";
        
        for(var i=0 ; i<headerLength ; i++) {
            if(this.getColumns()[i].getWidth() && parseInt(this.getColumns()[i].getWidth().replace(/px/g,"")) > maxWidth) maxWidth = parseInt(this.getColumns()[i].getWidth().replace(/px/g,""));
            if(titleMaxLength < this.getColumns()[i].getTitle().length) titleMaxLength = this.getColumns()[i].getTitle().length;
        }

        rowsHtml.push('<table class="sapui6_table_scroll_tb" cellpadding="0">');
        rowsHtml.push('       <tr>');
        rowsHtml.push('           <td style="vertical-align:top;">');
        if(sap.ui.Device.browser.msie) borderRight = "border-right:1px solid #ddd;";
        rowsHtml.push('               <div id="' + this.gridName + '_tbodyDiv1" style="overflow-x:hidden;overflow-y:hidden;' + borderRight + '">');
        rowsHtml.push('                   <table id="' + this.gridName + '_tbodyTb1" style="width:' + (titleMaxLength*12) + 'px;" class="sapui6_pivottable_tb">');
        rowsHtml.push('                       <tbody>');

        for(var i=0 ; i<headerLength ; i++){
            if(i%2==0) rowStyle = "sapUiTableRowEven sapUiTableTr";
            else rowStyle = "sapUiTableRowOdd sapUiTableTr";

            if(this.getColumns()[i].getVisible()){
                rowsHtml.push('<tr class="' + rowStyle + '">');
                rowsHtml.push('<td style="text-align:right;width:' + (titleMaxLength*12) + 'px;font-weight:bold;border-right-width:2px;border-right-style:solid;border-top-color:' + this._borderColor + ';border-right-color:' + this._borderColor + ';border-top-style:' + this.getRowBorderStyle() + ';"><div class="sapUiTableCell" style="height:initial;">' + this.getColumns()[i].getTitle() + '</div></td>');
                rowsHtml.push('</tr>');
            }
        }
        
        rowsHtml.push('                       </tbody>');
        rowsHtml.push('                   </table>');
        rowsHtml.push('               </div>');
        rowsHtml.push('           </td>');
        rowsHtml.push('           <td>');
        rowsHtml.push('               <div id="' + this.gridName + '_tbodyDiv2" style="overflow-x:auto;overflow-y:auto;">');
        rowsHtml.push('                   <table id="' + this.gridName + '_tbodyTb2" class="sapui6_pivottable_tb">');
        rowsHtml.push('                       <tbody>');
        
        for(var i=0 ; i<headerLength ; i++){
            if(i%2==0) rowStyle = "sapUiTableRowEven sapUiTableTr";
            else rowStyle = "sapUiTableRowOdd sapUiTableTr";

            if(this.getColumns()[i].getVisible()){
                rowsHtml.push('<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                for(var j=0 ; j<rLength ; j++){
                    var row = data[j];
                    var tRow = this.getRows()[j];
                    rowsHtml.push(this.renderTableCell(i, "", false, maxWidth + "px", tRow));
                }
                rowsHtml.push('</tr>');
            }
        }
        
        rowsHtml.push('                       </tbody>');
        rowsHtml.push('                   </table>');
        rowsHtml.push('               </div>');
        rowsHtml.push('           </td>');
        rowsHtml.push('       </tr>');
        rowsHtml.push('   </table>');
    }else if(this.gridType == 2){
        rowsHtml.push('   <table class="sapui6_mtable_tb" id="' + this.gridName + '_dt">');
        rowsHtml.push('       <colgroup>');
        rowsHtml.push('           <col style="width:50%;">');
        rowsHtml.push('           <col style="width:50%;">');
        rowsHtml.push('       </colgroup>');
        rowsHtml.push('       <tbody>');

        for(var i=start ; i<end ; i++){
            var row = data[i];
            this.displayDataArr.push(row);

            var lastTdStyle = "";
            
            var rowStyle = "sapUiTableRowOdd sapUiTableTr";
            if(i%2==0) rowStyle = "sapUiTableRowEven sapUiTableTr";

            for(var j=0 ; j<colLength ; j++){        
                var tRow = this.getRows()[i];       
                if(j == (colLength-1)) rowStyle = "last_tr";
                
                if(this.getColumns()[j].getVisible()){
                    rowsHtml.push('<tr class="' + rowStyle + '">');    
                    rowsHtml.push('   <td style="width:50%;text-align:right;font-weight:bold;' + this._getBorderStyle(true,true) + '">' + this.getColumns()[j].getTitle() + '</td>');
                    
                    rowsHtml.push(this.renderTableCell(j, "", false, maxWidth + "px", tRow));               
                    rowsHtml.push('</tr>');
                }
            }
        }

        rowsHtml.push('</table>');
    }
    
    return rowsHtml.join('');
};

sapui6.ui.table.Table.prototype.renderLeftTableRow = function(newDataArr){
    var data;
    var rowsHtml = [];

    if(newDataArr != undefined && newDataArr != null) data = newDataArr;
    else data = this.dataArr;

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var oBindingInfo = this.getBindingInfo("rows");

    var start = 0;
    var end = rLength;

    if(this.paging) {
        start = (this.pageNo - 1) * this.pageCnt;
        end = this.pageNo * this.pageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }else if(this.scrollPaging){
        start = (data.length>this.scrollPageCnt)?0:((this.scrollPageNo - 1) * this.scrollPageCnt);
        end = this.scrollPageNo * this.scrollPageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }

    this.displayRowCount = end - start;

    var preGroupKey = "";
    var totalSummary = [];
    for(var i=0 ; i<50; i++) totalSummary.push(0);

    for(var i=0,len=totalSummary.length; i<len; i++){
        if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
    }

    var summaryData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        summaryData.push(cellData);
    }

    var mergeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        mergeCountData.push(cellData);
    }

    var treeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        treeCountData.push(cellData);
    }

    this._leftGroupSummaryData = {};
    for(var i=0 ; i<=this.getTreeColumnIndex() ; i++){
        this._leftGroupSummaryData[String(i)] = [];
    }

    this.displayDataArr = [];

    var IconPool = sap.ui.requireSync("sap/ui/core/IconPool");


    var tbHtml = [];
    var totalTbHtml = [];
    tbHtml.push('<table id="' + this.gridName + '_dt1" class="sapui6_table_tb sapUiTableCtrl" style="border-color:' + this._borderColor + ';">');
    tbHtml.push('<colgroup>');

    totalTbHtml.push('<table id="' + this.gridName + '_tt1" class="sapui6_table_tb sapUiTableCtrl" style="border-color:' + this._borderColor + ';">');
    totalTbHtml.push('<colgroup>');

    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
        tbHtml.push('<col style="width:45px;max-width:45px;min-width:45px;" />');
        totalTbHtml.push('<col style="width:45px;max-width:45px;min-width:45px;" />');
    }

    if(this.isGroup){
        tbHtml.push('         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />');
        totalTbHtml.push('         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />');
    }
    
    for(var i=0 ; i<=this.getFixedColumnIndex() ; i++){
        if(!this.isGroup || this.groupHeaderIdx != i){
            if(this.getColumns()[i].getVisible()){
                tbHtml.push('           <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
                totalTbHtml.push('           <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
            }else if(!this.getColumns()[i].getVisible()){
                tbHtml.push('           <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
                totalTbHtml.push('           <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
            }else {
                tbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth() + ';" />');
                totalTbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth() + ';" />');
            }
        }
    }
    tbHtml.push('                     </colgroup>');
    tbHtml.push('                     <tbody>');
    totalTbHtml.push('                     </colgroup>');
    totalTbHtml.push('                     <tbody>');
    
    if(this.isGroup){
        var groupCnt = 0;

        var group_icon = IconPool.getIconInfo('sap-icon://expand');
        var bOpen = true;
        if(this.isStartOpen) {
            group_icon = IconPool.getIconInfo('sap-icon://collapse');
            bOpen = false;
        }
        
        var groupSummary = [];
        for(var a=0; a<50 ; a++) groupSummary.push(0);
        
        for(var i=start ; i<end ; i++){
            // var row = data[i];
            var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
            var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
            var tRow = this.getRows()[i];

            this.displayDataArr.push(row);
            var groupHeaderKey = this.getColumns()[this.groupHeaderIdx].getKey();

            if(row[groupHeaderKey] != preGroupKey){
                if(i > 0){
                    if(this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_summary' + '">');
                        
                        if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                            rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">&nbsp;</div></td>');
                        } 
                        rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true));     
                        rowsHtml.push('"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');
        
                        for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                            if(this.groupHeaderIdx != j){
                                rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                            }
                        }
                        rowsHtml.push('</tr>'); 
                        
                        groupSummary = [];
                        for(var a=0; a<50 ; a++) groupSummary.push(0);
                        groupCnt = 0;
                    }
                }
                
                rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_parent' + '">');                
                
                if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                    rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
                }

                rowsHtml.push('<td style="');
                rowsHtml.push('text-align:left;' + this._getBorderStyle(true,true) + 'cursor:pointer;-webkit-box-sizing: border-box;box-sizing: border-box;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;');
                rowsHtml.push('" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').foldGroup(\'' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '\',' + i + ',event)' + '">');
                rowsHtml.push('<span id="' + this.getId() + '-group-fold-icon-' + i + '" data-rv-open="' + bOpen + '" role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + group_icon.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>');
                rowsHtml.push('&nbsp;' + this.changeFormat(row[groupHeaderKey], this.getColumns()[this.groupHeaderIdx].getFormat()));
                rowsHtml.push('</td>');

                for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                    if(this.groupHeaderIdx != j){
                        rowsHtml.push(this.renderTableCell(j, ""));
                    }
                }
        
                rowsHtml.push('</tr>'); 
                
                preGroupKey = row[groupHeaderKey];
            }
            groupCnt++;

            var rowStyle = "sapUiTableRowEven sapUiTableTr";
            if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";
            
            if(this.isStartOpen) {
                rowsHtml.push('<tr class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
            }else {
                rowsHtml.push('<tr class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
            }  

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                rowsHtml.push(this._getSelectionFieldDom(i));
            }

            rowsHtml.push(this.renderTableCell(this.groupHeaderIdx, ""));

            for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                if(!this.isGroup || this.groupHeaderIdx != j){
                    rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));
                }

                groupSummary = this.calculateGroupSummary(j,groupSummary,row);
                totalSummary = this.calculateTotalSummary(j,totalSummary,row);
            }
            rowsHtml.push('</tr>'); 
        }

        if(this.displayRowCount > 0 && this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
            rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');
            
            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                rowsHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
            } 

            rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true));     
            rowsHtml.push('"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');

            for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                if(this.groupHeaderIdx != j){
                    rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                }
            }
            rowsHtml.push('</tr>'); 
            
            groupSummary = [];
            for(var a=0; a<50 ; a++) groupSummary.push(0);
            groupCnt = 0;
        }

        if(this.displayRowCount > 0 && this.getShowTotalSummary() && this.getShowGroupSummary()){
            var totalHtml = [];

            totalHtml.push('<tr style="background-color:' + this._totalAllBG + ';">');

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                totalHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
            } 

            totalHtml.push(this.renderTableCell(this.groupHeaderIdx, ""));

            for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                if(this.groupHeaderIdx != j){
                    totalHtml.push(this.makeTotalSummary(j,end-start,totalSummary));
                }
            }
            totalHtml.push('</tr>'); 

            this._leftTotalHtml += totalHtml.join('');
            
            totalSummary = [];
            for(var a=0; a<50 ; a++) totalSummary.push(0);
            for(var i=0,len=totalSummary.length; i<len; i++){
                if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
            }
        }

    }else{
        if(this.getMergeColumnIndex() > -1){
            var mergePreText = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
            var mergeIndex = this.getMergeColumnIndex();
            
            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];
                var rowStyle = "sapUiTableRowOdd sapUiTableTr";

                this.displayDataArr.push(row);

                var endIndex = mergeIndex;
                if(endIndex > this.getFixedColumnIndex()) endIndex = this.getFixedColumnIndex();
                
                if(i==start){
                    for(var j=0 ; j<=mergeIndex ; j++){
                        for(var k=mergeIndex+1 ; k<colLength ; k++){
                            if(this.getColumns()[k].getGroupSummary() != "none") summaryData[j][k] = row[this.getColumns()[k].getKey()];
                            if(this.getColumns()[k].getGroupSummary() == "average") mergeCountData[j][k] = 1;
                        }
                    }   
                    
                }else{
                    var sumLine = this.isSummaryLine(mergePreText,row,mergeIndex);
                    
                    if(this.getMergeColumnIndex() > -1){
                        if(sumLine > -1 && this.getShowGroupSummary()){
                            for(var j=mergeIndex ; j>=sumLine ; j--){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';');
                                if(sumLine > 0) rowsHtml.push('border-top-color:transparent !important;');
                                rowsHtml.push('">');

                                for(var k=0 ; k<=this.getFixedColumnIndex() ; k++){
                                    if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                                    else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                                    else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                    else if(k<=sumLine) rowsHtml.push('<td class="' + rowStyle + '" style="border-top-color:transparent !important;background-color:' + this._tableRowBGColor + ';' + this._getBorderStyle(false,true) + '"></td>');
                                    else rowsHtml.push(this.renderTableCell(k,""));
                                }
                                rowsHtml.push('</tr>');

                                summaryData[j] = [];
                                mergeCountData[j] = [];
                                for(var a=0; a<50 ; a++) summaryData[j].push(0);
                                for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                            }
                        }

                        for(var j=0 ; j<=mergeIndex ; j++){
                            for(var k=mergeIndex+1 ; k<colLength ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "min" && j==0){
                                    summaryData[j][k] = this.gridDefaultMinValue;
                                }

                                var vValue = row[this.getColumns()[k].getKey()];

                                if(this.getColumns()[k].getGroupSummary() == "sum")summaryData[j][k] += vValue;
                                else if(this.getColumns()[k].getGroupSummary() == "max"){
                                    if(summaryData[j][k] < vValue) summaryData[j][k] = vValue;
                                }else if(this.getColumns()[k].getGroupSummary() == "min"){
                                    if(summaryData[j][k] > vValue) summaryData[j][k] = vValue;
                                }else if(this.getColumns()[k].getGroupSummary() == "average"){
                                    summaryData[j][k] += vValue;
                                    mergeCountData[j][k] += 1;
                                }
                            }
                        }
                         
                    }
                }

                rowsHtml.push('<tr rowIndex="' + i + '" class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');

                for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                    if(sumLine == -1 && j<=endIndex){
                        rowsHtml.push(this.renderTableCell(j, "", true));
                    }else if(sumLine > 0 && j<sumLine){
                        rowsHtml.push(this.renderTableCell(j, "", false));
                    }else{
                        rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));  
                    }

                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                rowsHtml.push('</tr>');

                for(var j=0 ; j<=mergeIndex ; j++) mergePreText[j] = row[this.getColumns()[j].getKey()];
                
            }

            if(this.displayRowCount > 0 && this.getMergeColumnIndex() > -1 && this.getShowGroupSummary()){
                for(var j=mergeIndex ; j>=0 ; j--){
                    rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                    for(var k=0 ; k<=this.getFixedColumnIndex() ; k++){
                        if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                        else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                        else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                        else if(k<j) rowsHtml.push('<td class="' + rowStyle + '" style="border-top-color:transparent !important;background-color:' + this._tableRowBGColor + ';' + this._getBorderStyle(false,true) + '"></td>');
                        else rowsHtml.push(this.renderTableCell(k,""));
                    }
                    rowsHtml.push('</tr>');

                    summaryData[j] = [];
                    mergeCountData[j] = [];
                    for(var a=0; a<50 ; a++) summaryData[j].push(0);
                    for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                }
            }
        }else if(this.getTreeColumnIndex() > -1){
            var groupCnt = 0;
            var group_icon = IconPool.getIconInfo('sap-icon://expand');
            var bOpen = true;
            if(this.getTreeStartOpen()) {
                group_icon = IconPool.getIconInfo('sap-icon://collapse');
                bOpen = false;
            }
            
            var groupSummary = [];
            for(var a=0; a<50 ; a++) groupSummary.push(0);
            var preGroupKeys = [];

            var tRowsHtml = [];
            var changeTreeIdx = -1;
            var iFixedColumnIndex = this.getFixedColumnIndex();
            
            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];
                this.displayDataArr.push(row);

                var currentGroupKeys = row;
                var row0 = this.getColumns()[0].getKey();
                if(this.isChangeTree(preGroupKeys,currentGroupKeys)){
                    rowsHtml.push(tRowsHtml);
                    tRowsHtml = [];

                    changeTreeIdx = parseInt(this.getChangeTreeIdx(preGroupKeys,currentGroupKeys));

                    for(var j=this.getTreeColumnIndex() ; j>=changeTreeIdx ; j--){
                        if(i>start && this.getShowGroupSummary()){
                            if(this.getGroupSummaryLocation() == "Bottom"){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                                for(var k=0 ; k<=iFixedColumnIndex ; k++){
                                    if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                                    else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');
                                    else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                    else rowsHtml.push(this.renderTableCell(k,""));
                                }
                                rowsHtml.push('</tr>');
                            }
                            
                            var groupSummaryTdData = {};

                            for(var k=j+1 ; k<=iFixedColumnIndex ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "average") {
                                    groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                                }else if(this.getColumns()[k].getGroupSummary() != "none") {
                                    groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                                }else {
                                    groupSummaryTdData[String(k)] = "";
                                }
                            }
                            
                            this._leftGroupSummaryData[String(j)].push(groupSummaryTdData);
                        }
                        
                        summaryData[j] = [];
                        treeCountData[j] = [];
                        for(var a=0; a<50 ; a++) summaryData[j].push(0);
                        for(var a=0; a<50 ; a++) treeCountData[j].push(0);
                    }

                    var len = parseInt(this.getTreeColumnIndex()) - changeTreeIdx;
                    for(var k=changeTreeIdx ; k<=this.getTreeColumnIndex() ; k++){
                        
                        var rowK = this.getColumns()[k].getKey();

                        if(k == 0) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                        else if(this.getTreeStartOpen()) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="open" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                        else rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="close" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');

                        for(var j=0 ; j<k ; j++){
                            rowsHtml.push(this.renderTableCell(j, ""));
                        }
                        
                        rowsHtml.push('<td style="');
                        rowsHtml.push('text-align:left;' + this._getBorderStyle(true,true) + 'vertical-align:middle;cursor:pointer;');
                        rowsHtml.push('" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').foldGroup2(\'' + this.gridName + '_' + this.trim(row[row0]) + '\',' + k + ',' + i + ',event)' + '">');
                        rowsHtml.push('<span id="' + this.getId() + '-tree-fold-icon-' + i + '" data-rv-open="' + bOpen + '" role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + group_icon.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>');
                        rowsHtml.push('&nbsp;' + this.changeFormat(row[rowK], this.getColumns()[k].getFormat()));
                        rowsHtml.push('</td>');
                        
                        for(var j=k+1 ; j<=iFixedColumnIndex ; j++){
                            rowsHtml.push(this.renderTableCell(j, ""));
                        }
         
                        rowsHtml.push('</tr>'); 
                    }
                }
                preGroupKeys = currentGroupKeys;
                groupCnt++;
                
                var rowStyle = "sapUiTableRowEven sapUiTableTr";
                if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                if(this.getTreeStartOpen()) {
                    tRowsHtml.push('<tr tree_status="open" class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                }else {
                    tRowsHtml.push('<tr tree_status="close" class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                }

                for(var j=0 ; j<=this.getTreeColumnIndex() ; j++){   
                    tRowsHtml.push(this.renderTableCell(j, ""));

                    for(var t=this.getTreeColumnIndex()+1 ; t<=iFixedColumnIndex ; t++){
                        if(this.getColumns()[t].getGroupSummary() == "min" && j==0){
                            summaryData[j][t] = this.gridDefaultMinValue;
                        }

                        var vValue = row[this.getColumns()[t].getKey()];

                        if(this.getColumns()[t].getGroupSummary() == "sum") {
                            summaryData[j][t] += vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "max"){
                            if(summaryData[j][t] < vValue) summaryData[j][t] = vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "min"){
                            if(summaryData[j][t] > vValue) summaryData[j][t] = vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "average"){
                            summaryData[j][t] += vValue;
                            treeCountData[j][t] += 1;
                        }
                    }
                }

                for(var j=this.getTreeColumnIndex()+1 ; j<=iFixedColumnIndex ; j++){  
                    tRowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));

                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                tRowsHtml.push('</tr>'); 
            }

            rowsHtml.push(tRowsHtml.join(''));
            if(this.getRows().length > 0 && this.getTreeColumnIndex() > -1 && this.getShowGroupSummary()){
                for(var j=this.getTreeColumnIndex() ; j>=0 ; j--){
                    if(this.getGroupSummaryLocation() == "Bottom"){
                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                        for(var k=0 ; k<=iFixedColumnIndex ; k++){
                            if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                            else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>');
                            else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                            else rowsHtml.push(this.renderTableCell(k,""));
                        }
                        rowsHtml.push('</tr>');
                    }

                    var groupSummaryTdData = {};

                    for(var k=j+1 ; k<=iFixedColumnIndex ; k++){
                        if(this.getColumns()[k].getGroupSummary() == "average") {
                            groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                        }else if(this.getColumns()[k].getGroupSummary() != "none") {
                            groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                        }else {
                            groupSummaryTdData[String(k)] = "";
                        }
                    }
                    
                    this._leftGroupSummaryData[String(j)].push(groupSummaryTdData);
                }
            }
        }else{
            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];

                this.displayDataArr.push(row);

                var rowStyle = "sapUiTableRowEven sapUiTableTr";
                if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                rowsHtml.push('<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');

                if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                    rowsHtml.push(this._getSelectionFieldDom(i));
                }

                for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                    rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));
                    
                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                rowsHtml.push('</tr>'); 
            }
        }

        if(this.displayRowCount > 0 && this.getShowTotalSummary()){
            var totalHtml = [];
            
            totalHtml.push('<tr style="background-color:' + this._totalAllBG + ';">');

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                totalHtml.push('<td style="text-align:center;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;"></div></td>');
            } 

            var j = 0;
            if(this.getTotalSummaryFormula(0) == "none"){
                if(!this.getColumns()[0].getVisible()){
                    totalHtml.push('<td style="text-align:right;display:none;' + this._getBorderStyle(true,true) + '">' + this.getTotalSummaryText() + '</td>');
                }else{
                    totalHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '">' + this.getTotalSummaryText() + '</td>');
                }
                
                j = 1;
            }

            for(j ; j<=this.getFixedColumnIndex() ; j++){
                totalHtml.push(this.makeTotalSummary(j,end-start,totalSummary));
            }

            totalHtml.push('</tr>'); 
            this._leftTotalHtml += totalHtml.join('');

            // if(this.getTotalSummaryLocation().toLowerCase() == "top"){
            //     rowsHtml = totalHtml + rowsHtml;
            // }else if(this.getTotalSummaryLocation().toLowerCase() == "bottom"){
            //     rowsHtml += totalHtml;
            // }
            
            totalSummary = [];
            for(var a=0; a<50 ; a++) totalSummary.push(0);
            for(var i=0,len=totalSummary.length; i<len; i++){
                if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
            }
        }
    }
                
    tbHtml.push(rowsHtml.join(''));
    tbHtml.push(' </tbody>');
    tbHtml.push('</table>');

    this._leftTotalHtml = totalTbHtml.join('') + this._leftTotalHtml + '</tbody></table>';
    
    return tbHtml.join('');
};

sapui6.ui.table.Table.prototype.renderRightTableRow = function(newDataArr){
    var data;
    var rowsHtml = [];

    if(newDataArr != undefined && newDataArr != null) data = newDataArr;
    else data = this.dataArr;

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var oBindingInfo = this.getBindingInfo("rows");

    var start = 0;
    var end = rLength;

    if(this.paging) {
        start = (this.pageNo - 1) * this.pageCnt;
        end = this.pageNo * this.pageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }else if(this.scrollPaging){
        start = (data.length>this.scrollPageCnt)?0:((this.scrollPageNo - 1) * this.scrollPageCnt);
        end = this.scrollPageNo * this.scrollPageCnt;

        if(end > this.dataArr.length) end = this.dataArr.length;
    }

    this.displayRowCount = end - start;

    var preGroupKey = "";
    var totalSummary = [];
    for(var i=0 ; i<50; i++) totalSummary.push(0);

    for(var i=0,len=totalSummary.length; i<len; i++){
        if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
    }

    var summaryData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        summaryData.push(cellData);
    }

    var mergeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        mergeCountData.push(cellData);
    }

    var treeCountData = [];
    for(var i=0 ; i<50 ; i++) {
        var cellData = [];
        for(var j=0 ; j<50 ; j++){
            cellData.push(0);
        }
        treeCountData.push(cellData);
    }

    this._rightGroupSummaryData = {};
    for(var i=0 ; i<=this.getTreeColumnIndex() ; i++){
        this._rightGroupSummaryData[String(i)] = [];
    }

    this.displayDataArr = [];


    var tbHtml = [];
    var totalTbHtml = [];

    tbHtml.push('                 <table id="' + this.gridName + '_dt2" class="sapui6_table_tb sapUiTableCtrl"'); 
    if(this.isGroup) tbHtml.push('    style="table-layout:auto;border-color:' + this._borderColor + ';">'); 
    else tbHtml.push('         style="border-color:' + this._borderColor + ';">'); 
    tbHtml.push('                     <colgroup>');

    totalTbHtml.push('                 <table id="' + this.gridName + '_tt2" class="sapui6_table_tb sapUiTableCtrl"'); 
    if(this.isGroup) totalTbHtml.push('    style="table-layout:auto;border-color:' + this._borderColor + ';">'); 
    else totalTbHtml.push('         style="border-color:' + this._borderColor + ';">'); 
    totalTbHtml.push('                     <colgroup>');
    
    var hLength = this.getColumns().length;

    for(var i=this.getFixedColumnIndex()+1 ; i<hLength ; i++){
        if(!(this.isGroup && this.groupHeaderIdx == i)){
            if(this.getColumns()[i].getVisible()) {
                tbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
                totalTbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />');
            }else if(!this.getColumns()[i].getVisible()) {
                tbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
                totalTbHtml.push('          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />');
            }else {
                tbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth()+ ';" />');
                totalTbHtml.push('            <col style="width:' + this.getColumns()[i].getWidth()+ ';" />');
            }
        }
    }
    tbHtml.push('                     </colgroup>');
    tbHtml.push('                     <tbody>');

    totalTbHtml.push('                     </colgroup>');
    totalTbHtml.push('                     <tbody>');

    rowsHtml = [];
    if(this.isGroup){
        var groupCnt = 0;
        var groupSummary = [];
        for(var a=0; a<50 ; a++) groupSummary.push(0);

        for(var i=start ; i<end ; i++){
            // var row = data[i];
            var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
            var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
            var tRow = this.getRows()[i];
            var groupHeaderKey = this.getColumns()[this.groupHeaderIdx].getKey();

            if(row[groupHeaderKey] != preGroupKey){
                if(i > 0){
                    if(this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_summary' + '">');
        
                        for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                            if(this.groupHeaderIdx != j){
                                rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                            }
                        }
                        rowsHtml.push('</tr>'); 
                        
                        groupSummary = [];
                        for(var a=0; a<50 ; a++) groupSummary.push(0);
                        groupCnt = 0;
                    }
                }
                
                rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_parent' + '">');
                
                for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                    if(!this.isGroup || this.groupHeaderIdx != j){
                        rowsHtml.push(this.renderTableCell(j, ""));
                    }
                }
                

                rowsHtml.push('</tr>'); 
                
                preGroupKey = row[groupHeaderKey];
            }
            groupCnt++;
            var rowStyle = "sapUiTableRowEven sapUiTableTr";
            if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";
            
            if(this.isStartOpen) {
                rowsHtml.push('<tr class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
            }else {
                rowsHtml.push('<tr class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[groupHeaderKey]) + '_child' + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
            }
            
            for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                if(!this.isGroup || this.groupHeaderIdx != j){
                    rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));
                }

                groupSummary = this.calculateGroupSummary(j,groupSummary,row);
                totalSummary = this.calculateTotalSummary(j,totalSummary,row);
            }
            rowsHtml.push('</tr>'); 
        }

        if(this.displayRowCount > 0 && this.isGroupSummary(this.groupHeaderIdx) && this.getShowGroupSummary()){
            rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

            for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                if(this.groupHeaderIdx != j){
                    rowsHtml.push(this.makeGroupSummary(j,groupCnt,groupSummary));
                }
            }
            rowsHtml.push('</tr>'); 
            
            groupSummary = [];
            for(var a=0; a<50 ; a++) groupSummary.push(0);
            groupCnt = 0;
        }
        
        
        if(this.displayRowCount > 0 && this.getShowTotalSummary()){
            var totalHtml = [];
            totalHtml.push('<tr style="background-color:' + this._totalAllBG + ';">');

            for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                if(this.groupHeaderIdx != j){
                    totalHtml.push(this.makeTotalSummary(j,end-start,totalSummary));
                }
            }
            totalHtml.push('</tr>'); 

            this._rightTotalHtml += totalHtml.join('');
            
            totalSummary = [];
            for(var a=0; a<50 ; a++) totalSummary.push(0);
            for(var i=0,len=totalSummary.length; i<len; i++){
                if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
            }
        }

    }else{
        if(this.getMergeColumnIndex() > -1){
            var mergePreText = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
            var mergeIndex = this.getMergeColumnIndex();

            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];
                var rowStyle = "sapUiTableRowOdd sapUiTableTr";

                this.displayDataArr.push(row);

                var endIndex = mergeIndex;
                if(endIndex > this.getFixedColumnIndex()) endIndex = this.getFixedColumnIndex();
                
                if(i==start){
                    for(var j=0 ; j<=mergeIndex ; j++){
                        for(var k=mergeIndex+1 ; k<colLength ; k++){
                            if(this.getColumns()[k].getGroupSummary() != "none") summaryData[j][k] = row[this.getColumns()[k].getKey()];
                            if(this.getColumns()[k].getGroupSummary() == "average") mergeCountData[j][k] = 1;
                        }
                    }   
                   

                }else{
                    var sumLine = this.isSummaryLine(mergePreText,row,mergeIndex);
                    
                    if(this.getMergeColumnIndex() > -1){
                        if(sumLine > -1 && this.getShowGroupSummary()){
                            for(var j=mergeIndex ; j>=sumLine ; j--){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');
                                for(var k=this.getFixedColumnIndex()+1 ; k<colLength ; k++){
                                    if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                                    else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                                    else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                    else rowsHtml.push(this.renderTableCell(k,""));
                                }
                                rowsHtml.push('</tr>');

                                summaryData[j] = [];
                                mergeCountData[j] = [];
                                for(var a=0; a<50 ; a++) summaryData[j].push(0);
                                for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                            }
                        }

                        for(var j=0 ; j<=mergeIndex ; j++){
                            for(var k=mergeIndex+1 ; k<colLength ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "min" && j==0){
                                    summaryData[j][k] = this.gridDefaultMinValue;
                                }

                                var vValue = row[this.getColumns()[k].getKey()];

                                if(this.getColumns()[k].getGroupSummary() == "sum")summaryData[j][k] += vValue;
                                else if(this.getColumns()[k].getGroupSummary() == "max"){
                                    if(summaryData[j][k] < vValue) summaryData[j][k] = vValue;
                                }else if(this.getColumns()[k].getGroupSummary() == "min"){
                                    if(summaryData[j][k] > vValue) summaryData[j][k] = vValue;
                                }else if(this.getColumns()[k].getGroupSummary() == "average"){
                                    summaryData[j][k] += vValue;
                                    mergeCountData[j][k] += 1;
                                }
                            }
                        }
                       
                    }
                }

                rowsHtml.push('<tr rowIndex="' + i + '" class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');

                for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                    if(sumLine == -1 && j<=endIndex){
                        rowsHtml.push(this.renderTableCell(j, "", true));
                    }else{
                        rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));  
                    }

                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                rowsHtml.push('</tr>');

                for(var j=0 ; j<=mergeIndex ; j++) mergePreText[j] = row[this.getColumns()[j].getKey()];
                
            }

            if(this.displayRowCount > 0 && this.getMergeColumnIndex() > -1 && this.getShowGroupSummary()){
                for(var j=mergeIndex ; j>=0 ; j--){
                    rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');
                    for(var k=this.getFixedColumnIndex()+1 ; k<colLength ; k++){
                        if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/mergeCountData[j][k], this.getColumns()[k].getFormat())));
                        else if(k == j) rowsHtml.push('<td style="text-align:right;' + this._getBorderStyle(true,true) + '"><div class="sapUiTableCell" style="height:initial;">' + this.getGroupSummaryText() + '</div></td>'); 
                        else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                        else rowsHtml.push(this.renderTableCell(k,""));
                    }
                    rowsHtml.push('</tr>');

                    summaryData[j] = [];
                    mergeCountData[j] = [];
                    for(var a=0; a<50 ; a++) summaryData[j].push(0);
                    for(var a=0; a<50 ; a++) mergeCountData[j].push(0);
                }
            }
        }else if(this.getTreeColumnIndex() > -1){
            var groupCnt = 0;
            var group_icon = IconPool.getIconInfo('sap-icon://expand');
            var bOpen = true;
            if(this.getTreeStartOpen()) {
                group_icon = IconPool.getIconInfo('sap-icon://collapse');
                bOpen = false;
            }
            
            var groupSummary = [];
            for(var a=0; a<50 ; a++) groupSummary.push(0);
            var preGroupKeys = [];

            var tRowsHtml = '';
            var changeTreeIdx = -1;
            var iFixedColumnIndex = this.getFixedColumnIndex();
            
            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];
                this.displayDataArr.push(row);

                var currentGroupKeys = row;
                var row0 = this.getColumns()[0].getKey();
                if(this.isChangeTree(preGroupKeys,currentGroupKeys)){
                    rowsHtml += tRowsHtml;
                    tRowsHtml = '';

                    changeTreeIdx = parseInt(this.getChangeTreeIdx(preGroupKeys,currentGroupKeys));
                    for(var j=this.getTreeColumnIndex() ; j>=changeTreeIdx ; j--){
                        if(i>start && this.getShowGroupSummary()){
                            if(this.getGroupSummaryLocation() == "Bottom"){
                                rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                                for(var k=iFixedColumnIndex+1 ; k<colLength ; k++){
                                    if(this.getColumns()[k].getGroupSummary() == "average") rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                                    else if(this.getColumns()[k].getGroupSummary() != "none") rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                                    else rowsHtml.push(this.renderTableCell(k,""));
                                }
                                rowsHtml.push('</tr>');
                            }

                            var groupSummaryTdData = {};

                            for(var k=iFixedColumnIndex+1 ; k<colLength ; k++){
                                if(this.getColumns()[k].getGroupSummary() == "average") {
                                    if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                                }else if(this.getColumns()[k].getGroupSummary() != "none") {
                                    if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                                }else {
                                   if(k > j) groupSummaryTdData[String(k)] = "";
                                }
                            }
                            
                            this._rightGroupSummaryData[String(j)].push(groupSummaryTdData);
                        }
                        
                        summaryData[j] = [];
                        treeCountData[j] = [];
                        for(var a=0; a<50 ; a++) summaryData[j].push(0);
                        for(var a=0; a<50 ; a++) treeCountData[j].push(0);
                    }

                    var len = parseInt(this.getTreeColumnIndex()) - changeTreeIdx;
                    for(var k=changeTreeIdx ; k<=this.getTreeColumnIndex() ; k++){
                        
                        var rowK = this.getColumns()[k].getKey();

                        if(k == 0) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                        else if(this.getTreeStartOpen()) rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="open" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');
                        else rowsHtml.push('<tr class="group" style="background-color:' + this._groupBG + ';" tree_status="close" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0])+ '" ' + this.getTreeKey(row,k) + ' level="' + String(k) + '">');

                        for(var j=iFixedColumnIndex+1 ; j<k ; j++){
                            rowsHtml.push(this.renderTableCell(j, ""));
                        }
                        
                        if(changeTreeIdx > iFixedColumnIndex){
                            rowsHtml.push('<td style="');
                            rowsHtml.push('text-align:left;' + this._getBorderStyle(true,true) + 'vertical-align:middle;cursor:pointer;');
                            rowsHtml.push('" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').foldGroup2(\'' + this.gridName + '_' + this.trim(row[row0]) + '\',' + k + ',' + i + ',event)' + '">');
                            rowsHtml.push('<span id="' + this.getId() + '-tree-fold-icon-' + i + '" data-rv-open="' + bOpen + '" role="presentation" aria-hidden="true" data-sap-ui-icon-content="' + group_icon.content + '" class="sapMSLIImgIcon sapUiIcon sapUiIconMirrorInRTL" style="font-family:\'SAP-icons\'"></span>');
                            rowsHtml.push('&nbsp;' + this.changeFormat(row[rowK], this.getColumns()[k].getFormat()));
                            rowsHtml.push('</td>');
                        }
                        
                        var startBlank = k;
                        if(k < iFixedColumnIndex) startBlank = iFixedColumnIndex;
                        for(var j=startBlank+1 ; j<colLength ; j++){
                            rowsHtml.push(this.renderTableCell(j, ""));
                        }
         
                        rowsHtml.push('</tr>'); 
                    }
                }
                preGroupKeys = currentGroupKeys;
                groupCnt++;
                
                var rowStyle = "sapUiTableRowEven sapUiTableTr";
                if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                if(this.getTreeStartOpen()) {
                    tRowsHtml.push('<tr tree_status="open" class="' + rowStyle +'" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                }else {
                    tRowsHtml.push('<tr tree_status="close" class="' + rowStyle + '" style="display:none;" name="' + this.gridName + '_' + this.trim(row[row0]) + '" ' + this.getTreeKey(row,k) + ' level="' + String(this.getTreeColumnIndex()+1) + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');
                }

                for(var j=0 ; j<=this.getTreeColumnIndex() ; j++){  
                    for(var t=iFixedColumnIndex+1 ; t<colLength ; t++){
                        if(this.getColumns()[t].getGroupSummary() == "min" && j==0){
                            summaryData[j][t] = this.gridDefaultMinValue;o
                        }

                        var vValue = row[this.getColumns()[t].getKey()];
                        if(this.getColumns()[t].getGroupSummary() == "sum") {
                            summaryData[j][t] += vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "max"){
                            if(summaryData[j][t] < vValue) summaryData[j][t] = vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "min"){
                            if(summaryData[j][t] > vValue) summaryData[j][t] = vValue;
                        }else if(this.getColumns()[t].getGroupSummary() == "average"){
                            summaryData[j][t] += vValue;
                            treeCountData[j][t] += 1;
                        }
                    }
                }

                for(var j=iFixedColumnIndex+1 ; j<colLength ; j++){  
                    tRowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));

                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                tRowsHtml.push('</tr>'); 
            }

            rowsHtml.push(tRowsHtml.join(''));
            if(this.getRows().length > 0 && this.getTreeColumnIndex() > -1 && this.getShowGroupSummary()){
                for(var j=this.getTreeColumnIndex() ; j>=0 ; j--){
                    if(this.getGroupSummaryLocation() == "Bottom"){
                        rowsHtml.push('<tr style="background-color:' + this._totalBG + ';">');

                        for(var k=iFixedColumnIndex+1 ; k<colLength ; k++){
                            if(this.getColumns()[k].getGroupSummary() == "average")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat())));
                            else if(this.getColumns()[k].getGroupSummary() != "none")rowsHtml.push(this.renderTableCell(k, this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat())));
                            else rowsHtml.push(this.renderTableCell(k,""));
                        }
                        rowsHtml.push('</tr>');
                    }
                    
                    var groupSummaryTdData = {};

                    for(var k=iFixedColumnIndex+1 ; k<colLength ; k++){
                        if(this.getColumns()[k].getGroupSummary() == "average") {
                            if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k]/treeCountData[j][k], this.getColumns()[k].getFormat());
                        }else if(this.getColumns()[k].getGroupSummary() != "none") {
                            if(k > j) groupSummaryTdData[String(k)] = this.changeFormat(summaryData[j][k], this.getColumns()[k].getFormat());
                        }else {
                           if(k > j) groupSummaryTdData[String(k)] = "";
                        }
                    }
                    
                    this._rightGroupSummaryData[String(j)].push(groupSummaryTdData);
                }
            }
        }else{
            for(var i=start ; i<end ; i++){
                // var row = data[i];
                var path = this.getRows()[i].getBindingContext(oBindingInfo.model);
                var row = oBindingInfo.binding.getModel(oBindingInfo.model).getProperty(String(path));
                var tRow = this.getRows()[i];

                this.displayDataArr.push(row);
                
                var rowStyle = "sapUiTableRowEven sapUiTableTr";
                if(i%2==0) rowStyle = "sapUiTableRowOdd sapUiTableTr";

                if(this.getMergeColumnIndex() > -1) rowStyle = "sapUiTableRowOdd sapUiTableTr";
                
                rowsHtml.push('<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">');

                for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                    rowsHtml.push(this.renderTableCell(j, "", false, "", tRow, i));
                    
                    totalSummary = this.calculateTotalSummary(j,totalSummary,row);
                }
                rowsHtml.push('</tr>'); 
            }
        }

        if(this.displayRowCount > 0 && this.getShowTotalSummary()){
            var totalHtml = [];
            totalHtml.push('<tr style="background-color:' + this._totalAllBG + ';">');

            for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                totalHtml.push(this.makeTotalSummary(j,end-start,totalSummary));
            }
            totalHtml.push('</tr>'); 

            this._rightTotalHtml = totalHtml.join('');
            
            // if(this.getTotalSummaryLocation().toLowerCase() == "top"){
            //     rowsHtml = totalHtml + rowsHtml;
            // }else if(this.getTotalSummaryLocation().toLowerCase() == "bottom"){
            //     rowsHtml += totalHtml;
            // }

            totalSummary = [];
            for(var a=0; a<50 ; a++) totalSummary.push(0);
            for(var i=0,len=totalSummary.length; i<len; i++){
                if(this.getTotalSummaryFormula(i) == "min") totalSummary[i] = this.gridDefaultMinValue;
            }
        }
    }
    
    rowsHtml = [tbHtml.join('') + rowsHtml.join('')];

    rowsHtml.push('                       </tbody>');
    rowsHtml.push('                   </table>');

    this._rightTotalHtml = totalTbHtml.join('') + this._rightTotalHtml + '</tbody></table>';
    
    return rowsHtml.join('');
};

sapui6.ui.table.Table.prototype.renderTreeGroupSummary = function(){
    if(this.getShowGroupSummary() && this.getTreeColumnIndex() > -1 && this.getFixedColumnIndex() == -1 && this.getGroupSummaryLocation() == "Top") {
        if(this.getRows().length > 0){
            var colLength = this.getColumns().length;
            for(var i=0 ; i<colLength ; i++){
                if(this._groupSummaryData[String(i)].length > 0){
                    var summaryData = this._groupSummaryData[String(i)];
                    var tr = $("#"+this.getId()+"_dt tr");
                    var rowLength = tr.length;
                    var cnt = 0;
                    for(var j=0 ; j<rowLength ; j++){
                        if(tr[j].cells[i].getElementsByTagName("IMG").length > 0){
                            if(summaryData[cnt] != undefined){
                                for(var k=0 ; k<colLength ; k++){
                                    var align = "";//sapUiTvAlignCenter, sapUiTvAlignRight
                                    if(this.getColumns()[k].getAlign() == "Right") align = " sapUiTvAlignRight";
                                    else if(this.getColumns()[k].getAlign() == "Center") align = " sapUiTvAlignCenter";

                                    if(summaryData[cnt][String(k)] != undefined) $(tr[j].cells[k]).html('<div class="sapUiTableCell" style="height:initial;"><span class="sapUiTv' + align + '" style="direction:inherit">'+summaryData[cnt][String(k)]+'</span></div>');
                                }
                            }

                            cnt++;
                        }
                    }
                }
            }
        }
    }else if(this.getShowGroupSummary() && this.getTreeColumnIndex() > -1 && this.getFixedColumnIndex() > -1 && this.getGroupSummaryLocation() == "Top"){
        if(this.getRows().length > 0){
            var colLength = this.getColumns().length;
            var treeColumnIndex = this.getTreeColumnIndex();
            var fixedColumnIndex = this.getFixedColumnIndex();
            for(var i=0 ; i<=treeColumnIndex ; i++){
                if(this._leftGroupSummaryData[String(i)].length > 0){
                    var summaryData = this._leftGroupSummaryData[String(i)];
                    var tr = $("#"+this.getId()+"_dt1 tr");
                    var rowLength = tr.length;
                    var cnt = 0;
                    for(var j=0 ; j<rowLength ; j++){
                        if(tr[j].cells[i].getElementsByTagName("IMG").length > 0){
                            if(summaryData[cnt] != undefined){
                                for(var k=0 ; k<=fixedColumnIndex ; k++){
                                    var align = "";//sapUiTvAlignCenter, sapUiTvAlignRight
                                    if(this.getColumns()[k].getAlign() == "Right") align = " sapUiTvAlignRight";
                                    else if(this.getColumns()[k].getAlign() == "Center") align = " sapUiTvAlignCenter";

                                    if(summaryData[cnt][String(k)] != undefined) $(tr[j].cells[k]).html('<div class="sapUiTableCell" style="height:initial;"><span class="sapUiTv' + align + '" style="direction:inherit">'+summaryData[cnt][String(k)]+'</span></div>');
                                }
                            }

                            cnt++;
                        }
                    }
                }

                if(this._rightGroupSummaryData[String(i)].length > 0){
                    var summaryData = this._rightGroupSummaryData[String(i)];
                    var tr1 = $("#"+this.getId()+"_dt1 tr");
                    var tr2 = $("#"+this.getId()+"_dt2 tr");
                    var rowLength = tr1.length;
                    var cnt = 0;
                    for(var j=0 ; j<rowLength ; j++){
                        if(tr1[j].cells[i].getElementsByTagName("IMG").length > 0){
                            if(summaryData[cnt] != undefined){
                                for(var k=fixedColumnIndex+1 ; k<colLength ; k++){
                                    var align = "";//sapUiTvAlignCenter, sapUiTvAlignRight
                                    if(this.getColumns()[k].getAlign() == "Right") align = " sapUiTvAlignRight";
                                    else if(this.getColumns()[k].getAlign() == "Center") align = " sapUiTvAlignCenter";

                                    if(summaryData[cnt][String(k)] != undefined) $(tr2[j].cells[k-fixedColumnIndex-1]).html('<div class="sapUiTableCell" style="height:initial;"><span class="sapUiTv' + align + '" style="direction:inherit">'+summaryData[cnt][String(k)]+'</span></div>');
                                }
                            }

                            cnt++;
                        }
                    }
                }
            }
        }
    }
};

sapui6.ui.table.Table.prototype.getTreeKey = function(row, idx){
    var key = "";
    for(var i=0 ; i<=idx ; i++){
        key += 'level' + String(i) + '="' + this.trim(row[this.getColumns()[i].getKey()]) + '" ';
    }
   
    
    return key;
};

sapui6.ui.table.Table.prototype.isChangeTree = function(preGroup, currentGroup){
    for(var i=0 ; i<=this.getTreeColumnIndex() ; i++){
        if(preGroup[this.getColumns()[i].getKey()] != currentGroup[this.getColumns()[i].getKey()]) return true;
    }
  
    return false;
};

sapui6.ui.table.Table.prototype.getChangeTreeIdx = function(preGroup, currentGroup){
    for(var i=0 ; i<=this.getTreeColumnIndex() ; i++){
        if(preGroup[this.getColumns()[i].getKey()] != currentGroup[this.getColumns()[i].getKey()]) return i;
    }
    
    
};

sapui6.ui.table.Table.prototype.makePaging = function(isFirst){
    var pagingHtml = "";
    this.lastPageNo = Math.ceil(this.dataArr.length/this.pageCnt);

    if(isFirst)pagingHtml += '<div class="sapui6_table_paginate" id="' + this.gridName + '_paging">';
    pagingHtml += '  <span class="paginate_btn" onclick="' + this.gridName +'.firstPage()"><i class="sapui6_table_icon bpnr_icon_back"></i></span>';
    pagingHtml += '  <span class="paginate_btn" onclick="' + this.gridName +'.previousPage()"><i class="sapui6_table_icon bpnr_icon_left"></i></span>';
    pagingHtml += '   <span class="paginate_btn">Page </span>';
    pagingHtml += '  <input class="paginate_input" value="1" type="text" style="text-align:right;" id="' + this.gridName + '_pageNo' + '" onkeypress="' + this.gridName + '.enterChangePage(event);" onblur="' + this.gridName + '.changePage()' + '">';
    pagingHtml += '  <span class="paginate_btn"> of ' + this.lastPageNo + '</span>';
    pagingHtml += '  <span class="paginate_btn" onclick="' + this.gridName +'.nextPage()"><i class="sapui6_table_icon bpnr_icon_right"></i></span>';
    pagingHtml += '  <span class="paginate_btn" onclick="' + this.gridName +'.lastPage()"><i class="sapui6_table_icon bpnr_icon_forward"></i></span>';
    pagingHtml += '  <span class="paginate_btn"><i class="sapui6_table_icon bpnr_icon_refresh"></i></span>';
    if(isFirst)pagingHtml += '</div>';

    return pagingHtml;
};

sapui6.ui.table.Table.prototype.isDraggable = function(colIdx){
    if(!this.isGroup && this.getTreeColumnIndex() < 0 && this.groupHeaderIdx != colIdx && this.isSupportDraggable) return true
    return false;   
};

sapui6.ui.table.Table.prototype.setPrintColumn = function(idx, obj){
    if(obj.checked) this.getColumns()[idx].setProperty("print", true);
    else this.getColumns()[idx].setProperty("print", false);
};

sapui6.ui.table.Table.prototype.getPrintColumnHTML = function(){
    var h = [];
    var columns = this.getColumns();
    var length = columns.length;

    h.push('<ul>');
    for(var i=0 ; i<length ; i++){
        var isPrint = columns[i].getProperty("print");
        if(isPrint){ 
            h.push('<li><input type="checkbox" id="chk_' + i + '" onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\').setPrintColumn('+i+',this);" checked><label for="chk_' + i + '">' + columns[i].getProperty("title") + '</label></li>');
        }else{
            h.push('<li><input type="checkbox" id="chk_' + i + '" onclick="javascript:sap.ui.getCore().byId(\'' + this.getId() + '\').setPrintColumn('+i+',this);"><label for="chk_' + i + '">' + columns[i].getProperty("title") + '</label></li>');
        }
    }

    h.push('</ul>');

    return h.join("");
};

sapui6.ui.table.Table.prototype.makeGroupSummaryForPrint = function(j,groupCnt,groupSummary){
    var v = "";

    if(this.isGroupSummaryIdx(this.groupHeaderIdx, j)) {
        if(this.getColumns()[j].getProperty("groupSummary") == "average"){
            v = groupSummary[j]/groupCnt;
        }else{
            v = groupSummary[j];
        }
    }
    
    var td = [];
    var column = this.getColumns()[j];
    var row = null;
    var rowIndex = -1;

    td.push("<td style=\"white-space:nowrap;\">");

    td.push(this.changeFormat(v, column.getProperty("format")));
    
    td.push("</td>");

    return td.join("");
};

sapui6.ui.table.Table.prototype.setExportHeaderData = function(arExportHeaderData){
    this._exportHeaderData = arExportHeaderData;
};

sapui6.ui.table.Table.prototype.getExportHeaderData = function(){
    return this._exportHeaderData;
};


sapui6.ui.table.Table.prototype.print = function(title, urlBlankPage){
    var hPrint = [];
    hPrint.push('<!DOCTYPE HTML>');
    hPrint.push('<html>');
    hPrint.push(' <head>');
    hPrint.push('  <title> New Document </title>');
    hPrint.push('  <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    hPrint.push('<style>');
    hPrint.push('body{background:rgb(204,204,204);}');
    hPrint.push('');
    hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
    hPrint.push(' .A4_PORTRAIT {width:210mm;min-height:297mm;height:auto;}');
    hPrint.push(' .A4_LANDSCAPE {width:297mm;min-height:210mm;height:auto;}');
    hPrint.push(' .A3_PORTRAIT {width:297mm;min-height:420mm;height:auto;}');
    hPrint.push(' .A3_LANDSCAPE {width:420mm;min-height:297mm;height:auto;}');
    hPrint.push(' .B4_PORTRAIT {width:257mm;min-height:364mm;height:auto;}');
    hPrint.push(' .B4_LANDSCAPE {width:364mm;min-height:257mm;height:auto;}');
    hPrint.push(' .LETTER_PORTRAIT {width:21.59cm;min-height:27.94cm;height:auto;}');
    hPrint.push(' .LETTER_LANDSCAPE {width:27.94cm;min-height:21.59cm;height:auto;}');
    hPrint.push(' .LEGAL_PORTRAIT {width:21.59cm;min-height:35.56cm;height:auto;}');
    hPrint.push(' .LEGAL_LANDSCAPE {width:35.56cm;min-height:21.59cm;height:auto;}');
    hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
    hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .btn_print {position:absolute;right:20px;top:30px;height:20px;font-size:12px;font-family:Verdana, Geneva, sans-serif;cursor:pointer;}');
    hPrint.push('');
    hPrint.push('@media print {');
    hPrint.push('body{background:white;}');
    hPrint.push(' .container {background:white;display:block;margin:0;}');
    hPrint.push(' .A4_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .A4_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .A3_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .A3_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .B4_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .B4_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .LETTER_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .LETTER_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .LEGAL_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .LEGAL_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .title {page-break-after:avoid;padding:0px 0px 20px 0px;font-size:18px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#000000;}   ');
    hPrint.push(' .title2 {page-break-after:avoid;padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' .header {page-break-after:avoid;padding-left:0px;padding-right:0px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .list {padding-left:0px;padding-right:0px;font-family:Verdana, Geneva, sans-serif;color:#000000;font-size:9px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
    hPrint.push(' .table > thead {page-break-before:always;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .btn_print {display:none;}');
    hPrint.push('}');
    hPrint.push('');
    hPrint.push('</style>');

    hPrint.push('<script>');
    hPrint.push('function changePageSize(){');
    hPrint.push('   var size = document.getElementById("size").value;');
    hPrint.push('   var orientation = document.getElementById("landscape").checked?"LANDSCAPE":"PORTRAIT";');
    hPrint.push('   document.getElementById("container").className = "container " + (size+"_"+orientation);');
    hPrint.push('}');
    hPrint.push('<\/script>');
    
    
    hPrint.push('</head>');
    hPrint.push('<body>');
    hPrint.push('<div class="btn_print">');
    hPrint.push('<div style="margin-bottom:10px;"><select id="size" onchange="changePageSize();"><option value="LETTER">Letter</option><option value="LEGAL">Legal</option><option value="A4">A4</option><option value="A3">A3</option><option value="B4">B4</option></select></div>');
    hPrint.push('<div style="margin-bottom:10px;"><input type="radio" name="orientation" id="landscape" value="LANDSCAPE" onclick="changePageSize();" checked><label for="landscape">Landscape</label><input type="radio" name="orientation" id="portrait" value="PORTRAIT" onclick="changePageSize();"><label for="portrait">Portrait</label></div>');
    hPrint.push('<div><input type="button" value="Print" onclick="javascript:alert(\'Before printing,You neet to set up doucment size and orientation.\');window.print();"></div>');
    hPrint.push('</div>');
    hPrint.push('<div id="container" class="container LETTER_LANDSCAPE">');
    hPrint.push(this.getExportDataHtml(title));
    hPrint.push(' </div>');
    hPrint.push(' </body>');
    hPrint.push('</html>');
    
    var printWindow = window.open();
    if(!printWindow.opener) printWindow.opener = self;
    
    if(urlBlankPage != undefined) {
        printWindow.location = urlBlankPage;
        
        setTimeout(function(){
            printDocument = printWindow.document;
            
            printDocument.write(hPrint.join(""));
            printDocument.close();
        },200);
    }else{
        printDocument = printWindow.document;
        
        printDocument.write(hPrint.join(""));
        printDocument.close();
    }
};

sapui6.ui.table.Table.prototype.htmlToPrint = function(printHTML, urlBlankPage){
    var hPrint = [];
    hPrint.push('<!DOCTYPE HTML>');
    hPrint.push('<html>');
    hPrint.push(' <head>');
    hPrint.push('  <title> New Document </title>');
    hPrint.push('  <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    hPrint.push('<style>');
    hPrint.push('body{background:rgb(204,204,204);}');
    hPrint.push('');
    hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
    hPrint.push(' .A4_PORTRAIT {width:210mm;min-height:297mm;height:auto;}');
    hPrint.push(' .A4_LANDSCAPE {width:297mm;min-height:210mm;height:auto;}');
    hPrint.push(' .A3_PORTRAIT {width:297mm;min-height:420mm;height:auto;}');
    hPrint.push(' .A3_LANDSCAPE {width:420mm;min-height:297mm;height:auto;}');
    hPrint.push(' .B4_PORTRAIT {width:257mm;min-height:364mm;height:auto;}');
    hPrint.push(' .B4_LANDSCAPE {width:364mm;min-height:257mm;height:auto;}');
    hPrint.push(' .LETTER_PORTRAIT {width:21.59cm;min-height:27.94cm;height:auto;}');
    hPrint.push(' .LETTER_LANDSCAPE {width:27.94cm;min-height:21.59cm;height:auto;}');
    hPrint.push(' .LEGAL_PORTRAIT {width:21.59cm;min-height:35.56cm;height:auto;}');
    hPrint.push(' .LEGAL_LANDSCAPE {width:35.56cm;min-height:21.59cm;height:auto;}');
    hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
    hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .btn_print {position:absolute;right:20px;top:30px;height:20px;font-size:12px;font-family:Verdana, Geneva, sans-serif;cursor:pointer;}');
    hPrint.push('');
    hPrint.push('@media print {');
    hPrint.push('body{background:white;}');
    hPrint.push(' .container {background:white;display:block;margin:0;}');
    hPrint.push(' .A4_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .A4_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .A3_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .A3_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .B4_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .B4_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .LETTER_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .LETTER_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .LEGAL_PORTRAIT {width:100%;height:auto;}');
    hPrint.push(' .LEGAL_LANDSCAPE {width:100%;height:auto;}');
    hPrint.push(' .title {page-break-after:avoid;padding:0px 0px 20px 0px;font-size:18px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#000000;}   ');
    hPrint.push(' .title2 {page-break-after:avoid;padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' .header {page-break-after:avoid;padding-left:0px;padding-right:0px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;background-color:#ececec;}');
    hPrint.push(' .list {padding-left:0px;padding-right:0px;font-family:Verdana, Geneva, sans-serif;color:#000000;font-size:9px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;}');
    hPrint.push(' .table > thead {page-break-before:always;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border-bottom:2px solid #8e8e8e;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border-bottom:1px solid #ddd;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .btn_print {display:none;}');
    hPrint.push('}');
    hPrint.push('');
    hPrint.push('</style>');

    hPrint.push('<script>');
    hPrint.push('function changePageSize(){');
    hPrint.push('   var size = document.getElementById("size").value;');
    hPrint.push('   var orientation = document.getElementById("landscape").checked?"LANDSCAPE":"PORTRAIT";');
    hPrint.push('   document.getElementById("container").className = "container " + (size+"_"+orientation);');
    hPrint.push('}');
    hPrint.push('<\/script>');
    
    hPrint.push('</head>');
    hPrint.push('<body>');
    hPrint.push('<div class="btn_print">');
    hPrint.push('<div style="margin-bottom:10px;"><select id="size" onchange="changePageSize();"><option value="LETTER">Letter</option><option value="LEGAL">Legal</option><option value="A4">A4</option><option value="A3">A3</option><option value="B4">B4</option></select></div>');
    hPrint.push('<div style="margin-bottom:10px;"><input type="radio" name="orientation" id="landscape" value="LANDSCAPE" onclick="changePageSize();" checked><label for="landscape">Landscape</label><input type="radio" name="orientation" id="portrait" value="PORTRAIT" onclick="changePageSize();"><label for="portrait">Portrait</label></div>');
    hPrint.push('<div><input type="button" value="Print" onclick="javascript:alert(\'Before printing,You neet to set up doucment size and orientation.\');window.print();"></div>');
    hPrint.push('</div>');
    hPrint.push('<div id="container" class="container LETTER_LANDSCAPE">');
    hPrint.push(printHTML);
    hPrint.push(' </div>');
    hPrint.push(' </body>');
    hPrint.push('</html>');

    
    var printWindow = window.open();
    if(!printWindow.opener) printWindow.opener = self;
    
    if(urlBlankPage != undefined) {
        printWindow.location = urlBlankPage;
        
        setTimeout(function(){
            printDocument = printWindow.document;
            
            printDocument.write(hPrint.join(""));
            printDocument.close();
        },200);
    }else{
        printDocument = printWindow.document;
        
        printDocument.write(hPrint.join(""));
        printDocument.close();
    } 
};

sapui6.ui.table.Table.prototype.excel = function(title, fileName, urlBlankPage){
    var hPrint = [];
    hPrint.push('<!DOCTYPE HTML>');
    hPrint.push('<html>');
    hPrint.push(' <head>');
    hPrint.push('  <title> </title>');
    hPrint.push('  <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    hPrint.push('<style>');
    hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
    hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
    hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' table {display:table;border-spacing:0;border-collapse:collapse;width:100%;border:thin solid #888888 !important;}');
    hPrint.push(" th {border:thin solid #888888 !important;font-weight:bold;}");
    hPrint.push(" td {border:thin solid #888888 !important;}");
    hPrint.push(" .tr {text-align:right}");
    hPrint.push(" .tc {text-align:center}");
    hPrint.push(" .tl {text-align:left}");
    hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;font-size:10px;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;font-size:10px;}');
    hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;border:thin solid #888888 !important;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push('</style>');
    
    hPrint.push('</head>');
    hPrint.push('<body>');
    hPrint.push('<div id="container" class="container">');
    hPrint.push(this.getExportDataHtml(title));
    hPrint.push(' </div>');
    hPrint.push(' </body>');
    hPrint.push('</html>');


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    // if(msie > -1 || ua.indexOf("Trident") > -1){
        // var excelWindow = window.open('');
        // if(!excelWindow.opener) excelWindow.opener = self;
        
        // excelWindow = excelWindow.document;
        // excelWindow.write(hPrint.join(""));
        // excelWindow.close();    
        // excelWindow.execCommand("SaveAs",true,fileName+".xls");
    // }else{
    //     window.open('data:application/vnd.ms-excel,'+encodeURIComponent(hPrint.join("")));
    // }

    var getArrayBuffer = function(data) {
        var len = data.length,
            ab = new ArrayBuffer(len), u8 = new Uint8Array(ab);

        while(len--) u8[len] = data.charCodeAt(len);
        return ab;
    };

    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style.cssText = "display: none";
        return function (data, fileName) {
            var URL = window.webkitURL || window.URL;
            var blob = new Blob([getArrayBuffer(data)], {type: "application/vnd.ms-excel"}),
                url = URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        };
    }());

    if(msie > -1 || ua.indexOf("Trident") > -1){
        var excelWindow = window.open('');
        if(!excelWindow.opener) excelWindow.opener = self;
        
        if(urlBlankPage != undefined) {
            excelWindow.location = urlBlankPage;
            
            setTimeout(function(){
                excelWindow = excelWindow.document;
                excelWindow.write(hPrint.join(""));
                excelWindow.close();    
                excelWindow.execCommand("SaveAs",true,fileName+".xls");
            },200);
        }else{
            excelWindow = excelWindow.document;
            excelWindow.write(hPrint.join(""));
            excelWindow.close();    
            excelWindow.execCommand("SaveAs",true,fileName+".xls");
        }
    }else{
        saveData(hPrint.join(""), fileName+".xls");
    }
};

sapui6.ui.table.Table.prototype.htmlToExcel = function(printHTML, fileName, urlBlankPage){
    var hPrint = [];
    hPrint.push('<!DOCTYPE HTML>');
    hPrint.push('<html>');
    hPrint.push(' <head>');
    hPrint.push('  <title> </title>');
    hPrint.push('  <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    hPrint.push('<style>');
    hPrint.push(' .container {background:white;display:block;margin:0.5cm auto;box-shadow:0 0 0.5cm rgb(0,0,0,0.5)}');
    hPrint.push(' .title {padding:10px 20px;font-size:20px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;} ');
    hPrint.push(' .title2 {padding-left:10px;margin-top:40px;font-size:12px;font-weight:bold;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;border-left:5px solid #ddd;background-color:#f1f1f1;line-height:30px;}');
    hPrint.push(' table {display:table;border-spacing:0;border-collapse:collapse;width:100%;border:thin solid #888888 !important;}');
    hPrint.push(" th {border:thin solid #888888 !important;font-weight:bold;}");
    hPrint.push(" td {border:thin solid #888888 !important;}");
    hPrint.push(" .tr {text-align:right}");
    hPrint.push(" .tc {text-align:center}");
    hPrint.push(" .tl {text-align:left}");
    hPrint.push(' .header {padding-left:20px;padding-right:20px;padding-bottom:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb {width:100%;border-spacing:0;border-collapse:collapse;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .header_tb th {display:table-cell;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;border:1px solid #ddd;background-color:#ececec;font-size:10px;}');
    hPrint.push(' .header_tb td {display:table-cell;padding:8px 50px 8px 8px;line-height:1.42857;white-space:norwap;border:1px solid #ddd;font-size:10px;}');
    hPrint.push(' .list {padding-left:20px;padding-right:20px;font-family:Verdana, Geneva, sans-serif;color:#4a4a4a;font-size:10px;}');
    hPrint.push(' .table {display:table;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;border:thin solid #888888 !important;}');
    hPrint.push(' .table > thead > tr > th {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;text-align:left;}');
    hPrint.push(' .table tr {display:table-row;vertical-align:inherit;border-color:inherit;}');
    hPrint.push(' .table > tbody > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;}');
    hPrint.push(' .table tbody {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push(' .table > tfoot > tr > td {display:table-cell;border:thin solid #888888 !important;padding:8px;line-height:1.42857;white-space:norwap;background-color:#f9f9f9;font-weight:bold;}');
    hPrint.push(' .table tfoot {display:table-row-group;vertical-align:middle;border-color:inherit;}');
    hPrint.push('</style>');
    
    hPrint.push('</head>');
    hPrint.push('<body>');
    hPrint.push('<div id="container" class="container">');
    hPrint.push(printHTML);
    hPrint.push(' </div>');
    hPrint.push(' </body>');
    hPrint.push('</html>');


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    if(msie > -1 || ua.indexOf("Trident") > -1){
        var excelWindow = window.open('');
        if(!excelWindow.opener) excelWindow.opener = self;

        if(urlBlankPage != undefined) {
            excelWindow.location = urlBlankPage;
            
            setTimeout(function(){
                excelWindow = excelWindow.document;
                excelWindow.write(hPrint.join(""));
                excelWindow.close();    
                excelWindow.execCommand("SaveAs",true,fileName+".xls");
            },200);
        }else{
            excelWindow = excelWindow.document;
            excelWindow.write(hPrint.join(""));
            excelWindow.close();    
            excelWindow.execCommand("SaveAs",true,fileName+".xls");
        }  
    }else{
        window.open('data:application/vnd.ms-excel,'+encodeURIComponent(hPrint.join("")));
    }
};


sapui6.ui.table.Table.prototype.getExportDataValue = function(row, column, v){
    var td = [];
    
    td.push(this.changeFormat(v, column.getProperty("format")));

    return td.join("");
};

sapui6.ui.table.Table.prototype.getColumnIndex = function(key){
    var idx = -1;
    var columns = this.getColumns();
    var length = columns.length;
    for(var i=0 ; i<length ; i++){
        if(columns[i].getProperty("key") == key) {
            idx = i;
            break;
        }
    }

    return idx;
};

sapui6.ui.table.Table.prototype.isGroupHeaderColumn = function(arGroupHeader, colIndex){
    if(arGroupHeader == null) return false;

    var key = this.getColumns()[colIndex].getProperty("key");   
    var bExist = false;
    var length = arGroupHeader.length;
    for(var i=0 ; i<length ; i++){
        if(key == arGroupHeader[i]) {
            bExist = true;
            break;
        }
    }

    return bExist;
};

sapui6.ui.table.Table.prototype.getExportDataHtml = function(title){
    var exportHeaderData = this.getExportHeaderData();
    var hPrint = [];

    hPrint.push('   <div class="title">' + title + '</div>');

    if(exportHeaderData != null && exportHeaderData.length > 0){
        hPrint.push('   <div class="header">');
        hPrint.push('       <table class="header_tb">');
        for(var i=0 ; i<exportHeaderData.length ; i++){
            if((i+1)%3==1) hPrint.push('        <tr>');
            hPrint.push('       <th>' + exportHeaderData[i]["title"] + '</th><td>' + exportHeaderData[i]["value"] + '</td>');
            if((i+1)%3==0) hPrint.push('        </tr>');
        }
        
        if(exportHeaderData.length%3 != 0) hPrint.push('        </tr>');

        hPrint.push('       </table>');
        hPrint.push('   </div>');
    }

    if(this.isGroup){
        var data = this.dataArr;
        var rowLength = data.length;
        var columns = this.getColumns();
        var colLength = columns.length;
        var preGroup = "";
        var groupHeaderKey = this.getColumns()[this.groupHeaderIdx].getProperty("key");
        var groupHeaderTitle = this.getColumns()[this.groupHeaderIdx].getProperty("title");
        var groupCnt = 0;

        var groupSummary = [];
        for(var a=0; a<50 ; a++) groupSummary.push(0);

        for(var i=0 ; i<rowLength ; i++){
            var currentGroup = data[i][groupHeaderKey];
            var row = data[i];
            if(preGroup != currentGroup){
                if(i > 0){
                    hPrint.push('           </tbody>');
                    hPrint.push('           <tfoot>');
                    hPrint.push('           <tr>');
                    
                    for(var j=0 ; j<colLength ; j++){
                        if(columns[j].getProperty("visible") && columns[j].getProperty("print") && this.groupHeaderIdx != j && !this.isGroupHeaderColumn(columns[this.groupHeaderIdx].getProperty("groupHeader"), j)){
                            hPrint.push(this.makeGroupSummaryForPrint(j,groupCnt,groupSummary));
                        }
                    }
                    
                    hPrint.push('           </tr>');
                    hPrint.push('           </tfoot>');
                    hPrint.push('       </table>');
                    hPrint.push('   </div>');


                    groupSummary = [];
                    for(var a=0; a<50 ; a++) groupSummary.push(0);
                    groupCnt = 0;
                }
                
                hPrint.push('   <div class="list">');

                var headerTxt = "";

                if(columns[this.groupHeaderIdx].getProperty("groupHeader") != null && columns[this.groupHeaderIdx].getProperty("groupHeader") != ""){
                    var groupHeader = columns[this.groupHeaderIdx].getProperty("groupHeader");
                    var gh = groupHeader.split(",");

                    for(var k=0 ; k<gh.length ; k++){
                        var columnIndex = this.getColumnIndex(gh[k]);
                        var v = this.getExportDataValue(row, columns[columnIndex], row[gh[k]]);
                        if(k < (gh.length-1)) headerTxt += columns[columnIndex].getProperty("title") + " : " + v + "   |   ";
                        else headerTxt += columns[columnIndex].getProperty("title") + " : " + v;
                    }
                }else {
                    headerTxt = groupHeaderTitle + ' : ' + currentGroup;
                }

                hPrint.push('       <div class="title2">' + headerTxt + '</div>');
                
                hPrint.push('       <table class="table">');
                hPrint.push('           <thead>');
                hPrint.push('               <tr>');

                for(var j=0 ; j<colLength ; j++){
                    if(columns[j].getProperty("visible") && columns[j].getProperty("print") && j != this.groupHeaderIdx && !this.isGroupHeaderColumn(columns[this.groupHeaderIdx].getProperty("groupHeader"), j)) hPrint.push('                 <th>' + columns[j].getProperty("title") + '</th>');
                }
                hPrint.push('               </tr>');
                hPrint.push('           </thead>');
                hPrint.push('           <tbody>');
            }

            
            hPrint.push('               <tr>');
            for(var j=0 ; j<colLength ; j++){
                var v = this.getExportDataValue(row, columns[j], row[columns[j].getProperty("key")]);
                if(columns[j].getProperty("visible") && columns[j].getProperty("print") && j != this.groupHeaderIdx && !this.isGroupHeaderColumn(columns[this.groupHeaderIdx].getProperty("groupHeader"), j)) hPrint.push('                 <td>' + v + '</td>');

                groupSummary = this.calculateGroupSummary(j,groupSummary,row);
            }
            hPrint.push('               </tr>');

            preGroup = currentGroup;
            groupCnt++;
        }
        
        hPrint.push('           </tbody>');
        hPrint.push('           <tfoot>');
        hPrint.push('           <tr>');
        
        for(var j=0 ; j<colLength ; j++){
            if(columns[j].getProperty("visible") && columns[j].getProperty("print") && this.groupHeaderIdx != j && !this.isGroupHeaderColumn(columns[this.groupHeaderIdx].getProperty("groupHeader"), j)){
                hPrint.push(this.makeGroupSummaryForPrint(j,groupCnt,groupSummary));
            }
        }
        
        hPrint.push('           </tr>');
        hPrint.push('           </tfoot>');
        hPrint.push('       </table>');
        hPrint.push('   </div>');
    }else{
        hPrint.push('   <div class="list">');
        hPrint.push('       <table class="table">');
        hPrint.push('           <thead>');
        hPrint.push('               <tr>');

        var columns = this.getColumns();
        var colLength = columns.length;
        for(var j=0 ; j<colLength ; j++){
            if(columns[j].getProperty("visible") && columns[j].getProperty("print")) hPrint.push('                  <th>' + columns[j].getProperty("title") + '</th>');
        }
        hPrint.push('               </tr>');
        hPrint.push('           </thead>');
        hPrint.push('           <tbody>');

        var data = this.getData();
        var rowLength = data.length;
        for(var i=0 ; i<rowLength ; i++){
            var row = data[i];
            hPrint.push('               <tr>');
            for(var j=0 ; j<colLength ; j++){
                var v = this.getExportDataValue(row, columns[j], row[columns[j].getProperty("key")]);
                if(columns[j].getProperty("visible") && columns[j].getProperty("print")) hPrint.push('                  <td>' + v + '</td>');
            }
            hPrint.push('               </tr>');
        }
        
        hPrint.push('           </tbody>');
        hPrint.push('       </table>');
        hPrint.push('   </div>');
    }

    return hPrint.join("");
};

sapui6.ui.table.Table.prototype.getExportTitle = function(title, header){
    var hPrint = [];
    hPrint.push('   <div class="title">' + title + '</div>');

    if(header != undefined && header.length > 0){
        hPrint.push('   <div class="header">');
        hPrint.push('       <table class="header_tb">');
    
        for(var i=0 ; i<header.length ; i++){
            if((i+1)%3==1) hPrint.push('        <tr>');
            hPrint.push('       <th>' + header[i]["title"] + '</th><td>' + header[i]["value"] + '</td>');
            if((i+1)%3==0) hPrint.push('        </tr>');
        }
        if(header.length%3 != 0) hPrint.push('      </tr>');

        hPrint.push('       </table>');
        hPrint.push('   </div>');
    }

    return hPrint.join("");
};

sapui6.ui.table.Table.prototype.getExportHtml = function(title, columns, data, key){
    var hPrint = [];

    hPrint.push('   <div class="list">');
    hPrint.push('       <div class="title2">' + title + '</div>');
    hPrint.push('       <table class="table">');
    hPrint.push('           <thead>');
    hPrint.push('               <tr>');

    var colLength = columns.length;
    for(var j=0 ; j<colLength ; j++){
        hPrint.push('                   <th>' + columns[j] + '</th>');
    }
    hPrint.push('               </tr>');
    hPrint.push('           </thead>');
    hPrint.push('           <tbody>');

    var rowLength = data.length;
    for(var i=0 ; i<rowLength ; i++){
        var row = data[i];
        hPrint.push('               <tr>');
        for(var j=0 ; j<colLength ; j++){
            hPrint.push('                   <td>' + row[key[j]] + '</td>');
        }
        hPrint.push('               </tr>');
    }
    
    hPrint.push('           </tbody>');
    hPrint.push('       </table>');
    hPrint.push('   </div>');
    

    return hPrint.join("");
};


jQuery.sap.declare("sapui6.ui.table.Row");
jQuery.sap.require("sap.ui.core.Element");

sap.ui.core.Element.extend("sapui6.ui.table.Row", { metadata : {
    library : "sapui6.ui.table",
    defaultAggregation : "cells",
    aggregations : {
        "cells" : {type : "sap.ui.core.Control", multiple : true, singularName : "cell"}
    }
}});


jQuery.sap.declare("sapui6.ui.table.Column");

sap.ui.core.Element.extend("sapui6.ui.table.Column", { 
    metadata : {       
        library : "sapui6.ui.table",                      
        properties : {
            "width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
            "title" : {type : "string", defaultValue : null},
            "path" : {type : "string", defaultValue : null},
            "key" : {type : "string", defaultValue : null},
            "align" : {type : "string", defaultValue : null},
            "visible" : {type : "boolean", group : "Appearance", defaultValue : true},
            "print" : {type : "boolean", group : "Appearance", defaultValue : true},
            "format" : {type : "string", defaultValue : null},
            "filterType" : {type : "string", defaultValue : null},
            // "expression" : {type : "string", defaultValue : null},
            "style" : {type : "string", defaultValue : null},
            "backgroundColor" : {type : "string", defaultValue : null},
            "className" : {type : "string", defaultValue : null},
            "groupHeader" : {type : "string", defaultValue : null},
            "headerGroup" : {type : "string", defaultValue : null},
            "headerGroupParent" : {type : "string", defaultValue : null},
            "caption" : {type : "boolean", defaultValue : false},
            "sortOrder" : {type : "string", defaultValue : "Ascending"},
            "formular" : {type : "string", defaultValue : null},
            "styleExpression" : {type : "string", defaultValue : null},
            "attrExpression" : {type : "string", defaultValue : null},
            "showSortMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showFilterMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showFreezePaneMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showInsertColumnMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showBackgroundColorMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showVisibilityMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "showGroupMenuEntry" : {type : "boolean", group : "Appearance", defaultValue : false},
            "groupSummary" : {type : "string", defaultValue : null},
            "calculable" : {type : "boolean" ,defaultValue : false},
            "editable" : {type : "boolean", defaultValue : false},
            "showSmartphone" : {type : "boolean" ,defaultValue : true},
            "showTablet" : {type : "boolean" ,defaultValue : true},
            "showDesktop" : {type : "boolean" ,defaultValue : true}
        },
        defaultAggregation : "template",
        aggregations : {
            "template" : {type : "sap.ui.core.Control", multiple : false}, 
            "editTemplate" : {type : "sap.ui.core.Control", multiple : false}, 
            "menu" : {type : "sap.ui.unified.Menu", multiple : false},
            "customMenuItem" : {type : "sap.ui.unified.MenuItemBase", multiple : true, singularName : "customMenuItem"}
        }
    }

});

jQuery.sap.declare("sapui6.ui.table.MenuFilterItem");
jQuery.sap.require("sap.ui.unified.MenuItemBase");
sap.ui.unified.MenuItemBase.extend("sapui6.ui.table.MenuFilterItem", { 
    metadata : {
        library : "sap.ui.commons",
        properties : {
            "label" : {type : "string", group : "Appearance", defaultValue : null},
            "icon" : {type : "sap.ui.core.URI", group : "Appearance", defaultValue : null},
            "value" : {type : "string", group : "Misc", defaultValue : null},
            "operator" : {type : "string", defaultValue : null},
            "type" : {type : "string", defaultValue : null}
        },
        aggregations : {
            "_label" : {type : "sap.ui.commons.Label", multiple : false, visibility : "hidden"}, 
            "_textfield" : {type : "sap.ui.commons.TextField", multiple : false, visibility : "hidden"},
            "listBox" : {type : "sap.ui.commons.ListBox", multiple : false}
        }
    }
});

jQuery.sap.require("sap.ui.unified.MenuItem");
jQuery.sap.require("sap.ui.commons.Label");
jQuery.sap.require("sap.ui.commons.TextField");
jQuery.sap.require("sap.ui.commons.ComboBox");

(function() {

sapui6.ui.table.MenuFilterItem.prototype.init = function(){
    sap.ui.unified.MenuItemBase.prototype.init.apply(this, arguments);
    var that = this;
    this._tf = new sap.ui.commons.TextField(this.getId()+"-tf",{width:"100px"});
    this.setAggregation("_textfield", this._tf);
    this._lbl = new sap.ui.commons.Label(this.getId()+"-lbl", {labelFor: this._tf});
    this.setAggregation("_label", this._lbl);
};

sapui6.ui.table.MenuFilterItem.prototype.exit = function(){
    this._lbl = null;
    this._tf = null;
};

sapui6.ui.table.MenuFilterItem.prototype.render = function(oRenderManager, oItem, oMenu, oInfo){
    var rm = oRenderManager;
    rm.write("<li "); 
    rm.writeAttribute("class", "sapUiMnuItm sapUiMnuTfItm" + (oMenu.checkEnabled(oItem) ? "" : " sapUiMnuItmDsbl"));
    if(oItem.getTooltip_AsString()) {
        rm.writeAttributeEscaped("title", oItem.getTooltip_AsString());
    }   
    rm.writeElementData(oItem);
    
    if(oInfo.bAccessible){
        rm.writeAttribute("role", "menuitem");
        rm.writeAttribute("aria-labelledby", oMenu.getId()+" "+this.getId()+"-txt "+this.getId()+"-scuttxt");
        rm.writeAttribute("aria-disabled", !oMenu.checkEnabled(oItem));
        rm.writeAttribute("aria-posinset", oInfo.iItemNo);
        rm.writeAttribute("aria-setsize", oInfo.iTotalItems);
    }
    
    rm.write("><div class=\"sapUiMnuItmL\"></div>");
    
    rm.write("<div class=\"sapUiMnuItmIco\">");
    // if (oItem.getIcon()) {
    //     rm.write("<img");
    //     rm.writeAttributeEscaped("src", oItem.getIcon());
    //     rm.write("/>");

    // }
    if (oItem.getIcon()) {
        rm.writeIcon(oItem.getIcon(), null, {title: null});
    }
    rm.write("</div>");

    rm.write("<div id=\""+this.getId()+"-txt\" class=\"sapUiMnuItmTxt\" style='padding-top:6px;'>");
    rm.renderControl(this._lbl);
    rm.write("<div id=\""+this.getId()+"-str\" class=\"sapUiMnuTfItmStretch\"></div>"); 
    this._tf.setValue(this.getValue()); 
    this._tf.setEnabled(this.getEnabled() && this.getParent().getEnabled()); 

    if(oItem.getType().toLowerCase() == "select"){
        rm.write("<div class=\"sapUiMnuTfItemWrppr\" style='left:70px;'>");
        oItem.setProperty("operator","=",true);
        var oListBox = oItem.getListBox();
       
        rm.write('<select id="' + oItem.getId() + '-filter-select" style="min-width:100px;" onchange="javascript:sap.ui.getCore().byId(\'' + oItem.getId() + '\').doChange(event)">');
        oListBox.getItems().forEach(function(item){
            rm.write("<option value='" + item.getKey() + "'>" + item.getText() + "</option>");
        });
        rm.write("</select>");
        rm.write("</div>");
    }else if(oItem.getType().toLowerCase() == "date"){
        rm.write("<div class=\"sapUiMnuTfItemWrppr\" style='left:70px;padding-top:6px;'>");
        var oDatePicker = new sap.ui.commons.DatePicker({width:"100px"});
        oDatePicker.attachChange(function(oEvent){
            oItem.setValue(oDatePicker.getYyyymmdd());
            oItem.fireSelect();
            oEvent.preventDefault();
            oEvent.stopPropagation();
        });

        oDatePicker.attachBrowserEvent("click", function(oEvent){
            // var oPicker = jQuery('#ui-datepicker-div');
            // oItem.getParent().getPopup().setAutoCloseAreas(oPicker);
            // oEvent.preventDefault();
            // oEvent.stopPropagation();
            // oItem.getParent().getPopup().close();
        });

        oItem.getParent().getPopup().attachClosed(function(){
            var oPicker = jQuery('#ui-datepicker-div');
            if(oPicker.css("display") == "block"){
                // oItem.getParent().getPopup().open();
            }
        });
        rm.write("<select id='" + oItem.getId() + "-operator' style='width:45px;'>");
        rm.write("<option value='='>=</option>");
        rm.write("<option value='!='>!=</option>");
        rm.write("<option value='<='><=</option>");
        rm.write("<option value='<'><</option>");
        rm.write("<option value='>='>>=</option>");
        rm.write("<option value='>'>></option>");
        rm.write("</select>");
        rm.renderControl(oDatePicker);
        rm.write("</div>");
    }else{
        rm.write("<div class=\"sapUiMnuTfItemWrppr\" style='left:70px;'>");
        rm.write("<select id='" + oItem.getId() + "-operator' style='width:45px;margin-right:5px;'>");
        if(oItem.getType() != "int") rm.write("<option value='in'>in</option>");
        rm.write("<option value='='>=</option>");
        rm.write("<option value='!='>!=</option>");
        rm.write("<option value='<='><=</option>");
        rm.write("<option value='<'><</option>");
        rm.write("<option value='>='>>=</option>");
        rm.write("<option value='>'>></option>");
        rm.write("</select>");
        rm.write("</div>");
    }
   
    if(oItem.getType().toLowerCase() != "select" && oItem.getType().toLowerCase() != "date"){
        rm.write("<div class=\"sapUiMnuTfItemWrppr\" style='left:120px;padding-top:6px;'>");
        rm.renderControl(this._tf);
        rm.write("</div>");
    }
    rm.write("</div>");
    
    rm.write("<div class=\"sapUiMnuItmR\"></div>");

    rm.write("</li>");
};

sapui6.ui.table.MenuFilterItem.prototype.doChange = function(oEvent){
    this.setValue($("#"+this.getId()+"-filter-select").val(),true);
    this.fireSelect();
    this.getParent().close();
    oEvent.preventDefault();
    oEvent.stopPropagation();
};

sapui6.ui.table.MenuFilterItem.prototype.hover = function(bHovered, oMenu){
    if(bHovered){
        jQuery(this.getDomRef()).addClass("sapUiMnuItmHov");
        jQuery(this._tf.getDomRef()).addClass("sapUiTfFoc");
        if(this.getEnabled()){
            var that = this;
            function focusTF() { that._tf.focus(); };
            if(jQuery("html").attr("data-sap-ui-browser") === "ie8"){
                setTimeout(focusTF, 0);
            }else{
                focusTF();
            }
        }
    }else{
        jQuery(this.getDomRef()).removeClass("sapUiMnuItmHov");
        jQuery(this._tf.getDomRef()).removeClass("sapUiTfFoc");
    }
};


sapui6.ui.table.MenuFilterItem.prototype.onsapup = function(oEvent){
    this.getParent().focus();
    this.getParent().onsapprevious(oEvent);
};

sapui6.ui.table.MenuFilterItem.prototype.onsapdown = function(oEvent){
    this.getParent().focus();
    this.getParent().onsapnext(oEvent);
};


sapui6.ui.table.MenuFilterItem.prototype.onsaphome = function(oEvent){
    this.getParent().focus();
    this.getParent().onsaphome(oEvent);
};


sapui6.ui.table.MenuFilterItem.prototype.onsapend = function(oEvent){
    this.getParent().focus();
    this.getParent().onsapend(oEvent);
};


sapui6.ui.table.MenuFilterItem.prototype.onsapescape = function(oEvent){
    this.getParent().onsapescape(oEvent);
};


sapui6.ui.table.MenuFilterItem.prototype.onkeydown = function(oEvent){
    oEvent.stopPropagation();
};


sapui6.ui.table.MenuFilterItem.prototype.onclick = function(oEvent){
    oEvent.preventDefault();
    oEvent.stopPropagation();
};


sapui6.ui.table.MenuFilterItem.prototype.onsapenter = function(oEvent){
    var sValue = oEvent.target.value;
    this.setValue(sValue, true);
    this.setOperator($("#"+this.getId()+"-operator").val());
    this.getParent().selectItem(this);
    oEvent.preventDefault();
    oEvent.stopPropagation();
};

sapui6.ui.table.MenuFilterItem.prototype.setSubmenu = function(oMenu){
    jQuery.sap.log.warning("The aggregation 'submenu' is not supported for this type of menu item.", "", "sap.ui.unified.MenuTextFieldItem");
    return this;
};


sapui6.ui.table.MenuFilterItem.prototype.setLabel = function(sLabel){
    this._lbl.setText(sLabel);
    return this;
};


sapui6.ui.table.MenuFilterItem.prototype.getLabel = function(){
    return this._lbl.getText();
};


sapui6.ui.table.MenuFilterItem.prototype.setValue = function(sValue, bSupR){
    this.setProperty("value", sValue, bSupR);
    this._tf.setValue(sValue);
    return this;
};

sapui6.ui.table.MenuFilterItem.prototype.setValueState = function(sValueState){
    this._tf.setValueState(sValueState);
    return this;
};

}());
