/*!
 * Custom Control for SAPUI5
 * http://www.sapui6.com
 * (c) Copyright 2014 ReturnValues. All rights reserved
 */

jQuery.sap.declare("sapui6.ui.table.BigDataTable");
jQuery.sap.require("sapui6.ui.table.Table");

sapui6.ui.table.Table.extend("sapui6.ui.table.BigDataTable", { 
    library : "sapui6.ui.table",
    metadata : {                             
        properties : {
            "visibleRowCount" : {type:"int", defaultValue:10}
        }
    },

    _scroll : null,
    _scrollPosition : 0,
    _sBindingTimer : null,

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        oControl._makeData();
        oControl._RM = oRm;
        oControl.gridName = oControl.getId();
        oRm.write("<div");
        oRm.writeControlData(oControl);
        if(oControl.getWidth())oRm.addStyle("width", oControl.getWidth());
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
            oRm.write("<div style='clear:both;'></div>")
        }

        oRm.write('<div class="sapui6_table"');
        oRm.addStyle("color", oControl.getTextColor());
        oRm.writeStyles();
        oRm.write('>');
        oRm.write('<div class="sapui6_table_wrap" id="' + oControl.gridName + '_gridbg">');
        oRm.write('<div class="sapui6_table_layout" id="' + oControl.gridName + '_outerdiv">');
        
        oControl._scrollPosition = 0;
        
        if(oControl.getFixedColumnIndex() > -1){
            oRm.write('<table style="border-spacing:0px;margin:0px;padding:0px;border:0px;background-color:' + oControl._tableRowBGColor + ';"><tr><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');
            oControl.headerHtml = '';
            oControl.headerHtml += '<div id="' + oControl.gridName + '_h1">';
            oControl.headerHtml += oControl.renderLeftTableHeader();
            oControl.headerHtml += '</div>';

            oControl.dataHtml = '<div id="' + oControl.gridName + '_d1" style="background-color:' + oControl._tableRowBGColor + ';">';
            oControl.dataHtml += oControl.renderLeftTableRow(0,oControl.getVisibleRowCount());
            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';

            oRm.write('<div id="' + oControl.gridName + '_left_div" style="border-collapse:collapse;border-right:1px solid ' + oControl._borderColor + ';">' + oControl.headerHtml + oControl.dataHtml + '</div>');

            oRm.write('</td><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');

            oControl.headerHtml = '';
            oControl.headerHtml += '<div id="' + oControl.gridName + '_h2">';
            oControl.headerHtml += oControl.renderRightTableHeader();
            oControl.headerHtml += '</div>';

            oControl.dataHtml = '<div id="' + oControl.gridName + '_d2" style="background-color:' + oControl._tableRowBGColor + ';" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollX();javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scrollY();' + '">';
            oControl.dataHtml += oControl.renderRightTableRow(0,oControl.getVisibleRowCount());

            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';
            oRm.write('<div id="' + oControl.gridName + '_right_div" style="border-collapse:collapse;">' + oControl.headerHtml + oControl.dataHtml + '<div id="' + oControl.getId() + '-vscroll-blank" style="display:none;z-index:99;position:absolute;top:0px;right:0px;border:1px solid ' + oControl._borderColor + ';border-top:2px solid ' + oControl.getStrongColor() + ';background-color:' + oControl._tableRowBGColor + ';"></div></div>');
            
            oRm.write('</td><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');
            oControl._scroll = new sap.ui.core.ScrollBar();
            oControl._scroll.setScrollPosition(oControl._scrollPosition);
            oControl._scroll.setSteps(oControl.getRows().length);
            oControl._scroll.setSize("0px");
            oControl._scroll.attachScroll(function(oEvent){
                if(oControl._sBindingTimer != null) {
                    jQuery.sap.clearDelayedCall(oControl._sBindingTimer);
                }
                
                oControl._sBindingTimer = jQuery.sap.delayedCall(50, oControl, function() {
                    oControl.doScroll(oEvent);
                });
            });
            oRm.renderControl(oControl._scroll);

            oRm.write('</td></tr></table>');
        }else{
            oRm.write('<table style="border-spacing:0px;margin:0px;padding:0px;border:0px;background-color:' + oControl._tableRowBGColor + ';"><tr><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');
            oControl.headerHtml = '';
            oControl.headerHtml += '<div id="' + oControl.gridName + '_h">';
            oControl.headerHtml += oControl.renderTableHeader();
            oControl.headerHtml += '</div>';

            oControl.dataHtml = '<div id="' + oControl.gridName + '_d" style="background-color:' + oControl._tableRowBGColor + ';" onscroll="javascript:sap.ui.getCore().byId(\'' + oControl.gridName + '\').scroll();' + '">';
            oControl.dataHtml += oControl.renderTableRow(0,oControl.getVisibleRowCount());
            if(oControl.getRows().length == 0 && oControl.getNoDataText() != "") oControl.dataHtml += '<div id="' + oControl.getId() + '-nodatatext" style="display:none;text-align:center;width:100%;height:40px;position:absolute;z-index:5;">' + oControl.getNoDataText() + '</div>';
            oControl.dataHtml += '</div>';

            oRm.write(oControl.headerHtml + oControl.dataHtml);
            oRm.write('</td><td style="vertical-align:top;border:0px;padding:0px;margin:0px;">');
            oControl._scroll = new sap.ui.core.ScrollBar();
            oControl._scroll.setScrollPosition(oControl._scrollPosition);
            oControl._scroll.setSteps(oControl.getRows().length);
            oControl._scroll.setSize("0px");
            oControl._scroll.attachScroll(function(oEvent){
                if(oControl._sBindingTimer != null) {
                    jQuery.sap.clearDelayedCall(oControl._sBindingTimer);
                }

                oControl._sBindingTimer = jQuery.sap.delayedCall(50, oControl, function() {
                    oControl.doScroll(oEvent);
                });
            });
            oRm.renderControl(oControl._scroll);

            oRm.write('</td></tr></table>');
        }

        oRm.write('</div>');
        oRm.write('</div>');

        oRm.write('</div>');
        oRm.write('</div>');

        if(oControl.getRows().length > 0) oControl.doScroll();
    }
});

sapui6.ui.table.BigDataTable.prototype.doScroll = function(oEvent){
    var oScroll = this._scroll;
    var that = this;
    var visibleRowCount = this.getVisibleRowCount();
    if(this.getFixedColumnIndex() > -1){
        var position = oScroll.getScrollPosition();
        that._scrollPosition = position;
        $("#"+that.getId()+"_d1").html(that.renderLeftTableRow(position,position+visibleRowCount));
        $("#"+that.getId()+"_d2").html(that.renderRightTableRow(position,position+visibleRowCount));
    }else{
        var position = oScroll.getScrollPosition();
        that._scrollPosition = position;
        $("#"+that.getId()+"_d").html(that.renderTableRow(position,position+visibleRowCount));
    }
    this._sBindingTimer = null;
};

sapui6.ui.table.BigDataTable.prototype._setColumnsMenuEntry = function(){
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
                icon: that._getThemedIcon("ico12_filter.gif"),
                value: "",
                type: column.getFilterType(),
                select: function(oEvent) {
                    that._scrollPosition = 0;
                    sap.ui.getCore().byId(that.getId()).filter(index,oEvent.getSource().getOperator(),oEvent.getSource().getValue());
                    that._resetTableContextMenu(that, index, "filter");
                }
            }));

            oCustomMenu.addItem(new sap.ui.unified.MenuItem(oCustomMenu.getId()+"-clear_filter",{
                text:that.label.getText("clear_filter"),
                icon:"sap-icon://decline",
                select:function(oEvent) {
                    that._scrollPosition = 0;
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
                    icon:"sap-icon://collapse",
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
                    icon:"sap-icon://collapse",
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

sapui6.ui.table.BigDataTable.prototype.scrollX = function(div1, div2){
    $("#"+this.getId()+"_h2").scrollLeft($("#"+this.getId()+"_d2").scrollLeft());
    $("#"+this.getId()+"_d2").scrollLeft($("#"+this.getId()+"_h2").scrollLeft());
};

sapui6.ui.table.BigDataTable.prototype.scrollY = function(div1, div2){
    $("#"+this.getId()+"_d1").scrollTop($("#"+this.getId()+"_d2").scrollTop());
    $("#"+this.getId()+"_d2").scrollTop($("#"+this.getId()+"_d1").scrollTop());
};

sapui6.ui.table.BigDataTable.prototype.scrollWheel = function(e){
    var that = this;
    if(this._sBindingTimer != null) {
        jQuery.sap.clearDelayedCall(this._sBindingTimer);
    }

    this._sBindingTimer = jQuery.sap.delayedCall(50, that, function() {
        var evt = window.event || e   
        evt = evt.originalEvent ? evt.originalEvent : evt;               
        var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta 

        if(delta > 0) {
            var position = that._scroll.getScrollPosition()-3;
            if(position <= 0) position = 0;

            that._scroll.setScrollPosition(position);
        }
        else{
            var position = that._scroll.getScrollPosition()+3;
            if(position >= (that.getRows().length-1)) position = that.getRows().length-1;

            that._scroll.setScrollPosition(position);
        }   

        that.doScroll();
    });
};

sapui6.ui.table.BigDataTable.prototype.scroll = function(){
    if(document.getElementById(this.gridName + '_h') && document.getElementById(this.gridName + '_d')){
        $("#"+this.getId()+"_h").scrollLeft($("#"+this.getId()+"_d").scrollLeft());
        $("#"+this.getId()+"_d").scrollLeft($("#"+this.getId()+"_h").scrollLeft());
    }
};

sapui6.ui.table.BigDataTable.prototype._handleResize = function(isResize){
    var gridDiv = document.getElementById(this.getId());
    $(gridDiv).css("width", $(gridDiv).width()+"px");

    var regexp = /px/g;
    var scrollWidth = this.getScrollBarWidth() + 2;
    if(scrollWidth <= 0) scrollWidth = 17;

    var mousewheelevent = "mousewheel";
    if(sap.ui.Device.browser.firefox) mousewheelevent = "DOMMouseScroll";

    if(this.getFixedColumnIndex() < 0){
        if(isResize){
            $(gridDiv).css("width",String(parseInt($(window).width()*this._widthRatio))+"px");
            $("#"+this.getId()+"_d").css("width", $(gridDiv).width()+"px");
        }

        var dataDiv = document.getElementById(this.gridName + '_d');
        var headerDiv = document.getElementById(this.gridName + '_h');
        var dataTb = document.getElementById(this.gridName + '_dt');
        var headerTb = document.getElementById(this.gridName + '_ht');

        if(!this.getHeight()) $(gridDiv).css("height", $(dataTb).height()+$(headerTb).height()+"px");

        var divWidth = $(gridDiv).width();

        if(this.getRows().length > this.getVisibleRowCount()){
            divWidth = divWidth - scrollWidth;
        }

        $(dataDiv).css("width", divWidth+"px");
        $(headerDiv).css("width", divWidth+"px");
        $(headerDiv).css("overflow", "hidden");
        $(dataDiv).css("height", $(gridDiv).height() - ($(dataDiv).offset().top -  $(gridDiv).offset().top));

        var yscroll = false;
        var xscroll = false;

        if(this.getRows().length > 0){
            if($(dataTb).outerWidth() > $(dataDiv).width()){
                xscroll = true;
                $(dataDiv).css("overflow-x", "auto");
                $(dataDiv).css("-webkit-overflow-scrolling", "touch");
            }

            var addScrollSize = 0;
            if(xscroll) addScrollSize = scrollWidth;

            if(this.getRows().length > this.getVisibleRowCount()){
                this._scroll.setSize($(headerTb).height()+$(dataTb).height()+"px");
                this._scroll.rerender();
            }

            var that = this;
            jQuery.sap.delayedCall(100, that, function() {
                $(headerDiv).css("width", $(dataDiv).width() + "px");
                $(headerTb).css("width", $(dataDiv).width() + "px");
                $(dataTb).css("width", $(dataDiv).width() + "px");
            });

            $(dataDiv).css("height", $(dataTb).outerHeight() + addScrollSize + "px");

            if(sap.ui.Device.browser.msie){
                $("#"+this.getId()+"_dt tr:first").addClass("sapUiTableRowHvr");
                var that = this;
                jQuery.sap.delayedCall(100, that, function() {
                    $("#"+that.getId()+"_dt tr:first").removeClass("sapUiTableRowHvr");
                });
            }

            if(this.getRows().length > this.getVisibleRowCount()){
                $(dataDiv).bind(mousewheelevent, function(oEvent){
                    sap.ui.getCore().byId(that.getId()).scrollWheel(oEvent);
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
        var dataTb = document.getElementById(this.gridName + '_dt1');
        var headerTb = document.getElementById(this.gridName + '_ht1');

        $(dataDiv).css("overflow", "hidden");
        $(headerDiv).css("overflow", "hidden");

        if(!this.getHeight()) $(gridDiv).css("height", $(dataTb).height()+$(headerTb).height()+"px");

        $(dataDiv).css("width", leftTableWidth+"px");
        $(headerDiv).css("width", leftTableWidth+"px");

        var scrollBarSize = 0;
        var rightWidth = $(gridDiv).innerWidth()-$(dataDiv).outerWidth();

        if(this.getRows().length > this.getVisibleRowCount()){
            rightWidth = rightWidth - scrollWidth;
        }

        $("#"+this.getId()+"_right_div").css("width", rightWidth+"px");

        var dataDiv2 = document.getElementById(this.gridName + '_d2');
        var headerDiv2 = document.getElementById(this.gridName + '_h2');
        var dataTb2 = document.getElementById(this.gridName + '_dt2');
        var headerTb2 = document.getElementById(this.gridName + '_ht2');

        $(headerDiv2).css("overflow", "hidden");

        $(dataDiv2).css("height", $(dataDiv).height() + "px");

        var yscroll = false;
        var xscroll = false;

        if(this.getRows().length > 0){
            if($(dataTb2).outerWidth() > $(dataDiv2).width()){
                xscroll = true;
                $(dataDiv2).css("overflow-x", "auto");
                $(dataDiv2).css("-webkit-overflow-scrolling", "touch");
                $(dataDiv).css("height", $(dataDiv).height()-scrollWidth);
            }

            var addScrollSize = 0;
            if(xscroll) addScrollSize = scrollWidth;

            var that = this;
            jQuery.sap.delayedCall(100, that, function() {
                $(headerDiv2).css("width", $(dataDiv2).width() + "px");
            });

            $(dataDiv).css("height", $(dataTb2).outerHeight() + addScrollSize + "px");
            $(dataDiv2).css("height", $(dataTb2).outerHeight() + addScrollSize + "px");

            this._scroll.setSize($(headerDiv2).height()+$(dataDiv2).height()+"px");
            this._scroll.rerender();

            if(sap.ui.Device.browser.msie){
                $("#"+this.getId()+"_dt2 tr:first").addClass("sapUiTableRowHvr");
                var that = this;
                jQuery.sap.delayedCall(100, that, function() {
                    $("#"+that.getId()+"_dt2 tr:first").removeClass("sapUiTableRowHvr");
                });
            }

            if(this.getRows().length > this.getVisibleRowCount()){
                $(dataDiv).bind(mousewheelevent, function(oEvent){
                    sap.ui.getCore().byId(that.getId()).scrollWheel(oEvent);
                });

                $(dataDiv2).bind(mousewheelevent, function(oEvent){
                    sap.ui.getCore().byId(that.getId()).scrollWheel(oEvent);
                });
            }
        }
    }
};

sapui6.ui.table.BigDataTable.prototype.renderTableRow = function(iStart, iEnd){
    var data = this.dataArr;
    var rowsHtml = "";

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var start = 0;
    var end = rLength;

    if(iStart != undefined && iEnd != undefined){
        start = iStart;
        end = iEnd;

        if((start + this.getVisibleRowCount()) >= rLength) start = rLength - this.getVisibleRowCount();
        if(start < 0) start = 0;
        if(end > rLength) end = rLength;
    }

    this.displayRowCount = end - start;

    this.displayDataArr = [];

    var tbHtml = '';
    tbHtml += ' <table class="sapui6_table_tb sapUiTableCtrl" id="' + this.gridName + '_dt" style="border-color:' + this._borderColor + ';">';
    tbHtml += '     <colgroup>';
    var hLength = this.getColumns().length;

    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
        tbHtml += '<col style="width:45px;max-width:45px;min-width:45px;" />';
    }

    if(this.isGroup){
        tbHtml += '         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />';
    }
    
    for(var i=0 ; i<hLength ; i++){
        if(!this.isGroup || this.groupHeaderIdx != i){
            if(this.getColumns()[i].getVisible()) tbHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />';
            else if(!this.getColumns()[i].getVisible()) tbHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />';
            else tbHtml += '            <col style="width:' + this.getColumns()[i].getWidth() + ';" />';
        }
    }

    tbHtml += '     </colgroup>';
    tbHtml += '     <tbody>';

    if(this.getRows().length>0){
        for(var i=start ; i<end ; i++){
            var row = data[i];
            var tRow = this.getRows()[i];
            var trHtml = "";
            this.displayDataArr.push(row);
            
            var rowStyle = "sapUiTableRowEven";
            if(i%2==0) rowStyle = "sapUiTableRowOdd";

            rowsHtml += '<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">';
            
            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                rowsHtml += this._getSelectionFieldDom(i);
            }

            for(var j=0 ; j<colLength ; j++){
                rowsHtml += this.renderTableCell(j, "", false, "", tRow, i);
            }
            rowsHtml += '</tr>'; 
        }
    }else{
        for(var i=0 ; i<this.getVisibleRowCount() ; i++) rowsHtml += '<tr><td>&nbsp;</td></tr>'; 
    }

    rowsHtml = tbHtml + rowsHtml;
    rowsHtml += '</tbody></table>';
    
    return rowsHtml;
};

sapui6.ui.table.BigDataTable.prototype.renderLeftTableRow = function(iStart, iEnd){
    var data = this.dataArr;
    var rowsHtml = "";

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var start = 0;
    var end = rLength;

    if(iStart != undefined && iEnd != undefined){
        start = iStart;
        end = iEnd;

        if((start + this.getVisibleRowCount()) >= rLength) start = rLength - this.getVisibleRowCount();
        if(start < 0) start = 0;
        if(end > rLength) end = rLength;
    }

    this.displayRowCount = end - start;

    this.displayDataArr = [];

    var tbHtml = '';
    tbHtml += '<table id="' + this.gridName + '_dt1" class="sapui6_table_tb sapUiTableCtrl" style="border-color:' + this._borderColor + ';">';
    tbHtml += '<colgroup>';

    if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
        tbHtml += '<col style="width:45px;max-width:45px;min-width:45px;" />';
    }

    if(this.isGroup){
        tbHtml += '         <col style="width:' + this.getColumns()[this.groupHeaderIdx].getWidth() + ';" />';
    }
    
    for(var i=0 ; i<=this.getFixedColumnIndex() ; i++){
        if(!this.isGroup || this.groupHeaderIdx != i){
            if(this.getColumns()[i].getVisible())tbHtml += '           <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />';
            else if(!this.getColumns()[i].getVisible())tbHtml += '           <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />';
            else tbHtml += '            <col style="width:' + this.getColumns()[i].getWidth() + ';" />';
        }
    }
    tbHtml += '                     </colgroup>';
    tbHtml += '                     <tbody>';
    
    if(this.getRows().length>0){
        for(var i=start ; i<end ; i++){
            var row = data[i];
            var tRow = this.getRows()[i];

            this.displayDataArr.push(row);

            var rowStyle = "sapUiTableRowEven";
            if(i%2==0) rowStyle = "sapUiTableRowOdd";

            rowsHtml += '<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">';

            if(this.getSelectionMode() && (this.getSelectionMode().toLowerCase() == "multiple" || this.getSelectionMode().toLowerCase() == "single")){
                rowsHtml += this._getSelectionFieldDom(i);
            }

            for(var j=0 ; j<=this.getFixedColumnIndex() ; j++){
                rowsHtml += this.renderTableCell(j, "", false, "", tRow, i);
            }
            rowsHtml += '</tr>'; 
        }
    }else{
        for(var i=0 ; i<this.getVisibleRowCount() ; i++) rowsHtml += '<tr><td>&nbsp;</td></tr>'; 
    }
                
    tbHtml += rowsHtml;
    tbHtml += ' </tbody>';
    tbHtml += '</table>';
    
    return tbHtml;
};

sapui6.ui.table.BigDataTable.prototype.renderRightTableRow = function(iStart, iEnd){
    var data = this.dataArr;
    var rowsHtml = "";

    var rLength = this.getRows().length;
    var colLength = this.getColumns().length;

    var start = 0;
    var end = rLength;

    if(iStart != undefined && iEnd != undefined){
        start = iStart;
        end = iEnd;

        if((start + this.getVisibleRowCount()) >= rLength) start = rLength - this.getVisibleRowCount();
        if(start < 0) start = 0;
        if(end > rLength) end = rLength;
    }

    this.displayRowCount = end - start;

    this.displayDataArr = [];

    var tbHtml = '';

    tbHtml += '                 <table id="' + this.gridName + '_dt2" class="sapui6_table_tb sapUiTableCtrl"'; 
    if(this.isGroup) tbHtml += '    style="table-layout:auto;border-color:' + this._borderColor + ';">'; 
    else tbHtml += '         style="border-color:' + this._borderColor + ';">'; 

    tbHtml += '                     <colgroup>';
    
    var hLength = this.getColumns().length;

    for(var i=this.getFixedColumnIndex()+1 ; i<hLength ; i++){
        if(!(this.isGroup && this.groupHeaderIdx == i)){
            if(this.getColumns()[i].getVisible()) tbHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:;" />';
            else if(!this.getColumns()[i].getVisible()) tbHtml += '          <col style="width:' + this.getColumns()[i].getWidth() + ';display:none;" />';
            else tbHtml += '            <col style="width:' + this.getColumns()[i].getWidth()+ ';" />';
        }
    }
    tbHtml += '                     </colgroup>';
    tbHtml += '                     <tbody>';
    rowsHtml = '';
    
    if(this.getRows().length>0){
        for(var i=start ; i<end ; i++){
            var row = data[i];
            var tRow = this.getRows()[i];

            this.displayDataArr.push(row);
            
            var rowStyle = "sapUiTableRowEven";
            if(i%2==0) rowStyle = "sapUiTableRowOdd";

            if(this.getMergeColumnIndex() > -1) rowStyle = "sapUiTableRowOdd";
            
            rowsHtml += '<tr class="' + rowStyle + '" onclick="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseclick(event,' + i + ');" onmouseover="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseover(event,' + i + ');" onmouseout="sap.ui.getCore().byId(\'' + this.getId() + '\').mouseout(event,' + i + ');" origin_class="' + rowStyle + '">';

            for(var j=this.getFixedColumnIndex()+1 ; j<colLength ; j++){
                rowsHtml += this.renderTableCell(j, "", false, "", tRow, i);
            }
            rowsHtml += '</tr>'; 
        }
    }else{
        for(var i=0 ; i<this.getVisibleRowCount() ; i++) rowsHtml += '<tr><td>&nbsp;</td></tr>'; 
    }
    
    rowsHtml = tbHtml + rowsHtml;

    rowsHtml += '                       </tbody>';
    rowsHtml += '                   </table>';
    
    return rowsHtml;
};