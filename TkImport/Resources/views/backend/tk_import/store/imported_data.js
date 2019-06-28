Ext.define('Shopware.apps.TkImport.store.ImportedData', {
    extend:'Shopware.store.Listing',

    configure: function() {
        return {
            controller: 'TkImport'
        };
    },
    model: 'Shopware.apps.TkImport.model.ImportedData'
});