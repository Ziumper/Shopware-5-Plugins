Ext.define('Shopware.apps.TkImport.view.list.List', {
    extend: 'Shopware.grid.Panel',
    alias: 'widget.tk-import-listing-grid',
    region: 'center',

    configure: function () {
        return {
            detailWindow: 'Shopware.apps.TkImport.view.detail.Window',
            eventAlias: 'tk-import-grid'
        };
    },


});
