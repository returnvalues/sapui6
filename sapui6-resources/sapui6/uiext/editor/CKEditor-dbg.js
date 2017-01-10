jQuery.sap.declare("sapui6.uiext.editor.CKEditor");

sap.ui.core.Control.extend("sapui6.uiext.editor.CKEditor", { 
    metadata : {        
        library : "sapui6.uiext.editor",                     
        properties : {
            "value": {type: "string", group: "Data", bindable: "bindable", defaultValue: ""},
            "visible" : {type:"boolean", defaultValue:true},
            "cols" : {type:"string", defaultValue:"80"},
            "rows" : {type:"string", defaultValue:"10"},
            "width" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "100%"}, 
            "height" : {type:"sap.ui.core.CSSSize", group:"Dimension", defaultValue : "400px"},
            "uiColor" : {type:"string", defaultValue : ""},
            "language" : {type:"string", defaultValue : "en"},
            "editable" : {type:"boolean", defaultValue : true},
            "inline" : {type:"boolean", defaultValue : false}
        }
    },

    toolbar : [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
        { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
        '/',
        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
        { name: 'others', items: [ '-' ] },
        { name: 'about', items: [ 'About' ] }
    ],

    toolbarGroup : [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'forms' },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert' },
        '/',
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
        { name: 'about' }
    ],

    editor : null,

    renderer : function(oRm, oControl){
        if(!oControl.getVisible()) return;

        if(CKEDITOR.instances[oControl.getId()] == undefined){
            oRm.write('<textarea');
            oRm.writeControlData(oControl);
            oRm.addStyle("width", oControl.getWidth());
            oRm.addStyle("height", oControl.getHeight());
            oRm.writeStyles();

            oRm.writeAttribute('cols', oControl.getCols());
            oRm.writeAttribute('rows', oControl.getRows());
            if(oControl.getInline()) oRm.writeAttribute('name', oControl.getId()+"-name");
            oRm.write(oControl.getValue());
            oRm.write('>');
            oRm.write('</textarea>');
        }
    },

    onAfterRendering : function(){
        if(!this.getVisible()) return;

        if(CKEDITOR.instances[this.getId()] == undefined){
            if(this.getInline()) this.editor = CKEDITOR.inline(this.getId()+"-name", this.getConfiguration());
            else this.editor = CKEDITOR.replace(this.getId(), this.getConfiguration());

            this.editor.setData(this.getValue());

            this.editor.on('change', jQuery.proxy(this.handleChange, this));
            this.editor.on('blur', jQuery.proxy(this.handleChange, this));
        }else{
            CKEDITOR.instances[this.getId()].setData(this.getValue());
        }
    }
});

sapui6.uiext.editor.CKEditor.prototype.handleChange = function() {
    var currentValue = this.editor.getData();

    if (this.getValue() != currentValue) {
        this.setProperty('value', currentValue, true); 
    }
};

sapui6.uiext.editor.CKEditor.prototype.getConfiguration = function(){
    var configs = {};
    configs.toolbar = this.getToolbar();
    configs.toolbarGroups = this.getToolbarGroup();
    configs.disableNativeSpellChecker = false;
    configs.uiColor = this.getUiColor();
    configs.height = this.getHeight();
    configs.width = this.getWidth();
    configs.language = this.getLanguage();
    configs.readOnly = !this.getEditable();
    configs.toolbarStartupExpanded = true;
    configs.browserContextMenuOnCtrl = true;

    return configs;
};

sapui6.uiext.editor.CKEditor.prototype.setToolbar = function(mToolbar){
    this.toolbar = mToolbar;
};

sapui6.uiext.editor.CKEditor.prototype.getToolbar = function(){
    return this.toolbar;
};

sapui6.uiext.editor.CKEditor.prototype.setToolbarGroup = function(mToolbar){
    this.toolbarGroup = mToolbar;
};

sapui6.uiext.editor.CKEditor.prototype.getToolbarGroup = function(){
    return this.toolbarGroup;
};

sapui6.uiext.editor.CKEditor.prototype.insertHtml = function(sHTML){
    this.editor.insertHtml(sHTML);
    this.setValue(this.editor.getData());
};

sapui6.uiext.editor.CKEditor.prototype.insertText = function(sText){
    this.editor.insertText(sText);
    this.setValue(this.editor.getData());
};

sapui6.uiext.editor.CKEditor.prototype.getData = function(){
    return this.editor.getData();
};

sapui6.uiext.editor.CKEditor.prototype.setData = function(sData){
    this.editor.setData(sData);
    this.setValue(sData);
};

sapui6.uiext.editor.CKEditor.prototype.focus = function(){
    CKEDITOR.instances[this.getId()].focus();
};

sapui6.uiext.editor.CKEditor.prototype.setValue = function(sValue){
    this.setProperty('value', sValue, true);
};