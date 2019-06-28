// {namespace name=backend/swag_import_export/view/main}
// {block name="backend/swag_import_export/view/main/window"}
// deprecated since 2.4.2 and will be removed with 3.0.0
// {block name="backend/swag_gift_packaging/view/main/window"}
Ext.define('Shopware.apps.TkImport.view.Window', {

    /**
     * Define that the order main window is an extension of the enlight application window
     * @string
     */
    extend: 'Enlight.app.Window',

    /**
     * List of short aliases for class names. Most useful for defining xtypes for widgets.
     * @string
     */
    alias: 'widget.tk-import-import-export-window',

    height: 300,
    width: 600,

    layout: 'fit',

    title: 'Import CSV plugin example',

    initComponent: function() {
        var me = this;

        // add the order list grid panel and set the store
        me.items = [me.createTabPanel()];
        me.callParent(arguments);
    },

    createTabPanel: function() {
        const me = this;
        var aclItems = [];

        aclItems.push(me.createGridView());
        aclItems.push(me.createImportView());

        return Ext.create('Ext.tab.Panel', {
            name: 'main-tab',
            items: aclItems
        });
    },

    createGridView: function () {
        return Ext.create('Shopware.apps.TkImport.view.list.List', {
            title: 'Data',
            store: Ext.create('Shopware.apps.TkImport.store.ImportedData', {
                sorters: [
                    { property: 'name', direction: 'ASC' }
                ],
            }),
            listeners: {
                activate: function(grid) {
                    grid.getStore().load();
                }
            }
        });
    },

    createImportView: function () {
        return Ext.create('Shopware.apps.TkImport.view.import.Container');
    }
});
// {/block}
// {/block}
