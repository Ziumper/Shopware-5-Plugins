
Ext.define('Shopware.apps.TkImport.view.detail.Window', {
    extend: 'Shopware.window.Detail',
    alias: 'widget.tk-import-detail-window',
    title : '{s name=title}TkImport details window{/s}',
    height: 420,
    width: 900,

    configure: function() {
        return {
            eventAlias: 'add-item'
        }
    },


});
