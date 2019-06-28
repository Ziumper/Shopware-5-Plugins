Ext.define('Shopware.apps.TkImport.view.import.Container', {
    extend: 'Ext.container.Container',

    alias: 'widget.tk-import-manager-import',
    title: 'Import',
    layout: 'fit',
    autoScroll: true,

    initComponent: function() {
        var me = this;

        me.items = [
            me.createFormPanel()
        ];

        me.callParent(arguments);
    },

    /*
   * Input elements width
   */
    configWidth: 500,

    /*
     * Label of the input elements width
     */
    configLabelWidth: 80,

    createFormPanel: function() {
        var me = this;

        // Form panel which holds off all options
        me.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 15,
            border: 0,
            autoScroll: true,
            defaults: {
                labelStyle: 'font-weight: 700; text-align: right;'
            },
            items: [
                   me.createMainFieldset()
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'shopware-ui',
                cls: 'shopware-toolbar',
                items: ['->', {
                    text: 'Start import',
                    cls: 'primary',
                    action: 'tk-import-button'
                }]
            }]
        });

        return me.formPanel;
    },

    createMainFieldset: function() {
        var me = this;

        me.mainFieldset = Ext.create('Ext.form.FieldSet', {
            padding: 12,
            border: false,
            defaults: {
                anchor: '100%',
                labelStyle: 'font-weight: 700; text-align: right;'
            },
            items: [{
                xtype: 'container',
                padding: '0 0 8',
                items: [
                    me.createFileInput(),
                    me.createSelectFile()
                ]
            }]
        });

        return me.mainFieldset;
    },

    createFileInput: function() {
        var me = this;

        return {
            xtype: 'textfield',
            itemId: 'tk-import-file',
            name: 'importFile',
            hidden: true
        };
    },

    createSelectFile: function() {
        var me = this;

        me.addBtn = Ext.create('Ext.form.field.File', {
            emptyText: 'Please choose',
            margin: '1 0 0 1',
            buttonText: 'Choose',
            buttonConfig: {
                cls: Ext.baseCSSPrefix + 'form-mediamanager-btn small secondary',
                iconCls: 'sprite-plus-circle-frame'
            },
            name: 'fileId',
            itemId: 'importSelectFile',
            width: me.configWidth,
            labelWidth: me.configLabelWidth,
            fieldLabel: 'Select file'

        });

        return me.addBtn;
    },
});