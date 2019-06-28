
Ext.define('Shopware.apps.TkImport.view.list.Window', {
    extend: 'Shopware.window.Listing',
    alias: 'widget.tk-import-list-window',
    height: 450,
    title : '{s name=window_title}TkImport listing{/s}',

    configure: function() {
        return {
            listingGrid: 'Shopware.apps.TkImport.view.list.List',
            listingStore: 'Shopware.apps.TkImport.store.ImportedData'
        };
    }
});